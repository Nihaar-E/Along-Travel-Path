// import React from 'react';
// import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
// import LandingPage from '../src/components/LandingPage'

// function App() {
//   return (
//     <div className="App">
//     <Router>
//       <Routes> 
//         <Route exact path = "/" element = {<LandingPage />} />
//         <Route path="*" element = {< LandingPage />} />          
//       </Routes>        
//     </Router>      
//   </div>

//   );
// }

// export default App;




import React from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LandingPage from '../src/components/LandingPage'

function App() {
  return (
    <div className="App">
    <Router>
      <Routes> 
        <Route exact path = "/" element = {<LandingPage />} />
        <Route path="*" element = {< LandingPage />} />          
      </Routes>        
    </Router>      
    </div>

  );
}

export default App;