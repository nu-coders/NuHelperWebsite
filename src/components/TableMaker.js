import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "react-fetch-hook";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Copyright from "./CopyRight";
import {AppBar,Drawer} from './AppBarDrawer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { Slider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import logo from '../assets/images/logo.png';
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db, logout } from "../firestore/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';

const mdTheme = createTheme();

const marks = [
  {
      value: 0,
      label: '0',
  },
  {
      value: 1,
      label: '1',
  },
  {
      value: 2,
      label: '2',
  },
  {
      value: 3,
      label: '3',
  },
  {
      value: 4,
      label: '4',
  },
  {
      value: 5,
      label: '5',
  },
  {
      value: 6,
      label: '6',
  },    
]

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const [section, setSections] = React.useState([]);
    const [coursesSections, setCoursesSections] = React.useState([]);
    const [numberOfDays, setNumberOfDays] = React.useState(5);
    const handleChange = async (event, course) => {
      let sectionValueNew = [...section];
      sectionValueNew[addedCourses.indexOf(course)] = event.target.value;
      setSections(sectionValueNew);
    };
    const handleChangeSlider = (event, newValue) => {
      setNumberOfDays(newValue);
    };
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userUid, setUserUid] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
        setEmail(data.email);
        setUserUid(user.uid);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      fetchUserName();
    }, [user, loading]);
    
    const [loading2, setLoading] = useState(false);

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try{
            let response;
            const cachedData = localStorage.getItem('courseNames');
            if(cachedData) {
              response = {data: JSON.parse(cachedData)};
              console.log('data from cache');
            } else {
              response = await axios.get(
                '//localhost:8080/getAllCourseNames',
              );
              localStorage.setItem('courseNames', JSON.stringify(response.data));
              console.log('data from server');
            }
            setData(response.data);
          } catch{
            console.log('error');
          }finally{
            setLoading(false);
          }
          
        };
        fetchData();
    }, []);

    const fullCoursesList = data ? data: null;
    const coursesList = [...new Set(fullCoursesList)];
    const [selectedCourse, setSelectedCourse] = React.useState();
    const [addedCourses, setAddedCourses]= React.useState([]);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const addCourse = async() => {
      let course = selectedCourse.split(" ")[0];
      let selectedCoursesTemp = [...addedCourses, course];
      let uniqeSelectedCoursesTemp = [...new Set(selectedCoursesTemp)];
      setAddedCourses(uniqeSelectedCoursesTemp );
    }
    const removeCourse = (course)=>{
    console.log('removed ' +course) 
      let sectionsNew = [...section];
      sectionsNew.splice(addedCourses.indexOf(course),1);
      setSections(sectionsNew);
      setAddedCourses(addedCourses.filter(code => code !== course));

  }
    const [isClicked, setIsClicked] = React.useState(false);
    useEffect(() => {
      isClicked && setIsClicked(false);
   },[isClicked]);

   const [tables, setTables]= React.useState([]);
   const [useFilters, setUseFilters] = React.useState(false);
   const [filters, setFilters] = React.useState({});


   const getData = async () => {

    setLoading(true);
    console.log("using filters " + useFilters);
    try{
      let response;
      let daysToGo =[];
      if(state.sunday){
        daysToGo.push("Sunday");
      } 
      if(state.monday){
        daysToGo.push("Monday");
      }
      if(state.tuesday){
        daysToGo.push("Tuesday");
      }
      if(state.wednesday){
        daysToGo.push("Wednesday");
      }
      if(state.thursday){
        daysToGo.push("Thursday");
      }
      if(state.friday){
        daysToGo.push("Friday");
      }
      if(state.saturday){
        daysToGo.push("Saturday");
      }

      response =  await axios.post('//localhost:8080/createTableNoClash', 
      {
        "id": addedCourses,
        "useFilters": useFilters,
        "filters": {
          "noDays" : numberOfDays,
          "DaysToGo" : daysToGo,
        },
        }
      );
      console.log('data from server' + response.data);
      setTables(response.data);
    } catch{
      console.log('error');
    }finally{
      setLoading(false);
    }

    
  };
  
  const saveTableToUser = async (table) => {
    setLoading(true);
    try {
      let response;
      response = await axios.post('//localhost:8080/saveTable', {
        userId : userUid,
        userEmail : email,
        table: table,
      });
      console.log('data from server' + response);
      window.alert('Table saved successfully');
      navigate('/home');
    } catch(err) {
      console.log('error'+err);
    } finally {
      setLoading(false);
    }
  };

  const [state, setState] = React.useState({
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: false,
    saturday: false,
  });
  const handleChangeCheckbox = (event) => {
    console.log(event.target.name + ' ' + event.target.checked)
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = state;
  
  const [switchState, setSwitchState] = React.useState(false);
  const handleSwitch = (event) => {
    setSwitchState(event.target.checked);
    setUseFilters(event.target.checked);
    console.log(useFilters);
  };
   useEffect(() => {
 
  },[tables])
  return (    
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} style={{backgroundColor:`#03045e`}}>
          <Toolbar sx={{ pr: '24px'}} >
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }), }} >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} >
              NU Smart Helper
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}style={{background:`#03045e`}} >
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1],backgroundColor:`#03045e` }} >
          <img src={logo} alt="logo" style={{ width: "180px", height:"60px" }} />

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon style={{color:`#fff`}}/>
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" >
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: '100vh', overflow: 'auto', }} >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Search Courses */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper sx={{p: 2,display: 'flex',flexDirection: 'column',maxheight: 400,overflow: 'auto',backgroundColor: `#caf0f8`}}>
                    <Grid container spacing={3} >

                        <Grid item xs={9} md={8} lg={9} >
                                <Autocomplete disablePortal id="combo-box-demo" options={coursesList} inputValue = {selectedCourse} onChange={(event, newValue) => { setSelectedCourse(newValue); }}  renderInput={(params) => <TextField {...params}   label="Search Courses" />} />
                            </Grid>
                            <Grid item xs={3} md={4} lg={3}>
                                <Button sx={{backgroundColor: `#0077b6`}} variant="contained" onClick={() => {addCourse();}} >Add</Button>
                            </Grid>
                    </Grid>
                </Paper>
            </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Paper sx={{p: 2,display: 'flex',flexDirection: 'column',maxheight: 400,backgroundColor: `#0077b6`}}>
                    <Paper elevation={0} style={{minHeight: 400,maxHeight: 600, overflow: 'auto',backgroundColor: `#0077b6`}}>

                                <List>
                                  {tables && tables.map((table, index) => (

                                    <Paper key  ={index}sx={{ p:2, m: 2,backgroundColor: `#caf0f8`, alignItems:'center'}} alignItems="center" justify="center">
                                      <Typography> Table number {index+1} </Typography>
                                      {table.map((course, index)=>(
                                        <Paper key  ={course.id}sx={{ p:2, m: 2,backgroundColor: `#caf7b8`}}>
                                          <Typography> {course.courseId + " " + course.courseName} </Typography>
                                          <Typography> Section: {course.section } </Typography>
                                          <Typography> {course.courseType + " " + course.section} </Typography>
                                          <Typography> {course.schedule[0].dayDesc + " " + course.schedule[0].startTime + " - " + course.schedule[0].endTime} </Typography>
                                          <Typography> Instructor :{ course.instructors[0].fullName}</Typography>
                                        </Paper>
                                      ))}
                                      <Button align="center" variant="contained" onClick={()=>{saveTableToUser(table)}}>Choose Table</Button>
                                    </Paper>
                                  ))}
                                  {tables && tables.length === 0 && <Typography variant='h3' align="center" > No tables found </Typography>}
                                                                     
                                </List>
                    </Paper>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item  xs={12} md={4} lg={3} sx={{flexDirection:'row'}}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight:350 ,backgroundColor: `#caf0f8` }}>
                  <List>
                    <Typography variant="h6"  align="center">Added Courses</Typography>
                    <Divider/>
                    {addedCourses && addedCourses.map((course) => (
                        <ListItem key={course}>
                            <ListItemText primary={course} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => {removeCourse(course);}}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}

      
      
      
                  
                  </List>
                </Paper>
                <Paper sx={{ m:1, p: 2, display: 'flex', flexDirection: 'column', backgroundColor: `#caf0f8` }}>
                  
                  
                  <FormControl component="fieldset" variant="standard">
                    <FormControlLabel
                      control={
                        <Switch checked={switchState} onChange={handleSwitch} inputProps={{ 'aria-label': 'controlled',  }} color="secondary" />
                      }
                      label='Filters'
                    />

                  
                    <Typography  align="center">Number of days to go {numberOfDays}</Typography>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={5}
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                        min={1}
                        max={6}
                        value={numberOfDays}
                        onChange={handleChangeSlider}
                    />
                            <FormGroup>

                              <FormControlLabel control={
                                <Checkbox checked={sunday} onChange={handleChangeCheckbox} name="sunday" />
                                } label="Sunday" />
                              
                              <FormControlLabel control={
                                <Checkbox checked={monday} onChange={handleChangeCheckbox} name="monday" />
                                } label="Monday" />
                              
                              <FormControlLabel control={
                                <Checkbox checked={tuesday} onChange={handleChangeCheckbox} name="tuesday" />
                                } label="Tuesday" />
                              
                              <FormControlLabel control={
                                <Checkbox checked={wednesday} onChange={handleChangeCheckbox} name="wednesday" />
                                } label="Wednesday" />
                              
                              <FormControlLabel control={
                                <Checkbox checked={thursday} onChange={handleChangeCheckbox} name="thursday" />
                                } label="Thursday" />

                         
                          
                            </FormGroup>
                          
                                
                    </FormControl>
                </Paper>
                <Paper sx={{ m:1, p: 2, display: 'flex', flexDirection: 'column', backgroundColor: `#caf0f8` }}>
                  <Button sx={{backgroundColor: `#0077b6`}} variant="contained" onClick={() => {getData();}}  >Generate Tables</Button>
                </Paper>
              </Grid>              
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function TableMaker() {
  return <DashboardContent />;
}