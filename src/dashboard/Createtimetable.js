import React ,{ Component } from 'react';
import loopbackRestClient, { authClient } from 'aor-loopback'
import { Link } from 'react-router-dom';
import { Grid, Button, Paper, Typography, Card, CardContent, CircularProgress, IconButton } from '@material-ui/core';
import QueryIcon from '@material-ui/icons/QueryBuilder'
import AddIcon from '@material-ui/icons/Add'
import CardIcon from './CardIcon'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  main: {
    flex: '1',
    marginRight: '1em',
    marginTop: 20,
  },
  card: {
    overflow: 'inherit',
    textAlign: 'right',
    padding: 16,
    minHeight: 52,
  },
});

class Createtimetable extends React.Component {
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
  }
render() {

  const { classes } = this.props;
  const { spacing } = this.state;
  return (
    <div className={classes.main}>
     <Card className={classes.card} >
     
        <IconButton aria-label="Create timetable"  component={Link} to={`/subjectSections`} >
          <AddIcon style={{ fontSize: 50}} />  
        </IconButton>
        <Typography variant='headline' component='h3' >
          Create timetable
        </Typography>
      </Card>
      </div>
   
  );
  }
 
}
// );

export default withStyles(styles)(Createtimetable);