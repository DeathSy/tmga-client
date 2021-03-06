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

  componentWillMount () {
    this.setState({ otherData: this.props.data })
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
              <TableCell>Day</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>End time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.otherData.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{d.code.code}</TableCell>
                <TableCell>{d.day}</TableCell>
                <TableCell>{d.start.start}</TableCell>
                <TableCell>{d.end.end}</TableCell>
              </TableRow>
            ))}
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
          <Button
            onClick={this.props.onBack(this.state.otherData)}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={this.props.onClick(this.state.otherData)}
            disabled={!this.state.otherData.length}
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
            Add Other Class
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
