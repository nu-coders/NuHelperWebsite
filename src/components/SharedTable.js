import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import useFetch from "react-fetch-hook";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
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
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Modal from '@mui/material/Modal';



import Switch from '@mui/material/Switch';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

import TableCell from '@mui/material/TableCell';
import { ViewState } from '@devexpress/dx-react-scheduler';


const PORT = process.env.PORT || 8094;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '70%',
    width: '60%',
  };
  

const viewState = {
    currentView: 'week',
    currentDate: new Date('2023-03-05'),
    firstDayOfWeek: 0,
  }
  
  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2023, 0, 7);
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
  
  const CustomCell = ({ formatDate, startDate, ...restProps }) => (
    <TableCell {...restProps}>
      {formatDate(startDate, { weekday: 'long' })}
    </TableCell>
  );
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  function DashboardContent() {
  
   
  
      const [openModal, setOpenModal] = React.useState([]);
      const handleOpenModal = (index,value) => {
        let tempModal = [...openModal];
        tempModal[index] = value;
        setOpenModal(tempModal);
      };
      const handleCloseModal = (index) => {
        let tempModal = [...openModal];
        tempModal[index] = false;
        setOpenModal(tempModal);
      };
      const [openSnackbar, setOpenSnackbar] = React.useState(false);
      const handleClickSnackBar = () => {
        setOpenSnackbar(true);
      };
      const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false);
      };
      const action = (
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackBar}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
  
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
     
      const [loading2, setLoading] = useState(false);
  
      const [data, setData] = useState([]);
      
  
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
        setOpenSnackbar(true);
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
     const [loadingTables, setLoadingTables] = useState(false);
     const [foundTables, setFoundTables] = useState(true);
     
       
     const getData = async () => {
      setLoadingTables(true);
      setLoading(true);
      setFoundTables(true);
      setTables(null);

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
  
        // response =  await axios.post('https://test.nucoders.dev:8096/createTableNoClashWeb',
        response =  await axios.post('https://tm.nucoders.dev/createTableNoClashWeb', 
        {
          "id": addedCourses,
          "useFilters": useFilters,
          "filters": {
            "noDays" : numberOfDays,
            "DaysToGo" : daysToGo,
          },
          }
        );
        if(response.data.length == 0 || response.data == null){
          console.log("no tables found");
          setFoundTables(false);
        }
        console.log('data from server' + response.data);
        setTables(new Array(response.data));
      } catch{
        console.log('error');
      }finally{
        
        setLoading(false);
        setLoadingTables(false);
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
  
    const [viewState, setViewState] = useState({
      currentViewName: 'week',
      currentDate: new Date().toISOString()
    });
    const [currentDate, setCurrentDate] = useState(new Date().toISOString());
  
    const { tableId } = useParams();
    console.log(tableId);

    const [userId, setUserId] = useState(null);
    const [showEmailField, setShowEmailField] = useState('hidden');
    const [showLinkField, setShowLinkField] = useState('hidden');
    const [shareLink, setShareLink] = useState('');
    const sendTable = async (table, userId) => {
      if(showEmailField === 'visible' && userId !== null && userId !== undefined && userId !== '') {
        try{
          let response;
          // response =  await axios.post('https://test.nucoders.dev:8096/saveTable',
          response =  await axios.post('https://tm.nucoders.dev/saveTable',
          {
            "userId": userId,
            "table": table,
            }
          );
          setShareLink(JSON.stringify(response.data));
          setShowLinkField('visible');
          console.log('data from server' +JSON.stringify(response.data));
        } catch{
          console.log('error');
        }finally{
          setLoading(false);
        }
      }
    };
  
    const [sharedTable, setSharedTable] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try{
            let response;
            
              // response = await axios.get(
              //   'https://test.nucoders.dev:8096/getAllCourseNames',
              // );
              response = await axios.post(
                'https://tm.nucoders.dev/getSavedtable',
                {
                    "userId": tableId
                }   
              );
              setSharedTable(response.data.table);
              setUserEmail(response.data.userId);
              console.log(response.data);
            
          } catch{
            console.log('error');
          }finally{
            setLoading(false);
          }
          
        };
        fetchData();
    }, []);
  
    useEffect(() => {
    },[userId, showEmailField, shareLink,showLinkField])
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
             
              <Grid item xs={12} md={12} lg={12}>
               

                <Paper sx={{p: 2,display: 'flex',flexDirection: 'column',maxheight: 400,backgroundColor: `#0077b6`}}>
                    <Paper elevation={0} style={{minHeight: 400,maxHeight: 600, overflow: 'auto',backgroundColor: `#0077b6`}}>
{/* show the parameter in the url tableId */}
                               <List>
                                  {loadingTables &&     <Box sx={{ width: '100%' }}><Typography variant='h4' align="center" > Loading...</Typography>  <LinearProgress /></Box>}  
                                  {/* { tables && <p> Tables Found {tables.length}</p>} */}
                                  {tables && <Box> {tables.length !== 0 &&<Typography variant='h6' align="center" > Tables Found {tables.length}</Typography>} 
                                      <Typography sx={{color:'#fff'}} variant='h6' align="center" >Shared By: {userEmail}</Typography>

                                      <Paper sx={{margin:5 ,display: 'flex',flexDirection: 'column'}}>
                                        <Scheduler  data ={sharedTable} >
                                            
                                          {/* // remove the dates from this week */}
                                          <ViewState
                                              defaultCurrentDate={startDate}
                                              defaultCurrentViewName="Week"
                                            />
                                          <WeekView {...viewState} startDayHour={6.5} endDayHour={22} excludedDays={[5,6]} cellDuration={120} startDate={startDate} endDate={endDate} />
                                          <Appointments />
                                        </Scheduler>
                                        {/* Button to view all details about this table */}
                                        
                                        <Button sx={{backgroundColor: `#03045e`, m:2}} variant="contained" onClick={() => handleOpenModal(0,true)}>View Details</Button>
                                        <Modal
                                          open={openModal[0]}
                                          onClose={()=> {
                                            handleOpenModal(0);
                                            setShowEmailField('hidden');
                                            setShowLinkField('hidden');
                                            setUserId(null);
                                            setShareLink(null);
                                          }}
                                          aria-labelledby="modal-modal-title"
                                          aria-describedby="modal-modal-description"
                                          
                                        >
                                          <Box sx={modalStyle} >

                                              {/* <Typography  align="center" id="modal-modal-title" variant="h5" component="h2" >
                                                Table number {index+1}
                                              </Typography> */}
                                            <Paper sx={{m:2}}>

                                            <List>
                                            <Paper elevation={0} style={{height:'40vmin', overflow: 'scroll'}}>

                                              {sharedTable.map((course) => (
                                                <Paper sx={{margin:5 ,display: 'flex',flexDirection: 'column',backgroundColor: `#0077b6`, color: "#FFF"}}>
                                                  <Typography variant='h6' align="center" >{course.title + "-" + course.courseName}</Typography>
                                                  <Typography variant='h6' align="center" >Section: {course.courseSection}</Typography>
                                                  <Typography variant='h6' align="center" >Building: {course.location} Room: {course.courseRoom}</Typography>
                                                  <Typography variant='h6' align="center" >Instructor: {course.instructor}</Typography>
                                                  <Typography variant='h6' align="center" >Seats Left: {course.seatsLeft}</Typography>
                                                  <Typography variant='h6' align="center" > {course.courseType} </Typography>
                                                  <Typography variant='h6' align="center" >Day: {course.courseDay} </Typography>
                                                  <Typography variant='h6' align="center" >Start Time: {course.courseStartTime} </Typography>
                                                  <Typography variant='h6' align="center" >End Time: {course.courseEndTime} </Typography>

                                                </Paper>
                                              ))}
                                            </Paper>
                                              </List>
                                            </Paper>
                                            <Box sx={{display: 'flex',flexDirection: 'row'}}>

                                            
                                                
                                            </Box>
                                          </Box>
                                        </Modal>
                                      </Paper>
                                  </Box>}
                                  {!foundTables && <Typography variant='h3' align="center" > No tables found!</Typography>}          
                                  {console.log(foundTables,loadingTables)}             
                                </List>
                    </Paper>
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

export default function SharedTable() {
  return <DashboardContent />;
}

  