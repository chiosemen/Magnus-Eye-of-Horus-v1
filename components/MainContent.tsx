
import React from 'react';
import type { SectionId } from '../types';
import GrandmasterConstitution from './sections/GrandmasterConstitution';
import AgentContracts from './sections/AgentContracts';
import RedFlagTaxonomy from './sections/RedFlagTaxonomy';
import ScoringEngine from './sections/ScoringEngine';
import UIControlPlane from './sections/UIControlPlane';
import PolicyAsCodeEngine from './sections/PolicyAsCodeEngine';
import SystemsArchitecture from './sections/SystemsArchitecture';
import AuditResponseModule from './sections/AuditResponseModule';
import DAFVariant from './sections/DAFVariant';
import OperationalFlow from './sections/OperationalFlow';
import AdversarialAudit from './sections/AdversarialAudit';
import AdversaryModeling from './sections/AdversaryModeling';
import LoggingDoctrine from './sections/LoggingDoctrine';
import SystemJustification from './sections/SystemJustification';
import ControlInventory from './sections/ControlInventory';
import DAFAbuseVectors from './sections/DAFAbuseVectors';
import SystemBoundaries from './sections/SystemBoundaries';
import HumanFactors from './sections/HumanFactors';
import AgentDirectives from './sections/AgentDirectives';
import TaskInputTemplates from './sections/TaskInputTemplates';
import InvestorDiligence from './sections/InvestorDiligence';
import Playbooks from './sections/Playbooks';
import PerformativeCompliance from './sections/PerformativeCompliance';

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