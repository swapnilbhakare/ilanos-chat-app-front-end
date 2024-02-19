import Header from "./Components/Header";
import { useTheme } from "./Components/UI/ThemeContex";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Authenticate from "./Pages/Authenticate";

function App() {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`h-screen font-nunito transition-colors duration-500 ${
        isDarkMode ? "bg-primary text-smoke" : "bg-smoke"
      }`}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </div>
  );
}

export default App;
