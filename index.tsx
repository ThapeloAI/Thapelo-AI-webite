
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles,
  Search,
  Globe,
  Smartphone,
  GraduationCap,
  Briefcase,
  Code,
  Phone,
  Zap,
  Filter,
  Type
} from 'lucide-react';
import { ASSETS, PILLARS, PROJECTS, TECH_STACK } from './constants';
import { Project, Tool } from './types';
import { TeleprompterApp } from './Teleprompter';

const Header = ({ activePage, setActivePage }: { activePage: string, setActivePage: (p: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Projects', 'Tech Stack', 'About', 'Contact', 'Teleprompter'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-header shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActivePage('Home')}>
          <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition-all overflow-hidden">
            <img src={ASSETS.logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] font-bold text-[#6A5CFF] block leading-none uppercase tracking-tighter">Global AI Media</span>
            <span className="text-[16px] font-extrabold text-[#0A2533] leading-tight">Thapelo AI</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.filter(i => i !== 'Teleprompter').map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={`text-[14px] font-bold transition-colors ${activePage === item ? 'text-[#6A5CFF]' : 'text-[#0A2533] hover:text-[#18B6FF]'}`}
            >
              {item}
            </button>
          ))}
          <div className="h-6 w-[1px] bg-gray-200"></div>
          <button
            onClick={() => setActivePage('Teleprompter')}
            className={`px-4 py-2 text-[13px] font-bold rounded-full border transition-all flex items-center gap-2 ${activePage === 'Teleprompter' ? 'bg-violet-600 text-white border-violet-600' : 'border-violet-200 text-violet-700 hover:bg-violet-50'}`}
          >
            <Type className="w-3.5 h-3.5" /> Teleprompter
          </button>
          <button 
            onClick={() => setActivePage('Contact')}
            className="px-6 py-2.5 accent-gradient-bg text-white text-[13px] font-bold rounded-full hover:shadow-xl transition-all"
          >
            Start Strategic Partnership
          </button>
        </nav>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl p-6 border-t animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => { setActivePage(item); setMobileMenuOpen(false); }}
                className={`text-[18px] font-semibold text-left ${activePage === item ? 'text-[#6A5CFF]' : 'text-[#0A2533]'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const ContactInfoCard = () => (
  <div className="bg-white p-10 md:p-14 rounded-[40px] border border-gray-100 shadow-2xl shadow-indigo-100/40 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-80 h-80 accent-gradient-bg opacity-5 rounded-full -translate-x-12 -translate-y-12"></div>
    <div className="relative z-10">
      <h3 className="text-3xl font-extrabold text-[#0A2533] mb-6">Explore Strategic Partnership</h3>
      <p className="text-gray-500 mb-12 max-w-xl text-lg leading-relaxed">
        I am currently seeking collaborations with AI product labs, impact-focused tech partners, and innovation incubators. Let's merge technology with global business strategy.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="flex items-center gap-5 group">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#6A5CFF] group-hover:bg-[#6A5CFF] group-hover:text-white transition-all shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">AI Content</p>
              <a href="mailto:thapelo@globalaicontent.co.uk" className="text-[15px] font-bold text-[#0A2533] hover:text-[#6A5CFF] transition-colors">thapelo@globalaicontent.co.uk</a>
            </div>
          </div>
          
          <div className="flex items-center gap-5 group">
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-[#00C7D4] group-hover:bg-[#00C7D4] group-hover:text-white transition-all shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Media Media</p>
              <a href="mailto:thapelo@globalmediacontent.co.uk" className="text-[15px] font-bold text-[#0A2533] hover:text-[#00C7D4] transition-colors">thapelo@globalmediacontent.co.uk</a>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-5 group">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#18B6FF] group-hover:bg-[#18B6FF] group-hover:text-white transition-all shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Personal</p>
              <a href="mailto:thapelomoloantoa@yahoo.com" className="text-[15px] font-bold text-[#0A2533] hover:text-[#18B6FF] transition-colors">thapelomoloantoa@yahoo.com</a>
            </div>
          </div>

          <div className="flex items-center gap-5 group">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-[#6A5CFF] group-hover:bg-[#6A5CFF] group-hover:text-white transition-all shadow-sm">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Direct Dial</p>
              <a href="tel:+447365447103" className="text-[15px] font-bold text-[#0A2533] hover:text-[#6A5CFF] transition-colors">+44 7365 447103</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Hero = ({ onExplore }: { onExplore: () => void }) => (
  <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white min-h-[85vh] flex items-center">
    <div className="absolute top-0 right-0 w-[55%] h-full opacity-10 pointer-events-none">
      <img src={ASSETS.heroBanner} alt="AI Neural Background" className="w-full h-full object-cover rounded-bl-[240px]" />
    </div>
    <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
      <div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-[#6A5CFF] text-[11px] font-bold mb-8 border border-indigo-100">
          <GraduationCap className="w-4 h-4" />
          <span>MSc Global Business Management @ Roehampton London</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#0A2533] leading-[1.05] mb-8">
          AI Engineering <br />
          <span className="accent-gradient-text">Meets Product Innovation.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-xl leading-relaxed font-medium">
          I am Thapelo AI: an experienced Digital Marketing professional transitioning into <strong>AI-driven Software Engineering</strong>. An AI Product Specialist focused on Web and Native App development.
        </p>
        <div className="flex flex-wrap gap-5">
          <button 
            onClick={onExplore}
            className="px-10 py-4.5 accent-gradient-bg text-white font-bold rounded-full hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center gap-3 text-lg"
          >
            Engineering Portfolio <ChevronRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => window.scrollTo({ top: document.getElementById('partnership')?.offsetTop, behavior: 'smooth' })}
            className="px-10 py-4.5 border-2 border-gray-100 bg-white text-[#0A2533] font-bold rounded-full hover:bg-gray-50 hover:border-indigo-200 transition-all text-lg shadow-sm"
          >
            Start Partnership
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-600 rounded-[48px] blur-[80px] opacity-15"></div>
          <div className="w-full aspect-[1.5/1] bg-white p-3 rounded-[52px] shadow-2xl border border-gray-100 relative overflow-hidden">
             <img 
               src={ASSETS.heroBanner} 
               alt="AI Tech Preview" 
               className="w-full h-full object-cover rounded-[44px]"
             />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shadow-inner">
              <Code className="w-7 h-7 text-[#6A5CFF]" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Multi-Disciplinary</p>
              <p className="text-[17px] font-extrabold text-[#0A2533]">Web • Native • Auto</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group block bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-indigo-100/60 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
    <div className="relative aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
      <img 
        src={project.thumbnail} 
        alt={project.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute top-5 right-5 z-10">
        <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest ${project.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {project.status}
        </span>
      </div>
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-[#0A2533] p-5 rounded-full shadow-2xl hover:scale-110 transition-transform"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-7 h-7" />
        </a>
      </div>
    </div>
    <div className="p-8">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xl font-extrabold text-[#0A2533] group-hover:text-[#6A5CFF] transition-colors truncate">
          {project.title}
        </h4>
        <span className="text-sm font-bold text-gray-300">{project.year}</span>
      </div>
      <div className="flex flex-wrap gap-2.5 mt-5">
        {project.tags.slice(0, 3).map((tag, i) => (
          <span key={i} className="px-4 py-1.5 bg-[#F4F6F8] text-[#0A2533] text-[11px] font-extrabold rounded-full group-hover:bg-indigo-50 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const TechStackCard: React.FC<{ tool: Tool }> = ({ tool }) => (
  <div className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all p-8 flex flex-col h-full">
    <div className="flex items-start justify-between mb-8">
      <div className="w-16 h-16 bg-[#F4F6F8] rounded-2xl flex items-center justify-center p-3.5 border border-gray-100 group-hover:bg-indigo-50 transition-all shadow-sm">
         <img src={ASSETS.logo} alt={tool.name} className="w-full h-full object-contain" />
      </div>
      <span className="px-4 py-1.5 bg-indigo-50 text-[#6A5CFF] text-[11px] font-extrabold uppercase rounded-full tracking-widest">{tool.category}</span>
    </div>
    <h3 className="text-xl font-extrabold text-[#0A2533] mb-4">{tool.name}</h3>
    <p className="text-gray-500 mb-6 flex-grow leading-relaxed text-sm">{tool.description}</p>
    <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-50 mb-8">
      <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
        <Zap className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800]" /> Use Case
      </p>
      <p className="text-sm text-[#0A2533] font-bold leading-relaxed italic">"{tool.useCase}"</p>
    </div>
    <div className="flex flex-wrap gap-2">
      {tool.tags.map((tag, i) => (
        <span key={i} className="text-[10px] font-bold text-gray-400 border border-gray-100 px-3 py-1 rounded-full uppercase tracking-tight">{tag}</span>
      ))}
    </div>
  </div>
);

const TechStackPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = useMemo(() => {
    const cats = new Set(TECH_STACK.map(t => t.category));
    return ['All', ...Array.from(cats)].sort();
  }, []);

  const filteredTools = useMemo(() => {
    if (activeCategory === 'All') return TECH_STACK;
    return TECH_STACK.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-24 bg-custom-gradient min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#0A2533] mb-8">Strategic Tech Stack</h1>
            <p className="text-gray-500 text-xl max-w-3xl leading-relaxed mx-auto md:mx-0">
              A high-performance ecosystem of 60+ licensed AI software and development tools I actively leverage to build impact-driven software products.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${activeCategory === cat ? 'accent-gradient-bg text-white border-transparent' : 'bg-white text-[#0A2533] border-gray-100 hover:border-indigo-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredTools.map(tool => (
            <TechStackCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section className="py-24 bg-white relative overflow-hidden">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-24 items-center">
        <div className="relative group">
           <div className="absolute inset-0 bg-teal-500 rounded-[56px] blur-[100px] opacity-10"></div>
           <div className="w-full aspect-[4/5] rounded-[56px] shadow-2xl relative z-10 border-8 border-white overflow-hidden bg-gray-100">
             <img 
               src={ASSETS.footerBanner} 
               alt="About Background" 
               className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
             />
           </div>
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2533] mb-10 leading-tight">
            Strategic Thinking <br />
            Meets Modern Build.
          </h2>
          <div className="space-y-8 text-xl text-gray-600 leading-relaxed">
            <p>
              I am Thapelo Moloantoa, currently pursuing an <strong>MSc in Global Business Management (with Digital Marketing)</strong> at the <strong>University of Roehampton London</strong>. 
            </p>
            <p>
              My transition into **AI-driven Software Engineering** is fueled by two decades of excellence in strategic digital communications. I approach product development from a commercial, content-first perspective.
            </p>
            <div className="bg-indigo-50/70 p-8 rounded-[32px] border border-indigo-100 shadow-sm">
               <div className="flex items-center gap-3 mb-4">
                 <Sparkles className="w-6 h-6 text-[#6A5CFF]" />
                 <p className="text-sm font-extrabold text-[#6A5CFF] uppercase tracking-widest">Loomspark Highlight</p>
               </div>
               <p className="text-[17px] text-[#0A2533] leading-relaxed font-bold">
                 Collaborated on the Prompt Engineering Lab for Loomspark's <strong>Story Synthesiser</strong>—integrating local, open-source LLMs to generate structured data for the Million Stories Project.
               </p>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-10 p-10 bg-[#F8FAFC] rounded-[40px] border border-gray-50">
            <div>
              <p className="text-4xl font-extrabold text-[#6A5CFF] mb-2">MSc</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Roehampton London</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-[#00C7D4] mb-2">21+</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Deployments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer-gradient pt-24 pb-14 text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
       <img src={ASSETS.footerBanner} alt="Footer BG" className="w-full h-full object-cover" />
    </div>
    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
      <div className="flex flex-col items-center text-center mb-24">
        <p className="text-indigo-300 font-bold uppercase tracking-widest mb-6">Connect for Strategic Projects</p>
        <a 
          href="mailto:thapelo@globalaicontent.co.uk" 
          className="text-3xl md:text-6xl font-extrabold hover:text-[#18B6FF] transition-all break-all leading-none group flex items-center gap-6"
        >
          Let's Build a Partnership
          <ArrowRight className="w-10 h-10 md:w-16 md:h-16 opacity-0 group-hover:opacity-100 transition-all translate-x-[-20px] group-hover:translate-x-0" />
        </a>
      </div>

      <div className="grid md:grid-cols-4 gap-16 pt-16 border-t border-white/10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-14 h-14 bg-white rounded-2xl p-2.5 shadow-xl">
               <img src={ASSETS.logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
               <p className="font-extrabold text-2xl">Thapelo AI</p>
               <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest">Global AI Media</p>
            </div>
          </div>
          <p className="text-indigo-100/60 max-w-sm leading-relaxed font-medium">
            AI Product Specialist | Software Engineer in the making. <br />
            MSc Global Business Management Candidate @ Roehampton London.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-xl mb-8">Navigation</h4>
          <ul className="space-y-5 text-indigo-100/40 font-bold text-sm">
            <li><button className="hover:text-white transition-colors uppercase tracking-wider">Engineering Grid</button></li>
            <li><button className="hover:text-white transition-colors uppercase tracking-wider">Tech Stack ecosystem</button></li>
            <li><button className="hover:text-white transition-colors uppercase tracking-wider">Partnership Card</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xl mb-8">Connect</h4>
          <ul className="space-y-5 text-indigo-100/40 font-bold text-sm">
            <li><a href="#" className="flex items-center gap-3 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /> LinkedIn</a></li>
            <li><a href="#" className="flex items-center gap-3 hover:text-white transition-colors"><Github className="w-5 h-5" /> GitHub</a></li>
            <li><a href="#" className="flex items-center gap-3 hover:text-white transition-colors"><Globe className="w-5 h-5" /> Global AI Media</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-indigo-100/20 text-[11px] font-extrabold uppercase tracking-[0.2em]">
        <p>© 2026 Thapelo AI | Global AI Media</p>
        <p>University of Roehampton London MSc</p>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [activePage, setActivePage] = useState('Home');

  useEffect(() => {
    if (activePage !== 'Teleprompter') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  if (activePage === 'Teleprompter') {
    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setActivePage('Home')}
          style={{ position: 'fixed', top: 12, left: 12, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
        >
          <X style={{ width: 14, height: 14 }} /> Exit Studio
        </button>
        <TeleprompterApp />
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <Header activePage={activePage} setActivePage={setActivePage} />
      
      {activePage === 'Home' && (
        <main className="animate-in fade-in duration-700">
          <Hero onExplore={() => setActivePage('Projects')} />
          <section className="py-24 bg-custom-gradient border-y border-gray-100">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-4xl font-extrabold text-[#0A2533] mb-6">Core Capabilities</h2>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                  Merging two decades of digital strategy with modern AI engineering build cycles.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PILLARS.map((pillar, i) => (
                  <div key={i} className="p-10 rounded-[40px] bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-2xl transition-all group">
                    <div className="mb-8 p-5 bg-[#F4F6F8] rounded-2xl inline-block group-hover:bg-indigo-50 transition-all shadow-sm">
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl font-extrabold text-[#0A2533] mb-5">{pillar.title}</h3>
                    <p className="text-gray-500 leading-relaxed font-medium">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-28" id="highlights">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="flex items-end justify-between mb-16">
                <div>
                  <h2 className="text-4xl font-extrabold text-[#0A2533] mb-3">Build Highlights</h2>
                  <p className="text-gray-400 text-lg">Engineering range across the product lifecycle.</p>
                </div>
                <button 
                  onClick={() => setActivePage('Projects')}
                  className="text-[#6A5CFF] font-extrabold text-sm flex items-center gap-2 group border-b-2 border-transparent hover:border-[#6A5CFF] transition-all pb-1"
                >
                  Full Portfolio <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-10">
                {PROJECTS.slice(0, 3).map(p => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          </section>

          <About />
          
          <section className="py-28 bg-white" id="partnership">
            <div className="max-w-[1100px] mx-auto px-6">
              <ContactInfoCard />
            </div>
          </section>
        </main>
      )}

      {activePage === 'Projects' && (
        <main className="animate-in slide-in-from-bottom-8 duration-700">
          <div className="pt-40 pb-28 bg-custom-gradient min-h-screen">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="mb-20 text-center md:text-left">
                <h2 className="text-4xl md:text-6xl font-extrabold text-[#0A2533] mb-6">Engineering Portfolio</h2>
                <p className="text-gray-500 text-xl max-w-2xl">A curated archive of 21 live builds and active technical prototypes.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {PROJECTS.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {activePage === 'Tech Stack' && (
        <main className="animate-in slide-in-from-bottom-8 duration-700 pt-32">
          <TechStackPage />
        </main>
      )}

      {activePage === 'About' && (
        <main className="animate-in fade-in duration-700 pt-32">
          <About />
        </main>
      )}

      {activePage === 'Contact' && (
        <main className="animate-in fade-in duration-700 pt-40 pb-32">
          <div className="max-w-[1100px] mx-auto px-6">
             <ContactInfoCard />
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
