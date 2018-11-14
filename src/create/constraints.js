import React from 'react'
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Chip,
  Avatar,
  Button
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
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

export class Constraints extends React.Component {
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
              <TableCell>Lecturer Name /Subject Name </TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>End time</TableCell>
              <TableCell>Required</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell rowSpan={1}>Dr.Umaporn</TableCell>
              <TableCell>
                <Chip className={classes.chips} label='Wednesday' />
                <Chip className={classes.chips} label='Friday' />
              </TableCell>
              <TableCell> - </TableCell>
              <TableCell>13:00</TableCell>
              <TableCell>17:00</TableCell>
              <TableCell>
                <ClearIcon />
              </TableCell>
              <TableCell>
                <Button size='small'>
                  <EditIcon className={classes.icon} />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={1}>INT202</TableCell>
              <TableCell>
                <Chip className={classes.chips} label='Tuesday' />
              </TableCell>
              <TableCell> CB2312 </TableCell>
              <TableCell> - </TableCell>
              <TableCell> - </TableCell>
              <TableCell>
                <DoneIcon />
              </TableCell>
              <TableCell>
                <Button size='small'>
                  <EditIcon className={classes.icon} />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={1}>Aj.Kittiphan</TableCell>
              <TableCell>
                <Chip className={classes.chips} label='Monday' />
                <Chip className={classes.chips} label='Tuesday' />
                <Chip className={classes.chips} label='Wednesday' />
              </TableCell>
              <TableCell> - </TableCell>
              <TableCell>8:00</TableCell>
              <TableCell>11:00</TableCell>
              <TableCell>
                <ClearIcon />
              </TableCell>
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
            Add Constraint
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Constraints)
