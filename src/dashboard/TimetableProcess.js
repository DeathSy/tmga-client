import React ,{ Component } from 'react';
import loopbackRestClient, { authClient } from 'aor-loopback'
import { ShowButton } from 'react-admin';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Grid, Button, Paper, Typography, Card, CardContent, CircularProgress} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'

import { translate } from 'react-admin';
const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)
const styles = {
  media: {
    height: '18em',
  },
  paper: {
    height: 100,
    width: 500,
    marginBottom: 24,
  },
};

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
    const level = parseInt(data.fitnessLevel*100/85)*100 
    this.setState({fitnessLevel : level});
    console.log("fitness", this.state.fitnessLevel)
                
    }
render() {

  const { classes } = this.props;
  const { spacing } = this.state;
  if(this.state.fitnessLevel){
  return (
    <Grid item xs={12} style={{ marginTop: 20}}>
      <Grid item>
        <Typography variant='headline' component='h1' >
          Semester : {this.state.semester}
        </Typography>
      </Grid>
      <Grid container className={classes.demo} justify='flex-end' spacing={Number(spacing)} style={{ marginTop: 30}}>
      <Typography variant='headline' component='h2' >
      Progress : {this.state.fitnessLevel} % {this.state.fitnessLevel==100? <ShowButton component={Link} to='/timetables/undefined/show'/>: null}
      </Typography>
    </Grid>
    <Grid container className={classes.demo} justify='center' spacing={Number(spacing)}>
    <CircularProgress className={classes.progress} size={140} style={{ marginTop: 20 }} variant={this.state.fitness==100? "variant" :null} value={this.state.fitnessLevel} />
      </Grid>
      </Grid>
   
  );
  }
  return (
    <Grid item xs={12} style={{ marginTop: 100}}>
      <Grid container className={classes.demo} justify='center' spacing={Number(spacing)}>
        <Grid item>
          <Typography variant='headline' component='h2' >
          No process is running.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
}
// );

export default withStyles(styles)(TimetableProcess);