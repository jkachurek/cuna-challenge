import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: spacing(1)
    }
  }
}))

export default useStyles
