import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import Popper from "@material-ui/core/Popper";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import NewsIcon from "@material-ui/icons/Description";
import PhotoIcon from "@material-ui/icons/PhotoLibrary";
import EventIcon from "@material-ui/icons/Event";
import search, { setSearchValue, setSearchLoading } from "../../actions/search";
import { ENTER } from "../../utils/keyCodes";
import { MobileAndUp, Desktop, MinToDesktop } from "../Responsive";
import SearchResults from "../SearchResults";
import Container from "../Container";

const styles = theme => ({
  container: {
    margin: "0 auto",
    width: "100%",
    maxWidth: 1420,
    padding: 0
  },
  title: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
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
    display: "flex",
    marginLeft: "auto"
  },
  noLink: {
    textDecoration: "none",
    color: "inherit",
    margin: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 2,
    maxHeight: 600,
    overflowY: "auto"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    marginRight: 20,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

class Header extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    menuClick: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired
  };

  state = {
    anchorEl: null,
    open: false
  };

  onSearchKeyPress = e => {
    const { value } = e.target;

    if (e.which === ENTER || e.keyCode === ENTER) {
      console.log(value);
    }
  };

  onBlur = () => {
    this.setState({
      open: false
    });
  };

  onSearchChange = e => {
    const { actions } = this.props;
    const {
      target: { value },
      currentTarget
    } = e;
    let open = false;

    if (value.length > 2) {
      open = true;
      actions.setSearchLoading(true);
      actions.search(value);
    }

    this.setState({
      anchorEl: currentTarget,
      open
    });

    actions.setSearchValue(value);
  };

  render() {
    const { classes, menuClick, searchValue } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? "search-popper" : null;

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
                <MenuIcon fontSize="large" />
              </IconButton>
              <Desktop>
                <Link to="/" className={classes.noLink}>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classNames(classes.grow, classes.title)}
                  >
                    Glímusamband Íslands
                  </Typography>
                </Link>
              </Desktop>
              <MobileAndUp>
                <div className={classes.grow} />
                <div aria-describedby={id} className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Leita…"
                    value={searchValue}
                    onBlur={this.onBlur}
                    onChange={this.onSearchChange}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
                <Popper id={id} open={open} anchorEl={anchorEl} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper className={classes.paper}>
                        <SearchResults />
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </MobileAndUp>
              <div className={classes.rightWing}>
                <Link to="/frettir/?page=1" className={classes.noLink}>
                  <MinToDesktop>
                    <IconButton color="inherit" aria-label="News">
                      <NewsIcon fontSize="large" />
                    </IconButton>
                  </MinToDesktop>
                  <Desktop>
                    <Button className={classes.button} color="inherit">
                      Fréttir
                    </Button>
                  </Desktop>
                </Link>
                <Link to="/vidburdir/?page=1" className={classes.noLink}>
                  <MinToDesktop>
                    <IconButton color="inherit" aria-label="Events">
                      <EventIcon fontSize="large" />
                    </IconButton>
                  </MinToDesktop>
                  <Desktop>
                    <Button className={classes.button} color="inherit">
                      Viðburðir
                    </Button>
                  </Desktop>
                </Link>
                <Link to="/myndir/?page=1" className={classes.noLink}>
                  <MinToDesktop>
                    <IconButton color="inherit" aria-label="Photos">
                      <PhotoIcon fontSize="large" />
                    </IconButton>
                  </MinToDesktop>
                  <Desktop>
                    <Button className={classes.button} color="inherit">
                      Myndir
                    </Button>
                  </Desktop>
                </Link>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
  }
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 */
function mapStateToProps(state) {
  const {
    search: { value }
  } = state;

  return {
    searchValue: value
  };
}

/**
 * Maps dispatch to components props
 *
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { setSearchValue, search, setSearchLoading },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
