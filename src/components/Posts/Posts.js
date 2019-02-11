import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import getPosts, { setPostsLoading, setPostsPage } from "../../actions/posts";
import Post from "../Post";
import PostBig from "../PostBig";
import Pagination from "../Pagination";

const styles = {
  root: {
    margin: "15px 0"
  }
};

class Posts extends PureComponent {
  /**
   * Changes pagination
   *
   * @param {Object} obj
   * @param {Number} obj.selected - Selected page in pagination
   */
  paginateHandler = ({ selected }) => {
    const { actions } = this.props;
    const page = selected + 1;
    actions.setPostsPage(page);
    actions.setPostsLoading();
    actions.getPosts(page);
  };

  render() {
    const { posts, classes, totalPages, page } = this.props;
    if (posts && posts.length > 0) {
      const isLastPostIdx = posts.length - 1;

      return (
        <div>
          {posts.map((post, idx) => (
            <Fragment key={post.id}>
              {idx === 0 ? <PostBig data={post} /> : <Post data={post} />}
              {isLastPostIdx !== idx && <Divider className={classes.root} />}
            </Fragment>
          ))}
          <Pagination
            pageCount={totalPages}
            initialPage={page}
            onPageChangeHandler={this.paginateHandler}
          />
        </div>
      );
    }

    return null;
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  totalPages: PropTypes.number.isRequired,
  postsSize: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired
};

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 */
function mapStateToProps(state) {
  const {
    blog: { totalPages, postsSize, page }
  } = state;

  return {
    totalPages,
    postsSize,
    page
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Posts));
