'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * The team drawn as a structural elevation.
 *
 * Levels run bottom-up the way a building does: Sanjay at ±00 carries the
 * 1991 foundation, Roshan frames the floor above, Niranjan the newest level.
 * Scrolling down walks the load path into the ground, so the section closes
 * on the same date its heading opens with.
 *
 * Bios are third-person throughout; quotes belong to the two founders only,
 * which is the distinction rather than an omission.
 */
type Member = {
  level: string;
  name: string;
  role: string;
  accent: string;
  photo: string;
  bio: string;
  quote?: string;
};

const TEAM: Member[] = [
  {
    level: 'LVL +2',
    name: 'Niranjan Saxena',
    role: 'Digital Operations Manager',
    accent: '#30D158',
    photo: '/developer.png',
    bio: "Overseeing RCC's digital operations, technology initiatives and online presence, Niranjan focuses on improving efficiency, communication and client experience through modern digital solutions. A Computer Science student specialising in Artificial Intelligence, he brings a technology-driven approach to building and strengthening RCC's digital ecosystem.",
  },
  {
    level: 'LVL +1',
    name: 'Roshan Saxena',
    role: 'Founder & Managing Director',
    accent: '#0A84FF',
    photo: '/roshan.png',
    bio: "A strategic mind steering RCC's day-to-day operations and client relationships, Roshan brings the discipline and focus that carries every project from foundation to final handover. As Managing Director, he holds the company's work to a standard of uncompromising quality and a relentless pursuit of perfection, ensuring that every project consistently exceeds client expectations.",
    quote:
      'True luxury lies in the details. From the foundation to the final finishes, our philosophy is rooted in uncompromising quality and a relentless pursuit of perfection for our clients.',
  },
  {
    level: 'LVL ±00',
    name: 'Sanjay Saxena',
    role: 'Founder & CEO',
    accent: '#FFD60A',
    photo: '/sanjay.png',
    bio: 'A visionary leader whose rich experience spans from Executive Engineer (Civil) at BSNL to Central Government Consultant for NESTS — Ministry of Tribal Affairs, Government of India — across Madhya Pradesh and Chhattisgarh, bringing immense technical capacity to the company. His 35 years of rich technical experience have helped the company successfully execute projects with 100% client satisfaction.',
    quote:
      "We didn't just want to build structures; we wanted to engineer legacies. Every project we undertake is a testament to our commitment to pushing the boundaries of what's possible in modern architecture.",
  },
];

/** Column centre line, measured from the left edge of the drawing. */
const RAIL = 'left-[26px] md:left-[150px]';
const CARD_PAD = 'pl-[64px] md:pl-[196px]';

function Level({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative group"
    >
      {/* Level marker — the drawing convention used on RCC's own sheets */}
      <div className="hidden md:block absolute left-0 top-9 w-[130px] text-right">
        <span
          className="font-mono text-[11px] font-bold tracking-[0.18em] transition-colors duration-300"
          style={{ color: member.accent }}
        >
          {member.level}
        </span>
      </div>

      {/* Slab line — runs from the column out under the card, and extends on hover */}
      <div className={`absolute top-10 right-0 ${RAIL} h-px bg-white/10 pointer-events-none`}>
        <div
          className="h-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
          style={{ background: `linear-gradient(to right, ${member.accent}66, transparent)` }}
        />
      </div>

      {/* Node where this level meets the column */}
      <div
        className={`absolute top-10 ${RAIL} -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 bg-background z-10 transition-all duration-300 group-hover:scale-125`}
        style={{ borderColor: member.accent, boxShadow: `0 0 0 4px rgba(10,10,10,0.9), 0 0 18px ${member.accent}55` }}
      />

      <div className={`${CARD_PAD} pb-14 md:pb-20`}>
        <div className="glass-card-premium !rounded-2xl p-6 sm:p-8 border border-white/5 bg-black/40 backdrop-blur-3xl transition-all duration-500 group-hover:border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-7">
            {/* Portrait */}
            <div className="shrink-0">
              <div
                className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 transition-all duration-500"
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
              <p className="md:hidden mt-2 text-center font-mono text-[10px] font-bold tracking-[0.18em]" style={{ color: member.accent }}>
                {member.level}
              </p>
            </div>

            {/* Detail */}
            <div className="min-w-0 flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">{member.name}</h3>
              <p className="text-sm font-semibold mb-4" style={{ color: member.accent }}>
                {member.role}
              </p>
              <p className="text-white/60 text-sm leading-relaxed font-light">{member.bio}</p>

              {member.quote && (
                <blockquote
                  className="mt-5 pl-4 border-l-2 text-sm italic text-foreground/80 leading-relaxed"
                  style={{ borderColor: `${member.accent}55` }}
                >
                  &ldquo;{member.quote}&rdquo;
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamElevation() {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Grid bubble, as on a structural drawing */}
      <div className={`absolute top-0 ${RAIL} -translate-x-1/2 z-10`}>
        <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center bg-background">
          <span className="font-mono text-[11px] font-bold text-white/50">A</span>
        </div>
      </div>

      {/* The column — a continuous load path through every level */}
      <div className={`absolute top-9 bottom-[86px] ${RAIL} -translate-x-1/2 w-[14px] pointer-events-none`}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-white/[0.03] border-x border-white/10" />
        {/* hatch, read as reinforcement */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 6px)',
          }}
        />
      </div>

      <div className="pt-14">
        {TEAM.map((m, i) => (
          <Level key={m.name} member={m} index={i} />
        ))}
      </div>

      {/* Foundation — the section closes on the date its heading opens with */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="h-px bg-white/15 mb-2" />
        <div
          className="relative h-[72px] rounded-b-lg border-x border-b border-white/10 overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 7px)',
          }}
        >
          <div className="text-center">
            <p className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.3em] text-white/45 uppercase">
              Foundation
            </p>
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-accent-yellow/70 mt-1">
              EST. 1991
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
