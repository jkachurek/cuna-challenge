import { makeStyles, Paper, PaperProps } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(2, 3)
  }
}))

const PaperPanel = (props: PaperProps) => {
  const classes = useStyles()
  return (
    <Paper
      {...props}
      className={clsx(classes.root, props.className)}
      elevation={4}
    >
      {props.children}
    </Paper>
  )
}

export default PaperPanel
