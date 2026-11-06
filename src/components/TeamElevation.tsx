'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Seal from './Seal';

/**
 * The team as a front elevation: three bays side by side. (It read as stacked
 * levels before, which put the people in a hierarchy the row does not.)
 *
 * Each person carries a seal — the round stamp a registered professional
 * presses onto a drawing. The ring names the role, not a licence number: the
 * registrations on RCC's letterhead belong to the firm, and are shown on the
 * credentials card opened from the hero rather than under any one name.
 *
 * Bios are third-person throughout; each bay then speaks for itself in a
 * quote.
 */
type Member = {
  name: string;
  /** Monogram in the middle of the seal, and its SVG id prefix. */
  initials: string;
  /** Curved along the top of the seal — about 18 characters is the limit. */
  sealRole: string;
  role: string;
  accent: string;
  photo: string;
  bio: string;
  quote: string;
};

// Left to right: the 1991 foundation first, then the levels built on it.
const TEAM: Member[] = [
  {
    name: 'Sanjay Saxena',
    initials: 'SS',
    sealRole: 'FOUNDER & CEO',
    role: 'Founder & CEO',
    accent: '#FFD60A',
    photo: '/sanjay.png',
    bio: 'A visionary leader whose rich experience spans from Executive Engineer (Civil) at BSNL to Central Government Consultant for NESTS — Ministry of Tribal Affairs, Government of India — across Madhya Pradesh and Chhattisgarh, bringing immense technical capacity to the company. His 35 years of rich technical experience have helped the company successfully execute projects with 100% client satisfaction.',
    quote:
      "We didn't just want to build structures; we wanted to engineer legacies. Every project we undertake is a testament to our commitment to pushing the boundaries of what's possible in modern architecture.",
  },
  {
    name: 'Roshan Saxena',
    initials: 'RS',
    sealRole: 'MANAGING DIRECTOR',
    role: 'Founder & Managing Director',
    accent: '#0A84FF',
    photo: '/roshan.png',
    bio: "A strategic mind steering RCC's day-to-day operations and client relationships, Roshan brings the discipline and focus that carries every project from foundation to final handover. As Managing Director, he holds the company's work to a standard of uncompromising quality and a relentless pursuit of perfection, ensuring that every project consistently exceeds client expectations.",
    quote:
      'True luxury lies in the details. From the foundation to the final finishes, our philosophy is rooted in uncompromising quality and a relentless pursuit of perfection for our clients.',
  },
  {
    name: 'Niranjan Saxena',
    initials: 'NS',
    sealRole: 'DIGITAL OPERATIONS',
    role: 'Digital Operations Manager',
    accent: '#30D158',
    photo: '/developer.png',
    bio: "Overseeing RCC's digital operations, technology initiatives and online presence, Niranjan focuses on improving efficiency, communication and client experience through modern digital solutions. A Computer Science student specialising in Artificial Intelligence, he brings a technology-driven approach to building and strengthening RCC's digital ecosystem.",
    quote:
      'Thirty-five years of site knowledge is only worth as much as the hands it reaches. My work is putting that experience in front of a client clearly — so the quality is visible long before anyone sets foot on site.',
  },
];

function Bay({ member, index }: { member: Member; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="h-full flex flex-col glass-card-premium !rounded-2xl p-7 sm:p-8 border border-white/5 bg-black/40 backdrop-blur-3xl transition-all duration-500 group-hover:border-white/10">
        {/* Portrait, with the seal pressed into its corner */}
        <div className="relative mx-auto w-32 h-32 mb-5">
          <div
            className="relative w-full h-full rounded-full overflow-hidden border-2 transition-all duration-500"
            style={{ borderColor: `${member.accent}40` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="128px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div
            className="absolute -bottom-1 -right-4 w-[64px] h-[64px] rotate-[-9deg] opacity-85 transition-all duration-500 ease-out group-hover:rotate-0 group-hover:opacity-100 group-hover:scale-110"
            style={{ filter: `drop-shadow(0 2px 12px ${member.accent}45)` }}
          >
            <Seal
              id={member.initials}
              top={member.sealRole}
              center={member.initials}
              accent={member.accent}
            />
          </div>
        </div>

        <h3 className="text-center text-xl font-bold text-white tracking-wide">{member.name}</h3>
        <p className="text-center text-sm font-semibold mb-5" style={{ color: member.accent }}>
          {member.role}
        </p>

        <p className="text-white/60 text-sm leading-relaxed font-light">{member.bio}</p>

        <blockquote
          className="mt-auto pt-6 pl-4 border-l-2 text-sm italic text-foreground/80 leading-relaxed"
          style={{ borderColor: `${member.accent}55` }}
        >
          &ldquo;{member.quote}&rdquo;
        </blockquote>
      </div>
    </motion.article>
  );
}

export default function TeamElevation() {
  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {TEAM.map((member, i) => (
          <Bay key={member.name} member={member} index={i} />
        ))}
      </div>
    </div>
  );
}
