import Navbar from "./Navbar";
import Home from "../../Pages/Home";
function Layout(){
  return (<>
    <div className="h-screen flex flex-col overflow-x-hidden w-full ">
      <Navbar/>
      <main className="flex-1 overflow-y-hidden">
        <Home/>
      </main>
    </div>
  </>);
}

export default Layout;