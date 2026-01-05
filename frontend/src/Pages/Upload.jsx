import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Upload(){
  const navigate = useNavigate();
  const [fileSelected, setFileSelected] = useState(null);
  const [col,setCols]=useState([]);
  const [selectedCol,setSelectedCol]=useState({});
  const userEmail=localStorage.getItem('userEmail') || 'User'

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
      window.location.href = '/';
    }
  },[])
  
  const handLgout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    navigate('/')
  };
  
  const handUpld=async(e)=>{
    e.preventDefault()
    if(!fileSelected){
      alert('selec file first');
      return;
    }
    const formData=new FormData();
    formData.append('file',fileSelected)
    try{
      const response=await fetch('http://127.0.0.1:8000/upload',{
        method:'POST',
        body:formData,
      });
      const data=await response.json();
      if(response.ok){
        const colResp=await fetch('http://127.0.0.1:8000/columns');
        const colData=await colResp.json();
        alert(`file received:${data.filename}`) 
        if(colData.columns){
          setCols(colData.columns);
          alert('select cols from below');
        }
      }
      else{
        alert('error')
      }
    }
    catch(e){
      alert('error',e)
    }
  }
  
  const handFileChng=async(event)=>{
    const file=event.target.files[0]
    if(file){
      setFileSelected(file);
      setCols([]);
    }
  }

  const clrFile=()=>{
    setFileSelected(null);
  }
  const formatBytes=(bytes,decimals=2)=>{
    if(!bytes) return '0';
    const k=1024;
    const dm=decimals<0?0:decimals;
    const sizes=['Bytes','kb','mb','gb'];
    const i=Math.floor(Math.log(bytes)/Math.log(k))
    return `${parseFloat((bytes/Math.pow(k,i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (<>
    <section className="bg-white ">
      
      
        <div className="container  flex items-center justify-center min-h-screen px-6 mx-auto">
          
            <form className="w-full shadow-xs shadow-gray-600 border border-stone-200 bg-amber-50/30 p-9 rounded-4xl max-w-md">  
              <div className="flex flex-row justify-between items-center mt-3">
                <h1 className=" text-xl font-semibold text-gray-800 capitalize sm:text-2xl">Choose Upload Files</h1>
                  <div className="flex justify-center items-center text-2xl">
                    <Link to='/signup'><button className="bg-white text-center w-24 rounded-2xl h-14 relative text-black text-[15px] font-semibold group" type="button">Go Back
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
    
                    <input autoFocus='true' type="file" onChange={handFileChng} className=" duration-400 block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-amber-100  focus:ring-amber-200 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
    
                <div className="relative flex items-center mt-4">
                    <p className="text-sm text-zinc-600">{fileSelected?`Selected: ${fileSelected.name}`:"Supported: csv, excel, etc."}</p>
                </div>
    
                <div className="mt-6">
                    <button onClick={handUpld} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50">Upload</button>
                </div>

                {columns.length>0 && ()}
            </form>
        </div>
        
    </section>
  </>);
}
export default Upload;