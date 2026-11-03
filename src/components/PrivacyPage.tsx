import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { HYPERVISION_INFO } from '../data/hypervisionData';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050c16] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <article className="section-wrap max-w-4xl">
          <p className="section-kicker">Legal Notice &bull; Governance &bull; Risk Allocation</p>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Privacy, Terms of Use &amp;<br />
            <span className="text-[#1ab7f2]">Comprehensive Liability Disclaimer.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#8fa2b6]">
            This legal document establishes the contractual terms governing the use of the UPES Hypervision website, digital services, hackathon platforms, code repositories, physical activities, hardware labs, and community events.
          </p>
          <div className="mt-4 text-[11px] font-mono uppercase tracking-widest text-[#597187]">
            Effective Date: November 2026 &bull; Bidholi Campus, Dehradun, India
          </div>

          <div className="mt-14 space-y-12 text-[#a8bac9] text-[15px] leading-relaxed">
            {/* Section 1: Comprehensive Limitation of Liability */}
            <section className="border-l-2 border-[#1ab7f2] pl-6 py-2 bg-[#081322] p-6">
              <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold block mb-2">
                Section 01 // Total Limitation of Liability &amp; Disclaimers
              </span>
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                Non-Liability of Hypervision, UPES, Mentors, Sponsors &amp; Partners
              </h2>
              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE JURISDICTIONAL LAW, UNDER NO CIRCUMSTANCES SHALL <strong>UPES HYPERVISION</strong>, THE <strong>UNIVERSITY OF PETROLEUM AND ENERGY STUDIES (UPES)</strong>, THE <strong>SCHOOL OF COMPUTER SCIENCE (SoCS)</strong>, THEIR RESPECTIVE TRUSTEES, FACULTY ADVISORS, FACULTY COORDINATORS, STUDENT PRESIDENTS, EXECUTIVE OFFICERS, ARBITRATORS, VOLUNTEERS, SUCCESSORS, AFFILIATES, CORPORATE PARTNERS, CORPORATE SPONSORS, OR HARDWARE PROVIDERS BE HELD LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES WHATSOEVER.
              </p>
              <p className="mb-4">
                This exclusion encompasses, without limitation:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-[#8fa2b6]">
                <li>Any personal injury, bodily harm, emotional distress, or medical complication arising from participation in hackathons, 24-hour programming marathons, avionics/drone test flights, or electronics laboratory experiments.</li>
                <li>Any loss of, theft of, damage to, or destruction of personal computing devices, hardware prototypes, robotics equipment, luggage, or personal effects brought to UPES campuses or event premises.</li>
                <li>Any digital loss, database corruption, software defect, security breach, server outage, judging arbitration variance, or intellectual property dispute occurring on platforms such as Code Hustle Live or Internal SIH Matrix.</li>
                <li>Any event postponement, cancellation, venue relocation, award modification, prize fund adjustment, or sponsor retraction caused by academic schedules, weather, force majeure, or institutional directives.</li>
                <li>Any third-party conduct, attendee actions, vendor failures, external platform dependencies (including GitHub, Vercel, or Supabase), or linked web resources.</li>
              </ul>
              <p className="mt-4 text-xs font-mono text-[#788e9f]">
                PARTICIPATION IN ALL HYPERVISION PROGRAMS, COMPETITIONS, WORKSHOPS, AND DIGITAL INTERACTIONS IS UNDERTAKEN VOLUNTARILY AND SOLELY AT THE PARTICIPANT&apos;S OWN DISCRETION AND RISK.
              </p>
            </section>

            {/* Section 2: Hardware, Laboratory & Competition Assumption of Risk */}
            <section>
              <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold block mb-2">
                Section 02 // Assumption of Risk
              </span>
              <h2 className="font-display text-2xl font-bold text-white mb-3">
                Laboratory Equipment, Drone Avionics &amp; Midnight Hackathons
              </h2>
              <p>
                Hypervision conducts hands-on technical initiatives involving autonomous aerial systems (under MeitY SwaYaan / NIT Kurukshetra initiatives), high-density electrical test benches, and continuous 24-hour overnight hackathons. Participants acknowledge that working with lithium batteries, rotating propellers, printed circuit boards, high-concurrency servers, and sleep-deprived competitive sprints carries inherent risks. Participants warrant that they will observe all campus safety protocols, laboratory guidelines, and fire regulations at all times.
              </p>
            </section>

            {/* Section 3: Data Privacy & Information Architecture */}
            <section>
              <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold block mb-2">
                Section 03 // Privacy &amp; Data Collection
              </span>
              <h2 className="font-display text-2xl font-bold text-white mb-3">
                Information Collected &amp; Processing Standards
              </h2>
              <p className="mb-4">
                Hypervision collects only telemetry and personal data strictly necessary to facilitate society administration, event registration, hackathon team arbitration, and recruitment:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#8fa2b6] mb-4">
                <li><strong>Identity Data:</strong> Full legal name, UPES student SAP ID, institutional email address, and phone contact.</li>
                <li><strong>Technical Profile:</strong> GitHub handle, LinkedIn profile URL, project repository links, and technology track selections.</li>
                <li><strong>Event Data:</strong> Team affiliations, code submissions, real-time rubric scores, and attendance timestamps.</li>
              </ul>
              <p>
                We do not sell, rent, monetize, or commercialize personal information to data brokers or third-party advertisers. Information may be stored securely via cloud infrastructure (including Supabase and local encrypted caches) to deliver administrative functionality.
              </p>
            </section>

            {/* Section 4: Intellectual Property & Participant Projects */}
            <section>
              <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold block mb-2">
                Section 04 // Intellectual Property
              </span>
              <h2 className="font-display text-2xl font-bold text-white mb-3">
                Ownership of Student Code &amp; Prototypes
              </h2>
              <p>
                Participants retain full ownership of the original code, designs, and hardware architectures authored during hackathons and workshops, subject to any open-source licenses chosen by the authors. By submitting projects to Hypervision competitions, participants grant Hypervision and UPES a non-exclusive, perpetual, royalty-free license to display, archive, demonstrate, and photograph the project for academic, non-commercial, and promotional publications.
              </p>
            </section>

            {/* Section 5: Third-Party Ecosystem Links */}
            <section>
              <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold block mb-2">
                Section 05 // External Links
              </span>
              <h2 className="font-display text-2xl font-bold text-white mb-3">
                Sponsor Platforms &amp; External Infrastructure
              </h2>
              <p>
                This website and event documentation contain references and outbound hyperlinks to external platforms (including Decathlon, GeeksforGeeks, NIT Kurukshetra, W3Grads, WICCI, Devpost, GitHub, and Discord). Hypervision exercises no editorial control over third-party terms, privacy policies, or platform availability, and assumes zero legal responsibility for third-party operations.
              </p>
            </section>

            {/* Section 6: Governance Contact */}
            <section className="pt-8 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold block mb-2">
                Section 06 // Contact &amp; Grievances
              </span>
              <h2 className="font-display text-2xl font-bold text-white mb-3">
                Institutional Contact Point
              </h2>
              <p>
                Inquiries regarding this legal policy or requests for data deletion may be directed to the Hypervision Executive Council:
              </p>
              <div className="mt-4 p-4 bg-[#081322] border border-white/10 font-mono text-xs text-[#8fa2b6] space-y-1">
                <p>Email: <a href={`mailto:${HYPERVISION_INFO.email}`} className="text-[#1ab7f2] underline">{HYPERVISION_INFO.email}</a></p>
                <p>Department: School of Computer Science (SoCS), UPES Dehradun</p>
                <p>Campus: Energy Acres, P.O. Bidholi via Prem Nagar, Dehradun, Uttarakhand 248007</p>
              </div>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
