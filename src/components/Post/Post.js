import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MediaQuery from "react-responsive";
import { withStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { setActivePost } from "../../actions/posts";
import formatDate from "../../utils/dateHelper";
import Tooltip from "../../components/Tooltip";
import s from "./Post.module.scss";

const styles = {
  root: {
    padding: "16px 0"
  },
  title: {
    fontWeight: 700,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline"
    }
  }
};

class Post extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      date: PropTypes.string.isRequired,
      title: PropTypes.object.isRequired,
      excerpt: PropTypes.object.isRequired,
      _embedded: PropTypes.object.isRequired
    }).isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  /**
   * Dispatches set active post action and
   * navigates to blog post route
   */
  readMoreClickHandler = async e => {
    const { data, history, actions } = this.props;

    // Sets active post in Redux state
    await actions.setActivePost(data);

    // Navigates user to /post route
    history.push(`/frett/${data.id}`);
  };

  render() {
    const {
      classes,
      data: { date, title, excerpt, _embedded }
    } = this.props;
    const featuredmedia = _embedded["wp:featuredmedia"];
    let img = null;

    if (featuredmedia) {
      img = featuredmedia[0].media_details.sizes.medium.source_url;
    }

    const formattedDate = formatDate(date);
    const author = _embedded.author[0];

    return (
      <div className={s.card}>
        <MediaQuery maxWidth={480}>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={this.readMoreClickHandler}
          >
            <span dangerouslySetInnerHTML={{ __html: title.rendered }} />
          </Typography>
          <Typography
            color="textSecondary"
            component="span"
            className={s.dateMobile}
          >
            {formattedDate}
          </Typography>
          {img && (
            <CardMedia
              alt={featuredmedia[0].alt_text || title.rendered}
              className={s.media}
              image={img}
              title={featuredmedia[0].alt_text || title.rendered}
            />
          )}
        </MediaQuery>
        <div className={s.cardContent}>
          <div className={s.content}>
            <MediaQuery minWidth={480}>
              <Typography
                gutterBottom
                variant="h6"
                className={classes.title}
                onClick={this.readMoreClickHandler}
              >
                <span dangerouslySetInnerHTML={{ __html: title.rendered }} />
              </Typography>
              <Typography color="textSecondary" component="span">
                {formattedDate}
              </Typography>
            </MediaQuery>
            <Typography component="span">
              <span dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
            </Typography>
          </div>
          <MediaQuery minWidth={480}>
            <div className={s.imageContainer}>
              {img && (
                <CardMedia
                  alt={featuredmedia[0].alt_text || title.rendered}
                  className={s.media}
                  image={img}
                  title={featuredmedia[0].alt_text || title.rendered}
                />
              )}
            </div>
          </MediaQuery>
        </div>
        <div className={s.footer}>
          <MediaQuery minWidth={480}>
            <div className={s.footerLeft}>
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
                <span>
                  <Typography color="primary" component="span" inline>
                    {author.name}{" "}
                  </Typography>
                  <Typography color="textSecondary" component="span" inline>
                    {" "}
                    skrifar
                  </Typography>
                </span>
              </Tooltip>
            </div>
          </MediaQuery>
          <div>
            <Button size="small" color="primary">
              Deila
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={this.readMoreClickHandler}
            >
              Lesa meira
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Maps dispatch to components props
 *
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ setActivePost }, dispatch)
  };
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(Post))
);
