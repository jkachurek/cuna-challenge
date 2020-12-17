import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: spacing(0, 'auto'),
    [breakpoints.up('md')]: {
      width: '50%'
    },
    [breakpoints.only('sm')]: {
      width: '66%'
    }
  }
}))

export default useStyles
