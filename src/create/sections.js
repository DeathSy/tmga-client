import React from 'react'
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Chip,
  Avatar,
  Button,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Modal from '../modal/sectionModal'

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
  }
})

export class Sections extends React.Component {
  state = {
    open: false,
    sectionData: []
  }

  componentWillMount () {
    this.setState({ sectionData: this.props.data })
  }

  handleModal = () => {
    this.setState(state => ({ open: !state.open }))
  }

  addSection = data => {
    this.setState(state => ({ sectionData: [...state.sectionData, data] }))
  }

  groupData = () => {
    const data = new Map()
    this.state.sectionData.map(section => {
      if (data.get(section.subjectName.code)) {
        data.set(section.subjectName.code, [
          ...data.get(section.subjectName.code),
          {
            type: section.subjectType.name,
            time: section.time,
            sections: section.sections
          }
        ])
      } else {
        data.set(section.subjectName.code, [
          {
            type: section.subjectType.name,
            time: section.time,
            sections: section.sections
          }
        ])
      }
    })
    const result = []
    data.forEach((d, k) => {
      result.push({ code: k, detail: d })
    })
    return result
  }

  render () {
    const { classes } = this.props
    const sections = this.groupData()

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Class Range</TableCell>
              <TableCell>Sections</TableCell>
              <TableCell>Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sections.map((d, i) =>
              d.detail.map((detail, index) => (
                <TableRow key={index}>
                  {index === 0 && (
                    <TableCell rowSpan={d.detail.length}>{d.code}</TableCell>
                  )}
                  <TableCell>{detail.type}</TableCell>
                  <TableCell numeric>{detail.time}</TableCell>
                  <TableCell numeric>{detail.sections.length}</TableCell>
                  <TableCell>
                    {detail.sections.map((section, index) => (
                      <Chip
                        key={index}
                        className={classes.chips}
                        avatar={
                          <Avatar>{String.fromCharCode(65 + index)}</Avatar>
                        }
                        label={section.lecturers.map(l => l.name).join(', ')}
                      />
                    ))}
                  </TableCell>
                </TableRow>
              ))
            )}
            {sections.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography align='center'>
                    Please add some sections to continue.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className={classes.actionContainer}>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={this.props.onClick(this.state.sectionData)}
            disabled={!this.state.sectionData.length}
            style={{ float: 'right', marginLeft: 10 }}
          >
            Finished
          </Button>
          <Button
            className={classes.button}
            color='primary'
            onClick={this.handleModal}
            style={{ float: 'right' }}
          >
            Add Section
          </Button>
        </div>
        <Modal
          open={this.state.open}
          onSubmit={this.addSection}
          onClick={this.handleModal}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Sections)
