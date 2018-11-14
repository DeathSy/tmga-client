import React from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

export const Confirmation = ({ classes, ...props }) => (
  <Typography>Confirmation Content</Typography>
)

export default withStyles(styles)(Confirmation)
