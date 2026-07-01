import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, ArrowUpRight, Linkedin } from "lucide-react";
import { ExecutiveProfile } from '@/app/data/leadership';

function LeaderCard({ leader }: { leader: ExecutiveProfile }) {
    const [open, setOpen] = useState(false);

    return (
        <div id={`leader-row-${leader.id}`}
            className={`group border-b transition-colors duration-300 ${open ? "border-[#C89B3C]" : "border-[rgba(200,155,60,0.15)]"}`}
        >
            {/* Collapsed header row */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-6 py-6 px-0 text-left"
                aria-expanded={open}
            >
                {/* Index */}
                <span
                    className="font-['DM_Mono'] text-xs tracking-widest shrink-0 w-8 transition-colors duration-300"
                    style={{ color: open ? "#C89B3C" : "#4a4535" }}
                >
                    0{leader.id}
                </span>

                {/* Photo thumbnail */}
                <div
                    className={`relative shrink-0 w-14 h-14 rounded-sm overflow-hidden bg-[#1a1a1a] transition-all duration-500 ${open ? "ring-1 ring-[#C89B3C]" : "ring-0"}`}
                >
                    <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    {!open && (
                        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-0" />
                    )}
                </div>

                {/* Name + title */}
                <div className="flex-1 min-w-0">
                    <h3
                        className="font-['Barlow'] text-base md:text-lg font-extrabold tracking-wide truncate transition-colors duration-300"
                        style={{ color: open ? "#C89B3C" : "#f0ead6" }}
                    >
                        {leader.name}
                    </h3>
                    <p className="text-xs md:text-sm font-['Inter'] font-light tracking-widest uppercase mt-0.5 text-[#8a8070] truncate">
                        {leader.role}
                    </p>
                </div>

                {/* Department pill — hidden on mobile */}
                <span className="hidden md:block font-['DM_Mono'] text-xs uppercase tracking-widest px-3 py-1 border border-[rgba(200,155,60,0.2)] text-[#8a8070] shrink-0">
                    {leader.department}
                </span>

                {/* Tenure — hidden on mobile */}
                {/* <span className="hidden lg:block font-['Inter'] text-xs text-[#4a4535] shrink-0 w-32 text-right">
                {leader.tenure}
                </span> */}

                {/* Toggle icon */}
                <div
                    className="shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-300"
                    style={{
                        borderColor: open ? "#C89B3C" : "rgba(200,155,60,0.2)",
                        color: open ? "#C89B3C" : "#4a4535",
                    }}
                >
                    {open ? <Minus size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}
                </div>
            </button>

            {/* Expanded panel */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-10 px-0 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
                            {/* Left: large photo */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-[#111] rounded-sm">
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                {/* <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-['Inter'] text-sm italic font-light leading-relaxed text-[#f0ead6]/80">
                      "{leader.quote}"
                    </p>
                  </div> */}
                            </div>

                            {/* Right: details */}
                            <div className="flex flex-col gap-7">
                                {/* Bio */}
                                <div>
                                    <span className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#C89B3C] block mb-3">
                                        About
                                    </span>
                                    <p className="font-['Inter'] text-[18px] justify-center font-light leading-relaxed text-[#c8c0a8]">
                                        {leader.shortBio}
                                    </p>
                                </div>

                                {/* Achievements */}
                                {/* <div>
                    <span className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#C89B3C] block mb-3">
                      Key Achievements
                    </span>
                    <ul className="space-y-2">
                      {leader.achievements.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="mt-1.5 shrink-0 w-1 h-1 rounded-full"
                            style={{ backgroundColor: "#C89B3C" }}
                          />
                          <span className="font-['Inter'] text-sm font-light text-[#c8c0a8] leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div> */}

                                {/* Expertise */}
                                {/* <div>
                    <span className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#C89B3C] block mb-3">
                      Areas of Expertise
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((tag) => (
                        <span
                          key={tag}
                          className="font-['DM_Mono'] text-[11px] uppercase tracking-widest px-3 py-1 border border-[rgba(200,155,60,0.25)] text-[#8a8070]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div> */}

                                {/* LinkedIn link */}
                                {/* <div className="mt-auto pt-2">
                    <a
                      href={leader.linkedin}
                      className="inline-flex items-center gap-2 font-['Inter'] text-xs uppercase tracking-widest text-[#C89B3C] hover:text-[#e0b85a] transition-colors duration-200 group/link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Linkedin size={13} />
                      <span>View Profile</span>
                      <ArrowUpRight
                        size={12}
                        className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </a>
                  </div> */}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default LeaderCard;