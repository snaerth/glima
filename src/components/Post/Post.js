import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MediaQuery from "react-responsive";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { setActivePost } from "../../actions/posts";
import s from "./Post.module.scss";

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
    history.push(`/post/${data.id}`);
  };

  render() {
    const {
      data: { date, title, excerpt, _embedded }
    } = this.props;
    const featuredmedia = _embedded["wp:featuredmedia"];
    let img = null;

    if (featuredmedia) {
      img = featuredmedia[0].media_details.sizes.medium.source_url;
    }

    const formattedDate = date;

    return (
      <Card className={s.card}>
        <MediaQuery maxWidth={480}>
          <CardHeader title={title.rendered} subheader={formattedDate} />
          <CardMedia
            alt={featuredmedia[0].alt_text || title.rendered}
            className={s.media}
            image={img}
            title={featuredmedia[0].alt_text || title.rendered}
          />
        </MediaQuery>
        <CardActionArea>
          <CardContent className={s.cardContent}>
            <div className={s.content}>
              <MediaQuery minWidth={480}>
                <Typography gutterBottom variant="h5" component="h2">
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
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Deila
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={this.readMoreClickHandler}
          >
            Lesa meira pathname
          </Button>
        </CardActions>
      </Card>
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
  )(Post)
);
