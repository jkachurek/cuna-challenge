import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  copy: {
    flexGrow: 2,
    height: 'fit-content'
  },
  form: {
    flexGrow: 1, 
    minWidth: 300,
  },
  root: {
    display: 'flex',
    // preserve outer margin, add inner margin for child elements
    margin: spacing(-1),
    '& > *': {
      margin: spacing(1)
    },
    [breakpoints.down('sm')]: {
      flexWrap: 'wrap-reverse'
    }
  }
}))

export default useStyles
