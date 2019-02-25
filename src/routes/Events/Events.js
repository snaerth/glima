import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import queryString from "query-string";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import getEvents, {
  setEventsLoading,
  setActiveEvent,
  setEventPage
} from "../../actions/events";
import getCategories, { setCategoriesLoading } from "../../actions/categories";
import EventItem from "../../components/EventItem";
import Container from "../../components/Container";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import s from "./Events.module.scss";

const styles = {
  root: {
    margin: "15px 0"
  }
};

class Events extends PureComponent {
  static defaultProps = {
    error: false
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    error: PropTypes.bool
  };

  async componentDidMount() {
    const { actions, events, page, location, history } = this.props;

    actions.setCategoriesLoading();
    const eventCategory = await actions.getCategories("event");

    if (eventCategory[0] && eventCategory[0].id) {
      const qsPageParam = queryString.parse(location.search);
      const pageNumber = Number(qsPageParam.page);

      if (!events || events.length === 0 || pageNumber) {
        actions.setEventsLoading();

        if (pageNumber) {
          actions.setEventPage(pageNumber);
          actions.getEvents(pageNumber);
        } else {
          actions.setEventPage(page);
          actions.getEvents(page);

          if (location.pathname.includes("/vidburdir")) {
            history.push("/vidburdir/?page=1");
          }
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { actions, page, location } = this.props;
    const qsPageParam = queryString.parse(location.search);
    const pageNumber = Number(qsPageParam.page);

    if (pageNumber && pageNumber !== prevProps.page && pageNumber !== page) {
      actions.setEventsLoading();

      if (qsPageParam.page) {
        actions.setEventPage(pageNumber);
        actions.getEvents(pageNumber);
      } else {
        actions.getEvents(page);
      }
    }
  }

  /**
   * Event click handler
   * Dispatches setActiveEvent action and routes user
   * to event page
   * @param {Number} id - Event id
   */
  eventClickHandler = id => {
    const { actions, history, events } = this.props;
    const event = events.filter(event => event.id === id);

    if (event.length > 0) {
      actions.setActiveEvent(event[0]);
    }

    history.push(`/vidburdir/${id}`);
  };

  /**
   * Changes pagination
   *
   * @param {Object} obj
   * @param {Number} obj.selected - Selected page in pagination
   */
  paginateHandler = ({ selected }) => {
    const { history } = this.props;
    const page = selected + 1;
    history.push(`/vidburdir/?page=${page}`);
  };

  render() {
    const { events, classes, totalPages, page, loading, error } = this.props;

    if (loading) {
      return <Loading text="Sæki frétt..." />;
    }

    if (error || !events) {
      return (
        <NoData
          textCenter={false}
          text="Við fundum enga viðburði á þessum hlekk."
        />
      );
    }

    const isLastPostIdx = events.length - 1;

    return (
      <Container className={s.container}>
        {events.map((event, idx) => (
          <Fragment key={event.id}>
            <EventItem event={event} />
            {isLastPostIdx !== idx && <Divider className={classes.root} />}
          </Fragment>
        ))}
        <Pagination
          pageCount={totalPages}
          initialPage={page}
          onPageChangeHandler={this.paginateHandler}
        />
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
    events: { data, error, loading, totalPages, page }
  } = state;

  return {
    events: data,
    totalPages,
    page,
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
    actions: bindActionCreators(
      {
        getEvents,
        setEventsLoading,
        setActiveEvent,
        setEventPage,
        getCategories,
        setCategoriesLoading
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Events));
