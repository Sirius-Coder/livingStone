import React ,{useState} from 'react'
import { Grid , Toolbar ,AppBar , Button, Avatar ,Paper ,TextField ,Select,MenuItem} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import logo from './img/logo.svg'
import axios from 'axios'
//Material UI Styles 
const useStyles = makeStyles(theme=>({
  root:{
   margin:0,
   padding:0,
   fontFamily:'Poppins',
   background:"#F7F7F2",
  },
  viewArea:{
    padding:'0.5em',
    margin:'1em auto',
    width:'50%',
  },
  tripArea:{
    padding:'0.5em',
    margin:'1em auto',
    width:'70%',
  }
 
}))

function App() {
  const classes = useStyles();
  const [startDate,setStartDate]=useState(new Date())
  const [endDate,setEndDate]=useState(new Date())
  const [people,setPeople]=useState(0);
  const [purpose,setPurpose]=useState('')
  const [budget,setBudget]=useState(0)
  const [trip,setTrip] = useState([])
  const [duration,setDuration] =useState(0)
  const [cost,setCost] =useState(0)
  //onSubmit Function 
  const submitPlan=async()=>{
    try{
      const data = await axios.post('/plan',{startDate,endDate,people,purpose,budget})
      setTrip(data.data.trip)
      setDuration(data.data.duration)
      setCost(data.data.budget)
    }
   catch(e){
     console.error(e)
   }
  }
  //setStartDate
  const start=(e)=>{
    setStartDate(e.target.value)
  }
  //setEndDate
  const end=(e)=>{
    setEndDate(e.target.value)
  }
  //setPeople
  const noOfPeople=(e)=>{
    setPeople(e.target.value)
  }
  //setPurpose
  const purposeOfTrip=(e)=>{
    setPurpose(e.target.value)
  }
  //setBudget
  const budgetset=(e)=>{
    setBudget(e.target.value)
  }
  return (
    <div className={classes.root}>
    <Grid>
      <AppBar position="static">
        <Toolbar style={{background:'black'}} >
          <Grid container alignItems="center"  >
            <Grid item xs={1} align='center' style={{background:'black'}} >
            <Avatar src={logo}  alt="Logo"  />
            </Grid>
            <Grid item xs={11} align='center' >
              <h2>Problem Statement API for LivingStone </h2>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
    
      <Paper className={classes.viewArea} >
      <Grid container  alignItems='center' justify="center">
        <Grid item xs={12} align='center' >
        <h2>Enter Travel Details </h2>
        </Grid>
        <Grid item xs={6} align='center' >
        <h3>Enter Start Date </h3>
        </Grid>
        <Grid item xs={6}  >
        <TextField
    id="date"
    label="Start Date"
    type="date"
    defaultValue={startDate}
    onChange={start}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
        </Grid>
        <Grid item xs={6} align='center' >
        <h3>Enter End Date </h3>
        </Grid>
        <Grid item xs={6}  >
        <TextField
    id="date"
    label="End Date"
    type="date"
    defaultValue={endDate}
    onChange={end}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
        </Grid>
        <Grid item xs={6} align='center' >
        <h3>No. of People </h3>
        </Grid>
        <Grid item xs={6}  >
        <TextField id="people" label="Enter here" variant="outlined" size='small' type="number" onChange={noOfPeople} />
        </Grid>
        <Grid item xs={6} align='center' >
        <h3>Purpose of the holiday </h3>
        </Grid>
        <Grid item xs={6}  >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={purpose}
          onChange={purposeOfTrip}
          style={{width:"50%"}}
        >
          <MenuItem value={'Retreat'}>Retreat</MenuItem>
          <MenuItem value={'Adventure'}>Adventure</MenuItem>
          <MenuItem value={'Romantic'}>Romantic</MenuItem>
          <MenuItem value={'Exploratory'}>Exploratory</MenuItem>
        </Select>
        </Grid>
        <Grid item xs={6} align='center' >
        <h3>Budget </h3>
        </Grid>
        <Grid item xs={6}  >
        <TextField id="budget" label="Enter here" variant="outlined" size='small' type="number" onChange={budgetset} />
        </Grid>
        <Grid item xs={12} align='center' >
          <Button variant="contained" color="primary" style={{marginTop:'1em',padding:'0.5em'}} onClick={submitPlan} >
            Check Holiday Plans
          </Button>
        </Grid>
        </Grid>
      </Paper>

      {/* Best Possible Plan Section */}
      {duration===0?<></>:<Paper className={classes.tripArea}  >
        {cost===0?<>
        <h3>Sorry No Possible Plans available for this budget !</h3>
        </>:<Grid container >
          <Grid item xs={12} align='center'><h1>Best Plan </h1> </Grid>
          <Grid item xs={6} align='center'>
            <h3>Duration of Trip : {duration} days</h3>
          </Grid>
          <Grid item xs={6} align='center'>
            <h3>Total Cost of Trip : ₹{cost} </h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Location</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Distance(in kms)</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Accomodation</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Places to Visit</h3>
          </Grid>
        {trip.map(para=>(<Plan key={para.location} location={para.location} accomodation={para.accomodation} places={para.places} distance={para.distance} />))}
        </Grid>}
       
      </Paper>}
      <></>
    </div>
  );
}

export default App;

const Plan=({location,accomodation,places,distance})=>{
return(<>
<Grid container >
<Grid item xs={3}>
<h4>{location}</h4>
</Grid>
<Grid item xs={3}>
<h4>{distance}</h4>
</Grid>
<Grid item xs={3}>
<h4>{accomodation}</h4>
</Grid>
<Grid item xs={3}>
<h4>{places}</h4>
</Grid>
</Grid>

</>)
}