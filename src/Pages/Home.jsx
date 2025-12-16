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
    {name:'Company2',src:'./src/assets/create-highly-detailed-high-definition-components_1298385-16763-Photoroom.png'},
    {name:'Company2',src:'./src/assets/create-highly-detailed-high-definition-components_1298385-16763-Photoroom.png'},
    {name:'Company3',src:'./src/assets/create-highly-detailed-high-definition-components_1298385-16763-Photoroom.png'},
    {name:'Company4',src:'./src/assets/create-highly-detailed-high-definition-components_1298385-16763-Photoroom.png'},
    {name:'Company5',src:'./src/assets/create-highly-detailed-high-definition-components_1298385-16763-Photoroom.png'},
    {name:'Company6',src:'./src/assets/create-highly-detailed-high-definition-components_1298385-16763-Photoroom.png'}
    
  ]
  return (<>
    <div className="max-w-screen h-full">
    
      <div className="flex flex-col gap-9 max-[1100px]:gap-2.25 overflow-hidden justify-center items-center text-center">
        <span className="text-5xl lg:text-[72px] p-3 mt-21 max-[1100px]:mt-16 font-roslindale font-extrabold">Stop guessing. Predict next quarter's revenue with <h1 className="font-ogg font-semibold italic antialiased">95% accuracy</h1></span>
        
        <p className=" text-gray-600 max-w-2xl font-semibold lg:text-2xl text-[16px]  p-5"><span className="font-bold text-gray-900 underline decoration-emerald-500 underline-offset-4">
            NeuroBusiness
          </span>{" "}connects to your CRM and Stripe data to flag churn risks and identify upsell opportunities automatically—no data science degree required.</p>
        
        <div className="flex max-[1100px]:flex-col max-[1100px]:space-y-3 px-auto justify-center items-center flex-row mt-auto space-x-3 lg:text-xl lg:tracking-wider lg:font-light">
          <button className="active:bg-black w-auto px-9 text-center bg-stone-800 rounded-4xl whitespace-nowrap   text-white p-2  hover:bg-black transition">Book a Personal Demo</button>
          <button className="active:bg-black active:text-white w-auto px-9   text-center bg-white rounded-4xl whitespace-nowrap  text-black border-[1.5px] p-2  hover:bg-black hover:text-white transition">Start Free Trial</button>
        
      
        </div>
      </div>
      
      <div className="py-12 flex items-center max-[1100px]:flex-col max-[1100px]:gap-3">
        <p className="text-center  flex-1 text-gray-700 text-xl font-semibold tracking-wider uppercase ">Helping Visionary Companies Stay Ahead</p>
      
        <div className="flex flex-1  justify-center items-center gap-6 opacity-60">
          {logos.map((logo,index)=>
            <img src={logo.src} key={index} className="h-10.5 md:h-21 w-auto"/>)}
        </div>
      </div>
      
      <div ref={containerRef} className="h-auto relative w-full">
        <div className="sticky top-0 h-fit w-full flex items-center justify-center overflow-hidden">
          <div className="relative w-full flex flex-col justify-center items-center">
            <div className="absolute  z-30 hidden bottom-201 left-90 md:flex bg-black/30 text-white font-semibold backdrop-blur-sm rounded-3xl p-3">
              <span className="text-6xl">Icon</span>
              <span className="text-6xl">Feature1</span>
            </div>
            <div className="absolute  z-30 hidden bottom-117 left-60 md:flex bg-black/30 text-white font-semibold backdrop-blur-sm rounded-3xl p-3">
              <span className="text-6xl">Icon</span>
              <span className="text-6xl">Feature1</span>
            </div>
            
            <div className="absolute  z-30 hidden bottom-30 left-90 md:flex bg-black/30 text-white font-semibold backdrop-blur-sm rounded-3xl p-3">
              <span className="text-6xl">Icon</span>
              <span className="text-6xl">Feature1</span>
            </div>
            
            <div className="absolute  z-30 hidden bottom-201 left-270 md:flex bg-black/30 text-white font-semibold backdrop-blur-sm rounded-3xl p-3">
              <span className="text-6xl">Icon</span>
              <span className="text-6xl">Feature1</span>
            </div>
            <div className="absolute  z-30 hidden bottom-117 left-310 md:flex bg-black/30 text-white font-semibold backdrop-blur-sm rounded-3xl p-3">
              <span className="text-6xl">Icon</span>
              <span className="text-6xl">Feature1</span>
            </div>
            
            <div className="absolute  z-30 hidden bottom-30 left-270 md:flex bg-black/30 text-white font-semibold backdrop-blur-sm rounded-3xl p-3">
              <span className="text-6xl">Icon</span>
              <span className="text-6xl">Feature1</span>
            </div>
            <img ref={heroImageRef} className="relative z-8 h-[58vh] sm:h-[70vh] md:h-[90vh] lg:h-[108dvh] object-contain " src="./src/assets/Hero_Img.png" />
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