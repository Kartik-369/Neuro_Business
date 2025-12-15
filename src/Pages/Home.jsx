import { useEffect,useRef } from "react";
import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import HowItWorks from "../Components/HowItWorks";
// import { ScrollTrigger } from 'gsap/ScrollTrigger'


function Home(){

  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const heroImageRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      

      gsap.to(heroImageRef.current, {
        y: 100, 
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])
  
  
  useEffect(() => {
    const handleScroll = () => {
        if (!containerRef.current || !circleRef.current) return;
      
        const scrollFromTop = window.scrollY || window.pageYOffset;
        const containerOffsetTop = containerRef.current.offsetTop;
        const windowHeight = window.innerHeight;
        const containerHeight = containerRef.current.offsetHeight;
        const totalScrollDistance = containerHeight - windowHeight;
      
        let progress = scrollFromTop / (containerOffsetTop + totalScrollDistance);
        progress = Math.max(0, Math.min(1, progress));
      
        const animate = t => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
      
        const expansionProgress = Math.min(progress / 0.9, 1);
        const smoothProgress = animate(expansionProgress);
        const isMobile = window.innerWidth < 768;
        const maxScaleMultiplier = isMobile ? 4 : 9; 
        
        const scale = 1 + (smoothProgress * maxScaleMultiplier);
        circleRef.current.style.transform = `scale(${scale}) translateZ(0)`;
    };
    handleScroll();
    window.addEventListener("scroll",handleScroll)
    window.addEventListener("resize", handleScroll);
    return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
    }
  },[]);

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
        <span className="text-5xl lg:text-[72px] p-3 mt-18 max-[1100px]:mt-16 font-roslindale font-extrabold">Stop guessing. Predict next quarter's revenue with <h1 className="font-ogg font-semibold italic antialiased">95% accuracy</h1></span>
        
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
      
      <div ref={containerRef} className="max-[1130px]:h-auto h-fit relative w-full">
              <div className="sticky top-0 w-full flex items-center justify-center overflow-hidden">
                <div className="relative flex items-center justify-center">
                  <div ref={circleRef} className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-emerald-300 rounded-full" style={{transform:`scale(1)`, willChange:"transform"}}>
                  </div>
                  <img className="relative z-9 h-[54vh] sm:h-[70vh] md:h-[90vh] lg:h-[108dvh] object-contain " src="./src/assets/usps-hero.png" />
                </div>
              </div>
            </div>
      
      <HowItWorks/>
      
      
    </div>
  </>);
}

export default Home;