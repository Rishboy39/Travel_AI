import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/home/Hero.jsx';
import PhotoUpload from './components/upload/PhotoUpload.jsx';
import GroupPlanner from './components/groups/GroupPlanner.jsx';



const App = () => {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/upload" element={<PhotoUpload />} />
            <Route path="/groups" element={<GroupPlanner />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;