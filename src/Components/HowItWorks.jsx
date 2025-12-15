import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HowItWorks() {
  const containerRef = useRef(null)
  const lineFillRef = useRef(null)
  
  const stackRef = useRef(null) 

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: 1,
        },
      })

      tl.to(lineFillRef.current, {
        height: '100%',
        ease: 'none',
        duration: 3,
      }, 0)
      tl.to('.step-2', {
        y: '0%',
        ease: 'power2.inOut',
        duration: 1,
      }, 0)
      tl.to('.step-3', {
        y: '0%',
        ease: 'power2.inOut',
        duration: 1,
      }, 1)
      tl.to('.step-4', {
        y: '0%',
        ease: 'power2.inOut',
        duration: 1,
      }, 2) 

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="h-screen w-full bg-white relative overflow-hidden justify-center items-center flex flex-col">
      
      <div className="flex-none pt-20 pb-5 px-4 text-center z-50 bg-white">
        <span className="text-6xl md:text-8xl font-canela block mb-4">How it Works</span>
        <p className="text-gray-700 max-w-4xl mx-auto font-semibold text-lg md:text-xl leading-relaxed">
          Data without insight is just noise. <span className="text-black underline decoration-emerald-600">NeuroMarket acts as the central nervous system</span> for your business, distilling complex data into clear directives.
        </p>
      </div>


      <div ref={stackRef} className="flex-1 relative w-full max-w-6xl mx-auto mt-4">
        
        <div className="hidden md:block absolute left-3 md:left-1/2 top-0 bottom-10 w-0.5 -translate-x-1/2 bg-gray-200 z-40">
           {/* The Black Filler */}
           <div ref={lineFillRef} className="w-full bg-black h-0 absolute top-0" />
        </div>


        <div className="step-1 absolute inset-0 w-full h-full bg-white z-10 flex items-center justify-center px-4">
          <div className="flex flex-col md:flex-row items-center justify-between w-full h-full pb-10">
            <div className="w-full md:w-[45%] text-center md:text-right pr-0 md:pr-10">
              <h3 className="text-4xl font-bold mb-4">Content</h3>
              <p className="text-xl text-gray-500">Sub</p>
            </div>
            <div className="w-full md:w-[45%] h-75 md:h-100 bg-stone-100 rounded-2xl border border-stone-200 shadow-xl overflow-hidden">
               <img src="" className="w-full bg-amber-100 h-full object-cover" />
            </div>
          </div>
        </div>


        <div className="step-2 absolute inset-0 w-full h-full bg-white z-20 translate-y-[150%] flex items-center justify-center px-4">
           <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full h-full pb-10">
            <div className="w-full md:w-[45%] text-center md:text-left pl-0 md:pl-10">
              <h3 className="text-4xl font-bold mb-4">Content</h3>
              <p className="text-xl text-emerald-600">Sub</p>
            </div>
            <div className="w-full md:w-[45%] h-75 md:h-100 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-xl overflow-hidden">
               <img src="" className="w-full bg-amber-200 h-full object-cover" />
            </div>
          </div>
        </div>


        <div className="step-3 absolute inset-0 w-full h-full bg-white z-30 translate-y-[150%] flex items-center justify-center px-4">
           <div className="flex flex-col md:flex-row items-center justify-between w-full h-full pb-10">
            {/* Text Left */}
            <div className="w-full md:w-[45%] text-center md:text-right pr-0 md:pr-10">
              <h3 className="text-4xl font-bold mb-4">Content</h3>
              <p className="text-xl text-gray-500">sub</p>
            </div>
            <div className="w-full md:w-[45%] h-75 md:h-100 bg-stone-900 rounded-2xl border border-black shadow-xl overflow-hidden">
               <img src="" className="w-full bg-amber-100 h-full object-cover" />
            </div>
          </div>
        </div>
        
        <div className="step-4 absolute inset-0 w-full h-full bg-white z-40 translate-y-[150%] flex items-center justify-center px-4">
           <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full h-full pb-10">
            <div className="w-full md:w-[45%] text-center md:text-right pr-0 md:pr-10">
              <h3 className="text-4xl font-bold mb-4">Content</h3>
              <p className="text-xl text-gray-500">Sub</p>
            </div>
            <div className="w-full md:w-[45%] h-75 md:h-100 bg-stone-900 rounded-2xl border border-black shadow-xl overflow-hidden">
               <img  className="w-full bg-amber-200 h-full object-cover" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}