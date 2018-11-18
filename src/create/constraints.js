import React from 'react'
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Chip,
  Button,
  Typography
} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import { withStyles } from '@material-ui/core/styles'
import Modal from '../modal/constraintModal'

const styles = theme => ({
  chips: {
    margin: theme.spacing.unit / 4
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  actionContainer: {
    marginTop: theme.spacing.unit * 2
  }
})

export class Constraints extends React.Component {
  state = {
    open: false,
    constraintData: []
  }

  componentWillMount () {
    this.setState({ constraintData: this.props.data })
  }

  handleModal = () => {
    this.setState(state => ({ open: !state.open }))
  }

  addConstraint = data => {
    this.setState(state => ({
      constraintData: [...state.constraintData, data]
    }))
  }

  render () {
    const { classes } = this.props
    const { constraintData } = this.state
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lecturer Name </TableCell>
              <TableCell>Subject Name </TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>End time</TableCell>
              <TableCell>Required</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {constraintData.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{d.lecturer.name}</TableCell>
                <TableCell>{d.subject.code}</TableCell>
                <TableCell>
                  {' '}
                  {d.day.map((dayname, index) => (
                    <Chip className={classes.chips} label={dayname.id} />
                  ))}
                </TableCell>
                <TableCell>{d.room.name}</TableCell>
                <TableCell>{d.start.start}</TableCell>
                <TableCell>{d.end.end}</TableCell>
                <TableCell>
                  {d.required === true ? <DoneIcon /> : <ClearIcon />}
                </TableCell>
              </TableRow>
            ))}
            {constraintData.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography align='center'>
                    Please add some lecturer needs to continue.(optional)
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className={classes.actionContainer}>
          <Button
            onClick={this.props.onBack(this.state.constraintData)}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={this.props.onClick(this.state.constraintData)}
            style={{ float: 'right', marginLeft: 10 }}
          >
            Finish
          </Button>
          <Button
            className={classes.button}
            color='primary'
            onClick={this.handleModal}
            style={{ float: 'right' }}
          >
            Add Lecturer need
          </Button>
        </div>
        <Modal
          open={this.state.open}
          onSubmit={this.addConstraint}
          onClick={this.handleModal}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Constraints)
