import React from 'react';
// FIX: Use lowercase card.tsx to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

const DiligencePoint: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6 last:mb-0">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <div className="text-gray-400 space-y-3">{children}</div>
    </div>
);


const InvestorDiligence: React.FC = () => {
    return (
        <div className="space-y-8 pb-12">
            <SectionHeader title="Investor Due-Diligence Appendix" subtitle="Investment Thesis for a Governance System Built on Restraint" />
            
            <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-yellow-400 mb-4">Investment Thesis Summary</h2>
                <p className="text-gray-300">Magnus Eye of Horus represents a new category of enterprise software: Governance-as-a-Service, where the primary product is not automation, but liability containment and scalable trust. The investment thesis is predicated on the counter-intuitive principle that in high-stakes compliance environments, self-imposed limitation is the most valuable feature, creating an unbreachable competitive moat and a fundamentally lower-risk business model.</p>
            </Card>

            <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                <div className="space-y-6">
                    <DiligencePoint title="1. The Counter-Intuitive Moat: Why Restraint Creates Value">
                        <p>Unlike conventional SaaS products that compete on adding features, Eye of Horus competes on the permanent, architectural absence of features. This "negative capability" is its strongest defense.</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li><strong>Reduced Liability Surface:</strong> By architecturally forbidding predictive scoring, autonomous actions, and external reporting, the system cannot be co-opted for uses that would create liability for the user or for Magnus. This makes it a safer choice for risk-averse enterprise buyers.</li>
                            <li><strong>Higher Trust Ceiling:</strong> The Self-Limitation Doctrine is not a marketing claim; it's a verifiable, architectural fact. This creates a baseline of trust required for true system-of-record status in regulated industries.</li>
                        </ul>
                    </DiligencePoint>

                    <DiligencePoint title="2. Regulatory Alignment: Playing the Long Game">
                        <p>Eye of Horus is designed to survive, not evade, regulatory scrutiny. By forcing the creation of contemporaneous proof density, it aligns the operator's survival with the regulator's mandate for transparency.</p>
                        <p>This alignment reduces the organizatonal "friction" during audits and protects the valuation of the firm by ensuring its historical records are discoverable, defensible, and clean.</p>
                    </DiligencePoint>

                    <DiligencePoint title="3. Defensive Posture as Competitive Advantage">
                        <p>In a market flooded with "AI for automation," a system that prioritizes "Human Governance" stands out. We target the buyer who is terrified of automation error—the CFO, the General Counsel, and the Board Director. For them, a system that defaults to a hard stop is a feature, not a bug.</p>
                    </DiligencePoint>

                    <div className="pt-6 border-t border-gray-700">
                        <h3 className="text-lg font-bold text-white mb-4">Core Differentiators for LP Diligence</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-900 rounded-xl border border-gray-700">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Constitutional Guardrails</span>
                                <p className="text-sm text-gray-300 mt-2">Built-in architectural prohibitions prevent the system from ever becoming an offensive surveillance tool.</p>
                            </div>
                            <div className="p-4 bg-gray-900 rounded-xl border border-gray-700">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Discovery-Safe UX</span>
                                <p className="text-sm text-gray-300 mt-2">Every UI element and log field is designed assuming it will be subpoenaed and reviewed by hostile parties.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default InvestorDiligence;