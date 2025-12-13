function Navbar(){
  return (<>
    <nav className="justify-around p-4 items-center font-roslindale flex shadow-xs max-w-screen outline-[0.5px] outline-zinc-300 ">
        <span className="text-4xl tracking-wider   font-bold">Neuro-Business<p className="text-[15px] font-canela font-light tracking-wider ">AI Driven SaaS for Business Insights</p></span>
        <div className="flex">
          <div className="space-x-4 text-lg font-sans tracking-wide">
            <a className="rounded-md px-3 py-2">Platform</a>
            <a className="rounded-md px-3 py-2">Pricing</a>
            <a className="rounded-md px-3 py-2">How it Works </a>
            <a className="rounded-md px-3 py-2">Resources</a>
          </div>
        </div>
      
    </nav>
  </>);
}

export default Navbar;