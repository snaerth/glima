import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Typography from "@material-ui/core/Typography";
import allowNull from "../../utils/propTypesHelpers";
import { getPost } from "../../actions/posts";
import s from "./Post.module.scss";

class Post extends PureComponent {
  static propTypes = {
    post: allowNull(PropTypes.object.isRequired),
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      actions,
      post,
      match: {
        params: { id }
      }
    } = this.props;

    if (!post && id) {
      actions.getPost(id);
    }
  }

  renderNoPost() {
    return (
      <div className={s.container}>
        <h1>Engin grein fannst</h1>
      </div>
    );
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return this.renderNoPost();
    }

    const { content, title } = post;

    return (
      <div className={s.container}>
        <h1>{title.rendered}</h1>
        <Typography component="div">
          <span dangerouslySetInnerHTML={{ __html: content.rendered }} />
        </Typography>
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
    blog: { post }
  } = state;

  return {
    post: post
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
    actions: bindActionCreators({ getPost }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
