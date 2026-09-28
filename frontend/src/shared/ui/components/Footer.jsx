import React from "react";

const Footer = () => {
  return (
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Bottom Footer */}
        <div className="border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">
              MoonStore
            </span>. All Rights Reserved.
          </p>

          <p>
            Built with ❤️ using{" "}
            <span className="font-medium text-emerald-400">
              React.js, Redux Toolkit & Tailwind CSS
            </span>
          </p>

        </div>
      </div>
  );
};

export default Footer;