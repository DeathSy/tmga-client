import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'

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

export class Confirmation extends React.Component {
  state = {
    loading: false
  }

  transformSection = sectionData => {
    const sectionMap = new Map()
    sectionData.map(d => {
      d.sections.map((section, index) => {
        if (!sectionMap.get(d.subjectName.id)) {
          sectionMap.set(d.subjectName.id, [
            {
              name: String.fromCharCode(65 + index),
              subjectId: d.subjectName.id,
              type: d.subjectType.id,
              lecturers: section.lecturers
            }
          ])
        } else {
          sectionMap.set(d.subjectName.id, [
            ...sectionMap.get(d.subjectName.id),
            {
              name: String.fromCharCode(65 + index),
              subjectId: d.subjectName.id,
              type: d.subjectType.id,
              lecturers: section.lecturers
            }
          ])
        }
      })
    })
    const sections = []
    sectionMap.forEach((value, key) => {
      sections.push(value)
    })
    return sections
  }

  onSubmit = async () => {
    this.setState({ loading: true })

    const sections = this.transformSection(this.props.finalData.sitClasses)

    await sections.map(async s => {
      await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/SubjectSections`,
        { sections: s }
      )
    })

    this.setState({ loading: false })
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <Grid container className={classes.root} spacing={24}>
          {Object.keys(this.props.finalData).map(key => (
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
                    {this.props.finalData[key].length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className={classes.actionContainer}>
          <Button onClick={this.props.onBack()} className={classes.button}>
            Back
          </Button>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={!this.state.loading ? this.onSubmit : () => null}
            disabled={this.state.loading}
            style={{ float: 'right', marginLeft: 10 }}
          >
            {!this.state.loading ? (
              'Start Create Timetable'
            ) : (
              <CircularProgress size={25} />
            )}
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Confirmation)
