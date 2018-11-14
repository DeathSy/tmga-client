import React from 'react'
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button
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
const data = [
  {
    code: 'GEN121',
    day: 'MON',
    start: '9:00',
    end: '12:00'
  },
  {
    code: 'LNG102',
    day: 'WED',
    start: '13:00',
    end: '16:00'
  },
  {
    code: 'GEN101',
    day: 'FRI',
    start: '9:30',
    end: '12:30'
  }
]
export class OtherFac extends React.Component {
  state = {
    open: false,
    otherData: []
  }

  componentWillMount () {
    this.setState({ otherData: data })
  }

  handleModal = () => {
    this.setState(state => ({ open: !state.open }))
  }

  addOther = data => {
    this.setState(state => ({ otherData: [...state.otherData, data] }))
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
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
            ))}
          </TableBody>
        </Table>
        <div className={classes.actionContainer}>
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
            Finished
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
