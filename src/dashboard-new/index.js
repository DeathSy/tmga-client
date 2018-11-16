import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

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
    minHeight: '60vh',
    padding: 30,
    background: `url(${require('../static/images/bg.jpg')}) center`,
    backgroundSize: 'cover'
  },
  processPaper: {
    padding: 20,
    minWidth: '40%'
  },
  button: {},
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
})

export class Dashboard extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        <Grid container className={classes.processContainer}>
          <Paper className={classes.processPaper}>
            <div>
              <Grid container alignItems='center'>
                <Grid item xs={8}>
                  <Typography variant='title'>Latest Process</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant='extendedFab'
                    aria-label='Delete'
                    size='small'
                    className={classes.button}
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
                    <Typography>Semester:</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>2/2018</Typography>
                  </Grid>
                </Grid>
                <Grid
                  style={{ marginTop: 5 }}
                  container
                  alignItems='flex-end'
                  spacing={8}
                >
                  <Grid item>
                    <Typography>Created At:</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>16 Nov 2018</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CircularProgress size={50} />
              </div>
            </div>
          </Paper>
        </Grid>
        <Typography className={classes.title} variant='headline' component='h2'>
          Managging your own data in a simplest way
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={require('../static/images/rooms.jpg')}
                title='Rooms management'
              />
              <CardContent>
                <Typography gutterBottom variant='title' component='h2'>
                  Rooms Management
                </Typography>
                <Typography component='p'>
                  Manage all of your rooms data
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={require('../static/images/lecturers.jpg')}
                title='Lecturers management'
              />
              <CardContent>
                <Typography gutterBottom variant='title' component='h2'>
                  Lecturers Management
                </Typography>
                <Typography component='p'>
                  Manage all of your lecturers data
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={require('../static/images/subjects.jpg')}
                title='Contemplative Reptile'
              />
              <CardContent>
                <Typography gutterBottom variant='title' component='h2'>
                  Subjects Management
                </Typography>
                <Typography component='p'>
                  Manage all of your subjects data
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
