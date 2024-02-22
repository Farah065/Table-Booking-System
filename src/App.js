import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Specials from './Components/Specials';
import Testimonials from './Components/Testimonials';
import About from './Components/About';
import Footer from './Components/Footer';
import ResHeader from './Components/ResHeader';
import ResDetails from './Components/ResDetails';

function App() {
  function landing() {
      return (
          <>
              <Hero />
              <Specials />
              <Testimonials />
              <About />
          </>
      );
  }

  function reservation() {
      return (
          <>
              <ResHeader />
              <ResDetails />
          </>
      );
  }
  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={landing()} />
          <Route path="/about" element={landing()} />
          <Route path="/menu" element={landing()} />
          <Route path="/reservations" element={reservation()} />
          <Route path="/order-online" element={landing()} />
          <Route path="/login" element={landing()} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
