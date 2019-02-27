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
import { TabletAndUp } from "../Responsive";
import Container from "../Container";

const styles = theme => ({
  container: {
    margin: "0 auto",
    width: "100%",
    maxWidth: 1420,
    padding: 0
  },
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
  const { classes, menuClick } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container className={classes.container}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => menuClick(true)}
            >
              <MenuIcon />
            </IconButton>
            <TabletAndUp>
              <Link to="/" className={classes.noLink}>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.grow}
                >
                  Glímusamband Íslands
                </Typography>
              </Link>
            </TabletAndUp>
            <div className={classes.rightWing}>
              <TabletAndUp>
                <Link to="/frettir/?page=1" className={classes.noLink}>
                  <Button className={classes.button} color="inherit">
                    Fréttir
                  </Button>
                </Link>
                <Link to="/vidburdir/?page=1" className={classes.noLink}>
                  <Button className={classes.button} color="inherit">
                    Viðburðir
                  </Button>
                </Link>
                <Link to="/myndir/?page=1" className={classes.noLink}>
                  <Button className={classes.button} color="inherit">
                    Myndir
                  </Button>
                </Link>
              </TabletAndUp>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  menuClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
