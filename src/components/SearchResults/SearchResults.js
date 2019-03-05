import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import classNames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { setActivePost } from "../../actions/posts";
import { setActiveEvent } from "../../actions/events";
import { setActivePage } from "../../actions/pages";
import formatDate from "../../utils/dateHelper";
import Loading from "../Loading";
import s from "./SearchResults.module.scss";

const styles = {
  padding: {
    paddingLeft: 16,
    paddingRight: 16
  },
  divider: {
    margin: "16px 16px 0"
  },
  secondary: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
};

class SearchResults extends Component {
  static defaultProps = {
    showExcerpt: false,
    containerClass: true
  };

  static propTypes = {
    showExcerpt: PropTypes.bool,
    containerClass: PropTypes.bool,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    results: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  /**
   *
   * @param {Object} data - Search object
   * @param {String} type - Search type
   */
  searchClickhandler(data, type) {
    const { history, actions } = this.props;

    switch (type) {
      case "events":
        actions.setActiveEvent(data);
        history.push(`/vidburdir/${data.id}`);
        break;

      case "pages":
        actions.setActivePage(data);
        history.push(`/page/${data.slug}/${data.id}`);

        break;

      case "posts":
        actions.setActivePost(data);
        history.push(`/frett/${data.slug}/${data.id}`);
        break;

      default:
        break;
    }
  }

  /**
   * Renders search results
   * @param {Object} data - Search object
   * @param {String} type - Search type
   */
  renderResults(data, type) {
    const { classes, showExcerpt } = this.props;
    const { title, id, excerpt, date, start_date } = data;

    return (
      <div className={s.searchRow} key={`${id}${type}`}>
        <ListItem
          button
          onClick={this.searchClickhandler.bind(this, data, type)}
        >
          <ListItemText
            className={classNames({
              [classes.secondary]: !showExcerpt
            })}
            primary={title && title.rendered ? title.rendered : title}
            secondary={
              excerpt.rendered ? (
                <span
                  className={s.noMargin}
                  dangerouslySetInnerHTML={{
                    __html: excerpt.rendered
                  }}
                />
              ) : (
                formatDate(type === "events" ? start_date : date)
              )
            }
          />
        </ListItem>
      </div>
    );
  }

  render() {
    const {
      classes,
      loading,
      containerClass,
      results: { posts, pages, events }
    } = this.props;

    if (loading) {
      return (
        <div
          className={classNames({
            [s.container]: containerClass
          })}
        >
          <Loading noMinHeight text="Leita..." />
        </div>
      );
    }

    if (posts.length === 0 && pages.length === 0 && events.length === 0) {
      return (
        <div
          className={classNames({
            [s.container]: containerClass
          })}
        >
          <Typography variant="subtitle1">
            Engar Leitarniðurstöður fundust
          </Typography>
        </div>
      );
    }

    return (
      <div
        className={classNames({
          [s.container]: containerClass
        })}
      >
        {posts.length > 0 && (
          <Fragment>
            <Typography variant="h6" className={classes.padding}>
              Fréttir
            </Typography>
            <Divider className={classes.divider} />
            <List>{posts.map(post => this.renderResults(post, "posts"))}</List>
          </Fragment>
        )}
        {pages.length > 0 && (
          <Fragment>
            <Typography variant="h6" className={classes.padding}>
              Vefsíður
            </Typography>
            <Divider className={classes.divider} />
            <List>{pages.map(page => this.renderResults(page, "pages"))}</List>
          </Fragment>
        )}
        {events.length > 0 && (
          <Fragment>
            <Typography variant="h6" className={classes.padding}>
              Viðburðir
            </Typography>
            <Divider className={classes.divider} />
            <List>
              {events.map(event => this.renderResults(event, "events"))}
            </List>
          </Fragment>
        )}
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
    search: { data, loading }
  } = state;

  return {
    results: data,
    loading
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
      { setActiveEvent, setActivePage, setActivePost },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(SearchResults)));
