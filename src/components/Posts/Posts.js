import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import queryString from "query-string";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import getPosts, { setPostsLoading, setPostsPage } from "../../actions/posts";
import Loading from "../Loading";
import Post from "../Post";
import PostBig from "../PostBig";
import Pagination from "../Pagination";
import NoData from "../../components/NoData";
import s from "./Posts.module.scss";

const styles = theme => ({
  root: {
    margin: "15px 0"
  },
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class Posts extends PureComponent {
  static defaultProps = {
    showPagination: true,
    moreButton: false,
    error: false,
    className: ""
  };

  static propTypes = {
    posts: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    className: PropTypes.string,
    error: PropTypes.bool,
    showPagination: PropTypes.bool,
    moreButton: PropTypes.bool
  };

  componentDidMount() {
    const { actions, posts, page, location, history } = this.props;
    const qsPageParam = queryString.parse(location.search);
    const pageNumber = Number(qsPageParam.page);

    if (location.pathname === "/") {
      actions.setPostsLoading();
      actions.setPostsPage(1);
      actions.getPosts(1);
    } else if (!posts || posts.length === 0 || pageNumber) {
      actions.setPostsLoading();

      if (pageNumber) {
        actions.setPostsPage(pageNumber);
        actions.getPosts(pageNumber);
      } else {
        actions.setPostsPage(page);
        actions.getPosts(page);

        if (location.pathname.includes("/frettir")) {
          history.push("/frettir/?page=1");
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { actions, page, location } = this.props;
    const qsPageParam = queryString.parse(location.search);
    const pageNumber = Number(qsPageParam.page);

    if (pageNumber && pageNumber !== prevProps.page && pageNumber !== page) {
      actions.setPostsLoading();

      if (qsPageParam.page) {
        const pageNumber = Number(qsPageParam.page);
        actions.setPostsPage(pageNumber);
        actions.getPosts(pageNumber);
      } else {
        actions.getPosts(page);
      }
    }
  }

  moreButtonClickHandler = () => {
    const { history, totalPages } = this.props;

    if (totalPages === 1) {
      history.push("/frettir");
    } else {
      history.push("/frettir/?page=2");
    }
  };

  /**
   * Changes pagination
   *
   * @param {Object} obj
   * @param {Number} obj.selected - Selected page in pagination
   */
  paginateHandler = ({ selected }) => {
    const { history } = this.props;
    const page = selected + 1;
    history.push(`/frettir/?page=${page}`);
  };

  renderNoPosts() {
    return (
      <NoData
        textCenter={false}
        text="Við fundum engar fréttir á þessum hlekk."
      />
    );
  }

  render() {
    const {
      posts,
      classes,
      totalPages,
      page,
      showPagination,
      moreButton,
      loading,
      error,
      className
    } = this.props;

    if (loading) {
      return <Loading text="Sæki fréttir..." />;
    }

    if (error) {
      return this.renderNoPosts();
    }

    if (posts && posts.length > 0) {
      const isLastPostIdx = posts.length - 1;
      const showMoreButton = moreButton && totalPages > 1;

      return (
        <div className={className}>
          {posts.map((post, idx) => (
            <Fragment key={post.id}>
              {idx === 0 ? <PostBig data={post} /> : <Post data={post} />}
              {isLastPostIdx !== idx && <Divider className={classes.root} />}
            </Fragment>
          ))}
          {showPagination && (
            <Pagination
              pageCount={totalPages}
              initialPage={page}
              onPageChangeHandler={this.paginateHandler}
            />
          )}
          {showMoreButton && (
            <div className={s.buttonContainer}>
              <Fab
                color="primary"
                variant="extended"
                aria-label="Fleiri fréttir"
                className={classes.fab}
                onClick={this.moreButtonClickHandler}
              >
                <AddIcon className={classes.extendedIcon} />
                Fleiri fréttir
              </Fab>
            </div>
          )}
        </div>
      );
    } else {
      return this.renderNoPosts();
    }
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
    blog: { data, totalPages, page, loading, error }
  } = state;

  return {
    posts: data,
    totalPages,
    page,
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
      { getPosts, setPostsLoading, setPostsPage },
      dispatch
    )
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Posts))
);
