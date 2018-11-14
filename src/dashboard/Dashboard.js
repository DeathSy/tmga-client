import React, { Component , Fragment } from 'react';
import { GET_LIST, GET_MANY, Responsive, Title } from 'react-admin';
import { Link } from 'react-router-dom'
import TimetableProcess from './TimetableProcess';
import Timetables from './Timetables';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Paper, Typography, Card, CardContent, CircularProgress} from '@material-ui/core';
import Subject from './Subject'
import Section from './Section'
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios';
import loopbackRestClient from 'aor-loopback'

const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)


const style = theme => ({
  root: {
    flexGrow: 1,
  },
  graph: {
    height: 400,
    width: 500,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  main: {
    flex: '1',
    marginRight: '1em',
    marginTop: 20,
  },
  card: {
    overflow: 'inherit',
    textAlign: 'left',
    padding: 30,
    minHeight: 108,
  },
    
});
const styles = {
  flex: { display: 'flex' },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  leftCol: { flex: 1, marginRight: '1em' },
  rightCol: { flex: 1, marginLeft: '1em' },
  singleCol: { marginTop: '2em', marginBottom: '2em' },
};


class Dashboard extends React.Component {
  constructor(){
    super();
    this.state={
      list:[],
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
   
  componentDidMount = async () => {
    const {data} = await axios.get(`http://ml.tmga.cf/timetables`)
    let semester = data.map((term)=> `Semester : ${term.semester}`  )
    this.setState({list: semester})
                
    }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Fragment>
                <Responsive
                    xsmall={
                        <div>
                            <div style={styles.flexColumn}>
                                <div style={{ marginBottom: '2em', marginRight: '1em' }}>
                                <Button variant="contained" color="primary" className={classes.card} style={{ float :'right' }} component={Link} to={`/subjectSections`}>
                                     <AddIcon />  
                                     Create timetable
                                    </Button>
                                </div>
                                <div style={styles.flex}>
                                
                                <TimetableProcess />
                                
                                </div>
                                <div style={styles.singleCol}>
                                   
                                </div>
                            </div>
                        </div>
                    }
                    small={
                        <div style={styles.flexColumn}>
                            <div style={styles.singleCol}>
                            <Button variant="contained" color="primary" className={classes.button} style={{ float :'right'}} component={Link} to={`/subjectSections`}>
                                     <AddIcon />  
                                     Create timetable
                                    </Button>
                            </div>
                            <div style={styles.flex}>
                              <TimetableProcess />
                            </div>
                            <div style={styles.singleCol}>
                            </div>
                        </div>
                    }
                    medium={
                      <div className={classes.root}>
                      <Grid container spacing={24}>
                        <Grid item md={12}>
                        <Button variant="contained" color="primary" className={classes.button} style={{ float :'right'}} component={Link} to={`/subjectSections`}>
                           <AddIcon />  
                           Create timetable
                         </Button>
                        </Grid>
                        <Grid item md={6}>
                          <TimetableProcess />
                        </Grid>
                        {this.state.list.map(term => 
                        <Grid item md={6}>
                        <div className={classes.main}>
                          <Card className={classes.card} style={{ marginLeft: 10 }} >
                              <Typography variant='headline' component='h1'  button component={Link} to={'/timetables/undefined/show'}>
                                {term}
                              </Typography>
                          </Card>
                          </div>
                          </Grid>)}

                      </Grid>
                    </div>
                      // <div>
                      //   <Button variant="contained" color="primary" className={classes.button} style={{ float :'right'}} component={Link} to={`/subjectSections`}>
                      //     <AddIcon />  
                      //     Create timetable
                      //   </Button>
                      //   <div style={styles.flex}>
                         
                      //       <div style={styles.leftCol}>
                      //           <div style={styles.flex} >
                      //           {/* <Button variant="contained" color="primary" className={classes.main} style={{ float :'right', backgroundColor: 'white' , color:'black'}} component={Link} to={`/subjectSections`}>
                      //                <AddIcon />  
                      //                Create timetable
                      //               </Button>
                      //               <Subject /> */}
                      //           <TimetableProcess />
                      //           </div>
                      //           <div style={styles.singleCol}>
                                
                      //           </div>
                      //           <div style={styles.singleCol}>
                      //           </div>
                      //       </div>
                      //       <div style={styles.rightCol}>                               

                      //           <div style={styles.flex}> 
                      //           <Timetables />
                                
                      //           {/* <Section />
                      //           <Subject /> */}
                      //           </div>
                      //       </div>
                      //   </div>
                      //   </div>
                    }
                />
            </Fragment>

      // <Grid container className={classes.root} spacing={24}>
      //   <Grid item xs={12}>
      //   <Grid container className={classes.demo} justify='flex-end' spacing={Number(spacing)}>
      //     <Button variant="contained" color="primary" className={classes.button}  component={Link} to={`/subjectSections`}>
      //        <AddIcon />  Create timetable
      //     </Button>
      //     </Grid>
      //   </Grid>
      //   <Grid item xs={6}>
      //     <Grid container className={classes.demo} justify='flex-start' spacing={Number(spacing)}>
      //       <Grid item>
      //         <Card className={classes.graph} style={{ marginLeft: 20 }} >
      //           <CardContent>
      //             <Grid container className={classes.demo} justify='flex-start' spacing={Number(spacing)}>
      //               <TimetableProcess />
      //             </Grid>
      //           </CardContent>
      //         </Card>
      //       </Grid>
      //     </Grid> 
      //   </Grid>
      //   <Grid item xs={6}>
      //     <Grid container className={classes.demo} justify='flex-start' spacing={Number(spacing)}>
      //       <Timetables />
      //     </Grid>
      //   </Grid>
      // </Grid>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Dashboard);