import React ,{ Component } from 'react';
import loopbackRestClient, { authClient } from 'aor-loopback'
import { ShowButton } from 'react-admin';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Grid, Button, Paper, Typography, Card, CardContent, CircularProgress, LinearProgress} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import DoneIcon from '@material-ui/icons/Done';
import QueryIcon from '@material-ui/icons/QueryBuilder'
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'
import CardIcon from './CardIcon'

import { translate } from 'react-admin';
const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)
const styles = theme => ({
  main: {
    flex: '1',
    marginTop: 20,
  },
  card: {
    overflow: 'inherit',
    textAlign: 'left',
    padding: 30,
    minHeight: 52,
    margin: '1em'
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class TimetableProcess extends React.Component {
  constructor() {
    super();
    this.state = {
      roomlist: [],
      semester: "",
    }
  }
  
  componentWillMount = async () => {
    const date =new Date();
    const year = date.getFullYear()
    const month = date.getMonth()
    let term= 0
    if(month>=8 && month<=12){
      term = 2;
    }else{
      term=1;
    }
    this.setState({semester : `${term}/${year}`})
    const {data} = await axios.get(`http://ml.tmga.cf/timetables/${term}/${year}?fitnessLevel=true`)
    let level = 0;
    if(parseInt(((data.fitnessLevel.toFixed(2))*100/85)*100)>=100){
      level = 100
    }else{
      level =parseInt(((data.fitnessLevel.toFixed(2))*100/85)*100)
    }
    this.setState({fitnessLevel : level});
    console.log("fitness", this.state.fitnessLevel)
                
    }
    handleClick () {
      axios.post('http://ml.tmga.cf/timetables/terminate')
    }
render() {

  const { classes } = this.props;
  const { spacing } = this.state;
  if(this.state.fitnessLevel){
  return (
    <div className={classes.main}>
    <CardIcon Icon={QueryIcon} bgColor='#31708f' />
     <Card className={classes.card}>
     
        <Typography variant='headline' component='h2' >
          Semester : {this.state.semester} <div style={{float:'right', fontSize: 18}}>{this.state.fitnessLevel} % </div>{this.state.fitness==100? <CircularProgress className={classes.progress} size={40} style={{ marginRight : 10}} /> : <DoneIcon style={{ float: 'right'}}/> }
      
        </Typography>

      <Typography variant='paragraph' style={{ marginLeft : 80 }} >
      {this.state.fitnessLevel==100? <ShowButton component={Link} to='/timetables/undefined/show' style={{ float: 'right' }} /> : <Button color="secondary" onClick={this.handleChange} className={classes.button}>Terminate</Button>}
      </Typography>
      </Card>
      </div>
   
  );
  }
  return (
    <div className={classes.main}>
    <CardIcon Icon={QueryIcon} bgColor='#31708f' />
    <Card className={classes.card}>
          <Typography paragraph >
          No process is running.
          </Typography>
          </Card>
      </div>
  )
}
}
// );

export default withStyles(styles)(TimetableProcess);