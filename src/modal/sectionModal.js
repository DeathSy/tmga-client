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
  }
})

const steps = [
  { title: 'Select a subject' },
  { title: 'Select a subject type' },
  { title: 'Fill in section amount' },
  { title: 'Fill in lecturer' }
]

export class SectionModal extends React.Component {
  state = {
    activeStep: 0,
    subjectName: undefined,
    subjectType: undefined,
    sectionAmount: 1
  }

  handleClick = activeStep => () => this.setState({ activeStep })

  handeSubmit = () => {
    const sections = Object.keys(this.state)
      .reduce((result, key) => {
        if (key.match(/section[0-9]Lecturer/g)) {
          result = [...result, key]
        }
        return result
      }, [])
      .map((key, index) => ({
        lecturers: this.state[key]
      }))

    this.props.onSubmit({
      code: this.state.subjectName,
      type: this.state.subjectType,
      sections
    })
    this.props.onClick()
  }

  handleChange = key => event => this.setState({ [key]: event.target.value })

  render () {
    const { activeStep } = this.state
    const { open, classes } = this.props

    return (
      <Dialog open={open} onClose={this.props.onClick}>
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
                  <MenuItem value='INT102'>Computer Programming</MenuItem>
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
                  <MenuItem value='lab'>Lab</MenuItem>
                  <MenuItem value='lecture'>Lecture</MenuItem>
                </Select>
              </FormControl>
            )}
            {activeStep === 2 && (
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
            {activeStep === 3 && (
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
                                key={value}
                                label={value}
                                className={classes.chip}
                              />
                            ))}
                          </div>
                        )}
                      >
                        <MenuItem value='Aj. Kittiphan'>Aj. Kittiphan</MenuItem>
                        <MenuItem value='Dr. Umaporn'>Dr. Umaporn</MenuItem>
                      </Select>
                    </FormControl>
                  )
                )}
              </div>
            )}
            <div className={classes.actionContainer}>
              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={this.handleClick(activeStep - 1)}
              >
                Back
              </Button>
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
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
