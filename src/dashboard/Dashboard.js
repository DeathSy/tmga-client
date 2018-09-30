import React from 'react';
import { ShowButton } from 'react-admin'
import loopbackRestClient, { authClient } from 'aor-loopback'
import { Link } from 'react-router-dom'
import TimetableProcess from './TimetableProcess';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Paper, Typography, Card, CardContent, CircularProgress} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 100,
    width: 550,
  },
  graph: {
    height: 400,
    width: 600,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});


class GuttersGrid extends React.Component {
  constructor(){
    super();
    this.state={
      roomlist: [],
    }
  }
  state={
    spacing: '40',
    fitnessLevel : 0,
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };
  

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      
      <Grid container className={classes.root} spacing={24}>
        <Grid item xs={12}>
        <Grid container className={classes.demo} justify='flex-end' spacing={Number(spacing)}>
          <Button variant="contained" color="primary" className={classes.button}  component={Link} to={`/subjectSections`}>
             <AddIcon />  Create timetable
          </Button>
          </Grid>
        </Grid>
         <Grid item xs={6}>
          <Grid container className={classes.demo} justify='flex-start' spacing={Number(spacing)}>
              <Grid item>
                <Card className={classes.graph} style={{ marginLeft: 20 }} >
                <CardContent>
                  <Grid container className={classes.demo} justify='flex-start' spacing={Number(spacing)}>
                    <Grid item>
                      <Typography variant='headline' component='h1' >
                      Semester : 2/2018
                    </Typography>
                    </Grid>
                    <TimetableProcess />
                    </Grid>
              </CardContent>
                </Card>
              </Grid>

        </Grid> 
        </Grid>

        <Grid item xs={6}>
          <Grid container className={classes.demo} justify='flex-start' spacing={Number(spacing)}>
            {/* {[0, 1 ].map(value => ( */}
              <Grid item>
                
             </Grid>
            {/* ))} */}
           </Grid>
        </Grid>
       
      </Grid>
    );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);