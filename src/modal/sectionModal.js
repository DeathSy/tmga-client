import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import axios from 'axios'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '100%'
  },
  actionContainer: {
    margin: theme.spacing.unit
  },
  button: {
    marginRight: theme.spacing.unit
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  nextButton: {
    float: 'right'
  }
})

const steps = [
  { title: 'Select a subject' },
  { title: 'Select a subject type' },
  { title: 'Fill in class range' },
  { title: 'Fill in section amount' },
  { title: 'Fill in lecturer' }
]

export class SectionModal extends React.Component {
  async componentWillMount () {
    const filter = JSON.stringify({
      where: {
        or: [
          { code: { nlike: 'GEN', option: 'i' } },
          { code: { nlike: 'LNG', option: 'i' } }
        ]
      }
    })
    const subject = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/subjects?filter=${filter}`
    )
    const subjectType = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/subjectFormats`
    )
    const lecturers = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/lecturers`
    )
    this.setState({
      subjects: subject.data,
      types: subjectType.data,
      lecturers: lecturers.data
    })
  }

  state = {
    subjects: [],
    type: [],
    lecturers: [],
    activeStep: 0,
    subjectName: undefined,
    subjectType: undefined,
    sectionAmount: 1,
    timeRange: 2
  }

  handleClick = activeStep => () => this.setState({ activeStep })

  handeSubmit = () => {
    const sectionKey = Object.keys(this.state).reduce((result, key) => {
      if (key.match(/section[0-9]Lecturer/g)) {
        result = [...result, key]
      }
      return result
    }, [])
    const sections = sectionKey.map((key, index) => ({
      lecturers: this.state[key].map(d => JSON.parse(d))
    }))

    this.props.onSubmit({
      subjectName: JSON.parse(this.state.subjectName),
      subjectType: JSON.parse(this.state.subjectType),
      time: this.state.timeRange,
      sections
    })
    this.reset()
    this.props.onClick()
  }

  reset = () => {
    const sectionKey = Object.keys(this.state).reduce((result, key) => {
      if (key.match(/section[0-9]Lecturer/g)) {
        result = [...result, key]
      }
      return result
    }, [])
    sectionKey.map(k => this.setState({ [k]: undefined }))
    this.setState({
      activeStep: 0,
      subjectName: undefined,
      sectionAmount: 1,
      timeRange: 2,
      subjectType: undefined
    })
  }

  handleChange = key => event => this.setState({ [key]: event.target.value })

  checkStep = () => {
    const { activeStep, subjectName, subjectType, timeRange } = this.state
    if (activeStep === 0 && !subjectName) {
      return true
    }
    if (activeStep === 1 && !subjectType) {
      return true
    }
    if (activeStep === 2 && !timeRange) {
      return true
    }
    const sectionKey = Object.keys(this.state).reduce((result, key) => {
      if (key.match(/section[0-9]Lecturer/g)) {
        result = [...result, key]
      }
      return result
    }, [])
    if (activeStep === 4 && !sectionKey.length) {
      const sections = sectionKey.map((key, index) => {
        return {
          lecturers: this.state[key].map(d => JSON.parse(d))
        }
      })

      if (sections.length === 0) {
        return true
      }
    }

    return false
  }

  render () {
    const { activeStep, subjects, types, lecturers } = this.state
    const { open, classes } = this.props

    return (
      <Dialog
        maxWidth={'md'}
        open={open}
        onClose={() => {
          this.reset()
          this.props.onClick()
        }}
      >
        <DialogTitle>Add Section</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label.title}>
                <StepLabel>{label.title}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === 0 && (
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor='subjectName'>
                  Subject name
                </InputLabel>
                <Select
                  value={this.state.subjectName || ''}
                  onChange={this.handleChange('subjectName')}
                >
                  {subjects.map(subject => (
                    <MenuItem key={subject.id} value={JSON.stringify(subject)}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {activeStep === 1 && (
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor='subjectType'>
                  Subject Type
                </InputLabel>
                <Select
                  value={this.state.subjectType || ''}
                  onChange={this.handleChange('subjectType')}
                >
                  {types.map(type => (
                    <MenuItem key={type.id} value={JSON.stringify(type)}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {activeStep === 2 && (
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor='timeRange'>
                  Class Range
                </InputLabel>
                <Input
                  type='number'
                  value={this.state.timeRange}
                  onChange={this.handleChange('timeRange')}
                  inputProps={{ min: 2 }}
                />
              </FormControl>
            )}
            {activeStep === 3 && (
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor='subjectAmount'>
                  Section amount
                </InputLabel>
                <Input
                  type='number'
                  value={this.state.sectionAmount}
                  onChange={this.handleChange('sectionAmount')}
                  inputProps={{ min: 1 }}
                />
              </FormControl>
            )}
            {activeStep === 4 && (
              <div>
                {Array.apply(null, { length: this.state.sectionAmount }).map(
                  (section, index) => (
                    <FormControl className={classes.formControl} key={index}>
                      <InputLabel shrink>
                        Section {String.fromCharCode(65 + index)}'s Lecturer
                      </InputLabel>
                      <Select
                        multiple
                        value={this.state[`section${index}Lecturer`] || []}
                        onChange={this.handleChange(`section${index}Lecturer`)}
                        renderValue={selected => (
                          <div className={classes.chips}>
                            {selected.map(value => (
                              <Chip
                                key={JSON.parse(value).id}
                                label={JSON.parse(value).name}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                      >
                        {lecturers.map(lecturer => (
                          <MenuItem
                            key={lecturer.id}
                            value={JSON.stringify(lecturer)}
                          >
                            {lecturer.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )
                )}
              </div>
            )}
            <div className={classes.actionContainer}>
              {activeStep > 0 && (
                <Button
                  className={classes.button}
                  disabled={activeStep === 0}
                  onClick={this.handleClick(activeStep - 1)}
                >
                  Back
                </Button>
              )}
              <Button
                className={classes.nextButton}
                variant='contained'
                color='primary'
                disabled={this.checkStep()}
                onClick={
                  activeStep === steps.length - 1
                    ? this.handeSubmit
                    : this.handleClick(activeStep + 1)
                }
              >
                {activeStep === steps.length - 1 ? 'Add' : 'Next'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withStyles(styles)(SectionModal)
