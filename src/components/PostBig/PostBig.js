import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { setActivePost } from "../../actions/posts";
import formatDate from "../../utils/dateHelper";
import Tooltip from "../../components/Tooltip";
import s from "./PostBig.module.scss";

const styles = {
  root: {
    padding: "16px 0"
  },
  title: {
    marginTop: "20px",
    fontWeight: 700
  }
};

class PostBig extends PureComponent {
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
      classes,
      data: { date, title, excerpt, _embedded }
    } = this.props;
    const featuredmedia = _embedded["wp:featuredmedia"];
    let img = null;

    if (featuredmedia) {
      img = featuredmedia[0].media_details.sizes.full.source_url;
    }

    const formattedDate = formatDate(date);
    const author = _embedded.author[0];

    return (
      <div className={s.card}>
        {img && (
          <CardMedia
            alt={featuredmedia[0].alt_text || title.rendered}
            className={s.media}
            image={img}
            title={featuredmedia[0].alt_text || title.rendered}
          />
        )}

        <Typography gutterBottom variant="h4" className={classes.title}>
          <span dangerouslySetInnerHTML={{ __html: title.rendered }} />
        </Typography>
        <Typography component="span">
          <span dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
        </Typography>
        <div className={s.footer}>
          <div className={s.footerLeft}>
            <List className={s.author}>
              <ListItem>
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit" variant="h6">
                        {author.name}
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
                <ListItemText primary={author.name} secondary={formattedDate} />
              </ListItem>
            </List>
          </div>
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
  )(withStyles(styles)(PostBig))
);
