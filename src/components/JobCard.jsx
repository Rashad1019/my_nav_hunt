import React from 'react';
import { ExternalLink, Trash2, Calendar, DollarSign, Edit3, ArrowRight, ArrowLeft } from 'lucide-react';

const STATUS_ORDER = ['discovered', 'applied', 'interviewing', 'offer', 'rejected'];

const JobCard = ({ job, onStatusChange, onDelete }) => {
    const currentIndex = STATUS_ORDER.indexOf(job.status);

    const handleMove = (direction) => {
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < STATUS_ORDER.length) {
            onStatusChange(job.id, STATUS_ORDER[newIndex]);
        }
    };

    return (
        <div className="glass-panel p-4 mb-3 hover:bg-[rgba(51,65,85,0.5)] transition-all animate-fade-in" style={{ padding: '1.25rem', marginBottom: '1rem', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white', fontWeight: 600 }}>{job.position}</h3>
                {job.link && (
                    <a href={job.link} target="_blank" rel="noopener noreferrer" className="btn-icon">
                        <ExternalLink size={16} />
                    </a>
                )}
            </div>

            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: 500 }}>
                {job.company}
            </div>

            {(job.salary || job.dateAdded) && (
                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
                    {job.salary && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <DollarSign size={12} /> {job.salary}
                        </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} /> {new Date(job.dateAdded).toLocaleDateString()}
                    </div>
                </div>
            )}

            {job.notes && (
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem', lineHeight: '1.4', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px' }}>
                    {job.notes}
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <button
                    onClick={() => onDelete(job.id)}
                    className="btn-icon"
                    title="Delete"
                    style={{ color: '#ef4444' }}
                >
                    <Trash2 size={16} />
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => handleMove(-1)}
                        disabled={currentIndex === 0}
                        className="btn-icon"
                        style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <button
                        onClick={() => handleMove(1)}
                        disabled={currentIndex === STATUS_ORDER.length - 1}
                        className="btn-icon"
                        style={{ opacity: currentIndex === STATUS_ORDER.length - 1 ? 0.3 : 1, background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
