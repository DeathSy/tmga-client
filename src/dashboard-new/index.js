import React from 'react'
import CircularProgressbar from 'react-circular-progressbar'
import SubjectManagement from './subject'
import LecturerManagement from './lecturer'
import RoomManagement from './room'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import axios from 'axios'
import 'react-circular-progressbar/dist/styles.css'

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: 50,
    paddingRight: 50
  },
  title: {
    margin: '20px 0'
  },
  card: {},
  media: {
    height: 200
  },
  processContainer: {
    minheight: '70vh',
    maxheight: '80vh',
    padding: 30,
    background: `url(${require('../static/images/bg.jpg')}) center`,
    backgroundSize: 'cover'
  },
  processPaper: {
    padding: 20,
    minWidth: '40%',
    maxWidth: '50%',
    minHeight: '50vh'
  },
  button: { float: 'right', paddingRight: 15 },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
})

export class Dashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      semester: ''
    }
  }

  fetchData = async () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    let term = 0
    if (month >= 8 && month <= 12) {
      term = 2
    } else {
      term = 1
    }
    const { data } = await axios.get(
      `http://ml.tmga.cf/timetables/${term}/${year}`
    )

    if (data) {
      let level = 0
      if (parseInt(((data.fitnessLevel.toFixed(2) * 100) / 85) * 100) >= 100) {
        level = 100
      } else {
        level = parseInt(((data.fitnessLevel.toFixed(2) * 100) / 85) * 100)
      }
      this.setState({
        timetableId: data._id,
        fitnessLevel: level,
        semester: `${term}/${year}`,
        updated: moment(new Date(data.updatedAt)).fromNow()
      })
    }
  }

  componentWillMount = async () => {
    await this.fetchData()
    setInterval(async () => {
      await this.fetchData()
    }, 10000)
  }

  handleClick = async () => {
    await axios.post('http://ml.tmga.cf/timetables/terminate')
  }

  render () {
    const { classes } = this.props
    if (this.state.fitnessLevel) {
      return (
        <div>
          <Grid container className={classes.processContainer}>
            <Paper className={classes.processPaper}>
              <div>
                <Grid container alignItems='center'>
                  <Grid item xs={8}>
                    <Typography variant='headline'>Latest Process</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant='extendedFab'
                      color='default'
                      aria-label='Delete'
                      size='small'
                      className={classes.button}
                      component={Link}
                      to={'/create'}
                    >
                      <AddIcon className={classes.extendedIcon} />
                      Create timetable
                    </Button>
                  </Grid>
                  <Grid
                    style={{ marginTop: 5 }}
                    container
                    alignItems='flex-end'
                    spacing={8}
                  >
                    <Grid item>
                      <Typography variant='title'>Academic Year </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='title'>2/2018</Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    style={{ marginTop: 5 }}
                    container
                    alignItems='flex-end'
                    spacing={8}
                  >
                    <Grid item>
                      <Typography variant='caption'>
                        Latest updated {this.state.updated}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  style={{ marginTop: 20 }}
                  container
                  direction='row'
                  justify='center'
                  alignItems='flex-end'
                >
                  <Grid item>
                    <div style={{ width: '150px' }}>
                      <CircularProgressbar
                        percentage={this.state.fitnessLevel}
                        text={`${this.state.fitnessLevel}%`}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  style={{ marginTop: 20 }}
                  container
                  direction='row'
                  justify='center'
                  alignItems='flex-end'
                >
                  <Grid item>
                    {this.state.fitnessLevel < 100 ? (
                      <Button
                        style={{ color: 'red' }}
                        onClick={this.handleClick}
                        className={classes.button}
                      >
                        Terminate
                      </Button>
                    ) : (
                      <Button
                        color='primary'
                        onClick={this.handleClick}
                        component={Link}
                        to={`/timetables/${this.state.timetableId}`}
                      >
                        Show
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
          <Typography
            className={classes.title}
            variant='headline'
            component='h2'
          >
            Managing your own data in a simplest way
          </Typography>
          <Grid container spacing={24}>
            <Grid
              item
              xs={6}
              button
              component={Link}
              to={'/rooms'}
              style={{ textDecoration: 'none' }}
            >
              <RoomManagement />
            </Grid>
            <Grid
              item
              xs={6}
              button
              component={Link}
              to={'/subjects'}
              style={{ textDecoration: 'none' }}
            >
              <SubjectManagement />
            </Grid>
            <Grid
              item
              xs={6}
              button
              component={Link}
              to={'/lecturers'}
              style={{ textDecoration: 'none' }}
            >
              <LecturerManagement />
            </Grid>
          </Grid>
        </div>
      )
    }
    return (
      <div>
        <Grid container className={classes.processContainer}>
          <Paper className={classes.processPaper}>
            <div>
              <Grid container alignItems='center'>
                <Grid item xs={8}>
                  <Typography variant='headline'>Latest Process</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant='extendedFab'
                    color='default'
                    aria-label='Delete'
                    size='small'
                    className={classes.button}
                    component={Link}
                    to={'/create'}
                  >
                    <AddIcon className={classes.extendedIcon} />
                    Create timetable
                  </Button>
                </Grid>
              </Grid>
              <Grid
                style={{ marginTop: 130 }}
                container
                direction='row'
                justify='center'
                alignItems='flex-end'
              >
                <Grid item>No process is running.</Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>
        <Typography className={classes.title} variant='headline' component='h2'>
          Managing your own data in a simplest way
        </Typography>
        <Grid container spacing={24}>
          <Grid
            item
            xs={6}
            button
            component={Link}
            to={'/rooms'}
            style={{ textDecoration: 'none' }}
          >
            <RoomManagement />
          </Grid>
          <Grid
            item
            xs={6}
            button
            component={Link}
            to={'/subjects'}
            style={{ textDecoration: 'none' }}
          >
            <SubjectManagement />
          </Grid>
          <Grid
            item
            xs={6}
            button
            component={Link}
            to={'/lecturers'}
            style={{ textDecoration: 'none' }}
          >
            <LecturerManagement />
          </Grid>{' '}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
