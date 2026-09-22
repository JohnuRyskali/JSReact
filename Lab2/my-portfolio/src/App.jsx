import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <About />
        <Contact />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Zhanarys Ryskali. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;