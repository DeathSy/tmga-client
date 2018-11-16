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
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import { withStyles } from '@material-ui/core/styles'
import Modal from '../modal/fixedConstraintModal'

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
    fixedData: []
  }

  componentWillMount () {
    this.setState({ fixedData: this.props.data })
  }

  handleModal = () => {
    this.setState(state => ({ open: !state.open }))
  }

  addFixedConstraint = data => {
    this.setState(state => ({
      fixedData: [...state.fixedData, data]
    }))
  }

  render () {
    const { classes } = this.props
    const { fixedData } = this.state
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Department</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>End time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fixedData.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{d.department}</TableCell>
                <TableCell>
                  {' '}
                  {d.day.map((dayname, index) => (
                    <Chip className={classes.chips} label={dayname.id} />
                  ))}
                </TableCell>
                <TableCell>{d.start.start}</TableCell>
                <TableCell>{d.end.end}</TableCell>
                <TableCell>
                  <Button size='small'>
                    <EditIcon className={classes.icon} />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {fixedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography align='center'>
                    Please add some fixed condition to continue.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className={classes.actionContainer}>
          <Button
            onClick={this.props.onBack(this.state.fixedData)}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={this.props.onClick(this.state.fixedData)}
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
            Add Fixed Condition
          </Button>
        </div>
        <Modal
          open={this.state.open}
          onSubmit={this.addFixedConstraint}
          onClick={this.handleModal}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Constraints)
