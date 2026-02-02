import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddJobModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        link: '',
        salary: '',
        notes: '',
        status: 'discovered'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }} onClick={onClose}>
            <div
                className="glass-panel"
                style={{ width: '100%', maxWidth: '500px', padding: '2rem', background: '#1e293b', border: '1px solid #334155' }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'white' }}>Add New Lead</h2>
                    <button onClick={onClose} className="btn-icon"><X /></button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Company</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Google"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Position</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Senior Developer"
                            value={formData.position}
                            onChange={e => setFormData({ ...formData, position: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Salary (Optional)</label>
                            <input
                                type="text"
                                placeholder="$120k"
                                value={formData.salary}
                                onChange={e => setFormData({ ...formData, salary: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Status</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                                style={{
                                    width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', borderRadius: '0.75rem'
                                }}
                            >
                                <option value="discovered">Discovered</option>
                                <option value="applied">Applied</option>
                                <option value="interviewing">Interviewing</option>
                                <option value="offer">Offer</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Job Link</label>
                        <input
                            type="url"
                            placeholder="https://..."
                            value={formData.link}
                            onChange={e => setFormData({ ...formData, link: e.target.value })}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Notes</label>
                        <textarea
                            rows="3"
                            placeholder="Key requirements, referral info..."
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            style={{
                                width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)',
                                border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', borderRadius: '0.75rem'
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Add Opportunity
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddJobModal;
