import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import EventIcon from "@material-ui/icons/Event";
import formatDate from "../../utils/dateHelper";
import Loading from "../Loading";
import config from "../../config";

const { VISIBLE_EVENTS } = config;

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  divider: {
    marginTop: 15
  }
});

class EventsList extends PureComponent {
  static defaultProps = {
    title: "",
    onClick: () => {}
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    events: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    title: PropTypes.string,
    onClick: PropTypes.func
  };

  /**
   * Calls onClick callback function
   * @param {Object} event - Event object
   */
  onClickHandler(event) {
    const { onClick } = this.props;
    onClick(event);
  }

  moreEventsClickHandler = () => {
    const { history } = this.props;
    history.push("/vidburdir/?page=1");
  };

  render() {
    const { classes, title, events, loading } = this.props;

    if (loading) {
      return <Loading noMinHeight text="Sæki viðburði..." />;
    }

    if (events.length === 0) {
      return (
        <Fragment>
          <Typography variant="h6">Engir viðburðir framundan</Typography>
          <Divider className={classes.divider} />
        </Fragment>
      );
    }

    return (
      <div>
        {title && (
          <Fragment>
            <Typography variant="h6">{title}</Typography>
            <Divider className={classes.divider} />
          </Fragment>
        )}
        <List className={classes.root}>
          {events.splice(0, VISIBLE_EVENTS).map(event => (
            <ListItem
              data-id={event.id}
              button
              onClick={this.onClickHandler.bind(this, event)}
              key={event.id}
            >
              {event.image &&
              event.image.sizes &&
              event.image.sizes.thumbnail &&
              event.image.sizes.thumbnail.url ? (
                <Avatar
                  alt={event.title}
                  src={event.image.sizes.thumbnail.url}
                />
              ) : (
                <Avatar>
                  <EventIcon />
                </Avatar>
              )}

              <ListItemText
                primary={event.title}
                secondary={formatDate(event.start_date)}
              />
            </ListItem>
          ))}
        </List>
        {events.length > VISIBLE_EVENTS && (
          <Button color="primary" onClick={this.moreEventsClickHandler}>
            Fleiri viðburðir
          </Button>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(EventsList);
