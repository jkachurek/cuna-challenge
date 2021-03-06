import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: spacing(0, 'auto'),
    '& > *': {
      margin: spacing(1)
    },
    [breakpoints.up('md')]: {
      width: '50%'
    },
    [breakpoints.only('sm')]: {
      width: '66%'
    }
  }
}))

export default useStyles
