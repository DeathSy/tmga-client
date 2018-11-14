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
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const styles = theme => ({
  button: {
    marginRight: 10
  },
  chips: {
    margin: theme.spacing.unit / 4
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  actionContainer: {
    marginTop: theme.spacing.unit * 2
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
})

const data = [
  {
    code: 'INT104',
    detail: [
      {
        type: 'lecture',
        sections: [{ lecturers: ['Dr. Olarn'] }, { lecturers: ['Dr. Olarn'] }]
      }
    ]
  },
  {
    code: 'INT102',
    detail: [
      {
        type: 'lab',
        sections: [
          { lecturers: ['Dr. Umaporn'] },
          { lecturers: ['Dr. Paisarn'] },
          { lecturers: ['Dr. Umaporn'] },
          { lecturers: ['Dr. Paisarn'] }
        ]
      }
    ]
  },
  {
    code: 'INT101',
    detail: [
      {
        type: 'lecture',
        sections: [
          { lecturers: ['Aj. Kittiphan', 'Dr. Kittipong'] },
          { lecturers: ['Aj. Kittiphan', 'Dr. Kittipong'] }
        ]
      }
    ]
  },
  {
    code: 'INT201',
    detail: [
      {
        type: 'lecture',
        sections: [{ lecturers: ['Dr. Pichai'] }, { lecturers: ['Dr. Pichai'] }]
      },
      {
        type: 'lab',
        sections: [
          { lecturers: ['Aj. Kittiphan'] },
          { lecturers: ['Aj. Kittiphan'] },
          { lecturers: ['Aj. Kittiphan'] },
          { lecturers: ['Aj. Kittiphan'] },
          { lecturers: ['Aj. Kittiphan'] }
        ]
      }
    ]
  }
]

export class Sections extends React.Component {
  state = {
    open: false,
    age: ''
  }
  _onClick = () => {
    this.handleClickOpen()
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
              <TableCell>Type</TableCell>
              <TableCell>Sections</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, i) =>
              d.detail.map((detail, index) => (
                <TableRow key={index}>
                  {index === 0 && (
                    <TableCell rowSpan={d.detail.length}>{d.code}</TableCell>
                  )}
                  <TableCell>{d.detail[0].type}</TableCell>
                  <TableCell numeric>{detail.sections.length}</TableCell>
                  <TableCell>
                    {detail.sections.map((section, index) => (
                      <Chip
                        className={classes.chips}
                        avatar={
                          <Avatar>{String.fromCharCode(65 + index)}</Avatar>
                        }
                        label={section.lecturers.join(', ')}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button size='small'>
                      <EditIcon className={classes.icon} />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className={classes.actionContainer}>
          <Button
            className={classes.button}
            color='primary'
            onClick={this._onClick}
          >
            Add Section
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
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Fill the form</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='age-native-simple'>Age</InputLabel>
                <Select
                  native
                  value={this.state.age}
                  onChange={this.handleChange('age')}
                  input={<Input id='age-native-simple' />}
                >
                  <option value='' />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleClose} color='primary'>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(Sections)
