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

class Timetables extends React.Component {
  constructor() {
    super();
    this.state = {
      list:[],
      spacing: '40'
    }
  }
 
  componentDidMount = async () => {
    const { classes } = this.props;
    const { spacing } = this.state;
    const {data} = await axios.get(`http://ml.tmga.cf/timetables`)
    let semester = data.map((term)=>{
      return (
        <Card className={classes.paper} button component={Link} to={'/timetables'} style={{ marginLeft: 10 }} >
          <CardContent style={{ marginTop: 10 }}>
            <Typography variant='headline' component='h1' >
              Semester: {term.semester}
            </Typography>
          </CardContent>
        </Card>
  
      )
    })
    this.setState({list: semester})
                
    }
render() {

    return (
      this.state.list
    )
}}
export default withStyles(styles)(Timetables);