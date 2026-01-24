import React from 'react';

interface SectionHeaderProps {
    title: string;
    subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
    <div className="mb-10 border-b border-white/5 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            {title}
        </h1>
        <p className="mt-2 text-xs font-black uppercase tracking-[0.15em] text-muted-foreground opacity-70">
            {subtitle}
        </p>
    </div>
);

export default SectionHeader;