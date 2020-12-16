import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ mixins, spacing }) => ({
  root: {
    padding: spacing(2, 4)
  },
  appBarOffset: mixins.toolbar
}))

export default useStyles
