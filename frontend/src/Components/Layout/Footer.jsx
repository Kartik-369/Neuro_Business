function Footer() {
  return (
    <footer className="bg-amber-50/50 border-t border-stone-200 pt-20 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-15">
          <div className="space-y-4">
            <span className="text-2xl font-roslindale font-bold text-stone-900 block">
              NeuroBusiness
            </span>
            <p className="text-stone-600 text-sm max-w-sm leading-relaxed">
              An end-to-end Machine Learning pipeline built with FastAPI, React, and MongoDB to forecast customer churn and generate retention strategies.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-stone-900 mb-4 tracking-wide uppercase text-xs">Developer Contact</h3>
            <p className="text-stone-500 text-sm mb-4">Please do send feedback or review the repository.</p>
            <a href="mailto:kartikbpadia0707@gmail.com" className="text-black text-sm block mb-2 hover:text-emerald-600 transition">
              kartikbpadia0707@gmail.com
            </a>
            <div className="flex gap-6 text-stone-600 mt-6">
              <a href="https://www.linkedin.com/in/kartike-padia" className="hover:text-stone-900 text-sm transition font-semibold">LinkedIn</a>
              <a href="https://github.com/Kartik-369" className="hover:text-stone-900 text-sm transition font-semibold">GitHub</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-stone-200 pt-8 flex justify-center items-center">
          <p className="text-stone-400 text-xs">
            Built as a B2B SaaS Architecture Demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;