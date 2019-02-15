import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import getPosts, { setPostsLoading } from "../../actions/posts";
import Posts from "../../components/Posts";
import Container from "../../components/Container";
import s from "./Home.module.scss";

class Home extends PureComponent {
  static defaultProps = {
    error: null,
    newsOnly: false
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    newsOnly: PropTypes.bool
  };

  componentDidMount() {
    const { actions, posts } = this.props;

    if (posts.length === 0) {
      actions.setPostsLoading();
      actions.getPosts();
    }
  }

  renderLoading() {
    return (
      <Container className={s.loadingContainer}>
        <CircularProgress />
        <p>Sæki fréttir...</p>
      </Container>
    );
  }

  renderNoPosts() {
    return (
      <Container className={s.textCenter}>
        <h1>Engin frétt fannst</h1>
      </Container>
    );
  }

  render() {
    const { posts, error, loading } = this.props;

    if (loading) {
      return this.renderLoading();
    }

    if (error) {
      return this.renderNoPosts();
    }

    if (!posts && posts.length === 0) {
      return this.renderNoPosts();
    }

    return (
      <Container>
        <Posts posts={posts} />
      </Container>
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
