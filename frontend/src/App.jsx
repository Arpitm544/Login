import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
function App() {
  return (
    <Routes>
\      <Route path="/" element={<Login />} />       {/* Default route */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/home" element={<Home />} />

    </Routes>
  );
}

export default App;