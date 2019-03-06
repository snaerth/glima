import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classNames from "classnames";
import getEvents, {
  setEventsLoading,
  setActiveEvent
} from "../../actions/events";
import getCategories, { setCategoriesLoading } from "../../actions/categories";
import Posts from "../../components/Posts";
import Container from "../../components/Container";
import EventsList from "../../components/EventsList";
import Banner from "../../components/Banner";
import BannerSmall from "../../components/BannerSmall";
import s from "./Home.module.scss";

class Home extends PureComponent {
  static defaultProps = {
    newsOnly: false,
    error: false
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    newsOnly: PropTypes.bool,
    error: PropTypes.bool
  };

  async componentDidMount() {
    const { actions } = this.props;
    actions.setEventsLoading();
    actions.setCategoriesLoading();
    const eventCategory = await actions.getCategories("event");

    if (eventCategory[0]) {
      actions.getEvents(1);
    } else {
      actions.setEventsLoading(false);
    }
  }

  /**
   * Event click handler
   * Dispatches setActiveEvent action and routes user
   * to event page
   * @param {Object} event - Event object
   */
  eventClickHandler = event => {
    const { actions, history } = this.props;

    if (event) {
      actions.setActiveEvent(event);
      history.push(`/vidburdir/${event.id}`);
    }
  };

  render() {
    const { newsOnly, events, history, loading } = this.props;

    return (
      <Fragment>
        {!newsOnly ? <Banner /> : <BannerSmall text="Fréttir" />}
        <Container
          className={classNames(
            s.container,
            s.containerFlex,
            s.greyBackground,
            {
              [s.containerSmaller]: newsOnly
            }
          )}
        >
          <div className={newsOnly ? s.postOnlyContainer : s.postsContainer}>
            <Posts showPagination={newsOnly} moreButton={!newsOnly} />
          </div>
          {!newsOnly && (
            <div className={s.eventsContainer}>
              <EventsList
                title="Framundan í glímunni"
                events={events}
                loading={loading}
                onClick={this.eventClickHandler}
                history={history}
              />
            </div>
          )}
        </Container>
      </Fragment>
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
    events: { data, error, loading }
  } = state;

  return {
    events: data,
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
)(Home);
