import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { HYPERVISION_INFO } from '../data/hypervisionData';
import { HypervisionLogo } from './HypervisionLogo';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    sapId: '',
    year: '1st Year',
    domain: 'AI & Machine Learning',
    githubPortfolio: '',
    statement: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.sapId.trim()) {
      setErrorMsg('Please complete all required fields (Name, UPES Email, SAP ID).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    const genId = `HV-${Date.now().toString().slice(-6)}`;
    setApplicationId(genId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      sapId: '',
      year: '1st Year',
      domain: 'AI & Machine Learning',
      githubPortfolio: '',
      statement: ''
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="glass-modal rounded-sm max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-300 hover:text-white glass-pill rounded-sm cursor-pointer"
          aria-label="Close application form"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="border-b border-white/[0.08] pb-5 mb-6 flex items-start gap-4">
              <HypervisionLogo size={42} className="mt-1" />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                  School of Computer Science, UPES
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white mt-0.5">
                  Apply to UPES HyperVision
                </h3>
                <p className="text-xs text-neutral-300/80 font-light mt-1">
                  Submit your credentials to join our engineering, research, and creative cohorts.
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-mono rounded-sm">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Aryan Sharma"
                    className="w-full px-3.5 py-2.5 glass-input text-white text-sm rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                    UPES SAP ID <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sapId}
                    onChange={(e) => setFormData({ ...formData, sapId: e.target.value })}
                    placeholder="e.g. 500091234"
                    className="w-full px-3.5 py-2.5 glass-input text-white text-sm rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                    Student Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@stu.upes.ac.in"
                    className="w-full px-3.5 py-2.5 glass-input text-white text-sm rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                    Academic Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 glass-input text-white text-sm rounded-sm [&>option]:bg-neutral-900 [&>option]:text-white"
                  >
                    <option value="1st Year">1st Year (B.Tech / BCA)</option>
                    <option value="2nd Year">2nd Year (B.Tech / BCA)</option>
                    <option value="3rd Year">3rd Year (B.Tech)</option>
                    <option value="4th Year">4th Year (B.Tech)</option>
                    <option value="Postgraduate">Postgraduate (M.Tech / MCA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                  Primary Domain of Interest
                </label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-3.5 py-2.5 glass-input text-white text-sm rounded-sm [&>option]:bg-neutral-900 [&>option]:text-white"
                >
                  <option value="AI & Machine Learning">AI & Machine Learning (Neural Models & Edge Vision)</option>
                  <option value="Autonomous Robotics & Avionics">Autonomous Robotics & Drone Avionics (SwaYaan)</option>
                  <option value="Distributed Web & Systems">Distributed Web & Systems (Code Hustle Engine)</option>
                  <option value="Cybersecurity">Cybersecurity & Systems Hardening</option>
                  <option value="Design & Visual Identity">Design, Typography & UI/UX</option>
                  <option value="Operations & Events">Operations, Hackathons & Event Execution</option>
                  <option value="PR & Outreach">PR, Outreach & Sponsorship Relations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                  GitHub / Portfolio / LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.githubPortfolio}
                  onChange={(e) => setFormData({ ...formData, githubPortfolio: e.target.value })}
                  placeholder="https://github.com/your-username"
                  className="w-full px-3.5 py-2.5 glass-input text-white text-sm rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1">
                  Why HyperVision? (Brief motivation or projects built)
                </label>
                <textarea
                  rows={3}
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  placeholder="Tell us what technologies you are passionate about or what you want to build with HyperVision..."
                  className="w-full px-3.5 py-2.5 glass-input text-white text-sm rounded-sm resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/[0.08]">
                <span className="text-[11px] font-mono text-neutral-400">
                  Reviewed by Faculty & Domain Heads
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 transition-colors rounded-sm cursor-pointer shadow-md"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(56,189,248,0.25)]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                Application Received
              </span>
              <h3 className="font-display text-3xl font-extrabold uppercase text-white">
                Welcome, {formData.fullName}
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto mt-2 font-light">
                Your induction application for the <strong className="text-white">{formData.domain}</strong> track has been registered with reference ID:
              </p>
              <div className="mt-3 inline-block px-4 py-1.5 glass-card font-mono text-sm text-cyan-300">
                {applicationId}
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-md mx-auto font-mono">
              The recruitment panel and domain leads will communicate the technical task & interview schedule to <span className="text-white">{formData.email}</span>.
            </p>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 transition-colors rounded-sm cursor-pointer shadow-md"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
