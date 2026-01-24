
import React from 'react';
// FIX: Standardize import casing to use the 'Card.tsx' alias to prevent module resolution conflicts.
import { Card } from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';

const DiligencePoint: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <div className="text-gray-400 space-y-3">{children}</div>
    </div>
);


const InvestorDiligence: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Investor Due-Diligence Appendix" subtitle="Investment Thesis for a Governance System Built on Restraint" />
            <div className="space-y-8">
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
                                <li><strong>Higher Trust Ceiling:</strong> The Self-Limitation Doctrine is not a marketing claim; it's a verifiable, architectural fact. This creates a level of trust with users, boards, and even regulators that feature-rich competitors cannot achieve.</li>
                                <li><strong>Increased Stickiness:</strong> Once an organization builds its governance processes around the system's verifiable controls, switching to a less rigorous, "black-box" alternative becomes an unacceptable risk, leading to high customer retention.</li>
                            </ul>
                        </DiligencePoint>

                        <DiligencePoint title="2. The Trust Flywheel as a Low-Cost Growth Engine">
                            <p>The system's architecture creates a self-reinforcing growth loop that does not depend on traditional sales and marketing expenditure.</p>
                            <ol className="list-decimal list-inside space-y-2 text-gray-300">
                                <li><strong>Users</strong> adopt for personal risk reduction.</li>
                                <li><strong>Boards</strong> approve based on verifiable governance and reduced organizational risk.</li>
                                <li><strong>Auditors & Regulators</strong> learn to trust the system's legible, unambiguous audit packets, leading to smoother inquiries.</li>
                                <li><strong>Courts</strong> value the objective, non-speculative evidence in litigation.</li>
                            </ol>
                            <p>This flywheel lowers customer acquisition cost (CAC) as trust in the system becomes a market-wide asset, pulling in new users who want the "Magnus standard" of defensibility.</p>
                        </DiligencePoint>
                         <DiligencePoint title="3. Redefined Total Addressable Market (TAM)">
                             <p>Eye of Horus is not merely competing in the "compliance software" market. It is creating and addressing a new, more valuable market.</p>
                             <ul className="list-disc list-inside space-y-2 text-gray-300">
                                 <li><strong>From Automation to Insurance:</strong> The value proposition is not efficiency, but risk transfer and mitigation. It's less like a CRM and more like a Directors & Officers (D&O) insurance policy written in code.</li>
                                 <li><strong>Target Market:</strong> The true TAM is not the budget for software, but the budget for legal counsel, insurance, and contingency reserves related to fiduciary and regulatory risk. This is a significantly larger and less price-sensitive market.</li>
                             </ul>
                        </DiligencePoint>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default InvestorDiligence;