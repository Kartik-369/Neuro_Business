import { useRef } from "react";
import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import HowItWorks from "../Components/HowItWorks";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Home(){

  const containerRef = useRef(null);
  const heroImageRef = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const isMobile = window.innerWidth < 640;
      gsap.to(heroImageRef.current, {
        rotation:360,
        ease:'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          end: isMobile ? 'bottom 60%' : 'bottom 90%',
          scrub: 0.1,
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])
  

  const logos=[
    {name:'Company2',src:'https://icon.icepanel.io/Technology/svg/FastAPI.svg'},
    {name:'Company5',src:'https://img.icons8.com/?size=100&id=N3G7bBnphi53&format=png&color=000000'},
    {name:'Company3',src:'https://cdn.iconscout.com/icon/free/png-512/free-mongodb-icon-svg-download-png-1175138.png?f=webp&w=256'},
    {name:'Company4',src:'https://img.icons8.com/?size=100&id=aR9CXyMagKIS&format=png&color=000000'},
    {name:'Company6',src:'https://img.icons8.com/?size=100&id=TkX1totjFmAD&format=png&color=000000'},
    {name:'Company6',src:'https://icon.icepanel.io/Technology/svg/scikit-learn.svg'},
    {name:'Company6',src:'https://icon.icepanel.io/Technology/png-shadow-512/Pandas.png'}
    
  ]
  return (<>
    <div className="max-w-screen h-full pt-9">
    
      <div className="flex flex-col gap-12 max-[1100px]:gap-2.25 overflow-hidden justify-center items-center text-center px-4">
        <span className="text-5xl md:text-[72px] p-6 mt-12 md:mt-24 max-[1100px]:mt-16 font-roslindale font-extrabold">Data-Driven Revenue Forecasting</span>
        
        <p className=" text-gray-600 max-w-2xl font-semibold lg:text-2xl text-[16px]  p-6"><span className="font-bold text-gray-900 underline decoration-emerald-500 underline-offset-4">
            NeuroBusiness
          </span>{" "}Analyzes your sales data and transaction history to flag churn risks.</p>
        
        <div className="flex max-[1100px]:flex-col max-[1100px]:space-y-3 p-3 px-auto justify-center items-center flex-row mt-auto gap-6 lg:text-xl lg:tracking-wider lg:font-light">
          <button className="active:bg-black w-auto px-9 text-center bg-stone-800 rounded-4xl whitespace-nowrap   text-white p-2  hover:bg-black transition">Book a Personal Demo</button>
          <button className="active:bg-black active:text-white w-auto px-9   text-center bg-white rounded-4xl whitespace-nowrap  text-black border-[1.5px] p-2  hover:bg-black hover:text-white transition">Start Free Trial</button>
        
      
        </div>
      </div>
      
      <div className="py-12 h-auto flex items-center max-[1100px]:flex-col max-[1100px]:gap-3 px-4">
        <p className="text-center flex-1 text-gray-700 text-2xl max-[1130px]:text-lg font-semibold tracking-wider uppercase ">Tech Stack Powered by Industry Standards</p>
      
        <div className="flex flex-1 flex-wrap justify-center items-center gap-3 opacity-60">
          {logos.map((logo,index)=>
            <img src={logo.src} key={index} className="h-10.5 md:h-21 w-auto"/>)}
        </div>
      </div>
      
      <div ref={containerRef} className="h-auto relative w-full py-12 lg:py-0 overflow-hidden">
        <div className="relative w-full flex flex-col justify-center items-center">
          
          <div className="absolute inset-0 min-[1130px]:relative z-0 flex justify-center items-center overflow-hidden">
            <img 
              ref={heroImageRef} 
              className="h-auto min-[1130px]:h-full md:max-w-3xl object-contain scale-125 min-[1130px]:scale-100" 
              src="./src/assets/Hero_Img.png" 
              alt="Hero"
            />
          </div>
      
          <div className="relative min-[1130px]:absolute min-[1130px]:inset-0 z-30 flex flex-col justify-center items-center gap-6 min-[1130px]:block pointer-events-none w-full">
            
            <div className="pointer-events-auto flex items-center justify-center max-[1130px]:bg-black/25 gap-2 bg-black/40 text-white font-semibold backdrop-blur-md rounded-2xl border border-white/10 p-[13.2px] min-[1130px]:p-4.5 max-[768px]:w-[72%] min-[1130px]:absolute min-[1130px]:top-[15%] min-[1130px]:left-[18%]">
              <span className="text-xl md:text-5xl">Icon</span>
              <span className="text-sm md:text-5xl">Feature1</span>
            </div>
      
            <div className="pointer-events-auto flex max-[1130px]:bg-black/25 items-center justify-center gap-2 bg-black/40 text-white font-semibold backdrop-blur-md rounded-2xl border border-white/10 p-[13.2px] min-[1130px]:p-4 max-[768px]:w-[72%] min-[1130px]:absolute min-[1130px]:top-[50%] min-[1130px]:left-[15%] min-[1130px]:-translate-y-1/2">
              <span className="text-xl md:text-5xl">Icon</span>
              <span className="text-sm md:text-5xl">Feature2</span>
            </div>
      
            <div className="pointer-events-auto flex max-[1130px]:bg-black/25 items-center justify-center gap-2 bg-black/40 text-white font-semibold backdrop-blur-md rounded-2xl border border-white/10 p-[13.2px] min-[1130px]:p-4 max-[768px]:w-[72%] min-[1130px]:absolute min-[1130px]:bottom-[15%] min-[1130px]:left-[18%]">
              <span className="text-xl md:text-5xl">Icon</span>
              <span className="text-sm md:text-5xl">Feature3</span>
            </div>
      
            <div className="pointer-events-auto flex max-[1130px]:bg-black/25 items-center justify-center gap-2 bg-black/40 text-white font-semibold backdrop-blur-md rounded-2xl border border-white/10 p-[13.2px] min-[1130px]:p-4 max-[768px]:w-[72%] min-[1130px]:absolute min-[1130px]:top-[15%] min-[1130px]:right-[15%]">
              <span className="text-xl md:text-5xl">Icon</span>
              <span className="text-sm md:text-5xl">Feature4</span>
            </div>
      
            <div className="pointer-events-auto flex max-[1130px]:bg-black/25 items-center justify-center gap-2 bg-black/40 text-white font-semibold backdrop-blur-md rounded-2xl border border-white/10 p-[13.2px] min-[1130px]:p-4 max-[768px]:w-[72%] min-[1130px]:absolute min-[1130px]:top-[50%] min-[1130px]:right-[12%] min-[1130px]:-translate-y-1/2">
              <span className="text-xl md:text-5xl">Icon</span>
              <span className="text-sm md:text-5xl">Feature5</span>
            </div>
      
            <div className="pointer-events-auto flex max-[1130px]:bg-black/25 items-center justify-center gap-2 bg-black/40 text-white font-semibold backdrop-blur-md rounded-2xl border border-white/10 p-[13.2px] min-[1130px]:p-4 max-[768px]:w-[72%] min-[1130px]:absolute min-[1130px]:bottom-[15%] min-[1130px]:right-[15%]">
              <span className="text-xl md:text-5xl">Icon</span>
              <span className="text-sm md:text-5xl">Feature6</span>
            </div>
      
          </div>
        </div>
      </div>
      
      <HowItWorks/>
      
      <div className="max-w-6xl mx-auto px-6 py-9">
        <div className="text-center mb-16">
          <h2 className="text-[54px] font-semibold md:font-normal md:text-8xl font-ogg mb-4 text-slate-900">
            Real Impact
          </h2>
          <p className="text-slate-600 md:text-2xl text-[18px]">
            See what happens when we intergrate your Business.
          </p>
        </div>
      
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-300 hover:scale-3d hover:shadow-2xl active:shadow-2xl active:scale-3d transition-all">
           <div className="text-5xl font-bold bg-linear-to-br from-teal-600 to-emerald-900 text-transparent bg-clip-text mb-2">300%</div>
            <div className="text-lg font-semibold text-slate-900">Increase</div>
            <p className="text-slate-400 text-sm mt-2">Join</p>
          </div>
      
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-300 hover:scale-3d hover:shadow-2xl active:shadow-2xl active:scale-3d transition-all">
            <div className="text-5xl font-bold bg-linear-to-br from-teal-600 to-emerald-900 text-transparent bg-clip-text mb-2">300%</div>
            <div className="text-lg font-semibold text-slate-900">Increase</div>
            <p className="text-slate-400 text-sm mt-2">Join</p>
          </div>
      
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-300 hover:scale-3d hover:shadow-2xl active:shadow-2xl active:scale-3d transition-all">
            <div className="text-5xl font-bold bg-linear-to-br from-teal-600 to-emerald-900  text-transparent bg-clip-text mb-2">300%</div>
            <div className="text-lg font-semibold text-slate-900">Increase</div>
            <p className="text-slate-400 text-sm mt-2">Join</p>
          </div>
        </div>
      </div>
      
    </div>
  </>);
}

export default Home;