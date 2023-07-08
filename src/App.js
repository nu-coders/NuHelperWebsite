import { Route, Switch} from "react-router-dom";
import TableMaker from "./components/TableMaker";
import RoomLocator from "./components/RoomLocator";
import SearchCourse from "./components/SearchCourse";
import Box from '@mui/material/Box';
import SharedTable
 from "./components/SharedTable";
function App() {
  return (
    <div className="app">

      <Box >
        <Switch>
          <Route exact path="/" render={() => <SearchCourse />} />
          <Route exact path="/home" render={() => <SearchCourse />} />
          <Route exact path="/tablemaker" render={() => <TableMaker />} />
          <Route exact path="/roomlocator" render={() => <RoomLocator />} />
          <Route exact path="/searchCourse" render={() => <SearchCourse />} />
          <Route exact path='/signup' render={() => <h1>Sign Up</h1>} />
          <Route exact path='/login' render={() => <h1>Log In</h1>} />
          <Route exact path='/reset' render={() => <h1>Reset</h1>} />
          <Route exact path='/otp' render={() => <h1>OTP</h1>} />
          <Route exact path='/SharedTable/:tableId' render={() => <SharedTable /> } />
        </Switch>
      </Box>
    </div>
  );
}

export default App;