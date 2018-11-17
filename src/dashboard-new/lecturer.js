import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: 50,
    paddingRight: 50
  },
  card: {},
  media: {
    height: 200
  }
})
export class LecturerManagement extends React.Component {
  render () {
    const { classes } = this.props

    return (
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
    )
  }
}

export default withStyles(styles)(LecturerManagement)
