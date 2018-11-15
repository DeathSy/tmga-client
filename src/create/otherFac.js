import React from 'react'
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  Typography
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles'
import Modal from '../modal/otherModal'

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

export class OtherFac extends React.Component {
  state = {
    open: false,
    otherData: []
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }))
  }

  handleModal = () => {
    this.setState(state => ({ open: !state.open }))
  }

  addOther = data => {
    this.setState(state => ({ otherData: [...state.otherData, data] }))
  }

  render () {
    const { classes } = this.props
    const { otherData } = this.state

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject Code</TableCell>
              <TableCell>Subject Name</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>End time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.otherData.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{d.code}</TableCell>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.day}</TableCell>
                <TableCell>{d.start}</TableCell>
                <TableCell>{d.end}</TableCell>
                <TableCell>
                  <Button size='small'>
                    <EditIcon className={classes.icon} />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}{' '}
            {otherData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography align='center'>
                    Please add some other class to continue.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className={classes.actionContainer}>
          <Button onClick={this.handleBack} className={classes.button}>
            Back
          </Button>
          <Button
            className={classes.button}
            color='primary'
            onClick={this.handleModal}
          >
            Add Other Class
          </Button>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={this.props.onClick}
          >
            Finish
          </Button>
        </div>
        <Modal
          open={this.state.open}
          onSubmit={this.addOther}
          onClick={this.handleModal}
        />
      </div>
    )
  }
}

export default withStyles(styles)(OtherFac)
