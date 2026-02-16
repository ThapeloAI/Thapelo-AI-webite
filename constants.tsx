
import React from 'react';
import { Project, Pillar, Tool } from './types';
import { Cpu, Film, Layers, Zap, Globe, MessageSquare, Bot, Smartphone, Briefcase, Code, GraduationCap } from 'lucide-react';

export const ASSETS = {
  logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHJ4PSI4IiBmaWxsPSIjNkE1Q0ZGIi8+PHBhdGggZD0iTTI1IDExQzE3LjI2OCAxMSAxMSAxNy4yNjggMTEgMjVDMTEgMzIuNzMyIDE3LjI2OCAzOSAyNSAzOUMzMi43MzIgMzkgMzkgMzIuNzMyIDM5IDI1QzM5IDE3LjI2OCAzMi43MzIgMTEgMjUgMTFaTTI1IDM1QzE5LjQ3NyAzNSAxNSAzMC41MjMgMTUgMjVDMTUgMTkuNDc3IDE5LjQ3NyAxNSAyNSAxNUMzMC41MjMgMTUgMzUgMTkuNDc3IDM1IDI1QzM1IDMwLjUyMyAzMC41MjMgMzUgMjUgMzVaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0yNSAxOUMyMS42ODYgMTkgMTkgMjEuNjg2IDE5IDI1QzE5IDI4LjMxNCAyMS42ODYgMzEgMjUgMzFDMjguMzE0IDMxIDMxIDI4LjMxNCAzMSAyNUMzMSAyMS42ODYgMjguMzE0IDE5IDI1IDE5WiIgZmlsbD0iIzhCRkZGRiIvPjwvc3ZnPg==',
  heroBanner: 'https://prod.us-west1.run.app/api/v1/content/media/9cc7e411-7667-4886-9694-1188f61ca6ea.png',
  footerBanner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920',
  placeholder: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
};

export const PILLARS: Pillar[] = [
  {
    title: 'AI Automation & Web',
    description: 'Engineering intelligent web ecosystems and agentic workflows that transform complex manual tasks into autonomous execution pipelines.',
    icon: <Cpu className="w-8 h-8 text-[#18B6FF]" />
  },
  {
    title: 'AI Product Strategy',
    description: 'Bridging technical code with global market utility, backed by an MSc in Global Business Management @ Roehampton London.',
    icon: <Briefcase className="w-8 h-8 text-[#6A5CFF]" />
  },
  {
    title: 'Media Intelligence',
    description: 'Harnessing AI for video-to-voice synthesis and strategic content repurposing with 20+ years of digital marketing expertise.',
    icon: <Film className="w-8 h-8 text-[#00C7D4]" />
  },
  {
    title: 'Native App Dev',
    description: 'An AI-driven enthusiast building high-performance iOS and Android applications for seamless on-device intelligence.',
    icon: <Smartphone className="w-8 h-8 text-[#4F78FF]" />
  }
];

const getThumb = (url: string) => `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=600`;

export const PROJECTS: Project[] = [
  {
    id: 'loomspark-highlight',
    title: 'Loomspark: Story Synthesiser',
    url: 'https://loomspark.com',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    year: '2025',
    tags: ['Prompt Engineering', 'LLM', 'Agile'],
    status: 'Live',
    category: 'Automation'
  },
  {
    id: 'p4',
    title: 'HighlightPro Native App',
    url: 'https://highlightpro-football-715101838018.us-west1.run.app',
    thumbnail: getThumb('https://highlightpro-football-715101838018.us-west1.run.app'),
    year: '2026',
    tags: ['Mobile', 'Sports AI'],
    status: 'Live',
    category: 'Mobile'
  },
  {
    id: 'p3',
    title: 'MediaMind Intelligence',
    url: 'https://media-mind-automation.lovable.app',
    thumbnail: getThumb('https://media-mind-automation.lovable.app'),
    year: '2026',
    tags: ['Automation', 'Media'],
    status: 'Live',
    category: 'Automation'
  },
  {
    id: 'p21',
    title: 'Bolt Deployment Portal',
    url: 'https://bolt.new',
    thumbnail: getThumb('https://bolt.new'),
    year: '2026',
    tags: ['DevOps', 'Cloud'],
    status: 'Live',
    category: 'Automation'
  }
];

