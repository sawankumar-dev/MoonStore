import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Package, Users, Star } from "lucide-react";
import { useSelector } from "react-redux";

// ─── Stagger Animation Config ───
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // smooth ease-out
    },
  },
};

const statCard = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const HomePage = () => {
  const [greeting, setGreeting] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("☀️ Good Morning");
    else if (hour < 17) setGreeting("🌤️ Good Afternoon");
    else setGreeting("🌙 Good Evening");
  }, []);

  const stats = [
    { title: "Products", value: "500+", icon: <Package size={22} /> },
    { title: "Customers", value: "10K+", icon: <Users size={22} /> },
    { title: "Brands", value: "50+", icon: <ShoppingBag size={22} /> },
    { title: "Rating", value: "4.9★", icon: <Star size={22} /> },
  ];

  return (
    <section className="relative overflow-hidden text-white">
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
        
        {/* ─── Animated Container ─── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Greeting Badge */}
          <motion.span
            variants={item}
            className="mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400"
          >
          {greeting}, {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "Guest"} 👋
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="max-w-4xl text-5xl font-extrabold leading-tight md:text-6xl"
          >
            Discover the Future of
            <span className="text-emerald-400"> Online Shopping</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-400"
          >
            Explore premium products, trusted brands, secure payments, and
            lightning-fast delivery—all in one modern shopping destination.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
            >
              Explore Store
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-lg border border-slate-700 px-6 py-3 font-semibold transition hover:border-emerald-500 hover:text-emerald-400"
            >
              Featured Products
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ─── Stats Grid (separate stagger) ─── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 grid w-full max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((itemData, index) => (
            <motion.div
              key={index}
              variants={statCard}
              whileHover={{
                y: -8,
                borderColor: "rgba(16, 185, 129, 0.5)",
                transition: { duration: 0.25 },
              }}
              className="rounded-2xl border border-slate-800 bg-[#0d111c] p-6 cursor-default"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                className="mb-4 flex justify-center text-emerald-400"
              >
                {itemData.icon}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-3xl font-bold"
              >
                {itemData.value}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 + index * 0.1 }}
                className="mt-2 text-slate-400"
              >
                {itemData.title}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomePage;