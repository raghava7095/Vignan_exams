import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import CreateTest from "./pages/CreateTest";
import ManageTests from "./pages/ManageTests";
import UpdateQuestions from "./pages/UpdateQuestions";
import StartTest from "./pages/StartTest";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-test" element={<CreateTest />} />
            <Route path="/manage-tests" element={<ManageTests />} />
            <Route path="/update-questions" element={<UpdateQuestions />} />
            <Route path="/start-test" element={<StartTest />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
