import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadResume from "./pages/UploadResume";
import AIAnalysis from "./pages/AIAnalysis";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UploadResume />} />
                <Route path="/analysis" element={<AIAnalysis />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;