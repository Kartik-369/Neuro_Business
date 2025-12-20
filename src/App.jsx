import Home from "./Pages/Home";
import Scroll from "./Components/Scroll";
import Layout from "./Components/Layout/Layout";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
function App(){
  return (<>
    
    <BrowserRouter>
      <Scroll>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<SignUp/>} />
          </Routes>
          
        </Layout>
      </Scroll>
    </BrowserRouter>
    
  </>);
}
export default App;