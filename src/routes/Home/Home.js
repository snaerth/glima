import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import getPosts from "../../actions/posts";
import Posts from "../../components/Posts";
import styles from "./Home.module.scss";

class Home extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    error: PropTypes.bool
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.getPosts();
  }

  render() {
    const { posts, error } = this.props;

    return (
      <div className={styles.container}>
        {error ? <div>Render some error</div> : <Posts posts={posts} />}
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
    blog: { posts, error }
  } = state;

  return {
    posts,
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
    actions: bindActionCreators({ getPosts }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
