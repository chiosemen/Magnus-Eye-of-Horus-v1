import React from 'react';
import type { SectionId } from '../types.ts';
import GrandmasterConstitution from './sections/GrandmasterConstitution.tsx';
import AgentContracts from './sections/AgentContracts.tsx';
import RedFlagTaxonomy from './sections/RedFlagTaxonomy.tsx';
import ScoringEngine from './sections/ScoringEngine.tsx';
import UIControlPlane from './sections/UIControlPlane.tsx';
import PolicyAsCodeEngine from './sections/PolicyAsCodeEngine.tsx';
import SystemsArchitecture from './sections/SystemsArchitecture.tsx';
import AuditResponseModule from './sections/AuditResponseModule.tsx';
import DAFVariant from './sections/DAFVariant.tsx';
import OperationalFlow from './sections/OperationalFlow.tsx';
import AdversarialAudit from './sections/AdversarialAudit.tsx';
import AdversaryModeling from './sections/AdversaryModeling.tsx';
import LoggingDoctrine from './sections/LoggingDoctrine.tsx';
import SystemJustification from './sections/SystemJustification.tsx';
import ControlInventory from './sections/ControlInventory.tsx';
import DAFAbuseVectors from './sections/DAFAbuseVectors.tsx';
import SystemBoundaries from './sections/SystemBoundaries.tsx';
import HumanFactors from './sections/HumanFactors.tsx';
import AgentDirectives from './sections/AgentDirectives.tsx';
import TaskInputTemplates from './sections/TaskInputTemplates.tsx';
import InvestorDiligence from './sections/InvestorDiligence.tsx';
import Playbooks from './sections/Playbooks.tsx';
import PerformativeCompliance from './sections/PerformativeCompliance.tsx';

interface MainContentProps {
    activeSection: SectionId;
}

const MainContent: React.FC<MainContentProps> = ({ activeSection }) => {
    const renderSection = () => {
        switch (activeSection) {
            case 'constitution':
                return <GrandmasterConstitution />;
            case 'contracts':
                return <AgentContracts />;
            case 'agent_directives':
                return <AgentDirectives />;
            case 'taxonomy':
                return <RedFlagTaxonomy />;
            case 'adversary_modeling':
                return <AdversaryModeling />;
            case 'scoring':
                return <ScoringEngine />;
            case 'ui':
                return <UIControlPlane />;
            case 'human_factors':
                return <HumanFactors />;
            case 'control_inventory':
                return <ControlInventory />;
            case 'policy':
                return <PolicyAsCodeEngine />;
            case 'architecture':
                return <SystemsArchitecture />;
            case 'playbooks':
                return <Playbooks />;
            case 'logging_doctrine':
                return <LoggingDoctrine />;
            case 'system_justification':
                return <SystemJustification />;
            case 'task_input_templates':
                return <TaskInputTemplates />;
            case 'audit':
                return <AuditResponseModule />;
            case 'daf':
                return <DAFVariant />;
            case 'daf_abuse_vectors':
                return <DAFAbuseVectors />;
            case 'adversarial_audit':
                return <AdversarialAudit />;
            case 'system_boundaries':
                return <SystemBoundaries />;
            case 'flow':
                return <OperationalFlow />;
            case 'investor_diligence':
                return <InvestorDiligence />;
            case 'performative_compliance':
                return <PerformativeCompliance />;
            default:
                return <div>Select a section</div>;
        }
    };

    return (
        <main className="flex-1 p-8 overflow-y-auto bg-gray-900">
            <div className="max-w-7xl mx-auto">
                {renderSection()}
            </div>
        </main>
    );
};

export default MainContent;