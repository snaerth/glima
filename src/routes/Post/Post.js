import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import allowNull from "../../utils/propTypesHelpers";
import formatDate from "../../utils/dateHelper";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { getPost, setPostsLoading } from "../../actions/posts";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import Tooltip from "../../components/Tooltip";
import NoData from "../../components/NoData";
import { ReactComponent as FacbookIcon } from "../../assets/img/facebook.svg";
import s from "./Post.module.scss";

const styles = {
  noLink: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "none"
    }
  }
};

class Post extends PureComponent {
  static propTypes = {
    post: allowNull(PropTypes.object.isRequired),
    error: allowNull(PropTypes.bool.isRequired),
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
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
      actions.setPostsLoading();
      actions.getPost(id);
    }
  }

  backButtonHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  renderNoPost() {
    return (
      <NoData textCenter={false} text="Við fundum enga frétt á þessum hlekk." />
    );
  }

  render() {
    const { post, error, loading, classes } = this.props;

    if (loading) {
      return <Loading text="Sæki frétt..." />;
    }

    if (error || !post) {
      return this.renderNoPost();
    }

    const { content, title, date, _embedded } = post;
    let img = null;
    const featuredmedia = _embedded ? _embedded["wp:featuredmedia"] : null;

    if (
      featuredmedia &&
      featuredmedia[0] &&
      featuredmedia[0].media_details &&
      featuredmedia[0].media_details.sizes
    ) {
      img = featuredmedia[0].media_details.sizes.full.source_url;
    }

    const author = _embedded.author[0];
    return (
      <Container className={s.containerExtra}>
        {img && (
          <CardMedia
            alt={featuredmedia[0].alt_text || title.rendered}
            className={s.media}
            image={img}
            title={featuredmedia[0].alt_text || title.rendered}
          />
        )}
        <h2 className={s.title}>{title.rendered}</h2>
        <div>
          <List className={s.author}>
            <ListItem>
              <Tooltip
                interactive
                open
                title={
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={author.name}
                        src={author["avatar_urls"]["96"]}
                        className={s.bigAvatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={author.name}
                      secondary={author.description}
                    />
                  </ListItem>
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
          <div className={s.buttonsContainer}>
            <Button color="primary" onClick={this.backButtonHandler}>
              Til baka
            </Button>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://www.glima.is/frett/${
                post.slug
              }/${post.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.noLink}
            >
              <Button size="small" color="primary">
                <FacbookIcon className={s.facebookIcon} /> Deila á Facebook
              </Button>
            </a>
          </div>
        </div>
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
    blog: { post, error, loading }
  } = state;

  return {
    post: post,
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
    actions: bindActionCreators({ getPost, setPostsLoading }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post));
