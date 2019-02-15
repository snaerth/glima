import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";

// Create a theme instance.
export default createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 18,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  palette: {
    primary: blue,
    secondary: pink
  },
  overrides: {
    MuiListItemText: {
      primary: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden"
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "2em",
        minWidth: "360px",
        backgroundColor: pink["400"],
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
      },
      popper: {
        opacity: 1
      }
    }
  }
});
