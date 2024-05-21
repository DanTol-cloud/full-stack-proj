import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./pages/home";
import Auth from "./pages/auth";
import CreateAlbum from "./pages/create-album";
import SavedAlbums from "./pages/saved-albums";

import Navbar from "./components/navbar";
import Menu from "./components/menu";
function App() {
  return (
    <div className="App">
      <Router>
          <Navbar />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/auth" element={<Auth />}/>
            <Route path="/create-album" element={<CreateAlbum />}/>
            <Route path="/saved-albums" element={<SavedAlbums />}/>
        </Routes>
      </Router>
        <Menu />
    </div>
  );
}

export default App;
