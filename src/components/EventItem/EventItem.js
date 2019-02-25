import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { setActiveEvent } from "../../actions/events";
import formatDate from "../../utils/dateHelper";
import { MobileOnly, MobileAndUp } from "../../components/Responsive";
import s from "./EventItem.module.scss";

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

class EventItem extends PureComponent {
  static propTypes = {
    event: PropTypes.shape({
      excerpt: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date_details: PropTypes.object.isRequired,
      start_date_details: PropTypes.object.isRequired
    }).isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  /**
   * Dispatches set active event action and
   * navigates to event route
   */
  readMoreClickHandler = async e => {
    const { event, history, actions } = this.props;

    // Sets active event in Redux state
    await actions.setActiveEvent(event);

    // Navigates user to /vidburdir/:id route
    history.push(`/vidburdir/${event.id}`);
  };

  render() {
    const { event, classes } = this.props;
    const {
      excerpt,
      title,
      start_date,
      end_date_details,
      start_date_details,
      image
    } = event;
    let img = null;

    if (
      image &&
      image.sizes &&
      image.sizes.medium_large &&
      image.sizes.medium_large.url
    ) {
      img = image.sizes.medium_large.url;
    }

    const formattedDate = `${formatDate(start_date, false)}  frá kl. ${
      start_date_details.hour
    }:${start_date_details.minutes} til ${end_date_details.hour}:${
      end_date_details.minutes
    }`;

    return (
      <div className={s.card}>
        <MobileOnly>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={this.readMoreClickHandler}
          >
            {title}
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
              alt={title}
              className={s.media}
              image={img}
              title={title}
            />
          )}
        </MobileOnly>
        <div className={s.cardContent}>
          <div className={s.content}>
            <MobileAndUp>
              <Typography
                gutterBottom
                variant="h6"
                className={classes.title}
                onClick={this.readMoreClickHandler}
              >
                {title}
              </Typography>
              <Typography color="textSecondary" component="span">
                {formattedDate}
              </Typography>
            </MobileAndUp>
            <Typography component="span">
              <span dangerouslySetInnerHTML={{ __html: excerpt }} />
            </Typography>
          </div>
          <MobileAndUp>
            <div className={s.imageContainer}>
              {img && (
                <CardMedia
                  alt={title}
                  className={s.media}
                  image={img}
                  title={title}
                />
              )}
            </div>
          </MobileAndUp>
        </div>
        <div className={s.footer}>
          <div>
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
    actions: bindActionCreators({ setActiveEvent }, dispatch)
  };
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(EventItem))
);
