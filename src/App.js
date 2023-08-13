import { Routes, Route } from "react-router-dom";
import TableMaker from "./components/TableMaker";
import RoomLocator from "./components/RoomLocator"; 
import SearchCourse from "./components/SearchCourse";
import Box from '@mui/material/Box';
import SharedTable from "./components/SharedTable";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";


function App() {
  return (
    <div className="app">
      <Box >
        <Routes>
          <Route path="/" element={<SearchCourse />} />
          <Route path="/home" element={<SearchCourse />} /> 
          <Route path="/tablemaker" element={<TableMaker />} />
          <Route path="/roomlocator" element={<RoomLocator />} />
          <Route path="/searchCourse" element={<SearchCourse />} />
          <Route path="/signup" element={<Register/>}/>
          <Route path="/signin" element={<Login/>} /> 
          <Route path="/reset" element={<Reset/>} />
          <Route path="/otp" element={<h1>OTP</h1>} />
          <Route path="/SharedTable/:tableId" element={ <SharedTable />} />
       </Routes>    
      </Box>
    </div>  
  );
}

export default App;