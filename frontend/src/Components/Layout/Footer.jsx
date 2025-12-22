function Footer() {
  return (
    <footer className="bg-amber-50/50 border-t border-stone-200 pt-20 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-15">
          <div className="space-y-2">
            <span className="text-2xl font-roslindale font-bold text-stone-900 block">
              Company
            </span>
            <ul className="space-y-3 text-stone-600 text-sm">
              <li><a href="" className="hover:text-emerald-600 transition">About us</a></li>
              <li><a href="" className="hover:text-emerald-600 transition">Contact us</a></li>
              <li><a href="" className="hover:text-emerald-600 transition">Tech Stack Used</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-stone-900 mb-4 tracking-wide uppercase text-xs">Product</h3>
            <ul className="space-y-3 text-stone-600 text-sm">
              <li><a href="" className="hover:text-emerald-600 transition">Features</a></li>
              <li><a href="" className="hover:text-emerald-600 transition">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-stone-900 mb-4 tracking-wide uppercase text-xs">Resources</h3>
            <ul className="space-y-3 text-stone-600 text-sm">
              <li><a href="" className="hover:text-emerald-600 transition">Documentation</a></li>
              <li><a href="" className="hover:text-emerald-600 transition">Community</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-stone-900 mb-4 tracking-wide uppercase text-xs">Questions</h3>
            <p className="text-stone-500 text-sm mb-4">Please do send a feedback or review on.</p>
            <a href="mailto:kartikbpadia0707@gmail.com" className="text-black text-sm">
              kartikbpadia0707@gmail.com
            </a>
          </div>
        </div>
        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-400 text-xs">
            NeuroBusiness
          </p>
          <div className="flex gap-6 text-stone-400">
            <a href="" className="hover:text-stone-900 text-xs transition"></a>
            <a href="" className="hover:text-stone-900 text-xs transition">LinkedIn</a>
            <a href="" className="hover:text-stone-900 text-xs transition">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;