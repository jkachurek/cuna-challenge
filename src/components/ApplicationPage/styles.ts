import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ spacing }) => ({
  copy: {
    flexGrow: 2,
    marginBottom: spacing(1),
    marginTop: spacing(1)
  },
  form: {
    flexGrow: 1, 
    minWidth: 300,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap-reverse',
    // preserve outer margin, add inner margin for child elements
    margin: spacing(0, -1),
    '& > *': {
      marginLeft: spacing(1),
      marginRight: spacing(1)
    }
  }
}))

export default useStyles
