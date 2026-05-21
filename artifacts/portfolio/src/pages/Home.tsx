import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Github, Linkedin, Mail, MapPin, Phone, Terminal, Briefcase, GraduationCap, Award, Zap, Code, Database, Globe, ArrowRight } from "lucide-react";
import { SiPython, SiReact, SiHtml5, SiMysql, SiFirebase, SiFlask, SiNumpy, SiPandas, SiCplusplus, SiGit } from "react-icons/si";
import { useTheme } from "@/components/ThemeProvider";

const SECTIONS = [
  { id: "hero", label: "00. Start" },
  { id: "about", label: "01. About" },
  { id: "experience", label: "02. Experience" },
  { id: "projects", label: "03. Projects" },
  { id: "skills", label: "04. Skills" },
  { id: "education", label: "05. Education" },
  { id: "contact", label: "06. Contact" },
];


export default function Home() {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
      const currentScrollPos = window.scrollY + window.innerHeight / 2;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= currentScrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const SectionHeader = ({ index, title }: { index: string, title: string }) => (
    <div className="relative mb-12 flex items-center">
      <div className="absolute -left-4 -top-8 text-[4rem] font-bold opacity-15 text-primary pointer-events-none select-none z-0">
        {index}
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold flex items-center gap-4 relative z-10 w-full">
        <span className="font-mono text-xl text-primary font-normal">{index}</span> {title}
        <div className="h-px bg-gradient-to-r from-primary/40 to-transparent flex-grow ml-4"></div>
      </h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between relative">
          <div 
            className="font-mono font-bold text-xl tracking-tighter text-primary cursor-pointer transition-all hover:glow-text" 
            onClick={() => scrollTo("hero")} 
            data-testid="nav-logo"
            style={{ transition: 'text-shadow 0.3s ease' }}
          >
            K_A.dev
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-mono text-muted-foreground relative">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`relative py-2 hover:text-primary transition-colors ${activeSection === section.id ? 'text-primary font-bold' : ''}`}
                data-testid={`nav-link-${section.id}`}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted text-foreground transition-colors"
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 mr-2 rounded-full hover:bg-muted text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-foreground z-50">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col space-y-8 font-mono text-xl items-center">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`relative ${activeSection === section.id ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div layoutId="activeNavMobile" className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[100dvh] flex flex-col justify-center pt-20 pb-10 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none z-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0 opacity-80 mix-blend-screen"></div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl relative z-10">
            <motion.div variants={fadeInUp} className="font-mono text-primary mb-6 tracking-wider flex items-center gap-2">
              <span className="inline-block w-8 h-[2px] bg-primary"></span>
              Hi, my name is
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-4 text-foreground drop-shadow-sm">
              Khushi Agrawal.
            </motion.h1>
            

            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
              I'm a final-year IT student based in Indore, India. I build intelligent systems with machine learning, craft full-stack applications, and care deeply about clean code and data-driven solutions.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 mb-16">
              <button onClick={() => scrollTo("projects")} className="btn-shimmer px-8 py-4 bg-primary text-primary-foreground font-mono font-bold rounded-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20" data-testid="btn-view-work">
                Check out my work
              </button>
              <button onClick={() => scrollTo("contact")} className="px-8 py-4 bg-transparent border border-border text-foreground font-mono font-bold rounded-sm hover:border-primary hover:text-primary transition-colors" data-testid="btn-contact-me">
                Get in touch
              </button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-8 py-6 border-y border-border/40 max-w-max">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-foreground">2+</span>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Internships</span>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-foreground">4</span>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Projects</span>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-foreground">6</span>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Certifications</span>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block"></div>
              <div className="flex gap-4 sm:ml-4">
                <a href="https://github.com/khushi-281103" target="_blank" rel="noopener noreferrer" className="p-3 bg-card border border-border rounded-full hover:border-primary hover:text-primary transition-all hover:scale-110">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/khushi-agrawal-658984228/" target="_blank" rel="noopener noreferrer" className="p-3 bg-card border border-border rounded-full hover:border-primary hover:text-primary transition-all hover:scale-110">
                  <Linkedin size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <SectionHeader index="01." title="About Me" />
            
            <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-start">
              <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
                <p>
                  I'm a driven developer with a passion for building software that makes an impact. Currently pursuing my B.Tech in Information Technology at Acropolis Institute of Technology and Research, Indore.
                </p>
                <p>
                  My journey started with Java and Android development, and I've since grown into machine learning and full-stack web development. From training predictive models to building interactive React + Flask applications, I enjoy working across the entire stack.
                </p>
                <p>
                  I'm adaptable, communicative, and a continuous learner. When I'm not coding, I'm exploring new technologies, analysing data, or contributing to community initiatives through IEEE and entrepreneurship events.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                    <GraduationCap className="text-primary" size={24} />
                    <div>
                      <div className="text-xs text-muted-foreground font-mono">Degree</div>
                      <div className="font-semibold text-sm">B.Tech IT</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                    <MapPin className="text-secondary" size={24} />
                    <div>
                      <div className="text-xs text-muted-foreground font-mono">Location</div>
                      <div className="font-semibold text-sm">Indore, India</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="relative flex h-3 w-3 mx-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-mono">Status</div>
                      <div className="font-semibold text-sm text-primary">Open to Work</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative group mx-auto w-full max-w-sm lg:max-w-none">
                <div className="absolute inset-0 border-2 border-primary rounded-xl translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 z-0"></div>
                <div className="relative bg-card border border-border rounded-xl p-8 h-full flex flex-col justify-center items-center overflow-hidden z-10 min-h-[300px]">
                  <Terminal size={80} className="text-primary mb-6 opacity-80" strokeWidth={1.5} />
                  <div className="text-2xl font-bold tracking-tight mb-2">Khushi Agrawal</div>
                  <div className="font-mono text-sm text-muted-foreground mb-6">Developer & Data Enthusiast</div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-sm shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse-ring"></span>
                    Ready for new opportunities
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <SectionHeader index="02." title="Experience" />
            
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[15px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent hidden sm:block"></div>
              
              <div className="space-y-16 sm:pl-16 relative">
                
                {/* Exp 1 */}
                <div className="relative group">
                  <div className="hidden sm:flex absolute -left-[64px] top-1 w-8 h-8 rounded-full bg-background border-4 border-primary items-center justify-center z-10 shadow-[0_0_15px_rgba(var(--primary),0.3)] animate-pulse-ring">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-xl p-6 sm:p-8 card-hover-border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">LLM Post Training Intern</h3>
                        <a href="https://www.ethara.ai/" target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 text-primary font-semibold text-sm rounded-md hover:bg-primary/20 transition-colors">
                          @ Ethara AI ↗
                        </a>
                      </div>
                      <div className="font-mono text-sm px-4 py-1.5 rounded-full bg-muted text-muted-foreground whitespace-nowrap self-start">
                        Jan 2026 – Apr 2026 · Remote
                      </div>
                    </div>
                    
                    <ul className="space-y-3 text-muted-foreground leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-1.5"><Zap size={16} /></span>
                        <span>Evaluated AI responses for student homework problems (Science, Math, Chemistry) and provided structured error justifications.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-1.5"><Zap size={16} /></span>
                        <span>Performed multimodal testing by modifying images (perspective, size, blur, distortion) to assess visual reasoning.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-1.5"><Zap size={16} /></span>
                        <span>Annotated high-resolution app interfaces using bounding boxes and documented functionality of each UI element to support model training.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Exp 2 */}
                <div className="relative group">
                  <div className="hidden sm:flex absolute -left-[64px] top-1 w-8 h-8 rounded-full bg-background border-4 border-secondary items-center justify-center z-10 shadow-[0_0_15px_rgba(var(--secondary),0.3)]">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-xl p-6 sm:p-8 card-hover-border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">GenAI Intern</h3>
                        <a href="https://thepawsitivity.com/" target="_blank" rel="noopener noreferrer" className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/30 text-secondary font-semibold text-sm rounded-md hover:bg-secondary/20 transition-colors">
                          @ ThePawsitivity ↗
                        </a>
                      </div>
                      <div className="font-mono text-sm px-4 py-1.5 rounded-full bg-muted text-muted-foreground whitespace-nowrap self-start">
                        Aug 2025 – Nov 2025
                      </div>
                    </div>
                    
                    <ul className="space-y-3 text-muted-foreground leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="text-secondary mt-1.5"><Zap size={16} /></span>
                        <span>Developed and built a personalized chat-bot using MSG91.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-secondary mt-1.5"><Zap size={16} /></span>
                        <span>Integrated WhatsApp and payment APIs to provide scalable, automated, and personalized platform to help businesses effectively manage customer interactions.</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <SectionHeader index="03." title="Featured Projects" />

            <div className="space-y-8">
              
              {/* Featured Project 1 — Predictive Modelling */}
              <div className="bg-card border border-border rounded-xl overflow-hidden card-hover-border group relative">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-primary to-secondary"></div>
                <div className="p-8 sm:p-10 relative">
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="text-primary" size={28} />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      <Briefcase size={28} />
                    </div>
                    <div>
                      <p className="font-mono text-primary text-sm mb-1">Featured Project · Feb 2025 – May 2025</p>
                      <h3 className="text-3xl font-bold group-hover:text-primary transition-colors">Predictive Modelling for Sales Forecasting</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-lg mb-8 max-w-3xl leading-relaxed">
                    Performed time-series analysis and developed predictive models using historical sales data to forecast product demand across multiple categories and regions. Designed and deployed a full-stack dashboard using React and Flask REST APIs for real-time visualization and monitoring.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-4 py-1.5">Python</span>
                      <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-4 py-1.5">Flask</span>
                      <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-4 py-1.5">React</span>
                      <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-4 py-1.5">TensorFlow</span>
                      <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-4 py-1.5">Scikit-learn</span>
                      <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-4 py-1.5">Power BI</span>
                    </div>
                    <a href="https://github.com/Atharv-082004/SMART-INVENTORY-MANAGEMENT/tree/main/Python%20Project%20Final" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono" data-testid="link-github-predictive">
                      <Github size={16} /> View on GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Featured Project 2 — Credit Card Fraud Detection */}
              <div className="bg-card border border-border rounded-xl overflow-hidden card-hover-border group relative">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-secondary to-primary"></div>
                <div className="p-8 sm:p-10 relative">
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="text-secondary" size={28} />
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                      <Database size={28} />
                    </div>
                    <div>
                      <p className="font-mono text-secondary text-sm mb-1">Featured Project · Sep 2024 – Dec 2024</p>
                      <h3 className="text-3xl font-bold group-hover:text-secondary transition-colors">Credit Card Fraud Detection</h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-lg mb-8 max-w-3xl leading-relaxed">
                    Developed Flask-based REST APIs to process and analyse transaction data in real time, identifying fraudulent patterns using machine learning. Built an interactive React frontend to visualize fraud detection results and integrate seamlessly with the backend APIs.
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-mono text-xs px-4 py-1.5">Python</span>
                      <span className="bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-mono text-xs px-4 py-1.5">Flask</span>
                      <span className="bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-mono text-xs px-4 py-1.5">React</span>
                      <span className="bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-mono text-xs px-4 py-1.5">Scikit-learn</span>
                      <span className="bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-mono text-xs px-4 py-1.5">REST API</span>
                    </div>
                    <a href="https://github.com/khushi-281103" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors font-mono" data-testid="link-github-fraud">
                      <Github size={16} /> View on GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Grid Projects */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Project — Smart EOL */}
                <div className="bg-card border border-border rounded-xl p-8 card-hover-border group flex flex-col h-full relative">
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="text-primary" size={24} />
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg text-primary w-max mb-6">
                    <Code size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Smart EOL Component Replacement System</h3>
                  <p className="text-muted-foreground text-base flex-grow mb-8">
                    AI-powered system developed under L&T Technology Services. Implemented Form-Fit-Function compatibility analysis to suggest component replacements with an interactive React frontend.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-3 py-1">Python</span>
                    <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-3 py-1">Flask</span>
                    <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-3 py-1">React</span>
                  </div>
                </div>

                {/* Project — Chat-Bot Echo */}
                <div className="bg-card border border-border rounded-xl p-8 card-hover-border group flex flex-col h-full relative">
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="text-primary" size={24} />
                  </div>
                  <div className="p-3 bg-accent/50 rounded-lg text-foreground w-max mb-6">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Chat-Bot (Echo)</h3>
                  <p className="text-muted-foreground text-base flex-grow mb-8">
                    Intelligent Android chatbot enabling real-time interaction through NLP-based dialogue handling. Simulated natural conversations and integrated Firebase Authentication for secure login, signup, and session management.
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-3 py-1">Java</span>
                      <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-3 py-1">Android Studio</span>
                      <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-3 py-1">Firebase</span>
                      <span className="bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-xs px-3 py-1">XML</span>
                    </div>
                    <a href="https://github.com/Atharv-082004/Echo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono shrink-0" data-testid="link-github-echo">
                      <Github size={14} /> GitHub
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <SectionHeader index="04." title="Technical Arsenal" />

            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-bold mb-8 text-foreground flex items-center gap-2">
                  <Globe className="text-primary" /> Languages & Frameworks
                </h3>
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4"
                >
                  {[
                    { icon: <SiPython size={32} />, name: "Python" },
                    { icon: <SiCplusplus size={32} />, name: "C++" },
                    { icon: <SiHtml5 size={32} />, name: "HTML5" },
                    { icon: <Code size={32} />, name: "CSS3" },
                    { icon: <SiMysql size={32} />, name: "SQL" },
                    { icon: <Database size={32} />, name: "Power BI" },
                  ].map((tech, i) => (
                    <motion.div 
                      key={tech.name} 
                      variants={fadeInUp}
                      className="group flex flex-col items-center justify-center p-6 bg-card border border-border rounded-xl hover:border-primary hover:shadow-[0_0_20px_rgba(var(--primary),0.15)] transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-muted-foreground group-hover:text-primary transition-colors mb-3">
                        {tech.icon}
                      </div>
                      <span className="text-sm font-semibold text-foreground">{tech.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-8 text-foreground flex items-center gap-2">
                  <Zap className="text-secondary" /> Tools & Libraries
                </h3>
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4"
                >
                  {[
                    { icon: <SiFirebase size={32} />, name: "Firebase" },
                    { icon: <SiGit size={32} />, name: "Git" },
                    { icon: <SiNumpy size={32} />, name: "NumPy" },
                    { icon: <SiPandas size={32} />, name: "Pandas" },
                    { icon: <Code size={32} />, name: "Scikit-learn" },
                    { icon: <Globe size={32} />, name: "TensorFlow" },
                  ].map((tech) => (
                    <motion.div 
                      key={tech.name} 
                      variants={fadeInUp}
                      className="group flex flex-col items-center justify-center p-6 bg-card border border-border rounded-xl hover:border-secondary hover:shadow-[0_0_20px_rgba(var(--secondary),0.15)] transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-muted-foreground group-hover:text-secondary transition-colors mb-3">
                        {tech.icon}
                      </div>
                      <span className="text-sm font-semibold text-foreground">{tech.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="mt-16 bg-card border border-border p-8 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
              <h3 className="text-lg font-bold mb-4 text-foreground">Core Concepts</h3>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:border-primary transition-colors cursor-default">Data Structures & Algorithms</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:border-primary transition-colors cursor-default">Object-Oriented Programming</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:border-primary transition-colors cursor-default">Database Management Systems</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:border-primary transition-colors cursor-default">Operating Systems</span>
              </div>
              <h3 className="text-lg font-bold mb-4 text-foreground">Soft Skills</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:border-secondary transition-colors cursor-default">Articulate Communication</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:border-secondary transition-colors cursor-default">Team Work</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:border-secondary transition-colors cursor-default">Adaptability</span>
                <span className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:border-secondary transition-colors cursor-default">Problem Solving</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* EDUCATION & CERTIFICATIONS SECTION */}
        <section id="education" className="py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <SectionHeader index="05." title="Education & Certs" />

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div className="bg-card border border-border p-8 rounded-xl relative overflow-hidden card-hover-border group">
                <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <GraduationCap size={120} />
                </div>
                <div className="font-mono text-primary text-sm mb-4 bg-primary/10 w-max px-3 py-1 rounded-md">Nov 2022 – May 2026</div>
                <h3 className="font-bold text-xl mb-2 text-foreground">B.Tech in Information Technology</h3>
                <p className="text-muted-foreground mb-6 h-12">Acropolis Institute of Technology and Research, Indore</p>
                <div className="font-mono font-bold text-xl text-foreground">CGPA: <span className="text-secondary">7.3</span></div>
              </div>

              <div className="bg-card border border-border p-8 rounded-xl relative overflow-hidden card-hover-border group">
                <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <Award size={120} />
                </div>
                <div className="font-mono text-primary text-sm mb-4 bg-primary/10 w-max px-3 py-1 rounded-md">Apr 2021 – Jun 2022</div>
                <h3 className="font-bold text-xl mb-2 text-foreground">Senior Secondary Education</h3>
                <p className="text-muted-foreground mb-6 h-12">Marthoma Higher Secondary School, Indore</p>
                <div className="font-mono font-bold text-xl text-foreground">Score: <span className="text-secondary">76.4%</span></div>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Award className="text-primary" /> Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "AWS Cloud Architecting", url: "https://drive.google.com/file/d/1ALmefoFJjpCg1ICWnCb-kewjIGXnH3wE/view?usp=drivesdk" },
                  { name: "Deloitte Data Analytics Job Simulation", url: "https://drive.google.com/file/d/1LYLmye4U5M8mIqTm_h-6j9Wp5SUDQOOM/view?usp=drive_link" },
                  { name: "Nvidia Fundamentals of Deep Learning", url: "https://drive.google.com/file/d/1rCDuzZTNJ5EoS1y2cjI_r2phHrWfIHWg/view?usp=sharing" },
                  { name: "Walmart Advanced Software Engineering Job Simulation", url: "https://drive.google.com/file/d/1fSoe4nNthDp6vTP2uhZOkuIj-_g34x2B/view?usp=drive_link" },
                  { name: "Image Processing Onramp", url: "https://drive.google.com/file/d/1OankP7ejkbQUuv5FKtawn-TpxrUzUzDx/view?usp=drivesdk" },
                  { name: "MATLAB Onramp", url: "https://drive.google.com/file/d/17MecNT29ZQ6MN1vXt3SLrHqFXiHJERLp/view?usp=drivesdk" },
                ].map((cert, i) => (
                  <a key={i} href={cert.url} target="_blank" rel="noopener noreferrer" className="btn-shimmer flex items-center gap-4 bg-card border border-border p-4 rounded-xl hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-200 group" data-testid={`link-cert-${i}`}>
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Award size={18} />
                    </div>
                    <span className="font-semibold text-sm group-hover:text-primary transition-colors">{cert.name}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="bg-card border border-border p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-foreground">Positions of Responsibility</h3>
              <div className="grid sm:grid-cols-3 gap-8">
                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary"></div>
                  <h4 className="font-bold text-lg mb-1">Video Editor, E-Summit</h4>
                  <p className="font-mono text-sm text-primary mb-3">Feb 2024 – Apr 2024</p>
                  <p className="text-muted-foreground">Produced video content for an entrepreneurship event focused on fostering and promoting entrepreneurship, organised by a student-led organisation.</p>
                </div>
                <div className="relative pl-6 border-l-2 border-secondary/30">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-secondary"></div>
                  <h4 className="font-bold text-lg mb-1">Advisor at IEEE</h4>
                  <p className="font-mono text-sm text-secondary mb-3">Jan 2023 – Jan 2024</p>
                  <p className="text-muted-foreground">Served as Advisor at the IEEE Computational Intelligence Society, Student Branch Chapter at Acropolis.</p>
                </div>
                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary"></div>
                  <h4 className="font-bold text-lg mb-1">Student Representative, Idea Lab AICTE</h4>
                  <p className="font-mono text-sm text-primary mb-3">May 2023</p>
                  <p className="text-muted-foreground">Conducted a 5-day entrepreneurship program, coordinating with students and faculty to convert ideas into prototypes under one roof.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 flex flex-col items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="w-full">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="font-mono text-primary text-xl mb-4 tracking-wider">06. What's Next?</p>
              <h2 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-muted-foreground py-2">
                Let's work together.
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <a href="mailto:khushiagrawal281103@gmail.com" className="group bg-card border border-border p-8 rounded-2xl flex flex-col items-center text-center hover:border-primary hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(var(--primary),0.2)]" data-testid="link-email">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mail size={32} />
                </div>
                <h3 className="text-lg font-bold mb-2">Email</h3>
                <p className="text-muted-foreground font-mono text-sm">khushiagrawal281103@gmail.com</p>
              </a>
              
              <a href="tel:+917225003198" className="group bg-card border border-border p-8 rounded-2xl flex flex-col items-center text-center hover:border-secondary hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(var(--secondary),0.2)]" data-testid="link-phone">
                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Phone size={32} />
                </div>
                <h3 className="text-lg font-bold mb-2">Phone</h3>
                <p className="text-muted-foreground font-mono text-sm">+91 7225003198</p>
              </a>

              <div className="group bg-card border border-border p-8 rounded-2xl flex flex-col items-center text-center hover:border-foreground hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.05)]">
                <div className="w-16 h-16 bg-muted text-foreground rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin size={32} />
                </div>
                <h3 className="text-lg font-bold mb-2">Location</h3>
                <p className="text-muted-foreground font-mono text-sm">Indore, India</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <a 
                href="https://github.com/khushi-281103" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 px-8 py-4 bg-card border border-border rounded-full font-bold hover:bg-[#24292e] hover:text-white hover:border-[#24292e] transition-all"
              >
                <Github size={20} /> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/khushi-agrawal-658984228/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 px-8 py-4 bg-card border border-border rounded-full font-bold hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all"
              >
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>

          </motion.div>
        </section>

      </main>

      <footer className="py-8 text-center border-t border-border/50">
        <p className="font-mono text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Khushi Agrawal. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
