import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import "./App.css";
import { Countries, Country } from "./components";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/countries" element={<Countries />} />
          <Route path="/name/:countryName" element={<Country />} />
          <Route path="/" element={<Navigate replace to="/countries" />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
