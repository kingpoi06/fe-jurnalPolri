import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import News from "./admin/news";

import Dashboard from"./admin/dashboard";


function App() {
  return (
    <Router>
      <Routes>
        {/* Fitur */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/news/:id" element={<News />} />

      </Routes>
    </Router>
  );
}

export default App;
