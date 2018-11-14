import React, { Fragment } from 'react'
import { Responsive } from 'react-admin'
import { Link } from 'react-router-dom'
import TimetableProcess from './TimetableProcess'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button, Typography, Card } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios'

const style = theme => ({
  root: {
    flexGrow: 1
  },
  graph: {
    height: 400,
    width: 500
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  main: {
    flex: '1',
    marginRight: '1em',
    marginTop: 20
  },
  card: {
    overflow: 'inherit',
    textAlign: 'left',
    padding: 30,
    minHeight: 108
  }
})
const styles = {
  flex: { display: 'flex', marginLeft: '1em' },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  leftCol: { flex: 1, marginRight: '1em' },
  rightCol: { flex: 1, marginLeft: '1em' },
  singleCol: { marginTop: '2em', marginBottom: '2em' }
}

class Dashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      list: []
    }
  }
  state = {
    spacing: '40',
    fitnessLevel: 0
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    })
  }

  componentDidMount = async () => {
    const { data } = await axios.get(`http://ml.tmga.cf/timetables`)
    let semester = data.map(term => `Semester : ${term.semester}`)
    this.setState({ list: semester })
  }

  render () {
    const { classes } = this.props

    return (
      <Fragment>
        <Responsive
          xsmall={
            <div>
              <div style={styles.flexColumn}>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  style={{ float: 'right', padding: 20, margin: '1em' }}
                  component={Link}
                  to={`/subjectSections`}
                >
                  <AddIcon />
                  Create timetable
                </Button>
                <TimetableProcess />
                {this.state.list.map(term => (
                  <Card
                    className={classes.card}
                    style={{ margin: '1em' }}
                    component='h1'
                    button
                    component={Link}
                    to={'/timetables/undefined/show'}
                  >
                    <Typography variant='headline'>{term}</Typography>
                  </Card>
                ))}
              </div>
            </div>
          }
          small={
            <div>
              <div style={styles.flexColumn}>
                <div style={styles.rightCol}>
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    style={{ float: 'right', margin: '1em' }}
                    component={Link}
                    to={`/subjectSections`}
                  >
                    <AddIcon />
                    Create timetable
                  </Button>
                </div>

                <TimetableProcess />
                {this.state.list.map(term => (
                  <Card className={classes.card} style={{ margin: '1em' }}>
                    <Typography
                      variant='headline'
                      component='h1'
                      button
                      component={Link}
                      to={'/timetables/undefined/show'}
                    >
                      {term}
                    </Typography>
                  </Card>
                ))}
              </div>
            </div>
          }
          medium={
            <div className={classes.root}>
              <Grid container spacing={24}>
                <Grid item md={12}>
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    style={{ float: 'right' }}
                    component={Link}
                    to={`/subjectSections`}
                  >
                    <AddIcon />
                    Create timetable
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <TimetableProcess />
                </Grid>
                {this.state.list.map(term => (
                  <Grid item md={6}>
                    <div className={classes.main}>
                      <Card className={classes.card}>
                        <Typography
                          variant='headline'
                          component='h1'
                          button
                          component={Link}
                          to={'/timetables/undefined/show'}
                        >
                          {term}
                        </Typography>
                      </Card>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          }
        />
      </Fragment>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(style)(Dashboard)
