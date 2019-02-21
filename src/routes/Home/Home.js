import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import getEvents, { setEventsLoading } from "../../actions/events";
import getCategories, { setCategoriesLoading } from "../../actions/categories";
import Posts from "../../components/Posts";
import Container from "../../components/Container";
import EventsList from "../../components/EventsList";
import s from "./Home.module.scss";

class Home extends PureComponent {
  async componentDidMount() {
    const { actions } = this.props;
    actions.setCategoriesLoading();
    const eventCategory = await actions.getCategories("event");

    if (eventCategory[0] && eventCategory[0].id) {
      actions.setEventsLoading();
      actions.getEvents([eventCategory[0].id]);
    }
  }

  render() {
    const { newsOnly, events, history } = this.props;

    return (
      <Container className={s.container}>
        <div className={s.postsContainer}>
          <Posts showPagination={newsOnly} moreButton={!newsOnly} />
        </div>
        <div className={s.eventsContainer}>
          <EventsList
            title="Framundan í glímunni"
            events={events}
            history={history}
          />
        </div>
      </Container>
    );
  }
}

Home.defaultProps = {
  newsOnly: false,
  error: false
};

Home.propTypes = {
  events: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  newsOnly: PropTypes.bool,
  error: PropTypes.bool
};

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
      { getEvents, setEventsLoading, getCategories, setCategoriesLoading },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
