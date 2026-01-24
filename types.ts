
import type React from 'react';

export type SectionId = 
    | 'constitution' 
    | 'contracts' 
    | 'taxonomy' 
    | 'scoring' 
    | 'ui' 
    | 'policy' 
    | 'architecture' 
    | 'audit' 
    | 'daf' 
    | 'flow'
    | 'adversarial_audit'
    | 'adversary_modeling'
    | 'logging_doctrine'
    | 'system_justification'
    | 'control_inventory'
    | 'daf_abuse_vectors'
    | 'system_boundaries'
    | 'human_factors'
    | 'agent_directives'
    | 'task_input_templates'
    | 'investor_diligence'
    | 'playbooks'
    | 'performative_compliance';

export interface Section {
    id: SectionId;
    title: string;
    icon: React.ReactNode;
}

export interface Agent {
    role: string;
    title: string;
    icon: string;
    inputs: string[];
    outputs: string[];
    forbidden: string[];
    approvals: string[];
    incompleteInputBehavior: string;
    conflictingOutputBehavior: string;
    policyBlockBehavior: string;
    failureSurfacing: string;
    audit: string | string[];
    enforcementBoundaries: string;
}

export interface RedFlag {
    level: 'Critical' | 'High Risk' | 'Advisory';
    category: string;
    trigger: string;
    details: string;
    rationale: string;
    enforcement: string;
    escalation: string;
}