import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";
import getPosts, { setPostsLoading } from "../../actions/posts";
import Posts from "../../components/Posts";
import s from "./Home.module.scss";

class Home extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.setPostsLoading();
    actions.getPosts();
  }

  renderLoading() {
    return (
      <div className={classNames(s.container, s.loadingContainer)}>
        <CircularProgress />
        <p>Sæki fréttir...</p>
      </div>
    );
  }

  renderNoPosts() {
    return (
      <div className={classNames(s.container, s.textCenter)}>
        <h1>Engin frétt fannst</h1>
      </div>
    );
  }

  render() {
    const { posts, error, loading } = this.props;

    if (error) {
      return this.renderNoPosts();
    }

    if (!posts) {
      return this.renderNoPosts();
    }

    if (loading) {
      return this.renderLoading();
    }

    return (
      <div className={s.container}>
        <Posts posts={posts} />
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
    blog: { posts, error, loading }
  } = state;

  return {
    posts,
    error,
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
    actions: bindActionCreators({ getPosts, setPostsLoading }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
