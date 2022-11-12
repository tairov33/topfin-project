import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useEffect } from "react";
// import AOS from "aos";
import 'aos/dist/aos.css';
import { Helmet } from "react-helmet";

const App = () => {
  // ** EFFECTS
  // useEffect(() => {
  //   AOS.init({
  //     offset: 100
  //   })
  // }, [])

  return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Topfin</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Router>
          {""}
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </>
    )
}

export default App;
