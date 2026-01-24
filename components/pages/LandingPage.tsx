import React from 'react';
import { Button } from '../ui/button.tsx';
import { Shield, Zap, BrainCircuit, Lock, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
  onViewPlaybooks: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, onViewPlaybooks }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[650px] w-full overflow-hidden rounded-[2.5rem] border border-border/50 bg-black shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2560&auto=format&fit=crop" 
          alt="AI Governance Network"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
        
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="mb-8 flex items-center gap-3 rounded-full border border-accent/30 bg-accent/5 px-5 py-2 backdrop-blur-xl transition-all hover:bg-accent/10">
            <Zap className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Turbo Intelligence v1.0.4 Active</span>
          </div>
          
          <h1 className="max-w-5xl text-6xl font-black tracking-tighter sm:text-9xl text-white">
            EYE OF <span className="text-accent italic drop-shadow-[0_0_35px_rgba(245,158,11,0.3)]">HORUS</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-2xl leading-relaxed font-medium">
            Architecting Scalable Trust.
            <br />
            <span className="text-foreground/80">Deterministic Remediation via Pure Governance.</span>
          </p>
          
          <div className="mt-14 flex flex-wrap justify-center gap-6">
            <Button 
              size="lg" 
              onClick={onEnter} 
              className="h-16 px-12 text-xl font-bold rounded-2xl shadow-[0_20px_50px_rgba(245,158,11,0.2)] transition-all hover:scale-105 active:scale-95 bg-white text-black hover:bg-white/90"
            >
              Launch Control Plane
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onViewPlaybooks} 
              className="h-16 px-12 text-xl font-bold rounded-2xl border-white/20 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/40 active:scale-95 group"
            >
              View Playbooks
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <div className="mt-24 grid gap-10 sm:grid-cols-3">
        <div className="group relative flex flex-col items-center text-center p-12 rounded-[2rem] border border-border/40 bg-card/30 backdrop-blur-sm transition-all hover:bg-card/50 hover:border-accent/40">
          <div className="mb-6 rounded-2xl bg-accent/10 p-5 transition-all group-hover:scale-110 group-hover:rotate-6">
            <BrainCircuit className="h-10 w-10 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Turbo Reasoning</h3>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Deterministic agentic chains map risk terrain at line-speed, ensuring instant statutory alignment without latency.
          </p>
        </div>
        
        <div className="group relative flex flex-col items-center text-center p-12 rounded-[2rem] border border-border/40 bg-card/30 backdrop-blur-sm transition-all hover:bg-card/50 hover:border-accent/40">
          <div className="mb-6 rounded-2xl bg-accent/10 p-5 transition-all group-hover:scale-110 group-hover:-rotate-6">
            <Shield className="h-10 w-10 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Liability Shield</h3>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Architecturally forbidden from offensive escalation. Built exclusively for defensive remediation and internal containment.
          </p>
        </div>

        <div className="group relative flex flex-col items-center text-center p-12 rounded-[2rem] border border-border/40 bg-card/30 backdrop-blur-sm transition-all hover:bg-card/50 hover:border-accent/40">
          <div className="mb-6 rounded-2xl bg-accent/10 p-5 transition-all group-hover:scale-110 group-hover:rotate-12">
            <Lock className="h-10 w-10 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Fail-Closed</h3>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Safety is the default. Any anomaly results in an immediate halt in a secure state, enforcing human-in-the-loop integrity.
          </p>
        </div>
      </div>

      <footer className="mt-32 py-16 border-t border-border/20 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] font-bold">
          Magnus Eye of Horus &copy; 2024 | Grandmaster Protocol v1.0
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;