export const TECH_STACK: Tool[] = [
  // --- AI WRITING & CONTENT ---
  { id: 't1', name: 'youbooks', url: '#', description: 'Personalized AI book generation and long-form content structuring.', useCase: 'Automating the drafting of technical whitepapers and educational ebooks.', category: 'AI Writing', tags: ['AI', 'Content'], thumbnail: ASSETS.logo },
  { id: 't2', name: 'HelloScribe', url: '#', description: 'AI writing assistant for creative professionals and marketing agencies.', useCase: 'Generating strategic campaign copy and media briefs.', category: 'AI Writing', tags: ['Marketing', 'NLP'], thumbnail: ASSETS.logo },
  { id: 't3', name: 'Rytr', url: '#', description: 'Powerful AI-powered writing tool for high-quality content generation.', useCase: 'Fast prototyping of blog content and social captions.', category: 'AI Writing', tags: ['AI', 'Copywriting'], thumbnail: ASSETS.logo },
  { id: 't4', name: 'Letterly', url: '#', description: 'Voice-to-text AI that turns casual notes into professional writing.', useCase: 'Transcribing verbal project requirements into technical specs.', category: 'AI Writing', tags: ['Voice', 'AI'], thumbnail: ASSETS.logo },
  { id: 't5', name: 'Speechactors', url: '#', description: 'AI text-to-speech engine with highly realistic human-like voices.', useCase: 'Creating voiceovers for media content and app walkthroughs.', category: 'AI Writing', tags: ['TTS', 'Audio'], thumbnail: ASSETS.logo },
  { id: 't6', name: 'Flipner AI', url: '#', description: 'AI-driven tool for turning raw ideas into structured text.', useCase: 'Brainstorming session summarization and product ideation.', category: 'AI Writing', tags: ['Ideation', 'AI'], thumbnail: ASSETS.logo },

  // --- VIDEO EDITING & MEDIA ---
  { id: 'v1', name: 'JoggAI', url: '#', description: 'AI video creation tool for converting scripts into dynamic visuals.', useCase: 'Primary engine for Global AI Media video repurposing.', category: 'Video Editing', tags: ['Video', 'AI'], thumbnail: ASSETS.logo },
  { id: 'v2', name: 'Mootion', url: '#', description: 'AI animation and 3D modeling tool for motion graphics.', useCase: 'Building interactive 3D assets for native app interfaces.', category: 'Video Editing', tags: ['3D', 'Animation'], thumbnail: ASSETS.logo },
  { id: 'v3', name: 'Gumlet Video', url: '#', description: 'High-speed video hosting and optimization infrastructure.', useCase: 'Delivering low-latency video feeds for HighlightPro.', category: 'Video Editing', tags: ['Infrastructure', 'Streaming'], thumbnail: ASSETS.logo },
  { id: 'v4', name: 'Wisecut', url: '#', description: 'AI video editor that uses voice recognition to cut long videos.', useCase: 'Automatically extracting highlights from raw interview footage.', category: 'Video Editing', tags: ['AI', 'Shorts'], thumbnail: ASSETS.logo },
  { id: 'v5', name: 'Lumen5', url: '#', description: 'Social media video creation platform using AI to match text with video.', useCase: 'Rapidly converting blog posts into video summaries.', category: 'Video Editing', tags: ['Social', 'Video'], thumbnail: ASSETS.logo },
  { id: 'v6', name: 'Nova A.I.', url: '#', description: 'Comprehensive AI video platform for subtitling and content analysis.', useCase: 'Globalizing media with automated multilingual subtitles.', category: 'Video Editing', tags: ['Subtitles', 'Global'], thumbnail: ASSETS.logo },
  { id: 'v7', name: 'Spiritme', url: '#', description: 'AI avatar video generation with high-fidelity lip-syncing.', useCase: 'Creating digital spokesperson videos for project tutorials.', category: 'Video Editing', tags: ['Avatar', 'AI'], thumbnail: ASSETS.logo },
  { id: 'v8', name: 'FlexClip', url: '#', description: 'User-friendly online video maker for business and marketing.', useCase: 'Quick social media snippets and promo reels.', category: 'Video Editing', tags: ['Marketing', 'Video'], thumbnail: ASSETS.logo },

  // --- AUTOMATION & NO-CODE ---
  { id: 'a1', name: 'Greta', url: '#', description: 'AI-orchestration for interactive narratives and game behavior.', useCase: 'Designing agentic behaviors for technical prototypes.', category: 'Automation', tags: ['Agents', 'GameDev'], thumbnail: ASSETS.logo },
  { id: 'a2', name: 'Lindo Ai', url: '#', description: 'AI-powered website builder for launching business sites in seconds.', useCase: 'Deploying high-performance landing pages for sub-brands.', category: 'Automation', tags: ['No-Code', 'SaaS'], thumbnail: ASSETS.logo },
  { id: 'a3', name: 'OpnForm', url: '#', description: 'Open-source form builder with AI-enhanced data capture.', useCase: 'Structuring intelligent user input for LLM pipelines.', category: 'Automation', tags: ['Forms', 'Data'], thumbnail: ASSETS.logo },
  { id: 'a4', name: 'Vzy', url: '#', description: 'AI-powered mobile website builder with native app-like UX.', useCase: 'Prototyping mobile-first digital experiences.', category: 'Automation', tags: ['Mobile', 'No-Code'], thumbnail: ASSETS.logo },
  { id: 'a5', name: 'Kepla', url: '#', description: 'Low-code platform for building custom business applications.', useCase: 'Bridging internal business logic with external AI services.', category: 'Automation', tags: ['Low-Code', 'Enterprise'], thumbnail: ASSETS.logo },
  { id: 'a6', name: 'ScreenRun', url: '#', description: 'Automation tool for creating engaging screen recordings and demos.', useCase: 'Showcasing technical build walkthroughs.', category: 'Automation', tags: ['Demo', 'Video'], thumbnail: ASSETS.logo },

  // --- MARKETING & SOCIAL ---
  { id: 'm1', name: 'Baseline', url: '#', description: 'AI design platform for maintaining absolute brand consistency.', useCase: 'Maintaining the Global AI Media visual identity system.', category: 'Marketing', tags: ['Design', 'AI'], thumbnail: ASSETS.logo },
  { id: 'm2', name: 'Followr', url: '#', description: 'AI social media management and automation suite.', useCase: 'Scheduling and optimizing distribution for media products.', category: 'Marketing', tags: ['Social', 'Automation'], thumbnail: ASSETS.logo },
  { id: 'm3', name: 'BrandBay', url: '#', description: 'Centralized brand asset management for digital agencies.', useCase: 'Managing multi-product media assets and logos.', category: 'Marketing', tags: ['Branding', 'Assets'], thumbnail: ASSETS.logo },
  { id: 'm4', name: 'Taja', url: '#', description: 'AI YouTube optimization tool for titles, descriptions, and SEO.', useCase: 'Optimizing Global AI Media YouTube presence.', category: 'Marketing', tags: ['SEO', 'YouTube'], thumbnail: ASSETS.logo },
  { id: 'm5', name: 'Postly', url: '#', description: 'Unified social media scheduler with AI copy generation.', useCase: 'Multichannel campaign orchestration.', category: 'Marketing', tags: ['Social', 'Marketing'], thumbnail: ASSETS.logo },

  // --- PRODUCTIVITY & DEV TOOLS ---
  { id: 'd1', name: 'Skillplate', url: '#', description: 'Technical skill mapping and interactive professional resumes.', useCase: 'Defining technical core competencies for build cycles.', category: 'Productivity', tags: ['Dev', 'Skills'], thumbnail: ASSETS.logo },
  { id: 'd2', name: 'Taskade', url: '#', description: 'AI-first collaborative workspace for task automation.', useCase: 'Primary project management hub for software dev.', category: 'Productivity', tags: ['Agile', 'AI'], thumbnail: ASSETS.logo },
  { id: 'd3', name: 'SuperOkay', url: '#', description: 'Client portal and brief management for digital agencies.', useCase: 'Managing strategic partnerships and technical scopes.', category: 'Productivity', tags: ['Client', 'Portal'], thumbnail: ASSETS.logo },
  { id: 'd4', name: 'Webvizio', url: '#', description: 'Visual feedback and collaboration tool for web projects.', useCase: 'Managing UI/UX feedback loops on live prototypes.', category: 'Productivity', tags: ['UX', 'Collaboration'], thumbnail: ASSETS.logo },
  { id: 'd5', name: 'TextSniper', url: '#', description: 'Mac OCR tool for instantly capturing non-selectable text.', useCase: 'Extracting technical data from video frames and PDFs.', category: 'Productivity', tags: ['OCR', 'Utility'], thumbnail: ASSETS.logo },
  { id: 'd6', name: 'OneSuite', url: '#', description: 'Integrated business suite for CRM and operations.', useCase: 'Centralizing technical agency operations.', category: 'Productivity', tags: ['Ops', 'SaaS'], thumbnail: ASSETS.logo },
  { id: 'd7', name: 'AirDeck', url: '#', description: 'Interactive slide presentations with embedded audio/video.', useCase: 'Pitching AI product roadmaps to strategic partners.', category: 'Productivity', tags: ['Pitching', 'Media'], thumbnail: ASSETS.logo },

  // --- CONTENT & MEDIA ASSETS ---
  { id: 'c1', name: 'Katalist Storytelling Studio', url: '#', description: 'AI platform for storyboard creation and narrative design.', useCase: 'Visualizing product logic before engineering starts.', category: 'Dev Tool', tags: ['Narrative', 'AI'], thumbnail: ASSETS.logo },
  { id: 'c2', name: 'VectorGrove', url: '#', description: 'Massive library of high-quality vector assets and illustrations.', useCase: 'Supplying SVG assets for web and native app UIs.', category: 'Marketing', tags: ['Design', 'SVG'], thumbnail: ASSETS.logo },
  { id: 'c3', name: 'Yay Images Startups', url: '#', description: 'Curated high-res imagery for modern digital products.', useCase: 'Sourcing editorial visuals for Global AI Media.', category: 'Marketing', tags: ['Stock', 'Visuals'], thumbnail: ASSETS.logo }
];
