import React from 'react';
import { Button } from '../ui/button.tsx';
import { Shield, Zap, BrainCircuit, Lock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { heroEnter, meshIdle, sectionReveal } from '../../lib/motion.ts';

interface LandingPageProps {
  onEnter: () => void;
  onViewPlaybooks: () => void;
}

const IntelligenceMeshNode = ({ top, left, size }: { top: string, left: string, size: string }) => (
  <motion.div
    variants={meshIdle}
    animate="animate"
    style={{ top, left, width: size, height: size }}
    className="absolute rounded-md border border-white/10 bg-white/5 pointer-events-none"
  />
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    whileHover={{
      y: -4,
      boxShadow: "0 0 0 1px rgba(212,175,55,0.35)"
    }}
    transition={{
      duration: 0.25,
      ease: "easeOut"
    }}
    className="group relative flex flex-col items-center text-center p-10 rounded-2xl border border-white/5 bg-[#0F1522] shadow-2xl"
  >
    <div className="mb-6 rounded-xl bg-accent/10 p-4 transition-all duration-500 group-hover:bg-accent/20">
      <Icon className="h-8 w-8 text-accent" />
    </div>
    <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
    <p className="mt-4 text-sm text-muted-foreground leading-relaxed opacity-[0.78]">
      {description}
    </p>
  </motion.div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, onViewPlaybooks }) => {
  return (
    <div className="flex flex-col pb-24">
      {/* Hero Section */}
      <motion.section 
        variants={heroEnter}
        initial="initial"
        animate="animate"
        className="hero-background relative h-[80vh] min-h-[650px] w-full overflow-hidden rounded-[2.5rem] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute inset-0 overflow-hidden">
            <IntelligenceMeshNode top="15%" left="10%" size="40px" />
            <IntelligenceMeshNode top="25%" left="85%" size="60px" />
            <IntelligenceMeshNode top="65%" left="15%" size="30px" />
            <IntelligenceMeshNode top="80%" left="75%" size="45px" />
        </div>
        
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-10 flex items-center gap-3 rounded-full border border-accent/20 bg-[#0B0F16]/40 px-5 py-2 backdrop-blur-xl"
          >
            <Zap className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/80">Turbo Intelligence v1.0.4 Active</span>
          </motion.div>
          
          <h1 className="max-w-5xl text-6xl font-black tracking-tighter sm:text-9xl text-white">
            EYE OF <span className="horus-gradient-text italic tracking-tight ml-2">HORUS</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-2xl leading-relaxed font-bold tracking-tight">
            Architecting Scalable Trust.
            <br />
            <span className="text-foreground/60 font-medium">Deterministic Remediation via Pure Governance.</span>
          </p>
          
          <div className="mt-14 flex flex-wrap justify-center gap-6">
            <motion.button 
              onClick={onEnter} 
              whileHover={{ boxShadow: "0 0 24px rgba(212,175,55,0.35)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, delay: 0.08 }}
              className="h-16 px-12 text-xl font-bold rounded-2xl bg-accent text-black hover:bg-[#E2C96B] transition-all shadow-2xl"
            >
              Launch Control Plane
            </motion.button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onViewPlaybooks} 
              className="h-16 px-12 text-xl font-bold rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 active:scale-95 group transition-all"
            >
              View Playbooks
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Feature Grids */}
      <motion.div 
        variants={sectionReveal}
        initial="initial"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-24 grid gap-8 sm:grid-cols-3"
      >
        <FeatureCard 
            icon={BrainCircuit}
            title="Turbo Reasoning"
            description="Deterministic agentic chains map risk terrain at line-speed, ensuring instant statutory alignment without latency."
        />
        <FeatureCard 
            icon={Shield}
            title="Liability Shield"
            description="Architecturally forbidden from offensive escalation. Built exclusively for defensive remediation and internal containment."
        />
        <FeatureCard 
            icon={Shield}
            title="Fail-Closed"
            description="Safety is the default. Any anomaly results in an immediate halt in a secure state, enforcing human-in-the-loop integrity."
        />
      </motion.div>

      <footer className="mt-32 py-16 border-t border-white/5 text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-black opacity-40">
          Magnus Eye of Horus &copy; 2024 | Grandmaster Protocol v1.0
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;