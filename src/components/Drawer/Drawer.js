import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import NewsIcon from "@material-ui/icons/Description";
import PhotoIcon from "@material-ui/icons/PhotoLibrary";
import EventIcon from "@material-ui/icons/Event";
import HomeIcon from "@material-ui/icons/Home";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import getPages, { setPagesLoading, setActivePage } from "../../actions/pages";
import search, { setSearchValue, setSearchLoading } from "../../actions/search";
import { ENTER } from "../../utils/keyCodes";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    minWidth: 320,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 6
  },
  noLink: {
    textDecoration: "none",
    color: "inherit"
  },
  search: {
    marginTop: 10,
    marginBottom: 10,
    position: "relative",
    width: "100%"
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

class DrawerComp extends Component {
  static defaultProps = {
    open: true
  };

  static propTypes = {
    searchValue: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    pages: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    open: PropTypes.bool
  };

  state = {
    collapseObj: {}
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.setPagesLoading();
    actions.getPages();
  }

  componentDidUpdate(prevProps) {
    const { pages } = this.props;

    if (prevProps.pages.length !== pages.length) {
      const collapseObj = {};
      pages
        .filter(page => page.children)
        .forEach(p => (collapseObj[p.id] = false));

      this.setState({
        collapseObj
      });
    }
  }

  onSearchKeyPress = e => {
    const { history, toggle, actions } = this.props;
    const { value } = e.target;

    if (e.which === ENTER || e.keyCode === ENTER) {
      actions.setSearchLoading(true);
      actions.search(value);
      history.push(`/leit/${value}`);
      toggle(false);
    }
  };

  onSearchChange = e => {
    const { actions } = this.props;
    const {
      target: { value }
    } = e;

    actions.setSearchValue(value);
  };

  /**
   * Link click handler
   * When link is clicked then we close drawer
   */
  linkClickHandler = () => {
    const { toggle } = this.props;
    toggle(false);
  };

  /**
   * Handles item click
   * When item is clicked dispatch setActivePage
   * action, redirect user to page url and we close the drawer
   * @param {Object} page - Page object
   */
  onItemClick(page) {
    const { toggle, actions, history } = this.props;
    actions.setActivePage(page);
    history.push(`/page/${page.slug}/${page.id}`);
    toggle(false);
  }

  /**
   * Handles collapse click. Changes collapseObj state either
   * true of false for current page id.
   *
   * @param {String} pageId - Page id number in string format
   */
  handleCollapseClick(pageId) {
    const { collapseObj } = this.state;
    collapseObj[Number(pageId)] = !collapseObj[Number(pageId)];
    this.setState({ collapseObj });
  }

  /**
   * Toogles drawer
   * @param {Boolean} open - Drawer open close state
   */
  toggleDrawer = open => () => {
    const { toggle } = this.props;
    toggle(open);
  };

  render() {
    const { open, classes, pages, searchValue } = this.props;
    const { collapseObj } = this.state;

    return (
      <Drawer open={open} onClose={this.toggleDrawer(false)}>
        <div aria-describedby="search" className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Leita…"
            value={searchValue}
            onKeyPress={this.onSearchKeyPress}
            onChange={this.onSearchChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>
        <Divider />
        <List component="nav" className={classes.root}>
          <Link
            to="/"
            className={classes.noLink}
            onClick={this.linkClickHandler}
          >
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText inset primary="Heim" />
            </ListItem>
          </Link>
          <Link
            to="/frettir/?page=1"
            className={classes.noLink}
            onClick={this.linkClickHandler}
          >
            <ListItem button>
              <ListItemIcon>
                <NewsIcon />
              </ListItemIcon>
              <ListItemText inset primary="Fréttir" />
            </ListItem>
          </Link>
          <Link
            to="/vidburdir/?page=1"
            className={classes.noLink}
            onClick={this.linkClickHandler}
          >
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText inset primary="Viðburðir" />
            </ListItem>
          </Link>
          <Link
            to="/myndir/?page=1"
            className={classes.noLink}
            onClick={this.linkClickHandler}
          >
            <ListItem button>
              <ListItemIcon>
                <PhotoIcon />
              </ListItemIcon>
              <ListItemText inset primary="Myndir" />
            </ListItem>
          </Link>
          {pages.map(page => {
            if (page.children) {
              const props = {};

              if (page.content.rendered) {
                props.onClick = this.onItemClick.bind(this, page);
              }

              return (
                <Fragment key={page.id}>
                  <ListItem button>
                    <ListItemText primary={page.title.rendered} {...props} />
                    <span
                      onClick={this.handleCollapseClick.bind(this, page.id)}
                    >
                      {collapseObj[page.id] ? <ExpandLess /> : <ExpandMore />}
                    </span>
                  </ListItem>
                  <Collapse
                    in={collapseObj[page.id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {page.children.map(childPage => (
                        <ListItem
                          key={childPage.id}
                          button
                          className={classes.nested}
                          onClick={this.onItemClick.bind(this, childPage)}
                        >
                          <ListItemText primary={childPage.title.rendered} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Fragment>
              );
            }

            return (
              <ListItem
                key={page.id}
                button
                onClick={this.onItemClick.bind(this, page)}
              >
                <ListItemText primary={page.title.rendered} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
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
    pages: { sortedData, loading, error },
    search: { value }
  } = state;

  return {
    searchValue: value,
    pages: sortedData,
    loading,
    error
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
      {
        getPages,
        setPagesLoading,
        setActivePage,
        setSearchValue,
        setSearchLoading,
        search
      },
      dispatch
    )
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(DrawerComp))
);
