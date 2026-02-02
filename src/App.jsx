import React, { useState } from 'react';
import { useJobs } from './hooks/useJobs';
import JobCard from './components/JobCard';
import AddJobModal from './components/AddJobModal';
import { Plus, LayoutDashboard, Search, Filter } from 'lucide-react';

const STATUS_LABELS = {
  discovered: 'Discovered',
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer',
  rejected: 'Archived'
};

const STATUS_COLORS = {
  discovered: 'border-t-4 border-blue-500',
  applied: 'border-t-4 border-purple-500',
  interviewing: 'border-t-4 border-yellow-500',
  offer: 'border-t-4 border-green-500',
  rejected: 'border-t-4 border-slate-600'
};

function App() {
  const { jobs, addJob, updateJobStatus, deleteJob } = useJobs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job =>
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColumnJobs = (status) => filteredJobs.filter(job => job.status === status);

  const stats = {
    total: jobs.length,
    active: jobs.filter(j => ['applied', 'interviewing'].includes(j.status)).length,
    offers: jobs.filter(j => j.status === 'offer').length
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-panel" style={{ borderRadius: 0, border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--accent-gradient)', padding: '8px', borderRadius: '8px' }}>
              <LayoutDashboard color="white" size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem' }}>Job Hunt OS</h1>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>track, manage, win</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
            <div><strong style={{ color: 'white', fontSize: '1.1rem' }}>{stats.total}</strong> Total</div>
            <div><strong style={{ color: '#3b82f6', fontSize: '1.1rem' }}>{stats.active}</strong> Active</div>
            <div><strong style={{ color: '#10b981', fontSize: '1.1rem' }}>{stats.offers}</strong> Offers</div>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <Plus size={18} style={{ marginRight: '8px' }} /> Add Lead
          </button>
        </div>
      </header>

      {/* Main Board */}
      <main className="container" style={{ paddingTop: '2rem' }}>

        {/* Search Bar */}
        <div style={{ marginBottom: '2rem', maxWidth: '400px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search company or position..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        {/* Kanban Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start'
        }}>
          {Object.keys(STATUS_LABELS).map(status => (
            <div key={status} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.5rem', borderBottom: `2px solid ${status === 'rejected' ? '#475569' : '#3b82f6'}`,
                borderColor: status === 'offer' ? '#10b981' : (status === 'interviewing' ? '#eab308' : (status === 'applied' ? '#8b5cf6' : undefined))
              }}>
                <h3 style={{ fontSize: '1rem', color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>
                  {STATUS_LABELS[status]}
                </h3>
                <span style={{
                  background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', color: '#94a3b8'
                }}>
                  {getColumnJobs(status).length}
                </span>
              </div>

              <div style={{ minHeight: '200px' }}>
                {getColumnJobs(status).map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onStatusChange={updateJobStatus}
                    onDelete={deleteJob}
                  />
                ))}
                {getColumnJobs(status).length === 0 && (
                  <div style={{
                    padding: '2rem', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.9rem'
                  }}>
                    Empty
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {isModalOpen && <AddJobModal onClose={() => setIsModalOpen(false)} onAdd={addJob} />}
    </div>
  );
}

export default App;
