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
  _onClick = () => {
    this.props.onClick()
  }
  handleChange = name => event => {
    this.setState({ [name]: Number(event.target.value) })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
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
            {data.map((d, i) => (
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
          <Button variant='contained' color='primary' onClick={this._onClick}>
            Add other class
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(OtherFac)
