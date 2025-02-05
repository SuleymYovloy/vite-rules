import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Quiz from "./Quiz/Quiz";
import Main from "./Main/index";
import Result from "./Result/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
