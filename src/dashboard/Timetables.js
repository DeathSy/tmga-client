import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Typography, Card, CardContent } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
const styles = {
  media: {
    height: '18em'
  },
  paper: {
    height: 100,
    width: 500,
    marginBottom: 24
  }
}

class Timetables extends React.Component {
  constructor () {
    super()
    this.state = {
      list: [],
      spacing: '40'
    }
  }

  componentDidMount = async () => {
    const { data } = await axios.get(`http://ml.tmga.cf/timetables`)
    let semester = data.map(term => term.semester)
    this.setState({ list: semester })
  }
  render () {
    const { classes } = this.props
    return this.state.list.map(term => (
      <Card
        className={classes.paper}
        button
        component={Link}
        to={'/timetables/undefined/show'}
        style={{ marginLeft: 10 }}
      >
        <CardContent style={{ marginTop: 10 }}>
          <Typography variant='headline' component='h1'>
            Semester: {term}
          </Typography>
        </CardContent>
      </Card>
    ))
  }
}
export default withStyles(styles)(Timetables)
