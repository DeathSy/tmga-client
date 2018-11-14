import React from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

export const Constraints = ({ classes, ...props }) => (
  <Typography>Constraints Content</Typography>
)

export default withStyles(styles)(Constraints)
