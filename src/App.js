import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Header from './components/Header';
import Footer from './components/Footer';
import Auth from './pages/Auth';
import Home from './components/Home';
import Oldsongs from './pages/Oldsongs';
import Newsongs from './pages/Newsongs';
import Sidebar from './components/Sidebar';
import Artist from './pages/Artist';
import Albums from './components/Albums';
import MusicModal from './pages/MusicModal';
import M from './pages/M';
import T from './pages/T';
import H from './pages/H';
import E from './pages/E';
import Tu from './pages/Tu';
import Favourite from './pages/Favourite';
import PaymentPage from './pages/Paymentpage';
import Dashboard from './pages/Dashboard';

// Layout Component for pages with Sidebar, Header, and Footer
function MainLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div style={{ flex: 1, overflowY: 'auto' }}>{children}</div>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
   
      <Routes>
        {/* Pages without Sidebar */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register="register" />} />

        {/* Pages with Sidebar */}
        <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/oldsongs" element={<MainLayout><Oldsongs /></MainLayout>} />
        <Route path="/newsongs" element={<MainLayout><Newsongs /></MainLayout>} />
        <Route path="/artist" element={<MainLayout><Artist /></MainLayout>} />
        <Route path="/albums" element={<MainLayout><Albums /></MainLayout>} />
        <Route path="/musicmodal" element={<MainLayout><MusicModal /></MainLayout>} />
        <Route path="/m" element={<MainLayout><M /></MainLayout>} />
        <Route path="/t" element={<MainLayout><T /></MainLayout>} />
        <Route path="/h" element={<MainLayout><H /></MainLayout>} />
        <Route path="/e" element={<MainLayout><E /></MainLayout>} />
        <Route path="/tu" element={<MainLayout><Tu /> </MainLayout>} />
        <Route path="/favourite" element={<MainLayout><Favourite /></MainLayout>} />
        <Route path="/paymentpage" element={<MainLayout><PaymentPage /></MainLayout>} />
        <Route path='/dashboard' element={<MainLayout> <Dashboard /></MainLayout>} /></Routes>
    
  );
}

export default App;
