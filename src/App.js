import React, { useContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Trending from './pages/Trending';
import LikedVideos from './pages/LikedVideos';
import SearchPage from './pages/SearchPage';
import { AuthContext } from './context/AuthContext';
import Watch from './pages/Watch';
import Channel from './pages/Channel';

const App = () => {
  const currentUser = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }

    return children;
  };

  const [showNav, setShowNav] = useState(false);

  return (
    <BrowserRouter>
      <div className="box-border bg-white text-black dark:bg-black dark:text-white overflow-hidden">
        <Header setShowNav={setShowNav} />
        <main className="relative flex">
          <Navbar showNav={showNav} setShowNav={setShowNav} />
          <section>
            
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/liked" element={<ProtectedRoute><LikedVideos /></ProtectedRoute>} />
                <Route path="/search/:searchValue" element={<SearchPage />} />
                <Route path="/watch/:videoID" element={<Watch />} />
                <Route path="/channel/:channelID" element={<Channel />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </section>
        
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
