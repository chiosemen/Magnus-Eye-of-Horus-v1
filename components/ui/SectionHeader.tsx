
import React from 'react';

interface SectionHeaderProps {
    title: string;
    subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
    <div className="mb-8 border-b border-gray-700/50 pb-4">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-md text-gray-400 mt-1">{subtitle}</p>
    </div>
);

export default SectionHeader;
