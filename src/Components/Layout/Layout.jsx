import Navbar from "./Navbar";
function Layout({children}){
  return (<>
    <div className="scroll-smooth min-h-screen flex flex-col overflow-x-hidden w-full ">
      <Navbar/>
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  </>);
}

export default Layout;