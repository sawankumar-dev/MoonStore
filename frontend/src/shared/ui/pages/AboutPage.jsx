import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";

const teamMembers = [
  {
    id: 1,
    name: "Sawan Kumar",
    role: "Founder & CEO",
    initials: "SK",
    description:
      "Visionary behind MoonStore, leading product strategy, innovation, and business growth.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "mailto:sawan@example.com",
    website: "https://moonstore.com",
  },
  {
    id: 2,
    name: "Amit Kumar Sharma",
    role: "Frontend Developer",
    initials: "AK",
    description:
      "Passionate React developer focused on building scalable, responsive, and user-friendly web applications.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "mailto:amit@example.com",
    website: "https://portfolio.com",
  },
];

// ─── Animation Variants ───
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const teamCard = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const socialIcon = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* ─── Hero Section ─── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto px-6 py-20 text-center"
      >
        <motion.span
          variants={fadeUp}
          className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-400"
        >
          About MoonStore
        </motion.span>

        <motion.h1 variants={fadeUp} className="mt-6 text-5xl font-bold">
          Building the Future of
          <span className="text-emerald-400"> E-Commerce</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-3xl text-slate-400 leading-8"
        >
          MoonStore is a modern e-commerce platform designed with speed,
          simplicity, and scalability in mind. Our mission is to provide
          customers with a seamless shopping experience while empowering
          developers with clean architecture and modern technologies.
        </motion.p>
      </motion.section>

      {/* ─── Mission Cards ─── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-6xl mx-auto px-6 pb-20"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "🚀 Our Mission",
              text: "Deliver premium shopping experiences through modern web technologies and user-centric design.",
            },
            {
              title: "💡 Our Vision",
              text: "Build scalable digital commerce platforms that simplify online business for everyone.",
            },
            {
              title: "❤️ Our Values",
              text: "Innovation, transparency, quality, teamwork, and customer satisfaction are at the core of everything we build.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{
                y: -6,
                borderColor: "rgba(16, 185, 129, 0.4)",
                transition: { duration: 0.25 },
              }}
              className="rounded-2xl border border-slate-800 bg-[#0d111c] p-8 cursor-default"
            >
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                viewport={{ once: true }}
                className="text-xl font-semibold text-emerald-400"
              >
                {card.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                viewport={{ once: true }}
                className="mt-4 text-slate-400 leading-7"
              >
                {card.text}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─── Team Section ─── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center"
        >
          <motion.h2 variants={fadeUp} className="text-4xl font-bold">
            Meet Our Team
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-3 text-slate-400">
            The people behind MoonStore.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-14 grid gap-8 md:grid-cols-2"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              variants={teamCard}
              whileHover={{
                y: -8,
                borderColor: "rgba(16, 185, 129, 0.5)",
                transition: { duration: 0.3 },
              }}
              className="rounded-2xl border border-slate-800 bg-[#0d111c] p-8 cursor-default"
            >
              {/* Avatar with pop animation */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2 + index * 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                }}
                viewport={{ once: true }}
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 text-3xl font-bold shadow-lg shadow-emerald-500/20"
              >
                {member.initials}
              </motion.div>

              <motion.h3
                variants={fadeUp}
                className="mt-6 text-center text-2xl font-bold"
              >
                {member.name}
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="text-center font-medium text-emerald-400"
              >
                {member.role}
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-center leading-7 text-slate-400"
              >
                {member.description}
              </motion.p>

              {/* Social Icons with stagger */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-8 flex justify-center gap-5"
              >
                {[
                  { href: member.linkedin, icon: <CiLinkedin size={20} />, hover: "hover:bg-blue-600" },
                  { href: member.github, icon: <FaGithub size={20} />, hover: "hover:bg-black" },
                  { href: member.email, icon: <CiMail size={20} />, hover: "hover:bg-red-500" },
                  { href: member.website, icon: <CiGlobe size={20} />, hover: "hover:bg-emerald-500" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    variants={socialIcon}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`rounded-lg bg-slate-800 p-3 transition-colors ${social.hover}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;