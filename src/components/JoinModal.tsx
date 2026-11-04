import React, { useState } from 'react';
import { saveSignup } from '../data/contentStore';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [track, setTrack] = useState('Engineering & Distributed Systems');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await saveSignup({
      email,
      name,
      track,
      source: 'cohort_application',
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#02060c]/90 backdrop-blur-md p-5 sm:p-10 overflow-y-auto flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="max-w-xl w-full bg-[#081322] border border-[#1ab7f2]/40 p-6 sm:p-10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start border-b border-white/10 pb-5">
          <div>
            <p className="section-kicker">Society Recruitment &bull; Cohort 2026</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
              Come build<br />
              <span className="text-[#1ab7f2]">with Hypervision.</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[11px] font-mono uppercase tracking-widest text-[#788e9f] hover:text-white border border-white/20 px-3 py-1.5"
          >
            Close
          </button>
        </div>

        {submitted ? (
          <div className="py-12">
            <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold block mb-2">
              Application Dispatched
            </span>
            <h3 className="font-display text-3xl font-bold text-white">
              Thank you, {name}.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#8fa2b6]">
              Your registration has been logged with the Hypervision Executive Board. We will review your track preferences and follow up via student email.
            </p>
            <button
              className="editorial-button primary mt-8"
              onClick={onClose}
            >
              Return to Website
            </button>
          </div>
        ) : (
          <form
            className="pt-6 space-y-4"
            onSubmit={handleSubmit}
          >
            <label className="block">
              <span className="admin-label">Full Legal Name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Purva Monga"
                className="admin-input"
              />
            </label>

            <label className="block">
              <span className="admin-label">UPES Student Email Address</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@stu.upes.ac.in"
                className="admin-input"
              />
            </label>

            <label className="block">
              <span className="admin-label">Target Technical Track</span>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="admin-input"
              >
                <option>Engineering &amp; Distributed Systems</option>
                <option>AI / Machine Learning &amp; Computer Vision</option>
                <option>Autonomous Drones &amp; Embedded Firmware</option>
                <option>Visual Systems &amp; Brand Creative Direction</option>
                <option>Hackathon Operations &amp; Event Infrastructure</option>
                <option>Institutional PR &amp; Ecosystem Alliances</option>
              </select>
            </label>

            <label className="block">
              <span className="admin-label">Prior Projects or Motivation (GitHub, Portfolio, or Summary)</span>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share working projects you built, technologies you explore, or what you want to achieve with Hypervision..."
                className="admin-input resize-y"
              />
            </label>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="editorial-button primary w-full text-center disabled:opacity-50"
              >
                {isSubmitting ? 'Registering Application...' : 'Submit Society Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
