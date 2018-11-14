import React from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

export const OtherFac = ({ classes, ...props }) => (
  <Typography>Other Fac Content</Typography>
)

export default withStyles(styles)(OtherFac)
