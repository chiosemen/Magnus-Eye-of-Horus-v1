
import React from 'react';
// FIX: Use lowercase filename for card component to resolve casing conflicts.
import { Card } from '../ui/card.tsx';
import SectionHeader from '../ui/SectionHeader.tsx';

const DoctrineItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <div className="text-gray-400 space-y-2">{children}</div>
    </div>
);

const DAFVariant: React.FC = () => {
    return (
        <div>
            <SectionHeader title="Magnus Eye of Horus — DAF / Nonprofit Variant" subtitle="Executive Translation (Locked Doctrine)" />
            <div className="space-y-8">
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <DoctrineItem title="Purpose (DAF / Nonprofit Context)">
                        <p>Magnus Eye of Horus (Nonprofit Edition) is a pure remediation intelligence system designed to protect:</p>
                        <ul className="list-disc list-inside">
                            <li>Donor-Advised Funds (DAFs)</li>
                            <li>Public charities (501(c)(3))</li>
                            <li>Private foundations</li>
                            <li>Fiscal sponsors</li>
                            <li>Nonprofit service organizations</li>
                        </ul>
                        <p>from data-driven IRS enforcement and state AG scrutiny by identifying, explaining, and neutralizing governance, excise-tax, and operational compliance risk before escalation occurs.</p>
                        <p className="font-semibold text-gray-300">It is not:</p>
                        <ul className="list-disc list-inside text-red-400/90">
                            <li>A whistleblower platform</li>
                            <li>An enforcement proxy</li>
                            <li>A reporting or referral engine</li>
                            <li>A regulator-facing system</li>
                        </ul>
                        <p>It is a defensive, fail-closed, human-governed compliance architecture.</p>
                    </DoctrineItem>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Non-Negotiable Doctrine (Nonprofit Edition)</h2>
                    <DoctrineItem title="1. Pure Remediation Only (Charity-Safe)">
                        <p>Eye of Horus exists solely to:</p>
                        <ul className="list-disc list-inside text-green-400/90">
                            <li>Detect governance & tax risk</li>
                            <li>Explain statutory exposure (IRC §4966, §4958, §4941, §4945)</li>
                            <li>Guide corrective action</li>
                            <li>Block unsafe distributions, approvals, or workflows</li>
                        </ul>
                        <p>It never:</p>
                        <ul className="list-disc list-inside text-red-400/90">
                            <li>Produces IRS filings (990, 990-PF, 1023, etc.)</li>
                            <li>Generates enforcement narratives</li>
                            <li>Incentivizes penalties, bounties, or referrals</li>
                            <li>Produces whistleblower artifacts (Form 211, 14242)</li>
                        </ul>
                    </DoctrineItem>
                    <div className="border-t border-gray-700 mt-4 pt-4">
                        <DoctrineItem title="2. Human-as-King Governance Model (Board-Aligned)">
                             <ul className="list-disc list-inside text-gray-300">
                                <li>Humans define objectives (Board, Compliance Officer, GC)</li>
                                <li>AI executes bounded intelligence</li>
                                <li>Humans approve all irreversible actions</li>
                            </ul>
                            <p className="font-semibold text-yellow-400">No autonomous disbursement blocking without review. No silent escalation. No self-authorizing agents. This mirrors fiduciary duty doctrine, not automation dogma.</p>
                        </DoctrineItem>
                    </div>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                     <DoctrineItem title="Nonprofit Threat Model (What Eye of Horus Is Built Against)">
                        <p className="font-semibold text-gray-300">Enforcement Reality (Nonprofit):</p>
                        <ul className="list-disc list-inside">
                            <li>IRS & Treasury do not audit randomly.</li>
                            <li>DAFs and sponsors are analyzed in aggregate.</li>
                            <li>Pattern-based detection dominates: Distribution velocity, Donor influence patterns, Recipient clustering, Governance entropy.</li>
                            <li>One flagged grant → portfolio expansion.</li>
                        </ul>
                         <p className="font-semibold text-gray-300 mt-4">Primary Enforcement Vectors:</p>
                         <ul className="list-disc list-inside">
                            <li><strong>DAF / Charity:</strong> IRC §4966 taxable distributions, "Individual benefit" grants, Missing sponsor equivalency determination, Repetitive donor-directed grants, Inadequate expenditure responsibility.</li>
                            <li><strong>Governance:</strong> IRC §4958 excess benefit transactions, Board capture / related-party dominance, Missing conflict disclosures, Rubber-stamp approvals.</li>
                        </ul>
                    </DoctrineItem>
                </Card>
                
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <DoctrineItem title="Canonical Operational Flow (Unchanged)">
                        <ol className="list-decimal list-inside">
                            <li>Human defines objective</li>
                            <li>Orchestrator decomposes</li>
                            <li>Explorer maps risk terrain</li>
                            <li>Librarian anchors authority</li>
                            <li>Oracle classifies exposure</li>
                            <li>Fixer enforces controls</li>
                            <li>Designer presents warnings</li>
                            <li>Orchestrator reconciles</li>
                            <li>Human approves or redirects</li>
                        </ol>
                        <p className="font-semibold text-yellow-400 mt-2">No step is skippable. No agent self-authorizes.</p>
                    </DoctrineItem>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <DoctrineItem title="Legal & Ethical Guardrails (Nonprofit)">
                         <ul className="list-disc list-inside text-red-400/90">
                            <li>No whistleblower prep</li>
                            <li>No regulator-facing artifacts</li>
                            <li>No coercive monetization</li>
                            <li>No donor intimidation</li>
                            <li>No evidence taint</li>
                            <li>No dual-use ambiguity</li>
                        </ul>
                        <p className="font-semibold text-gray-300 mt-2">Eye of Horus reduces liability; it never creates it.</p>
                    </DoctrineItem>
                </Card>

                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <DoctrineItem title="Product Identity (Nonprofit Edition)">
                        <p>Magnus Eye of Horus is:</p>
                        <ul className="list-disc list-inside text-cyan-300">
                            <li>A DAF sponsor defense system</li>
                            <li>A governance foresight engine</li>
                            <li>A remediation governor</li>
                            <li>A human-controlled AI orchestra</li>
                        </ul>
                        <p className="font-semibold text-gray-300 mt-2">Its moat is explainable prevention, not prediction.</p>
                    </DoctrineItem>
                </Card>
            </div>
        </div>
    );
};

export default DAFVariant;
