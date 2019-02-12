import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";
import getPhotos, { setPhotosLoading } from "../../actions/photos";
import ImageGridList from "../../components/ImageGridList";
import s from "./Photos.module.scss";

class Photos extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    photos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.setPhotosLoading();
    actions.getPhotos("glima");
  }

  renderLoading() {
    return (
      <div className={classNames(s.container, s.loadingContainer)}>
        <CircularProgress />
        <p>Sæki myndir...</p>
      </div>
    );
  }

  renderNoPhotos() {
    return (
      <div className={classNames(s.container, s.textCenter)}>
        <h1>Engar myndir fundust</h1>
      </div>
    );
  }

  render() {
    const { photos, error, loading } = this.props;

    if (loading) {
      return this.renderLoading();
    }

    if (error) {
      return this.renderNoPhotos();
    }

    if (!photos || photos.length === 0) {
      return this.renderNoPhotos();
    }

    return (
      <div className={s.container}>
        {photos.map(data => (
          <ImageGridList key={data.id} photos={data.gallery_data.gallery} />
        ))}
      </div>
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
    photos: { photos, error, loading }
  } = state;

  return {
    photos,
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
    actions: bindActionCreators({ getPhotos, setPhotosLoading }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Photos);
