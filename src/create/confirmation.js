import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  title: {
    fontSize: 14
  },
  actionContainer: {
    marginTop: theme.spacing.unit * 2
  }
})

export const Confirmation = ({ classes, ...props }) => (
  <div>
    <Grid container className={classes.root} spacing={24}>
      {Object.keys(props.finalData).map(key => (
        <Grid key={key} item xs={3}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant='subheading' component='h5'>
                {key === 'sitClasses' && 'Section Items'}
                {key === 'otherFacClasses' && 'GEN/LNG/SSC Items'}
                {key === 'fixConditions' && 'No class time'}
                {key === 'lecturerConditions' && 'Lecturer Needs Items'}
              </Typography>
              <Typography variant='display3' component='h2' align='right'>
                {props.finalData[key].length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    <div className={classes.actionContainer}>
      <Button onClick={props.onBack()} className={classes.button}>
        Back
      </Button>
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        onClick={props.onSubmit}
        style={{ float: 'right', marginLeft: 10 }}
      >
        Start Create Timetable
      </Button>
    </div>
  </div>
)

export default withStyles(styles)(Confirmation)
