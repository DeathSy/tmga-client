import React from 'react';
import { GET_LIST, GET_MANY, Responsive, Title } from 'react-admin';
import loopbackRestClient, { authClient } from 'aor-loopback'

import { Link } from 'react-router-dom'
import Welcome from './Welcome';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, CircularProgress } from '../../node_modules/@material-ui/core';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 100,
    width: 550,
  },
  graph: {
    height: 600,
    width: 600,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)
const toTimetable = props => <Link to="/Timetable.js" {...props} />
class GuttersGrid extends React.Component {
  constructor(){
    super();
    this.state={
      roomlist: [],
    }
  }
  state={
    spacing: '40',
  };

    componentDidMount() {
                dataProvider(GET_LIST, 'rooms', {
                    filter: {
                      building: 'SIT Building',
                    },
                    sort: { order: 'DESC' },
                    pagination: { page: 1, perPage: 100 },
                })
                .then(response => response.data)
                .then(reviews => {
                  let rooms =reviews.map(review => review.name)
                  console.log(rooms)
                  this.setState({roomlist: rooms});
                  console.log('state',this.state.roomlist)
                })

    }
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
      <Button variant='contained' color='primary' component={toTimetable}> Create timetable </Button>
      </Grid> 
        </Grid>
         <Grid item xs={6}>
          <Grid container className={classes.demo} justify='flex-start' spacing={Number(spacing)}>
              <Grid item>
                <Card className={classes.graph} >
                <CardContent>
                <Typography variant='headline' component='h2'>
                Semester : 

              </Typography>
              <CircularProgress className={classes.progress} variant="static" value={75} />
              </CardContent>
                </Card>
              </Grid>

        </Grid> 
        </Grid>
        <Grid item xs={6}>
          <Grid container className={classes.demo} justify='flex-start' spacing={Number(spacing)}>
            {/* {[0, 1 ].map(value => ( */}
              <Grid item>
                <Welcome />
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