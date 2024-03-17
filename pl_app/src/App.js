import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Editor from './Editor';
import Banner from './Banner';
import Explore from './Explore';
import './App.css';



const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Banner />} />
      <Route exact path="/editor" element={<Editor />} />
      <Route exact path="/explore" element={<Explore />} />

    </Routes>
  </Router>
);

export default App;
