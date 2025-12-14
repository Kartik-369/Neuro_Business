function Home(){
  
  
  const logos=[
    {name:'Company1',src:'https://imgs.search.brave.com/PWK3JP1ML4aDmbggxBjtvxVCo2UKO2e62Wl-YftKA9s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YWJzdHJhY3Qtd2F2/eS1iYWNrZ3JvdW5k/LXRlbXBsYXRlXzEw/MzUtODkyMi5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA'},
    {name:'Company2',src:'https://imgs.search.brave.com/PWK3JP1ML4aDmbggxBjtvxVCo2UKO2e62Wl-YftKA9s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YWJzdHJhY3Qtd2F2/eS1iYWNrZ3JvdW5k/LXRlbXBsYXRlXzEw/MzUtODkyMi5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA'},
    {name:'Company3',src:'https://imgs.search.brave.com/PWK3JP1ML4aDmbggxBjtvxVCo2UKO2e62Wl-YftKA9s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YWJzdHJhY3Qtd2F2/eS1iYWNrZ3JvdW5k/LXRlbXBsYXRlXzEw/MzUtODkyMi5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA'},
    {name:'Company4',src:'https://imgs.search.brave.com/PWK3JP1ML4aDmbggxBjtvxVCo2UKO2e62Wl-YftKA9s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YWJzdHJhY3Qtd2F2/eS1iYWNrZ3JvdW5k/LXRlbXBsYXRlXzEw/MzUtODkyMi5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA'},
    {name:'Company5',src:'https://imgs.search.brave.com/PWK3JP1ML4aDmbggxBjtvxVCo2UKO2e62Wl-YftKA9s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YWJzdHJhY3Qtd2F2/eS1iYWNrZ3JvdW5k/LXRlbXBsYXRlXzEw/MzUtODkyMi5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA'},
    {name:'Company6',src:'https://imgs.search.brave.com/PWK3JP1ML4aDmbggxBjtvxVCo2UKO2e62Wl-YftKA9s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YWJzdHJhY3Qtd2F2/eS1iYWNrZ3JvdW5k/LXRlbXBsYXRlXzEw/MzUtODkyMi5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA'}
    
  ]
  return (<>
    <div className="max-w-screen h-full">
    
      <div className="flex flex-col gap-6 overflow-hidden justify-center items-center text-center">
        <span className="text-6xl lg:text-[97px] mt-24 font-roslindale font-extrabold">Know Your Customers<span className="mt-auto text-gray-600 font-semibold lg:text-3xl text-xl flex flex-col p-4 mb-5"><h1 className="underline decoration-emerald-500 underline-offset-3">AI driven Platform</h1> for your Business Insights.</span></span>
        
        <div className="flex justify-between items-center flex-row mt-auto space-x-3 lg:text-xl lg:tracking-tighter lg:font-extralight">
          <button className="active:bg-black w-auto px-6  text-center bg-stone-800 rounded-4xl whitespace-nowrap   text-white p-2  hover:bg-black transition">Book a Demo</button>
          <button className="active:bg-black active:text-white w-auto px-6  text-center bg-white rounded-4xl whitespace-nowrap  text-black border-[1.5px] p-2  hover:bg-black hover:text-white transition">Start a Free Trial</button>
        
      
        </div>
      </div>
      
      <div className="py-12 flex max-[1100px]:flex-col">
        <p className="text-center flex-1 text-gray-700 text-xl font-semibold tracking-wider uppercase mb-5">Helping Visionary Companies Stay Ahead</p>
      
        <div className="flex flex-1  justify-center items-center gap-6 opacity-60">
          {logos.map((logo,index)=>
            <img src={logo.src} key={index} className="h-9 md:h-12 w-auto grayscale hover:grayscale-0 bg-clip-padding"/>)}
        </div>
      </div>
      
      
      
      
    </div>
  </>);
}

export default Home;