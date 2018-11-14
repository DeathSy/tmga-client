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
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  chips: {
    margin: theme.spacing.unit / 4
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  }
})

export const Sections = ({ classes, ...props }) => (
  <div>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Subject Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Section Amount</TableCell>
          <TableCell>Detail</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell rowSpan={1}>INT104</TableCell>
          <TableCell>Lecture</TableCell>
          <TableCell numeric>2</TableCell>
          <TableCell>
            <Chip
              className={classes.chips}
              avatar={<Avatar>A</Avatar>}
              label='Dr. Olarn'
            />
          </TableCell>
          <TableCell>
            <Button size='small'>
              <EditIcon className={classes.icon} />
              Edit
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell rowSpan={1}>INT102</TableCell>
          <TableCell>Lab</TableCell>
          <TableCell numeric>4</TableCell>
          <TableCell>
            <Chip
              className={classes.chips}
              avatar={<Avatar>A</Avatar>}
              label='Dr. Umaporn'
            />
            <Chip
              className={classes.chips}
              avatar={<Avatar>B</Avatar>}
              label='Dr. Paisarn'
            />
            <Chip
              className={classes.chips}
              avatar={<Avatar>C</Avatar>}
              label='Dr. Umarporn'
            />
            <Chip
              className={classes.chips}
              avatar={<Avatar>D</Avatar>}
              label='Dr. Paisarn'
            />
          </TableCell>
          <TableCell>
            <Button size='small'>
              <EditIcon className={classes.icon} />
              Edit
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell rowSpan={1}>INT101</TableCell>
          <TableCell>Lecture</TableCell>
          <TableCell numeric>2</TableCell>
          <TableCell>
            <Chip
              className={classes.chips}
              avatar={<Avatar>A</Avatar>}
              label='Aj. Kittiphan, Dr.Kittipong'
            />
            <Chip
              className={classes.chips}
              avatar={<Avatar>B</Avatar>}
              label='Aj. Kittiphan, Dr.Kittipong'
            />
          </TableCell>
          <TableCell>
            <Button size='small'>
              <EditIcon className={classes.icon} />
              Edit
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell rowSpan={2}>INT201</TableCell>
          <TableCell>Lecture</TableCell>
          <TableCell numeric>2</TableCell>
          <TableCell>
            <Chip
              className={classes.chips}
              avatar={<Avatar>A</Avatar>}
              label='Dr. Pichai'
            />
            <Chip
              className={classes.chips}
              avatar={<Avatar>B</Avatar>}
              label='Dr. Pichai'
            />
          </TableCell>
          <TableCell>
            <Button size='small'>
              <EditIcon className={classes.icon} />
              Edit
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Lab</TableCell>
          <TableCell numeric>5</TableCell>
          <TableCell>
            <Chip
              className={classes.chips}
              avatar={<Avatar>A</Avatar>}
              label='Aj. Kittiphan'
            />
            <Chip
              className={classes.chips}
              avatar={<Avatar>B</Avatar>}
              label='Aj. Kittiphan'
            />
            <Chip
              className={classes.chips}
              avatar={<Avatar>C</Avatar>}
              label='Aj. Kittiphan'
            />
            <Chip
              className={classes.chips}
              avatar={<Avatar>D</Avatar>}
              label='Aj. Kittiphan'
            />
            <Chip
              className={classes.chips}
              avatar={<Avatar>E</Avatar>}
              label='Aj. Kittiphan'
            />
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
    <Button variant='contained' color='primary'>
      Add Section
    </Button>
  </div>
)

export default withStyles(styles)(Sections)
