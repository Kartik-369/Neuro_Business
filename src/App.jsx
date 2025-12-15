import Home from "./Pages/Home";
import Scroll from "./Components/Scroll";
import Layout from "./Components/Layout/Layout";
function App(){
  return (<>
    <Scroll>
      <Layout>
        <Home/>
      </Layout>
    </Scroll>
  </>);
}
export default App;