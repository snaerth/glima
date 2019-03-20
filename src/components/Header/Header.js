import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import BackIcon from "@material-ui/icons/ArrowBack";
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
import { appDefault } from "../../utils/createMuiTheme";
import {
  TabletAndUp,
  Desktop,
  MobileOnly,
  MobileToDesktop
} from "../Responsive";
import SearchResults from "../SearchResults";
import { ReactComponent as Logo } from "../../assets/img/glima_logo.svg";
import Container from "../Container";

const styles = theme => ({
  container: {
    margin: "0 auto",
    width: "100%",
    maxWidth: appDefault.pageWidthMax,
    padding: 0
  },
  logoContainer: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  root: {
    flexGrow: 1
  },
  logo: {
    height: 40,
    width: 40,
    marginRight: 10,
    [theme.breakpoints.up("sm")]: {
      height: 50,
      width: 50
    }
  },
  grow: {
    flexGrow: 1
  },
  backButton: {
    marginRight: 8,
    display: "none",
    "@media screen and (min-device-width: 320px) and (max-device-width: 667px) and (orientation: portrait)": {
      display: "inline-block"
    }
  },
  rightWing: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto"
  },
  noLink: {
    textDecoration: "none",
    color: "inherit",
    margin: theme.spacing.unit
  },
  noMargin: {
    margin: 0
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
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    menuClick: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired
  };

  state = {
    anchorEl: null,
    open: false,
    offlinePath: "/offline"
  };

  componentDidMount() {
    const {
      history,
      location: { pathname }
    } = this.props;
    const { offlinePath } = this.state;

    window.addEventListener("online", this.setOfflineStatue);
    window.addEventListener("offline", this.setOfflineStatue);

    // if offline and pathname is not /offline route then route to offline route
    if (!navigator.onLine && pathname !== offlinePath) {
      history.push(offlinePath);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.setOfflineStatue);
    window.removeEventListener("offline", this.setOfflineStatue);
  }

  setOfflineStatue = () => {
    const {
      history,
      location: { pathname }
    } = this.props;
    const { offlinePath } = this.state;

    // if offline and pathname is not /offline route then route to offline route
    if (!navigator.onLine && pathname !== offlinePath) {
      history.push(offlinePath);
    }

    // if online and pathname is /offline route to home route
    if (navigator.onLine && pathname === offlinePath) {
      history.push("/");
    }
  };

  backButtonHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  onBlur = () => {
    const { actions } = this.props;
    this.setState({
      open: false
    });

    actions.setSearchValue("");
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
    const { classes, menuClick, searchValue, location } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? "search-popper" : null;
    const hidePopper = !location.pathname.startsWith("/leit/");
    const showBackButton = location.pathname !== "/";

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Container className={classes.container}>
            <Toolbar>
              {showBackButton && (
                <MobileOnly>
                  <IconButton
                    className={classes.backButton}
                    color="inherit"
                    aria-label="button"
                    onClick={this.backButtonHandler}
                  >
                    <BackIcon />
                  </IconButton>
                </MobileOnly>
              )}
              <Link
                to="/"
                className={classNames(
                  classes.noLink,
                  classes.noMargin,
                  classes.logoContainer
                )}
              >
                <Logo className={classes.logo} />
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classNames(classes.grow, classes.title)}
                >
                  Glíma
                </Typography>
              </Link>
              <TabletAndUp>
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
                {hidePopper && (
                  <Popper id={id} open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper className={classes.paper}>
                          <SearchResults />
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                )}
              </TabletAndUp>
              <div className={classes.rightWing}>
                <Link to="/frettir/?page=1" className={classes.noLink}>
                  <MobileToDesktop>
                    <IconButton color="inherit" aria-label="News">
                      <NewsIcon />
                    </IconButton>
                  </MobileToDesktop>
                  <Desktop>
                    <Button className={classes.button} color="inherit">
                      Fréttir
                    </Button>
                  </Desktop>
                </Link>
                <Link to="/vidburdir/?page=1" className={classes.noLink}>
                  <MobileToDesktop>
                    <IconButton color="inherit" aria-label="Events">
                      <EventIcon />
                    </IconButton>
                  </MobileToDesktop>
                  <Desktop>
                    <Button className={classes.button} color="inherit">
                      Viðburðir
                    </Button>
                  </Desktop>
                </Link>
                <Link to="/myndir/?page=1" className={classes.noLink}>
                  <MobileToDesktop>
                    <IconButton color="inherit" aria-label="Photos">
                      <PhotoIcon />
                    </IconButton>
                  </MobileToDesktop>
                  <Desktop>
                    <Button className={classes.button} color="inherit">
                      Myndir
                    </Button>
                  </Desktop>
                </Link>
                <div>
                  <IconButton
                    color="inherit"
                    aria-label="Menu"
                    onClick={() => menuClick(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Header))
);
