import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play, Pause, RotateCcw, Download, ChevronUp, ChevronDown,
  Mic, MicOff, Video, VideoOff, Square, Monitor, Crop,
  Pen, Trash2, Type, FlipHorizontal, X, Check, Circle
} from 'lucide-react';

type RecordMode = 'full' | 'segment' | 'freehand' | null;
type Corner = 'br' | 'bl' | 'tr' | 'tl';

const DEFAULT_SCRIPT = `Welcome to Teleprompter Studio.

Replace this text with your own script.

This teleprompter supports auto-scroll, mirror mode, webcam overlay, full screen recording, screen segment recording, and freehand annotation while recording.

Tips for a great recording:
• Speak clearly and at a natural pace.
• Use the speed control to match your reading pace.
• Enable mirror mode if using a teleprompter glass.
• Turn on your webcam for picture-in-picture overlay.
• Use Freehand mode to draw annotations on screen while recording.

Press Play to begin scrolling.`;

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

const CORNERS: Corner[] = ['tl', 'tr', 'bl', 'br'];
const CORNER_LABELS: Record<Corner, string> = {
  tl: 'Top Left', tr: 'Top Right', bl: 'Bottom Left', br: 'Bottom Right',
};

export const TeleprompterApp: React.FC = () => {
  const [script, setScript] = useState(DEFAULT_SCRIPT);
  const [isScrolling, setIsScrolling] = useState(false);
  const [speed, setSpeed] = useState(1.5);
  const [fontSize, setFontSize] = useState(38);
  const [mirrored, setMirrored] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [recordMode, setRecordMode] = useState<RecordMode>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const [webcamOn, setWebcamOn] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [webcamCorner, setWebcamCorner] = useState<Corner>('br');

  const [drawColor, setDrawColor] = useState('#ef4444');
  const [drawSize, setDrawSize] = useState(5);
  const [isDrawingActive, setIsDrawingActive] = useState(false);

  const [isSelectingRegion, setIsSelectingRegion] = useState(false);
  const [regionStart, setRegionStart] = useState<{ x: number; y: number } | null>(null);
  const [regionRect, setRegionRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [currentRegion, setCurrentRegion] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const teleprompterRef = useRef<HTMLDivElement>(null);
  const webcamVideoRef = useRef<HTMLVideoElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const compositeCanvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const webcamStreamRef = useRef<MediaStream | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);
  const scrollAnimRef = useRef<number | null>(null);
  const recordAnimRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const lastDrawPos = useRef<{ x: number; y: number } | null>(null);

  const webcamOnRef = useRef(webcamOn);
  const webcamCornerRef = useRef(webcamCorner);
  useEffect(() => { webcamOnRef.current = webcamOn; }, [webcamOn]);
  useEffect(() => { webcamCornerRef.current = webcamCorner; }, [webcamCorner]);

  // Scroll loop
  useEffect(() => {
    if (isScrolling && teleprompterRef.current) {
      const tick = () => {
        const el = teleprompterRef.current;
        if (!el) return;
        el.scrollTop += speed * 0.5;
        if (el.scrollTop >= el.scrollHeight - el.clientHeight) { setIsScrolling(false); return; }
        scrollAnimRef.current = requestAnimationFrame(tick);
      };
      scrollAnimRef.current = requestAnimationFrame(tick);
    } else {
      if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);
    }
    return () => { if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current); };
  }, [isScrolling, speed]);

  const resetScroll = () => {
    setIsScrolling(false);
    if (teleprompterRef.current) teleprompterRef.current.scrollTop = 0;
  };

  const toggleWebcam = async () => {
    if (webcamOn) {
      webcamStreamRef.current?.getTracks().forEach(t => t.stop());
      webcamStreamRef.current = null;
      if (webcamVideoRef.current) webcamVideoRef.current.srcObject = null;
      setWebcamOn(false);
      webcamOnRef.current = false;
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: 'user' }, audio: false,
        });
        webcamStreamRef.current = stream;
        if (webcamVideoRef.current) { webcamVideoRef.current.srcObject = stream; await webcamVideoRef.current.play(); }
        setWebcamOn(true);
        webcamOnRef.current = true;
      } catch (e: any) { alert('Webcam access denied: ' + e.message); }
    }
  };

  useEffect(() => {
    if (isRecording) {
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => setRecordingTime(t => t + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') mediaRecorderRef.current.stop();
    if (recordAnimRef.current) cancelAnimationFrame(recordAnimRef.current);
    setIsRecording(false);
    setRecordMode(null);
  }, []);

  const startRecording = async (mode: RecordMode) => {
    if (!mode) return;
    setRecordedBlob(null);
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 } as MediaTrackConstraints, audio: true,
      });
      screenStreamRef.current = screenStream;

      let micStream: MediaStream | null = null;
      if (micOn) {
        try { micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false }); } catch {}
      }

      const sv = document.createElement('video');
      sv.srcObject = screenStream;
      sv.muted = true;
      await sv.play();
      screenVideoRef.current = sv;

      const canvas = compositeCanvasRef.current!;
      const track = screenStream.getVideoTracks()[0];
      const settings = track.getSettings();
      const SW = settings.width || 1280;
      const SH = settings.height || 720;

      let cw: number, ch: number;
      let srcX = 0, srcY = 0, srcW = SW, srcH = SH;

      if (mode === 'segment' && currentRegion) {
        const dpr = window.devicePixelRatio || 1;
        srcX = Math.round(currentRegion.x * dpr);
        srcY = Math.round(currentRegion.y * dpr);
        srcW = Math.round(currentRegion.w * dpr);
        srcH = Math.round(currentRegion.h * dpr);
        cw = Math.min(srcW, SW);
        ch = Math.min(srcH, SH);
      } else {
        cw = SW; ch = SH;
      }

      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext('2d')!;
      const drawCanvas = drawCanvasRef.current;

      const composite = () => {
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(sv, srcX, srcY, srcW, srcH, 0, 0, cw, ch);
        if (mode === 'freehand' && drawCanvas) ctx.drawImage(drawCanvas, 0, 0, cw, ch);
        const wv = webcamVideoRef.current;
        if (webcamOnRef.current && wv && webcamStreamRef.current) {
          const pw = Math.round(cw * 0.22);
          const ph = Math.round(pw * 0.75);
          const pad = 16;
          const corner = webcamCornerRef.current;
          let px = pad, py = pad;
          if (corner === 'br') { px = cw - pw - pad; py = ch - ph - pad; }
          else if (corner === 'bl') { px = pad; py = ch - ph - pad; }
          else if (corner === 'tr') { px = cw - pw - pad; py = pad; }
          ctx.save(); roundedRect(ctx, px, py, pw, ph, 12); ctx.clip();
          ctx.drawImage(wv, px, py, pw, ph); ctx.restore();
          ctx.save(); roundedRect(ctx, px, py, pw, ph, 12);
          ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
        }
        recordAnimRef.current = requestAnimationFrame(composite);
      };

      composite();
      const canvasStream = canvas.captureStream(30);
      screenStream.getAudioTracks().forEach(t => canvasStream.addTrack(t));
      if (micStream) micStream.getAudioTracks().forEach(t => canvasStream.addTrack(t));

      chunksRef.current = [];
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
        ? 'video/webm;codecs=vp9,opus' : 'video/webm';
      const mr = new MediaRecorder(canvasStream, { mimeType });
      mediaRecorderRef.current = mr;
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        setRecordedBlob(new Blob(chunksRef.current, { type: 'video/webm' }));
        if (recordAnimRef.current) cancelAnimationFrame(recordAnimRef.current);
        screenStream.getTracks().forEach(t => t.stop());
        if (micStream) micStream.getTracks().forEach(t => t.stop());
        screenVideoRef.current = null;
      };
      mr.start(100);
      setRecordMode(mode);
      setIsRecording(true);
      screenStream.getVideoTracks()[0].addEventListener('ended', stopRecording);
    } catch (e: any) {
      if (e.name !== 'NotAllowedError') alert('Recording failed: ' + e.message);
    }
  };

  const downloadRecording = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement('a');
    a.href = url; a.download = `teleprompter-${Date.now()}.webm`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const getDrawPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = drawCanvasRef.current!;
    const rect = c.getBoundingClientRect();
    return { x: ((e.clientX - rect.left) / rect.width) * c.width, y: ((e.clientY - rect.top) / rect.height) * c.height };
  };

  const onDrawStart = (e: React.MouseEvent<HTMLCanvasElement>) => { setIsDrawingActive(true); lastDrawPos.current = getDrawPos(e); };
  const onDrawMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingActive || !lastDrawPos.current || !drawCanvasRef.current) return;
    const ctx = drawCanvasRef.current.getContext('2d')!;
    const pos = getDrawPos(e);
    ctx.beginPath(); ctx.moveTo(lastDrawPos.current.x, lastDrawPos.current.y); ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = drawColor; ctx.lineWidth = drawSize; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    lastDrawPos.current = pos;
  };
  const onDrawEnd = () => { setIsDrawingActive(false); lastDrawPos.current = null; };
  const clearDrawing = () => { const c = drawCanvasRef.current; if (c) c.getContext('2d')!.clearRect(0, 0, c.width, c.height); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsSelectingRegion(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onRegionDown = (e: React.MouseEvent) => { setRegionStart({ x: e.clientX, y: e.clientY }); setRegionRect(null); };
  const onRegionMove = (e: React.MouseEvent) => {
    if (!regionStart) return;
    const x = Math.min(e.clientX, regionStart.x), y = Math.min(e.clientY, regionStart.y);
    const w = Math.abs(e.clientX - regionStart.x), h = Math.abs(e.clientY - regionStart.y);
    setRegionRect({ x, y, w, h });
  };
  const onRegionUp = () => {
    if (regionRect && regionRect.w > 40 && regionRect.h > 40) {
      setCurrentRegion(regionRect); setIsSelectingRegion(false); setRegionStart(null);
    } else { setRegionStart(null); setRegionRect(null); }
  };

  const cornerClass: Record<Corner, string> = {
    br: 'bottom-20 right-3', bl: 'bottom-20 left-3', tr: 'top-3 right-3', tl: 'top-3 left-3',
  };

  const gradBtn = (from: string, to: string) => ({ background: `linear-gradient(135deg,${from},${to})` });

  return (
    <div className="h-screen bg-[#080E1D] text-white flex flex-col overflow-hidden" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <canvas ref={compositeCanvasRef} className="hidden" />

      {isSelectingRegion && (
        <div className="fixed inset-0 z-[300] cursor-crosshair select-none" style={{ background: 'rgba(0,0,0,0.55)' }}
          onMouseDown={onRegionDown} onMouseMove={onRegionMove} onMouseUp={onRegionUp}>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2.5 rounded-full font-bold text-sm shadow-2xl pointer-events-none">
            Drag to select the recording region · Esc to cancel
          </div>
          {regionRect && (
            <div className="absolute border-2 border-violet-400 bg-violet-500/10"
              style={{ left: regionRect.x, top: regionRect.y, width: regionRect.w, height: regionRect.h, pointerEvents: 'none' }}>
              <span className="absolute top-1 left-1 bg-violet-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {Math.round(regionRect.w)} × {Math.round(regionRect.h)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex-shrink-0 px-5 py-3 border-b border-white/10 bg-[#0C1424] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={gradBtn('#6A5CFF', '#18B6FF')}>
            <Type className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-extrabold text-[15px] leading-tight">Teleprompter Studio</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Record · Present · Annotate</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isRecording && (
            <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/40 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse inline-block" />
              <span className="text-red-300 font-bold text-sm">{formatTime(recordingTime)}</span>
              <span className="text-red-400/60 text-xs uppercase tracking-widest font-bold">
                {recordMode === 'full' ? 'Full' : recordMode === 'segment' ? 'Segment' : 'Freehand'}
              </span>
            </div>
          )}
          {recordedBlob && !isRecording && (
            <button onClick={downloadRecording}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-sm text-green-300 border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 transition-all">
              <Download className="w-4 h-4" /> Download Recording
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-[#0C1424] border-r border-white/10 flex flex-col overflow-y-auto p-3 gap-3">

          <SideSection title="Script">
            <SideBtn active={isEditing} onClick={() => setIsEditing(e => !e)}>
              {isEditing ? <><Check className="w-3.5 h-3.5" /> Done Editing</> : <><Type className="w-3.5 h-3.5" /> Edit Script</>}
            </SideBtn>
            <SideBtn onClick={resetScroll}><RotateCcw className="w-3.5 h-3.5" /> Reset Position</SideBtn>
          </SideSection>

          <SideSection title="Display">
            <SliderRow label={`Font: ${fontSize}px`} min={18} max={80} value={fontSize} onChange={setFontSize} />
            <SliderRow label={`Speed: ${speed.toFixed(1)}×`} min={0.3} max={6} step={0.1} value={speed} onChange={setSpeed} />
            <SideBtn active={mirrored} onClick={() => setMirrored(m => !m)}>
              <FlipHorizontal className="w-3.5 h-3.5" /> Mirror Text
            </SideBtn>
          </SideSection>

          <SideSection title="Webcam">
            <SideBtn active={webcamOn} onClick={toggleWebcam} accent="teal">
              {webcamOn ? <><Video className="w-3.5 h-3.5" /> Cam On</> : <><VideoOff className="w-3.5 h-3.5" /> Cam Off</>}
            </SideBtn>
            {webcamOn && (
              <>
                <SideBtn onClick={() => setWebcamCorner(c => CORNERS[(CORNERS.indexOf(c) + 1) % 4])}>
                  <Circle className="w-3 h-3" /> {CORNER_LABELS[webcamCorner]}
                </SideBtn>
                <SideBtn active={micOn} onClick={() => setMicOn(m => !m)} accent="blue">
                  {micOn ? <><Mic className="w-3.5 h-3.5" /> Mic On</> : <><MicOff className="w-3.5 h-3.5" /> Mic Off</>}
                </SideBtn>
              </>
            )}
          </SideSection>

          <SideSection title="Record">
            {!isRecording ? (
              <div className="space-y-2">
                <button onClick={() => startRecording('full')}
                  className="w-full py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={gradBtn('#6A5CFF', '#4F78FF')}>
                  <Monitor className="w-4 h-4" /> Full Screen
                </button>
                <button onClick={() => { setIsSelectingRegion(true); setRegionRect(null); }}
                  className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 ${currentRegion ? 'text-white' : 'bg-white/10 text-gray-300 hover:bg-white/15'}`}
                  style={currentRegion ? gradBtn('#0EA5E9', '#06B6D4') : {}}>
                  <Crop className="w-4 h-4" />{currentRegion ? 'Region Selected ✓' : 'Select Region'}
                </button>
                {currentRegion && (
                  <>
                    <button onClick={() => startRecording('segment')}
                      className="w-full py-2 rounded-xl text-xs font-bold text-cyan-300 border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all">
                      Start Segment Recording
                    </button>
                    <button onClick={() => setCurrentRegion(null)}
                      className="w-full py-1.5 rounded-xl text-[11px] font-bold text-gray-500 hover:text-gray-300 transition-all">
                      <X className="w-3 h-3 inline mr-1" />Clear Region
                    </button>
                  </>
                )}
                <button onClick={() => startRecording('freehand')}
                  className="w-full py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={gradBtn('#EC4899', '#F43F5E')}>
                  <Pen className="w-4 h-4" /> Freehand + Draw
                </button>
              </div>
            ) : (
              <button onClick={stopRecording}
                className="w-full py-2.5 rounded-xl text-sm font-bold bg-red-500 hover:bg-red-400 text-white flex items-center justify-center gap-2 transition-all">
                <Square className="w-4 h-4 fill-white" /> Stop Recording
              </button>
            )}
          </SideSection>

          {isRecording && recordMode === 'freehand' && (
            <SideSection title="Draw Tools">
              <div className="flex gap-1.5 flex-wrap mb-2">
                {['#ef4444','#f97316','#22c55e','#3b82f6','#a855f7','#ffffff'].map(c => (
                  <button key={c} onClick={() => setDrawColor(c)}
                    className="w-7 h-7 rounded-full flex-shrink-0 transition-all"
                    style={{ background: c, border: drawColor === c ? '2.5px solid #fff' : '2px solid transparent', transform: drawColor === c ? 'scale(1.15)' : 'scale(1)' }} />
                ))}
              </div>
              <SliderRow label={`Brush: ${drawSize}px`} min={2} max={24} value={drawSize} onChange={setDrawSize} />
              <SideBtn onClick={clearDrawing}><Trash2 className="w-3.5 h-3.5" /> Clear Annotations</SideBtn>
            </SideSection>
          )}
        </aside>

        {/* Main teleprompter area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <div ref={teleprompterRef} className="flex-1 overflow-y-scroll relative"
            style={{ scrollbarWidth: 'none', background: 'linear-gradient(180deg,#080E1D 0%,#0A1228 100%)' }}>
            <div className="max-w-4xl mx-auto px-10 pt-10 pb-32">
              {isEditing ? (
                <textarea value={script} onChange={e => setScript(e.target.value)}
                  className="w-full bg-transparent text-white resize-none outline-none font-semibold leading-loose"
                  style={{ fontSize, minHeight: '60vh', caretColor: '#6A5CFF' }}
                  placeholder="Type your script here…" />
              ) : (
                <div className="text-white font-semibold leading-loose select-none"
                  style={{ fontSize, transform: mirrored ? 'scaleX(-1)' : 'none', lineHeight: 1.7 }}>
                  {script.split('\n').map((line, i) => (
                    <p key={i} className={line.trim() === '' ? 'mb-5' : 'mb-1'}>{line || ' '}</p>
                  ))}
                  <div style={{ height: '40vh' }} />
                </div>
              )}
            </div>

            {isRecording && recordMode === 'freehand' && (
              <canvas ref={drawCanvasRef}
                width={compositeCanvasRef.current?.width || 1280}
                height={compositeCanvasRef.current?.height || 720}
                className="absolute inset-0 w-full h-full z-20"
                style={{ cursor: 'crosshair', touchAction: 'none' }}
                onMouseDown={onDrawStart} onMouseMove={onDrawMove}
                onMouseUp={onDrawEnd} onMouseLeave={onDrawEnd} />
            )}
          </div>

          {!isEditing && (
            <div className="absolute left-0 right-0 pointer-events-none" style={{ top: '38%', zIndex: 5 }}>
              <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(106,92,255,0.4),transparent)' }} />
            </div>
          )}

          <video ref={webcamVideoRef} muted autoPlay playsInline
            className={`absolute rounded-2xl object-cover shadow-2xl transition-all z-10 ${webcamOn ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${cornerClass[webcamCorner]}`}
            style={{ width: 168, height: 126, border: '2px solid rgba(255,255,255,0.2)' }} />

          {/* Controls bar */}
          <div className="flex-shrink-0 px-6 py-4 bg-[#0C1424]/95 backdrop-blur border-t border-white/10 flex items-center justify-center gap-3">
            <button onClick={resetScroll} title="Reset" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 transition-all">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button onClick={() => setSpeed(s => Math.max(0.3, parseFloat((s - 0.5).toFixed(1))))}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 transition-all">
              <ChevronDown className="w-5 h-5" />
            </button>
            <button onClick={() => { if (!isEditing) setIsScrolling(s => !s); }} disabled={isEditing}
              className={`px-10 py-3 rounded-full font-extrabold text-[15px] flex items-center gap-2.5 transition-all ${isScrolling ? 'bg-amber-500 hover:bg-amber-400 text-white' : 'text-white hover:opacity-90'} ${isEditing ? 'opacity-40 cursor-not-allowed' : ''}`}
              style={!isScrolling && !isEditing ? gradBtn('#6A5CFF', '#18B6FF') : {}}>
              {isScrolling ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Play</>}
            </button>
            <button onClick={() => setSpeed(s => Math.min(6, parseFloat((s + 0.5).toFixed(1))))}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 transition-all">
              <ChevronUp className="w-5 h-5" />
            </button>
            <span className="text-gray-500 text-sm font-bold w-10 text-center">{speed.toFixed(1)}×</span>
          </div>
        </main>
      </div>
    </div>
  );
};

function SideSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-3 border border-white/8 space-y-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{title}</p>
      {children}
    </div>
  );
}

function SideBtn({ children, onClick, active = false, accent = 'violet' }: {
  children: React.ReactNode; onClick: () => void; active?: boolean; accent?: 'violet' | 'teal' | 'blue';
}) {
  const styles: Record<string, string> = {
    violet: 'bg-violet-500/25 text-violet-300 border border-violet-500/40',
    teal: 'bg-teal-500/25 text-teal-300 border border-teal-500/40',
    blue: 'bg-blue-500/25 text-blue-300 border border-blue-500/40',
  };
  return (
    <button onClick={onClick}
      className={`w-full py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${active ? styles[accent] : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
      {children}
    </button>
  );
}

function SliderRow({ label, min, max, step = 1, value, onChange }: {
  label: string; min: number; max: number; step?: number; value: number; onChange: (v: number) => void;
}) {
  return (
    <div>
      <p className="text-[11px] text-gray-500 mb-1">{label}</p>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ accentColor: '#6A5CFF' }} />
    </div>
  );
}
