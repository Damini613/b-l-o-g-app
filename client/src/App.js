import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AllPost from "./components/AllPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllPost />} />
      </Routes>
    </Router>
  );
}

export default App;
