'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, Variants } from "framer-motion";
import { 
  Mail, 
  ArrowUpRight, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  ChevronUp, 
  Sparkles,
  Code2,
  Palette,
  Layers,
  Globe,
  Terminal,
  Database,
  Server,
  Cpu,
  Menu,
  X
} from "lucide-react";
import { Sora, Instrument_Serif } from "next/font/google";

import Preloader from "@/components/Preloader";

const serif = Instrument_Serif({ 
  subsets: ["latin"], 
  weight: ["400"], 
  style: ["normal", "italic"] 
});

const sans = Sora({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"] 
});

// SVG BRAND ICONS
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const DiscordIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// VARIANT DI-OPTIMALKAN UNTUK PENGEREMAN PENUH KEHALUSAN (NO JERKY ENDING)
const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

const staggerHero: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const PROJECTS = [
  {
    id: "01",
    title: "Luneth Discord Bot",
    category: "DISCORD BOT",
    year: "2026",
    desc: "Solusi praktis kelola transaksi toko, tiket bantuan, sticky notes, quote generator, keamanan server, leveling XP, dan member otomatis dalam satu dashboard.",
    image: "https://i.imgur.com/UuPGid0.png",
    tags: ["TypeScript", "React", "PostgreSQL", "Tailwind CSS"]
  },
  {
    id: "02",
    title: "Aura Luxury E-Commerce",
    category: "DIGITAL ARCHITECTURE",
    year: "2026",
    desc: "Pengalaman berbelanja produk eksklusif dengan sistem mikro-interaksi instan dan tata letak asimetris.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
    tags: ["Next.js", "Laravel", "PostgreSQL", "Tailwind CSS", "Framer Motion"]
  },
  {
    id: "03",
    title: "Kinetics Asset Analytics",
    category: "FINTECH INTERFACE",
    year: "2025",
    desc: "Dashboard analitik keuangan berkecepatan tinggi dengan visualisasi data presisi dan tipografi jernih.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    tags: ["React", "TypeScript", "Recharts"]
  },
  {
    id: "04",
    title: "Atelier Studio Publication",
    category: "EDITORIAL SYSTEM",
    year: "2025",
    desc: "Platform penerbitan majalah digital dengan fokus penuh pada estetika tipografi dan hirarki visual.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    tags: ["Design System", "CSS Architecture"]
  }
];

const SKILLS = [
  {
    icon: Server,
    title: "PHP & Laravel",
    tag: "BACKEND FRAMEWORK",
    desc: "Pengembangan arsitektur backend robust, RESTful API, ORM Eloquent, serta sistem autentikasi terstruktur."
  },
  {
    icon: Database,
    title: "PostgreSQL & MySQL",
    tag: "DATABASE ARCHITECTURE",
    desc: "Perancangan skema relasional, optimasi query berkecepatan tinggi, indexing, serta manajemen transaksi data."
  },
  {
    icon: Cpu,
    title: "Docker",
    tag: "CONTAINERIZATION",
    desc: "Pengemasan lingkungan aplikasi ke dalam container untuk konsistensi deployment antara staging dan production."
  },
  {
    icon: Globe,
    title: "Next.js & React",
    tag: "FRONTEND FRAMEWORK",
    desc: "Membangun aplikasi web SSR/SSG performa tinggi dengan struktur folder modular dan SEO optimization."
  },
  {
    icon: Code2,
    title: "TypeScript & JavaScript",
    tag: "TYPE SAFETY",
    desc: "Penulisan kode berskala produksi yang aman, terstruktur rapi, serta minim risiko runtime error."
  },
  {
    icon: Palette,
    title: "Tailwind CSS",
    tag: "UI ARCHITECTURE",
    desc: "Merancang sistem desain antarmuka fleksibel, responsif di semua ukuran layar, dan konsisten."
  },
  {
    icon: Sparkles,
    title: "Framer Motion",
    tag: "KINETIC MOTION",
    desc: "Implementasi mikro-animasi interaktif dan transisi halaman yang mengalir halus untuk kenyamanan pengguna."
  },
  {
    icon: Layers,
    title: "UI/UX & Design System",
    tag: "VISUAL IDENTITY",
    desc: "Penyusunan hirarki tipografi, grid layout teratur, dan panduan komponen antarmuka bertaraf profesional."
  },
  {
    icon: Terminal,
    title: "Git & Web APIs",
    tag: "VERSION CONTROL & INTEGRATION",
    desc: "Manajemen repositori Git terorganisir serta integrasi service API modern berstandar industri."
  }
];

