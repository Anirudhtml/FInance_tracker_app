import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import DashBoard from "./pages/dashboard/dashboard";
import Auth from "./pages/auth/auth";

import './App.css';

function App() {
  return <Router>
    <div className="appContainer"> 
      <Routes>
        <Route path="/" element={<DashBoard />}/>
        <Route path="/auth" element={<Auth />}/>
      </Routes>
    </div>
  </Router>
}

export default App;