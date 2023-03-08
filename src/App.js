import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Home from "./components/Home";
import TableMaker from "./components/TableMaker";
import NuTips from "./components/NuTips";
import RoomLocator from "./components/RoomLocator";

function App() {
  return (
    <div className="app">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={ <Login />} />
            <Route exact path="/register" element={ <Register />} />
            <Route exact path="/reset" element={ <Reset />} />
            <Route exact path="/home" element={ <Home />} />
            <Route exact path="/tablemaker" element={ <TableMaker />} />
            <Route exact path="/roomlocator" element={ <RoomLocator />} />
            <Route exact path="/nutips" element={ <NuTips />} />

          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;