import { useState } from "react";

function Navbar(){
  const [isOpen, setOpen] = useState(false);
  return (<>
    <nav className="fixed top-0 left-0 w-full z-100 bg-stone/30 backdrop-blur-sm justify-between p-3 items-center font-roslindale flex shadow-2xs max-w-screen ">
      <span className="text-4xl tracking-tight max-[1100px]:text-4xl font-bold shrink-0 z-10">NeuroBusiness<p className="text-[14px] font-sans font-semibold tracking-tighter hidden min-[1100px]:flex">AI Driven SaaS for Business Insights</p></span>
        <div  className="hidden absolute font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center min-[1100px]:flex space-x-2 lg:space-x-6 text-xl font-serif tracking-wider">
          <a className=" px-2 py-2 border-b-0 hover:border-b  duration-75 hover:-translate-y-1 transition-all ease-in">Platform</a>
          <a className=" px-2 py-2 border-b-0 hover:border-b  duration-75 hover:-translate-y-1 transition-all ease-in">Pricing</a>
          <a href='howitworks' className=" px-3 py-2 border-b-0 hover:border-b  duration-75 hover:-translate-y-1 transition-all ease-in">How it Works </a>
          <a className=" px-2 py-2 border-b-0 hover:border-b  duration-74 hover:-translate-y-1 transition-all ease-in">Resources</a>
        </div>
          
          <div className="flex items-center gap-3 z-20 ">
            <div className="hidden min-[1100px]:flex tracking-wider font-bold items-center text-lg gap-3">
              <button className="active:bg-black w-auto px-6   active:text-white text-center border rounded-4xl whitespace-nowrap  p-2  hover:bg-black  hover:text-white  transition">Signup</button>
              <button className="active:bg-black w-auto px-6   active:text-white text-center  rounded-4xl text-black whitespace-nowrap border p-2  hover:bg-black hover:text-white transition">Book a Demo</button>
            </div>
          </div>
          
        
        
    <button className="min-[1100px]:hidden transition-colors duration-700" onClick={()=>setOpen(!isOpen)}>=</button>
    
      <div 
        className={` min-[1100px]:hidden fixed inset-0 bg-black/15 transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
          onClick={() => setOpen(false)}
          ></div>
    
    
      <div className={`min-[1100px]:hidden z-1 absolute top-full right-0 bg-white h-[calc(100dvh-100%)] overflow-y-auto min-w-80 transform transition-transform ease-in-out duration-400  ${isOpen?'translate-x-0':'translate-x-full'} flex flex-col`}>
        <div className="flex justify-end pr-6 pt-6 ">
        <button className="min-[1100px]:hidden transition-colors duration-700" onClick={()=>setOpen(!isOpen)}>X</button>
        </div>
        <ul className=" flex flex-col space-y-3 p-6 text-[16.2px]  font-canela tracking-wide ">
          <li className="border-b border-stone-300">
            <a className="block px-3 py-2 ">Platform</a>
          </li>
          
          <li className="border-b border-stone-300">
          <a className="block px-3 py-2">Pricing</a>
          </li>
          
          <li className="border-b border-stone-300">
            <a className="block px-3 py-2">How it Works </a>
          </li>
          
          <li className="border-b border-stone-300">
            <a className="block px-3 py-2">Resources</a>
          </li>
        </ul>
        
        <div className="mt-auto p-6 space-y-6 text-lg tracking-wider font-bold">
          <button className="active:bg-black w-full text-center bg-gray-900 rounded-4xl text-white p-2  hover:bg-black transition">Signup</button>
          <button className="active:bg-black active:text-white w-full text-center  rounded-4xl text-black border p-2  hover:bg-black hover:text-white transition">Book a Demo</button>
          
        </div>
        
    
        
    </div>

    
    
    </nav>
  
  </>);
}

export default Navbar;