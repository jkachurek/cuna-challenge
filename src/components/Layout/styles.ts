import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ mixins, palette, spacing }) => ({
  appBarOffset: mixins.toolbar,
  contentArea: {
    margin: spacing(3, 4)
  },
  root: {
    backgroundColor: palette.grey[200],
    height: '100vh',
  }
}))

export default useStyles
