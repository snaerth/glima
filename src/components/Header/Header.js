import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  rightWing: {
    marginLeft: "auto"
  },
  noLink: {
    textDecoration: "none",
    color: "inherit",
    margin: theme.spacing.unit
  }
});

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.noLink}>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Glímusamband Íslands
            </Typography>
          </Link>
          <div className={classes.rightWing}>
            <Link to="/myndir" className={classes.noLink}>
              <Button className={classes.button} color="inherit">
                Myndir
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
