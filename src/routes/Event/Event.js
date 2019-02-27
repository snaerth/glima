import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import allowNull from "../../utils/propTypesHelpers";
import formatDate from "../../utils/dateHelper";
import { getEvent } from "../../actions/events";
import Container from "../../components/Container";
import s from "./Event.module.scss";

const styles = {
  title: {
    marginTop: 16,
    fontWeight: 700
  }
};

class Event extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    event: allowNull(PropTypes.object.isRequired),
    error: allowNull(PropTypes.bool.isRequired),
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      actions,
      event,
      match: {
        params: { id }
      }
    } = this.props;

    if (!event && id) {
      actions.getEvent(id);
    }
  }

  backButtonHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  renderLoading() {
    return (
      <Container className={s.textCenter}>
        <CircularProgress />
        <p>Sæki viðburð...</p>
      </Container>
    );
  }

  renderNoEvent() {
    return (
      <Container className={s.textCenter}>
        <h1>Engin viðburður fannst</h1>
      </Container>
    );
  }

  render() {
    const { event, error, classes } = this.props;

    if (error) {
      return this.renderNoEvent();
    }

    if (!event) {
      return this.renderNoEvent();
    }

    const {
      description,
      title,
      start_date,
      end_date_details,
      start_date_details
    } = event;
    let img = null;

    if (
      event.image &&
      event.image.sizes &&
      event.image.sizes.medium_large &&
      event.image.sizes.medium_large.url
    ) {
      img = event.image.sizes.medium_large.url;
    }

    return (
      <Container className={s.containerExtra}>
        {img && (
          <CardMedia
            alt={title}
            title={title}
            className={s.media}
            image={img}
          />
        )}
        <Typography gutterBottom variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Typography color="textSecondary" component="span">
          {formatDate(start_date, false)}
          {` frá kl. ${start_date_details.hour}:${
            start_date_details.minutes
          }`}{" "}
          til
          {` ${end_date_details.hour}:${end_date_details.minutes}`}
        </Typography>
        {event.venue.address && (
          <Typography color="textSecondary" component="span">
            Staðsetning: {event.venue.address}
          </Typography>
        )}
        <div>
          <Typography component="article">
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </Typography>
          <div>
            <Button color="primary" onClick={this.backButtonHandler}>
              Til baka
            </Button>
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
    events: { event, error }
  } = state;

  return {
    event,
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
    actions: bindActionCreators({ getEvent }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Event));