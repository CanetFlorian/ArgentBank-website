import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/index.jsx';
import Footer from './components/Footer/index.jsx';
import Home from './pages/Home/index.jsx';
import Login from './pages/Login/index.jsx';
import Profile from './pages/Profile/index.jsx';


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
