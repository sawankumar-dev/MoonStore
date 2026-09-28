import { useLocation, Outlet } from "react-router";
import { motion } from "framer-motion";

import Navbar from "../../shared/ui/components/Navbar";
import Footer from "../../shared/ui/components/Footer";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="bg-linear-to-b from-gray-950 to-gray-900 min-h-screen text-gray-100 selection:bg-green-500/30 antialiased pb-12 pt-4 relative overflow-x-hidden">

      {/* Background glow */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Navbar */}
      <header className="sticky top-3 z-50 px-4 md:px-0 backdrop-blur-md mt-4">
        <Navbar />
      </header>

      {/* Page */}
      <main className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">

        <motion.div
          key={location.pathname}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
        >
          <Outlet />
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="border-t absolute bottom-0 w-full pb-5 border-slate-800 mt-5">
        <Footer />
      </footer>

    </div>
  );
};

export default MainLayout;