const PROCESS = [
  { step: "01", title: "Discovery & Strategy", desc: "Menganalisis kebutuhan mendasar proyek, audiens sasaran, dan membangun kerangka arah visual." },
  { step: "02", title: "Editorial Design", desc: "Menyusun sistem tipografi terstruktur, hirarki konten, dan komponen UI yang estetis." },
  { step: "03", title: "Clean Engineering", desc: "Menerjemahkan ide ke dalam baris kode yang terstruktur, ringan, dan mudah dirawat." },
  { step: "04", title: "Kinetic Micro-Motion", desc: "Menambahkan animasi pergerakan yang mengalir mulus untuk kenyamanan pengguna." }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("adipramana.p@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText("@muztkwatz");
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`${sans.className} bg-[#0E0E10] text-[#EAE6DF] min-h-screen relative selection:bg-[#D45D3B] selection:text-white`}>
      
      {/* ANIMATED PRELOADER */}
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* FLOATING HOVER PREVIEW CARD (DESKTOP ONLY) */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{ x: cursorX, y: cursorY }}
            className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
          >
            <div className="w-80 h-52 rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative bg-[#18181C]">
              <Image
                src={PROJECTS.find(p => p.id === hoveredProject)?.image || ""}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BACK TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 p-3.5 sm:p-4 rounded-full bg-[#D45D3B] hover:bg-[#bd4d2e] text-white shadow-2xl hover:scale-110 transition-all border border-white/10 cursor-pointer flex items-center justify-center group"
      >
        <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* TOP KINETIC MARQUEE RUNNING TEXT */}
      <div className="bg-[#141417] border-b border-neutral-800/80 py-2.5 sm:py-3 overflow-hidden flex whitespace-nowrap text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-neutral-400 font-medium">
        <motion.div 
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          className="flex gap-8 sm:gap-12 shrink-0 items-center"
        >
          <span>✦ FULLSTACK & FRONTEND DEVELOPER</span>
          <span>✦ LARAVEL & NEXT.JS SPECIALIST</span>
          <span>✦ UI/UX ARCHITECT</span>
          <span>✦ AVAILABLE FOR FREELANCE & FULLTIME</span>
          <span>✦ FULLSTACK & FRONTEND DEVELOPER</span>
          <span>✦ LARAVEL & NEXT.JS SPECIALIST</span>
          <span>✦ UI/UX ARCHITECT</span>
          <span>✦ AVAILABLE FOR FREELANCE & FULLTIME</span>
        </motion.div>
      </div>

      {/* STICKY NAVBAR */}
      <nav className="sticky top-0 z-40 w-full bg-[#0E0E10]/90 backdrop-blur-md border-b border-neutral-800/60 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D45D3B] animate-pulse" />
            <span className="font-bold tracking-widest text-xs uppercase text-neutral-200">PORTFOLIO®</span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-400">
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">About</button>
            <button onClick={() => scrollToSection('works')} className="hover:text-white transition-colors cursor-pointer">Works</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-white transition-colors cursor-pointer">Skills</button>
            <button onClick={() => scrollToSection('process')} className="hover:text-white transition-colors cursor-pointer">Process</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">Contact</button>
          </div>

          {/* HAMBURGER BUTTON MOBILE */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDE DRAWER MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-[#121215] border-l border-neutral-800/80 z-50 p-6 flex flex-col justify-between md:hidden shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-neutral-800/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D45D3B] animate-pulse" />
                    <span className="font-bold tracking-widest text-xs uppercase text-neutral-200">NAVIGATION</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer"
                    aria-label="Close Menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="py-8 space-y-4">
                  {[
                    { id: 'about', label: 'About' },
                    { id: 'works', label: 'Works' },
                    { id: 'skills', label: 'Skills' },
                    { id: 'process', label: 'Process' },
                    { id: 'contact', label: 'Contact' },
                  ].map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-lg font-medium text-neutral-300 hover:text-[#E5A869] transition-colors py-1 cursor-pointer"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-800/60 space-y-3">
                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">GET IN TOUCH</p>
                <a
                  href="mailto:adipramana.p@gmail.com"
                  className="text-xs text-neutral-300 hover:text-[#D45D3B] transition-colors block"
                >
                  adipramana.p@gmail.com
                </a>
                <div className="flex gap-2 pt-2">
                  <a href="https://github.com/itakingg" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors">
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  {/* DISCORD COPY BUTTON (MOBILE DRAWER) */}
                  <div className="relative">
                    <button 
                      onClick={handleCopyDiscord} 
                      aria-label="Salin Username Discord" 
                      title="Salin username Discord: @muztkwatz"
                      className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                    >
                      {copiedDiscord ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <DiscordIcon className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                      {copiedDiscord && (
                        <motion.span 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -top-9 left-1/2 -translate-x-1/2 bg-neutral-900 text-emerald-400 text-[10px] py-1 px-2 rounded-md border border-neutral-800 whitespace-nowrap shadow-lg pointer-events-none z-50 font-mono"
                        >
                          @muztkwatz tersalin!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <a href="https://www.facebook.com/adipramana34" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors">
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a href="https://x.com/urlovablealienn" target="_blank" rel="noreferrer" aria-label="X" className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors">
                    <XIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT WRAPPER */}
      <main className="space-y-16 sm:space-y-24">

        {/* HERO SECTION */}
        <motion.section 
          id="hero" 
          initial="hidden"
          animate={!isLoading ? "visible" : "hidden"}
          variants={staggerHero}
          className="bg-[#0E0E10] pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-neutral-800/40"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] sm:text-xs font-medium text-[#E5A869]">
                <Code2 className="w-3.5 h-3.5 text-[#D45D3B]" />
                Fullstack & Creative Development
              </div>

              <h1 className="text-3xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.12] sm:leading-[1.08] text-neutral-100">
                Building <span className={`${serif.className} italic text-[#E5A869] text-4xl sm:text-7xl lg:text-8xl`}>refined</span> web experiences with precision.
              </h1>

              <p className="text-neutral-400 text-sm sm:text-lg leading-relaxed max-w-xl font-light">
                Halo! Saya seorang <strong className="text-neutral-200 font-semibold">Fullstack Developer</strong>. Saya berfokus merancang antarmuka web interaktif serta arsitektur backend yang scalable dan intuitif.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <button 
                  onClick={() => scrollToSection('works')}
                  className="w-full sm:w-auto justify-center px-8 py-3.5 sm:py-4 rounded-full bg-[#D45D3B] text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-3 hover:bg-[#bd4d2e] hover:scale-105 transition-all shadow-lg shadow-[#D45D3B]/20 cursor-pointer"
                >
                  Lihat Project <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto justify-center px-8 py-3.5 sm:py-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 font-semibold text-xs tracking-wider uppercase flex items-center gap-2.5 hover:bg-neutral-800 hover:text-white hover:scale-105 transition-all cursor-pointer"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Email Tersalin" : "Salin Email"}
                </button>
              </div>
            </motion.div>

            {/* EDITORIAL PROFILE FRAME */}
<motion.div variants={fadeInUp} className="lg:col-span-5 flex justify-center pt-2 sm:pt-0">
  <div className="relative w-full max-w-[320px] sm:max-w-sm aspect-[4/5] rounded-[28px] sm:rounded-[36px] bg-neutral-900/80 p-3 sm:p-3.5 border border-neutral-800 shadow-2xl overflow-hidden group cursor-pointer select-none">
    <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden grayscale contrast-125 group-hover:grayscale-0 group-active:grayscale-0 group-hover:scale-105 group-active:scale-105 transition-all duration-700">
      <Image
        src="/profile.webp"
        alt="Adi Pramana Putra"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-transparent to-transparent opacity-60" />
    </div>

    {/* OVERLAY CARD */}
    <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#16161A]/95 border border-neutral-800/90 backdrop-blur-md flex flex-col sm:flex-row items-center text-center sm:text-left sm:items-center sm:justify-between gap-2.5 sm:gap-0">
      <div>
        <h3 className="font-bold text-xs sm:text-sm text-neutral-200 whitespace-nowrap">Adi Pramana Putra</h3>
        <p className="text-[10px] sm:text-xs text-neutral-400 font-light">Fullstack Engineer</p>
      </div>
      <div className="flex gap-2 items-center justify-center sm:justify-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800/60">
        <a href="https://github.com/itakingg" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-neutral-800 text-neutral-300 hover:text-white transition-colors">
          <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </a>

        {/* DISCORD COPY BUTTON (PROFILE CARD) */}
        <div className="relative">
          <button 
            onClick={handleCopyDiscord} 
            aria-label="Salin Username Discord" 
            title="Salin username Discord: @muztkwatz"
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
          >
            {copiedDiscord ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /> : <DiscordIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
          <AnimatePresence>
            {copiedDiscord && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-9 left-1/2 -translate-x-1/2 bg-neutral-900 text-emerald-400 text-[10px] py-1 px-2 rounded-md border border-neutral-800 whitespace-nowrap shadow-lg pointer-events-none z-50 font-mono"
              >
                @muztkwatz tersalin!
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <a href="https://www.facebook.com/adipramana34" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-neutral-800 text-neutral-300 hover:text-white transition-colors">
          <FacebookIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </a>
        <a href="https://x.com/urlovablealienn" target="_blank" rel="noreferrer" aria-label="X" className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-neutral-800 text-neutral-300 hover:text-white transition-colors">
          <XIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </a>
      </div>
    </div>
  </div>
</motion.div>
          </div>
        </motion.section>

        {/* STATS & METRICS */}
        <section id="about" className="bg-[#141418] py-16 sm:py-20 border-y border-neutral-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { num: "03+", title: "Tahun Pengalaman", desc: "Membuat aplikasi web fullstack berkinerja tinggi dengan standar kualitas kode profesional." },
              { num: "25+", title: "Proyek Selesai", desc: "Mulai dari aplikasi web interaktif, API backend, platform e-commerce, hingga sistem informasi." },
              { num: "100%", title: "Kode Rapi & Modular", desc: "Arsitektur kode bersih yang mudah dikembangkan dan di-maintain dalam jangka panjang." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                variants={fadeInUp}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#1A1A20] border border-neutral-800/80 space-y-3 sm:space-y-4 hover:border-neutral-700 transition-all shadow-sm"
              >
                <span className={`${serif.className} text-4xl sm:text-5xl text-[#E5A869] italic block`}>{item.num}</span>
                <h3 className="text-sm sm:text-base font-bold text-neutral-200">{item.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SELECTED WORKS SECTION */}
        <section id="works" className="bg-[#0E0E10] py-12 scroll-mt-24 sm:scroll-mt-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 border-b border-neutral-800/80 pb-5 sm:pb-6"
            >
              <div>
                <span className="text-[10px] sm:text-xs font-semibold text-[#E5A869] uppercase tracking-widest">SELECTED WORKS</span>
                <h2 className="text-2xl sm:text-5xl font-normal text-neutral-100 mt-1 sm:mt-2">
                  Proyek <span className={`${serif.className} italic text-[#E5A869]`}>Unggulan</span>
                </h2>
              </div>
              <p className="text-[11px] text-neutral-500 font-mono hidden sm:block">Arahkan kursor ke daftar proyek untuk pratinjau</p>
            </motion.div>

            <div className="divide-y divide-neutral-800/80">
              {PROJECTS.map((proj) => (
                <motion.div
                  key={proj.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.15 }}
                  variants={fadeInUp}
                  onMouseEnter={() => setHoveredProject(proj.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="py-8 sm:py-10 group cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 transition-all duration-300 hover:px-0 sm:hover:px-6 rounded-2xl hover:bg-transparent sm:hover:bg-neutral-900/60"
                >
                  <div className="space-y-3 max-w-xl">
                    <div className="flex items-center gap-3 text-[11px] sm:text-xs font-mono text-neutral-500">
                      <span>{proj.id}</span>
                      <span>•</span>
                      <span className="text-[#E5A869] font-medium">{proj.category}</span>
                      <span>•</span>
                      <span>{proj.year}</span>
                    </div>

                    <h3 className="text-xl sm:text-4xl font-semibold text-neutral-100 group-hover:text-[#E5A869] transition-colors">
                      {proj.title}
                    </h3>

                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-neutral-800 block lg:hidden my-3">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                      {proj.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {proj.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 rounded-md bg-neutral-800/80 text-[10px] font-mono text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-0">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">Lihat Detail</span>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:bg-[#D45D3B] group-hover:border-[#D45D3B] transition-all duration-300 group-hover:scale-110">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS & TECH STACK SECTION */}
        <section id="skills" className="bg-[#121217] py-16 sm:py-20 border-y border-neutral-800/60 scroll-mt-24 sm:scroll-mt-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={fadeInUp}
              className="border-b border-neutral-800/80 pb-5 sm:pb-6"
            >
              <span className="text-[10px] sm:text-xs font-semibold text-[#E5A869] uppercase tracking-widest">CAPABILITIES & STACK</span>
              <h2 className="text-2xl sm:text-5xl font-normal text-neutral-100 mt-1 sm:mt-2">
                Keahlian & <span className={`${serif.className} italic text-[#E5A869]`}>Teknologi</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {SKILLS.map((skill, idx) => {
                const IconComp = skill.icon;
                return (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.15 }}
                    variants={fadeInUp}
                    className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#17171F] border border-neutral-800/80 space-y-4 sm:space-y-5 hover:border-neutral-700 transition-all shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-neutral-800/80 text-[#E5A869]">
                        <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#D45D3B] uppercase font-bold">
                        {skill.tag}
                      </span>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-100">{skill.title}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">{skill.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROCESS / METHODOLOGY */}
        <section id="process" className="bg-[#16161E] py-16 sm:py-20 border-b border-neutral-800/60 scroll-mt-24 sm:scroll-mt-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={fadeInUp}
            >
              <span className="text-[10px] sm:text-xs font-semibold text-[#E5A869] uppercase tracking-widest">METHODOLOGY</span>
              <h2 className="text-2xl sm:text-5xl font-normal text-neutral-100 mt-1 sm:mt-2">
                Alur <span className={`${serif.className} italic text-[#E5A869]`}>Pengerjaan</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {PROCESS.map((p, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.15 }}
                  variants={fadeInUp}
                  className="p-6 rounded-2xl sm:rounded-3xl bg-[#1C1C26] border border-neutral-800 space-y-3 sm:space-y-4 hover:border-neutral-700 transition-all shadow-sm"
                >
                  <span className="text-xs font-mono text-[#D45D3B] font-bold">{p.step}</span>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-200">{p.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
          <motion.section 
            id="contact" 
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            variants={fadeInUp}
            className="p-6 sm:p-12 lg:p-16 rounded-[28px] sm:rounded-[40px] bg-[#181822] border border-neutral-800 text-center space-y-6 sm:space-y-8 relative overflow-hidden shadow-2xl"
          >
            <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
              <span className="text-[10px] sm:text-xs font-semibold text-[#E5A869] uppercase tracking-widest">GET IN TOUCH</span>
              <h2 className="text-2xl sm:text-5xl font-normal text-neutral-100 leading-snug sm:leading-tight">
                Mari membangun proyek <span className={`${serif.className} italic text-[#E5A869]`}>istimewa</span> bersama.
              </h2>
              <p className="text-neutral-400 text-xs sm:text-base font-light">
                Saya terbuka untuk diskusi proyek baru, konsultasi pengembangan fullstack, atau peluang kerja sama jangka panjang.
              </p>
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <a 
                href="mailto:adipramana.p@gmail.com" 
                className="w-full sm:w-auto justify-center px-8 py-4 rounded-full bg-[#D45D3B] text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-[#bd4d2e] hover:scale-105 transition-all shadow-xl cursor-pointer"
              >
                <Mail className="w-4 h-4" /> Kirim Email Sekarang
              </a>
            </div>
          </motion.section>
        </div>

        {/* FOOTER */}
        <footer className="bg-[#0E0E10] border-t border-neutral-800/80 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-neutral-500 gap-4 text-center sm:text-left">
            <p>© 2026 Adi Pramana Putra Portfolio.</p>
          </div>
        </footer>

      </main>
    </div>
  );
}