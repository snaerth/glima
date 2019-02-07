import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

// Create a theme instance.
export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: blue,
    accent: pink,
    type: 'light',
  },
});
