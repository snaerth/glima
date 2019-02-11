import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import allowNull from "../../utils/propTypesHelpers";
import formatDate from "../../utils/dateHelper";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { getPost } from "../../actions/posts";
import Tooltip from "../../components/Tooltip";
import s from "./Post.module.scss";

class Post extends PureComponent {
  static propTypes = {
    post: allowNull(PropTypes.object.isRequired),
    error: allowNull(PropTypes.object.isRequired),
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

  renderLoading() {
    return (
      <Card className={classNames(s.container, s.textCenter)}>
        <CircularProgress />
        <p>Sæki frétt...</p>
      </Card>
    );
  }

  renderNoPost() {
    return (
      <Card className={classNames(s.container, s.textCenter)}>
        <h1>Engin frétt fannst</h1>
      </Card>
    );
  }

  render() {
    const { post, error } = this.props;

    if (error) {
      return this.renderNoPost();
    }

    if (!post) {
      return this.renderNoPost();
    }

    const { content, title, date, _embedded } = post;
    const featuredmedia = _embedded["wp:featuredmedia"];
    let img = null;

    if (featuredmedia) {
      img = featuredmedia[0].media_details.sizes.full.source_url;
    }

    const author = _embedded.author[0];
    return (
      <div className={s.container}>
        {img && (
          <CardMedia
            alt={featuredmedia[0].alt_text || title.rendered}
            className={s.media}
            image={img}
            title={featuredmedia[0].alt_text || title.rendered}
          />
        )}
        <div className={s.card} />
        <h1 className={s.title}>{title.rendered}</h1>
        <div>
          <List className={s.author}>
            <ListItem>
              <Tooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit" variant="h6">
                      {capitalizeFirstLetter(author.name)}
                    </Typography>
                    <Typography color="inherit">
                      {author.description}
                    </Typography>
                  </React.Fragment>
                }
              >
                <Avatar
                  alt={author.name}
                  src={author["avatar_urls"]["96"]}
                  className={s.bigAvatar}
                />
              </Tooltip>
              <ListItemText
                primary={capitalizeFirstLetter(author.name)}
                secondary={formatDate(date)}
              />
            </ListItem>
          </List>
          <Typography component="article">
            <span dangerouslySetInnerHTML={{ __html: content.rendered }} />
          </Typography>
        </div>
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
    blog: { post, error }
  } = state;

  return {
    post: post,
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
    actions: bindActionCreators({ getPost }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
