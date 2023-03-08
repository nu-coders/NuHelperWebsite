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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

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
            const cachedData = localStorage.getItem('courseNamesNu');
            if(cachedData) {
              response = {data: JSON.parse(cachedData)};
              console.log('data from cache');
            } else {
              response = await axios.get(
                '//localhost:8080/getAllCourseNames',
              );
              localStorage.setItem('courseNamesNu', JSON.stringify(response.data));
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

    const [posts, setPosts] = useState([]);
    const getPosts = async() => {
      let course = selectedCourse.split(" ")[0];
      let selectedCoursesTemp = [...course];
      let uniqeSelectedCoursesTemp = [...new Set(selectedCoursesTemp)];
      setAddedCourses(uniqeSelectedCoursesTemp );
      let response ;
      response =  await axios.post('//localhost:8082/getRoomPostsByRoomId', 
      {
        "roomId": course.replace('/',''),
        }
      );
      console.log('data from server %j' , response.data);
      setPosts(response.data);
    }

    const [isClicked, setIsClicked] = React.useState(false);
    useEffect(() => {
      isClicked && setIsClicked(false);
   },[isClicked]);

  const onUpvote = async (post) => {
    setIsClicked(true);
    let response ;
    response =  await axios.post('//localhost:8082/upvotePost',
    {
      "postId": post.postId,
      "userId": userUid,
      "roomId": post.roomId,
      }
    );
    console.log('data from server ' + response.data);
    setPosts(response.data);
  }

  const onDownvote = async (post) => {
    setIsClicked(true);
    let response ;
    response =  await axios.post('//localhost:8082/downvotePost',
    {
      "postId": post.postId,
      "userId": userUid,
      "roomId": post.roomId,
      }
    );
    console.log('data from server ' + response.data);
    setPosts(response.data);
  }

  const classes = {
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginRight: '8px',
    },
    body: {
      fontSize: 16,
    },
  };
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
                                <Button sx={{backgroundColor: `#0077b6`}} variant="contained" onClick={() => {getPosts();}} >Posts</Button>
                            </Grid>
                    </Grid>
                </Paper>
            </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Paper sx={{p: 2,display: 'flex',flexDirection: 'column',maxheight: 400,backgroundColor: `#0077b6`}}>
                    <Paper elevation={0} style={{minHeight: 400,maxHeight: 600, overflow: 'auto',backgroundColor: `#0077b6`}}>

                                <List>
                                  {posts&&posts.map((post) => (
                                    <Paper key={post.id} button>
                                      <div className={classes.root}>
                                      <div className={classes.title}>{1}</div>
                                      <div className={classes.body}>{2}</div>
                                      <IconButton onClick={onUpvote}>
                                        <ThumbUpIcon />
                                      </IconButton>
                                      <IconButton onClick={onDownvote}>
                                        <ThumbDownIcon />
                                      </IconButton>
                                    </div>
                                    </Paper>
                                  ))}
                                  {posts&&posts.length===0&&<ListItem key={1} button>
                                      <ListItemText primary="No Posts Found" />
                                      </ListItem>
                                      }                               
                                </List>
                    </Paper>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
                          
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function NuTips() {
  return <DashboardContent />;
}