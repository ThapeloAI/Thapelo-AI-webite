
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
  Globe,
  Smartphone,
  GraduationCap,
  Briefcase,
  Code,
  Phone,
  Zap,
  MapPin,
  TrendingUp,
  Layers,
  Target,
  MessageCircle,
  Star,
  Award,
  Clock,
} from 'lucide-react';
import { ASSETS, PILLARS, PROJECTS, TECH_STACK } from './constants';
import { Project, Tool } from './types';

// ─────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────
const Header = ({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: (p: string) => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const nav = ['Home', 'Projects', 'Tech Stack', 'About', 'Contact'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-header py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <button
          className="flex items-center gap-3 group"
          onClick={() => setActivePage('Home')}
        >
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-all">
            <img src={ASSETS.logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-[10px] font-bold text-[#6A5CFF] block leading-none uppercase tracking-wider">
              Global AI Media
            </span>
            <span className="text-[17px] font-extrabold text-[#0A2533] leading-tight">
              Thapelo AI
            </span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={`text-[13px] font-bold tracking-wide transition-colors ${
                activePage === item
                  ? 'text-[#6A5CFF]'
                  : 'text-[#0A2533] hover:text-[#6A5CFF]'
              }`}
            >
              {item}
            </button>
          ))}
          <div className="h-5 w-px bg-gray-200" />
          <button
            onClick={() => setActivePage('Contact')}
            className="px-6 py-2.5 accent-gradient-bg text-white text-[13px] font-bold rounded-full hover:shadow-lg hover:shadow-indigo-200/60 transition-all"
          >
            Partner With Me
          </button>
        </nav>

        <button
          className="md:hidden p-2 rounded-xl hover:bg-gray-50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl px-6 py-8">
          <div className="flex flex-col gap-6">
            {nav.map((item) => (
              <button
                key={item}
                onClick={() => { setActivePage(item); setMobileOpen(false); }}
                className={`text-[18px] font-bold text-left ${
                  activePage === item ? 'text-[#6A5CFF]' : 'text-[#0A2533]'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => { setActivePage('Contact'); setMobileOpen(false); }}
              className="px-6 py-3 accent-gradient-bg text-white font-bold rounded-full text-center"
            >
              Partner With Me
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
const Hero = ({
  onExplore,
  onContact,
}: {
  onExplore: () => void;
  onContact: () => void;
}) => (
  <section className="relative overflow-hidden bg-white min-h-screen flex flex-col pt-28">
    <div
      className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full pointer-events-none orb-1"
      style={{ background: 'radial-gradient(circle, rgba(106,92,255,0.07) 0%, transparent 70%)' }}
    />
    <div
      className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full pointer-events-none orb-2"
      style={{ background: 'radial-gradient(circle, rgba(0,199,212,0.05) 0%, transparent 70%)' }}
    />

    <div className="max-w-[1200px] mx-auto px-6 flex-grow flex items-center py-16 relative z-10 w-full">
      <div className="grid md:grid-cols-2 gap-16 items-center w-full">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-[11px] font-bold border border-green-100">
              <span className="w-2 h-2 bg-green-500 rounded-full status-dot" />
              Open to Partnerships
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-[#6A5CFF] text-[11px] font-bold border border-indigo-100">
              <MapPin className="w-3.5 h-3.5" />
              London, UK
            </div>
          </div>

          <h1 className="text-[52px] md:text-[76px] font-extrabold text-[#0A2533] leading-[1.02] mb-6 tracking-tight">
            AI Engineering<br />
            <span className="accent-gradient-text">Meets Product</span><br />
            Innovation.
          </h1>

          <p className="text-[18px] text-gray-500 mb-8 max-w-[500px] leading-relaxed font-medium">
            I am <strong className="text-[#0A2533]">Thapelo Moloantoa</strong> — two decades
            of digital strategy, now channelled into{' '}
            <strong className="text-[#0A2533]">AI-driven software engineering</strong> and
            global product development.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { val: '20+', sub: 'Yrs Strategy' },
              { val: '21+', sub: 'Deployments' },
              { val: '60+', sub: 'AI Tools' },
            ].map((s, i) => (
              <div key={i} className="px-5 py-3 bg-[#F4F6F8] rounded-2xl border border-gray-100">
                <p className="text-[17px] font-extrabold text-[#0A2533]">{s.val}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onExplore}
              className="px-8 py-4 accent-gradient-bg text-white font-bold rounded-full hover:shadow-xl hover:shadow-indigo-200/50 transition-all hover:-translate-y-0.5 flex items-center gap-3 text-[15px]"
            >
              View Portfolio <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onContact}
              className="px-8 py-4 border-2 border-gray-100 bg-white text-[#0A2533] font-bold rounded-full hover:bg-[#F4F6F8] hover:border-indigo-100 transition-all text-[15px]"
            >
              Start Partnership
            </button>
          </div>
        </div>

        <div className="hidden md:block relative">
          <div
            className="absolute inset-0 rounded-[56px] blur-[100px] opacity-20 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #6A5CFF, #00C7D4)' }}
          />
          <div className="relative w-full aspect-[4/5] rounded-[56px] overflow-hidden shadow-2xl border border-gray-100">
            <img
              src={ASSETS.heroBanner}
              alt="Thapelo Moloantoa"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(10,37,51,0.80) 0%, transparent 55%)' }}
            />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-4">
                <GraduationCap className="w-3.5 h-3.5 text-white/80" />
                <span className="text-white/80 text-[11px] font-bold">MSc · Roehampton London</span>
              </div>
              <p className="text-white text-2xl font-extrabold leading-tight">Thapelo Moloantoa</p>
              <p className="text-white/50 text-[13px] font-bold mt-1">AI Product Specialist & Engineer</p>
            </div>
          </div>
          <div className="absolute -top-5 -right-5 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 card-lift">
            <p className="text-3xl font-extrabold text-[#6A5CFF] mb-0.5">21+</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Builds</p>
          </div>
          <div className="absolute -bottom-5 -left-5 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 card-lift">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-green-400 rounded-full status-dot" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</p>
            </div>
            <p className="text-[13px] font-extrabold text-[#0A2533]">Building Live</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// SCROLLING TICKER
// ─────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  'AI Engineering', '21+ Live Deployments', 'Product Strategy',
  'Media Intelligence', 'Native App Dev', 'LLM Integration',
  'Prompt Engineering', 'GEO Specialist', 'MSc Roehampton London',
  'Agentic Workflows', '20+ Years Digital Strategy', 'Global AI Media',
  'African Business AI', 'Web Automation', 'Cloud Deployment',
];

const ScrollingTicker = () => (
  <div className="overflow-hidden py-4 border-y border-gray-100 bg-white">
    <div className="ticker-track gap-10">
      {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
        <span
          key={i}
          className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.15em] flex items-center gap-4 whitespace-nowrap"
        >
          {item}
          <span
            className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
            style={{ background: 'linear-gradient(90deg, #00C7D4, #6A5CFF)' }}
          />
        </span>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// CORE CAPABILITIES
// ─────────────────────────────────────────────────────────────
const CoreCapabilities = () => (
  <section className="py-28 bg-[#F8FAFC] border-b border-gray-100">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-20">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-[#6A5CFF] text-[11px] font-bold border border-indigo-100 mb-6">
          <Layers className="w-3.5 h-3.5" />
          Four Pillars of Practice
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2533] mb-5 leading-tight">
          Core Capabilities
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Merging two decades of global digital strategy with modern AI engineering build cycles.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PILLARS.map((pillar, i) => (
          <div
            key={i}
            className="p-10 rounded-[40px] bg-white border border-gray-100 hover:border-indigo-200 transition-all group card-lift"
          >
            <div className="mb-8 p-5 bg-[#F4F6F8] rounded-2xl inline-flex group-hover:bg-indigo-50 transition-all shadow-sm">
              {pillar.icon}
            </div>
            <h3 className="text-[18px] font-extrabold text-[#0A2533] mb-4 leading-tight">{pillar.title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm font-medium">{pillar.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// STATS BANNER (dark)
// ─────────────────────────────────────────────────────────────
const STATS = [
  { value: '20+', label: 'Years Digital Strategy', color: '#6A5CFF' },
  { value: '21+', label: 'Live AI Deployments',    color: '#00C7D4' },
  { value: '60+', label: 'AI Tools Mastered',      color: '#18B6FF' },
  { value: 'MSc', label: 'Roehampton London',      color: '#4F78FF' },
];

const StatsBanner = () => (
  <section
    className="py-20 relative overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #0A2533 0%, #0D2F3E 100%)' }}
  >
    <div
      className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-[0.12] orb-3"
      style={{ background: 'radial-gradient(circle, #6A5CFF, transparent)' }}
    />
    <div
      className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-[0.10]"
      style={{ background: 'radial-gradient(circle, #00C7D4, transparent)' }}
    />
    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        {STATS.map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-5xl md:text-6xl font-extrabold mb-3" style={{ color: s.color }}>
              {s.value}
            </p>
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// PHILOSOPHY QUOTE (dark)
// ─────────────────────────────────────────────────────────────
const PhilosophySection = () => (
  <section
    className="py-32 relative overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #0A2533 0%, #0D2F3E 100%)' }}
  >
    <div
      className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none orb-1"
      style={{ background: 'radial-gradient(circle, rgba(106,92,255,0.13) 0%, transparent 70%)' }}
    />
    <div
      className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(0,199,212,0.10) 0%, transparent 70%)' }}
    />
    <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/50 text-[11px] font-bold border border-white/10 mb-12">
        <Sparkles className="w-3.5 h-3.5" />
        Engineering Philosophy
      </span>
      <blockquote className="text-3xl md:text-5xl font-extrabold text-white leading-[1.18] mb-12">
        "I treat AI agents as a{' '}
        <span className="accent-gradient-text">managed workforce</span>
        {' '}— structured, governed, and aligned with global business outcomes."
      </blockquote>
      <div className="flex items-center justify-center gap-4">
        <div className="w-12 h-px bg-white/10" />
        <p className="text-white/30 font-bold text-[12px] uppercase tracking-[0.2em]">
          Thapelo Moloantoa · Global AI Media
        </p>
        <div className="w-12 h-px bg-white/10" />
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// CAREER TIMELINE
// ─────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    period: '2000s – 2020',
    title: 'Digital Marketing Pioneer',
    company: 'Global Media Content',
    description:
      'Two decades of strategic digital communications, brand management, and media production across international markets — building a reputation for content-first thinking at global scale.',
  },
  {
    period: '2020 – 2023',
    title: 'Media Intelligence Architect',
    company: 'Global AI Media',
    description:
      'Built and scaled a media intelligence ecosystem, pioneering AI-powered video repurposing, content automation strategies, and digital distribution pipelines for impact-driven brands.',
  },
  {
    period: '2024',
    title: 'AI Engineering Pivot',
    company: 'Loomspark · Independent',
    description:
      'Collaborated with Loomspark on the Million Stories Project — integrating local open-source LLMs into the Story Synthesiser prompt engineering lab. Pivoted fully into AI-driven software engineering.',
  },
  {
    period: '2025 – 2026',
    title: 'AI Product Specialist',
    company: 'MSc · Roehampton London',
    description:
      'Pursuing MSc in Global Business Management (Digital Marketing) at Roehampton while scaling 21+ live AI deployments: HighlightPro, MediaMind Intelligence, Bolt Deployment Portal, and more.',
  },
];

const CareerTimeline = () => (
  <section className="py-28 bg-white">
    <div className="max-w-[900px] mx-auto px-6">
      <div className="text-center mb-20">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-[#00C7D4] text-[11px] font-bold border border-teal-100 mb-6">
          <Clock className="w-3.5 h-3.5" />
          The Journey
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2533] mb-5 leading-tight">
          From Strategist<br />to AI Engineer.
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto font-medium leading-relaxed">
          A career built on intentional evolution — from digital communications veteran to AI software engineer.
        </p>
      </div>

      <div className="relative pl-14">
        <div className="timeline-line" />
        <div className="space-y-10">
          {TIMELINE.map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[42px] top-6 w-9 h-9 rounded-full accent-gradient-bg flex items-center justify-center shadow-lg shadow-indigo-200/40 z-10">
                <span className="text-white text-[10px] font-extrabold">{i + 1}</span>
              </div>
              <div className="p-8 rounded-[28px] bg-[#F8FAFC] border border-gray-100 hover:shadow-xl hover:shadow-indigo-100/40 transition-all card-lift">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-[11px] font-extrabold text-[#6A5CFF] uppercase tracking-widest">
                    {item.company}
                  </span>
                  <span className="text-[11px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {item.period}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0A2533] mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// THOUGHT LEADERSHIP
// ─────────────────────────────────────────────────────────────
const TOPICS = [
  {
    tag: '#ThapeloAI',
    tagColor: '#6A5CFF',
    tagBg: 'bg-indigo-50 border-indigo-100',
    title: 'AI Workforce Architecture',
    description:
      'Structuring AI agents with governance frameworks that mirror enterprise workforce management — from task delegation to performance accountability.',
    icon: <Briefcase className="w-6 h-6 text-[#6A5CFF]" />,
  },
  {
    tag: '#GEO',
    tagColor: '#00C7D4',
    tagBg: 'bg-teal-50 border-teal-100',
    title: 'Generative Engine Optimisation',
    description:
      'The next frontier of digital visibility: optimising content for AI-generated search responses, not just keywords. GEO is the evolution of SEO.',
    icon: <TrendingUp className="w-6 h-6 text-[#00C7D4]" />,
  },
  {
    tag: '#AfricanBusiness',
    tagColor: '#18B6FF',
    tagBg: 'bg-sky-50 border-sky-100',
    title: 'African Business × AI',
    description:
      'How generative AI is collapsing the production gap between African startups and Fortune 500 companies — democratising global content production.',
    icon: <Globe className="w-6 h-6 text-[#18B6FF]" />,
  },
  {
    tag: '#AIStrategy',
    tagColor: '#4F78FF',
    tagBg: 'bg-blue-50 border-blue-100',
    title: 'Global AI Media Strategy',
    description:
      'Building impact-driven AI products that bridge global business strategy with modern engineering — from product inception to live deployment.',
    icon: <Target className="w-6 h-6 text-[#4F78FF]" />,
  },
];

const ThoughtLeadership = () => (
  <section className="py-28 bg-[#F8FAFC] border-t border-gray-100">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-[#6A5CFF] text-[11px] font-bold border border-indigo-100 mb-6">
            <MessageCircle className="w-3.5 h-3.5" />
            Thought Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2533] leading-tight">
            What I Write About
          </h2>
        </div>
        <a
          href="https://www.linkedin.com/in/moloantoat/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#6A5CFF] font-extrabold text-sm border-b-2 border-transparent hover:border-[#6A5CFF] transition-all pb-1 group whitespace-nowrap"
        >
          <Linkedin className="w-4 h-4" />
          Follow on LinkedIn
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TOPICS.map((topic, i) => (
          <div
            key={i}
            className="p-8 rounded-[32px] bg-white border border-gray-100 hover:shadow-2xl hover:shadow-indigo-100/40 transition-all card-lift group"
          >
            <div className="mb-6 p-4 bg-[#F4F6F8] rounded-2xl inline-flex group-hover:bg-indigo-50 transition-all">
              {topic.icon}
            </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border mb-4 ${topic.tagBg}`}
              style={{ color: topic.tagColor }}
            >
              {topic.tag}
            </span>
            <h3 className="text-[17px] font-extrabold text-[#0A2533] mb-3 leading-tight">{topic.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────────────────────
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-indigo-100/60 transition-all duration-500 card-lift cursor-pointer">
    <div className="relative aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute top-5 right-5 z-10">
        <span
          className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest ${
            project.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}
        >
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
          <ExternalLink className="w-6 h-6" />
        </a>
      </div>
    </div>
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[18px] font-extrabold text-[#0A2533] group-hover:text-[#6A5CFF] transition-colors truncate mr-3">
          {project.title}
        </h4>
        <span className="text-sm font-bold text-gray-300 flex-shrink-0">{project.year}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1.5 bg-[#F4F6F8] text-[#0A2533] text-[11px] font-extrabold rounded-full group-hover:bg-indigo-50 group-hover:text-[#6A5CFF] transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// TECH STACK
// ─────────────────────────────────────────────────────────────
const TechStackCard: React.FC<{ tool: Tool }> = ({ tool }) => (
  <div className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all p-8 flex flex-col h-full card-lift">
    <div className="flex items-start justify-between mb-8">
      <div className="w-16 h-16 bg-[#F4F6F8] rounded-2xl flex items-center justify-center p-3.5 border border-gray-100 group-hover:bg-indigo-50 transition-all shadow-sm">
        <img src={ASSETS.logo} alt={tool.name} className="w-full h-full object-contain" />
      </div>
      <span className="px-4 py-1.5 bg-indigo-50 text-[#6A5CFF] text-[11px] font-extrabold uppercase rounded-full tracking-widest">
        {tool.category}
      </span>
    </div>
    <h3 className="text-xl font-extrabold text-[#0A2533] mb-4">{tool.name}</h3>
    <p className="text-gray-500 mb-6 flex-grow leading-relaxed text-sm font-medium">{tool.description}</p>
    <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-gray-50 mb-6">
      <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
        <Zap className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800]" /> Use Case
      </p>
      <p className="text-sm text-[#0A2533] font-bold leading-relaxed italic">"{tool.useCase}"</p>
    </div>
    <div className="flex flex-wrap gap-2">
      {tool.tags.map((tag, i) => (
        <span key={i} className="text-[10px] font-bold text-gray-400 border border-gray-100 px-3 py-1 rounded-full uppercase tracking-tight">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const TechStackPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = useMemo(() => {
    const cats = new Set(TECH_STACK.map((t) => t.category));
    return ['All', ...Array.from(cats)].sort();
  }, []);
  const filteredTools = useMemo(
    () => (activeCategory === 'All' ? TECH_STACK : TECH_STACK.filter((t) => t.category === activeCategory)),
    [activeCategory]
  );
  return (
    <section className="py-24 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-[#6A5CFF] text-[11px] font-bold border border-indigo-100 mb-6">
            <Zap className="w-3.5 h-3.5" />
            60+ Licensed AI Tools
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#0A2533] mb-6 leading-tight">Strategic Tech Stack</h1>
          <p className="text-gray-500 text-xl max-w-3xl leading-relaxed font-medium">
            A high-performance ecosystem of licensed AI software and development tools I actively leverage to build impact-driven software products.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[12px] font-bold transition-all border ${
                activeCategory === cat
                  ? 'accent-gradient-bg text-white border-transparent shadow-lg shadow-indigo-200/50'
                  : 'bg-white text-[#0A2533] border-gray-100 hover:border-indigo-200 hover:shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <TechStackCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────
const About = () => (
  <section className="py-28 bg-white relative overflow-hidden">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-24 items-center">
        <div className="relative group">
          <div
            className="absolute inset-0 rounded-[56px] blur-[80px] opacity-10 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #00C7D4, #6A5CFF)' }}
          />
          <div className="w-full aspect-[4/5] rounded-[56px] shadow-2xl relative z-10 border-8 border-white overflow-hidden bg-gray-100">
            <img
              src={ASSETS.footerBanner}
              alt="Thapelo Moloantoa"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 whitespace-nowrap z-20">
            <div className="w-10 h-10 accent-gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Currently</p>
              <p className="text-[13px] font-extrabold text-[#0A2533]">MSc · Roehampton London</p>
            </div>
          </div>
        </div>

        <div className="pt-8 md:pt-0">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-[#00C7D4] text-[11px] font-bold border border-teal-100 mb-6">
            <Award className="w-3.5 h-3.5" />
            About Thapelo
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2533] mb-8 leading-tight">
            Strategic Thinking<br />
            <span className="accent-gradient-text">Meets Modern Build.</span>
          </h2>
          <div className="space-y-5 text-[17px] text-gray-600 leading-relaxed font-medium">
            <p>
              I am <strong className="text-[#0A2533]">Thapelo Moloantoa</strong>, pursuing an{' '}
              <strong className="text-[#0A2533]">MSc in Global Business Management (with Digital Marketing)</strong>{' '}
              at the University of Roehampton London.
            </p>
            <p>
              My transition into AI-driven Software Engineering is fuelled by{' '}
              <strong className="text-[#0A2533]">two decades</strong> of excellence in strategic
              digital communications — spanning brand strategy, media production, and digital
              marketing across global markets.
            </p>
            <p>
              I approach product development from a{' '}
              <strong className="text-[#0A2533]">commercial, content-first perspective</strong>,
              treating every AI deployment as both a technical challenge and a market opportunity.
            </p>
          </div>

          <div className="bg-indigo-50/70 p-7 rounded-[28px] border border-indigo-100 mt-8">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-[#6A5CFF]" />
              <p className="text-[11px] font-extrabold text-[#6A5CFF] uppercase tracking-widest">
                Loomspark Collaboration
              </p>
            </div>
            <p className="text-[15px] text-[#0A2533] leading-relaxed font-bold">
              Contributed to the Prompt Engineering Lab for Loomspark's{' '}
              <strong>Story Synthesiser</strong> — integrating local open-source LLMs to generate
              structured narrative data for the <strong>Million Stories Project</strong>.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 p-8 bg-[#F8FAFC] rounded-[36px] border border-gray-100">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-[#6A5CFF] mb-2">MSc</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Global Business</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-[#00C7D4] mb-2">21+</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Live Deployments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────
const ContactInfoCard = () => (
  <div className="bg-white p-10 md:p-16 rounded-[48px] border border-gray-100 shadow-2xl shadow-indigo-100/30 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 accent-gradient-bg opacity-[0.04] rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
    <div
      className="absolute bottom-0 left-0 w-64 h-64 rounded-full -translate-y-1/4 -translate-x-1/4 pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(0,199,212,0.06), transparent)' }}
    />
    <div className="relative z-10">
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-[#6A5CFF] text-[11px] font-bold border border-indigo-100 mb-6">
        <Star className="w-3.5 h-3.5" />
        Partnership Opportunities
      </span>
      <h3 className="text-3xl md:text-4xl font-extrabold text-[#0A2533] mb-6 leading-tight">
        Explore Strategic<br />Partnership
      </h3>
      <p className="text-gray-500 mb-12 max-w-xl text-[17px] leading-relaxed font-medium">
        I am currently seeking collaborations with AI product labs, impact-focused tech partners,
        and innovation incubators. Let's merge technology with global business strategy.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { icon: <Mail className="w-6 h-6" />, label: 'AI Content',    value: 'thapelo@globalaicontent.co.uk',    color: '#6A5CFF', hoverBg: 'group-hover:bg-[#6A5CFF]', baseBg: 'bg-indigo-50', href: 'mailto:thapelo@globalaicontent.co.uk' },
          { icon: <Mail className="w-6 h-6" />, label: 'Media Enquiries', value: 'thapelo@globalmediacontent.co.uk', color: '#00C7D4', hoverBg: 'group-hover:bg-[#00C7D4]', baseBg: 'bg-teal-50',   href: 'mailto:thapelo@globalmediacontent.co.uk' },
          { icon: <Mail className="w-6 h-6" />, label: 'Personal',      value: 'thapelomoloantoa@yahoo.com',       color: '#18B6FF', hoverBg: 'group-hover:bg-[#18B6FF]', baseBg: 'bg-sky-50',    href: 'mailto:thapelomoloantoa@yahoo.com' },
          { icon: <Phone className="w-6 h-6" />, label: 'Direct Dial',  value: '+44 7365 447103',                  color: '#6A5CFF', hoverBg: 'group-hover:bg-[#6A5CFF]', baseBg: 'bg-purple-50', href: 'tel:+447365447103' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-5 group">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm flex-shrink-0 ${item.baseBg} ${item.hoverBg}`}
              style={{ color: item.color }}
            >
              <span className="group-hover:text-white transition-colors">{item.icon}</span>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{item.label}</p>
              <a href={item.href} className="text-[15px] font-bold text-[#0A2533] hover:text-[#6A5CFF] transition-colors">
                {item.value}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────
const Footer = ({ setActivePage }: { setActivePage: (p: string) => void }) => (
  <footer
    className="pt-24 pb-14 text-white relative overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #0A2533 0%, #0D2F3E 100%)' }}
  >
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
      <img src={ASSETS.footerBanner} alt="" className="w-full h-full object-cover" />
    </div>
    <div
      className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-[0.10] orb-3"
      style={{ background: 'radial-gradient(circle, #6A5CFF, transparent)' }}
    />
    <div className="max-w-[1200px] mx-auto px-6 relative z-10">
      <div className="flex flex-col items-center text-center mb-24 pb-24 border-b border-white/10">
        <p className="text-[#00C7D4] font-bold uppercase tracking-[0.2em] text-[11px] mb-6">
          Connect for Strategic Projects
        </p>
        <a
          href="mailto:thapelo@globalaicontent.co.uk"
          className="text-3xl md:text-6xl font-extrabold hover:text-[#18B6FF] transition-colors group flex items-center gap-5 leading-tight"
        >
          Let's Build a Partnership
          <ArrowRight className="w-10 h-10 md:w-14 md:h-14 opacity-0 group-hover:opacity-100 transition-all -translate-x-5 group-hover:translate-x-0" />
        </a>
      </div>

      <div className="grid md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-14 h-14 bg-white rounded-2xl p-2.5 shadow-xl flex-shrink-0">
              <img src={ASSETS.logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-extrabold text-2xl leading-tight">Thapelo AI</p>
              <p className="text-[#00C7D4] text-[11px] font-bold uppercase tracking-widest">Global AI Media</p>
            </div>
          </div>
          <p className="text-white/40 max-w-sm leading-relaxed font-medium text-[15px] mb-8">
            AI Product Specialist and Software Engineer in the making.<br />
            MSc Global Business Management Candidate at Roehampton London.
          </p>
          <div className="flex items-center gap-3">
            {[
              { href: 'https://www.linkedin.com/in/moloantoat/', icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
              { href: '#', icon: <Github className="w-4 h-4" />, label: 'GitHub' },
              { href: '#', icon: <Globe className="w-4 h-4" />, label: 'Web' },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 bg-white/5 hover:bg-[#6A5CFF] rounded-xl flex items-center justify-center transition-all border border-white/10 hover:border-transparent"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-[13px] mb-8 text-white/40 uppercase tracking-widest">Navigate</h4>
          <ul className="space-y-5">
            {['Projects', 'Tech Stack', 'About', 'Contact'].map((page) => (
              <li key={page}>
                <button
                  onClick={() => setActivePage(page)}
                  className="text-white/30 hover:text-white transition-colors font-bold text-sm uppercase tracking-wider"
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[13px] mb-8 text-white/40 uppercase tracking-widest">Connect</h4>
          <ul className="space-y-5">
            <li><a href="https://www.linkedin.com/in/moloantoat/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/30 hover:text-white transition-colors font-bold text-sm"><Linkedin className="w-4 h-4" /> LinkedIn</a></li>
            <li><a href="mailto:thapelo@globalaicontent.co.uk" className="flex items-center gap-3 text-white/30 hover:text-white transition-colors font-bold text-sm"><Mail className="w-4 h-4" /> AI Content</a></li>
            <li><a href="mailto:thapelo@globalmediacontent.co.uk" className="flex items-center gap-3 text-white/30 hover:text-white transition-colors font-bold text-sm"><Mail className="w-4 h-4" /> Media Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/15 text-[11px] font-extrabold uppercase tracking-[0.2em]">
        <p>© 2026 Thapelo AI · Global AI Media</p>
        <p>University of Roehampton London · MSc</p>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
const App = () => {
  const [activePage, setActivePage] = useState('Home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <Header activePage={activePage} setActivePage={setActivePage} />

      {activePage === 'Home' && (
        <main className="animate-in fade-in duration-700">
          <Hero onExplore={() => setActivePage('Projects')} onContact={() => setActivePage('Contact')} />
          <ScrollingTicker />
          <CoreCapabilities />
          <StatsBanner />
          <PhilosophySection />
          <CareerTimeline />

          <section className="py-28 bg-white" id="highlights">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="flex items-end justify-between mb-16">
                <div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-[#6A5CFF] text-[11px] font-bold border border-indigo-100 mb-5">
                    <Code className="w-3.5 h-3.5" />
                    Engineering Portfolio
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2533]">Build Highlights</h2>
                  <p className="text-gray-400 text-lg mt-2 font-medium">Engineering range across the product lifecycle.</p>
                </div>
                <button
                  onClick={() => setActivePage('Projects')}
                  className="text-[#6A5CFF] font-extrabold text-sm flex items-center gap-2 group border-b-2 border-transparent hover:border-[#6A5CFF] transition-all pb-1 whitespace-nowrap"
                >
                  Full Portfolio <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {PROJECTS.slice(0, 3).map((p) => <ProjectCard key={p.id} project={p} />)}
              </div>
            </div>
          </section>

          <ThoughtLeadership />
          <About />

          <section className="py-28 bg-[#F8FAFC]" id="partnership">
            <div className="max-w-[1100px] mx-auto px-6">
              <ContactInfoCard />
            </div>
          </section>
        </main>
      )}

      {activePage === 'Projects' && (
        <main className="animate-in slide-in-from-bottom-8 duration-700">
          <div className="pt-40 pb-28 bg-[#F8FAFC] min-h-screen">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="mb-20">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-[#6A5CFF] text-[11px] font-bold border border-indigo-100 mb-6">
                  <Code className="w-3.5 h-3.5" />21+ Live Builds
                </span>
                <h2 className="text-4xl md:text-6xl font-extrabold text-[#0A2533] mb-5 leading-tight">Engineering Portfolio</h2>
                <p className="text-gray-500 text-xl max-w-2xl font-medium">A curated archive of live builds and active technical prototypes.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project) => <ProjectCard key={project.id} project={project} />)}
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
          <CareerTimeline />
          <PhilosophySection />
        </main>
      )}

      {activePage === 'Contact' && (
        <main className="animate-in fade-in duration-700 pt-40 pb-32 bg-[#F8FAFC]">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold text-[#0A2533] mb-4 leading-tight">Let's Work Together</h1>
              <p className="text-gray-500 text-xl font-medium">Strategic partnerships, AI product collaborations, and innovation ventures.</p>
            </div>
            <ContactInfoCard />
          </div>
        </main>
      )}

      <Footer setActivePage={setActivePage} />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
