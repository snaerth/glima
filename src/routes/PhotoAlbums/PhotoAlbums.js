import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import getPhotos, {
  setPhotosLoading,
  setActiveAlbum
} from "../../actions/photos";
import PhotosGrid from "../../components/PhotosGrid";
import Title from "../../components/Title";
import s from "./PhotoAlbums.module.scss";

class PhotoAlbums extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    photos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool
  };

  componentDidMount() {
    const { actions, photos } = this.props;

    if (!photos || photos.length === 0) {
      actions.setPhotosLoading();
      actions.getPhotos();
    }
  }

  albumClickHandler = (id, slug) => {
    const { actions, history } = this.props;

    actions.setActiveAlbum(id, slug);

    // Navigates user to /myndir/:slug
    history.push(`/myndir/${slug}/${id}`);
  };

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
      <section className={s.container}>
        <header className={s.header}>
          <Title>Myndir úr starfinu</Title>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Hér fyrir neðan má sjá myndir úr glímu starfinu
          </Typography>
        </header>
        <div className={s.photosGridContainer}>
          <PhotosGrid photos={photos} onClick={this.albumClickHandler} />
        </div>
      </section>
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
    photos: { data, error, loading }
  } = state;

  return {
    photos: data,
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
      { getPhotos, setPhotosLoading, setActiveAlbum },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoAlbums);
