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

export class OtherFac extends React.Component {
  _onClick = () => {
    this.props.onClick()
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
            <TableRow>
              <TableCell rowSpan={1}>GEN121</TableCell>
              <TableCell>Monday</TableCell>
              <TableCell>9:00</TableCell>
              <TableCell>12:00</TableCell>
              <TableCell>
                <Button size='small'>
                  <EditIcon className={classes.icon} />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={1}>LNG102</TableCell>
              <TableCell>Wednesday</TableCell>
              <TableCell>13:00</TableCell>
              <TableCell>16:00</TableCell>
              <TableCell>
                <Button size='small'>
                  <EditIcon className={classes.icon} />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={1}>GEN101</TableCell>
              <TableCell>Friday</TableCell>
              <TableCell>10:30</TableCell>
              <TableCell>133:30</TableCell>
              <TableCell>
                <Button size='small'>
                  <EditIcon className={classes.icon} />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
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
