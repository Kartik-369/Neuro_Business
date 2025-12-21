import { Link } from "react-router-dom";
import { useState } from "react";
function SignUp(){
  const [Login, isLogin] = useState(false);
  return (<>
  <section className="bg-white ">
    
    
      <div className="container  flex items-center justify-center min-h-screen px-6 mx-auto">
        
          <form className="w-full shadow-xs shadow-gray-600 border border-stone-200 bg-amber-50/30 p-9 rounded-4xl max-w-md">  
            <div className="flex flex-row justify-between items-center mt-3">
              <h1 className=" text-2xl font-semibold text-gray-800 capitalize sm:text-3xl">{Login?'Sign In':'Sign Up'}</h1>
                <div className="flex justify-center items-center text-2xl">
                  <Link to='/'><button className="bg-white text-center w-24 rounded-2xl h-14 relative text-black text-[15px] font-semibold group" type="button">Go Back
                  <div className="bg-amber-100 rounded-xl h-[39px] w-1/3 flex items-center justify-center absolute -left-6 top-[9px] group-hover:w-[120px] group-active:w-[120px] z-10 duration-300">
                    <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          height="25px"
                          width="25px"
                        >
                    <path
                            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                            fill="#000000"
                          ></path>
                          <path
                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                            fill="#000000"
                          ></path>
                        </svg>
                      </div>
                      <p className="translate-x-0"></p>
                  </button>
                      </Link>
                </div>
            </div>
  
              <div className="relative flex items-center mt-8">
                  <span className="absolute">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                  </span>
  
                  <input type="email" autoCapitalize="true" autoFocus='true' className=" duration-400 block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-amber-100  focus:ring-amber-200 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"></input>
              </div>
  
              <div className="relative flex items-center mt-4">
                  <span className="absolute">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                  </span>
  
                  <input type="password" className="duration-400 block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-amber-100  focus:ring-amber-200 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
              </div>
  
              <div className="mt-6">
                  <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50">
                      {Login?'Sign In':'Sign Up'}
                  </button>
                  <Link to='/forgot' className="w-fit"><p className="mt-2 text-sm underline inline-block text-center">{Login?'forgot password?':''}</p></Link>
                  <p className="mt-1 text-center text-gray-600 ">{Login?'or':'Or continue'}</p>
  
                  <a href="" className=" hover:text-black active:text-black flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg  hover:bg-amber-100">
                      <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                          <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                          <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                          <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                          <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                      </svg>
  
                      <span className="mx-2">{Login?'Sign In':'Sign Up'} with Google</span>
                  </a>
  
                  <div className="mt-6 text-center ">
                    <Link className="text-sm text-gray-600 hover:underline" onClick={()=>isLogin(!Login)}>
                        {Login?'Create an account':'Already have an account?'}<h1 className="text-gray-900">{Login?'Sign Up':'Sign In'}</h1>
                      </Link>
                  </div>
              </div>
              
          </form>
      </div>
      
  </section>
  
  
  </>);
}

export default SignUp;