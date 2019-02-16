import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import queryString from "query-string";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import getPhotos, {
  setPhotosLoading,
  setPhotosPage,
  setActiveAlbum
} from "../../actions/photos";
import PhotosGrid from "../../components/PhotosGrid";
import Title from "../../components/Title";
import Pagination from "../../components/Pagination";
import s from "./PhotoAlbums.module.scss";

class PhotoAlbums extends PureComponent {
  static defaultProps = {
    error: null
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    photos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    error: PropTypes.bool
  };

  componentDidMount() {
    const { actions, photos, page, location, history } = this.props;
    const qsPageParam = queryString.parse(location.search);

    if (!photos || photos.length === 0) {
      actions.setPhotosLoading();

      if (qsPageParam.page) {
        const pageNumber = Number(qsPageParam.page);
        actions.setPhotosPage(pageNumber);
        actions.getPhotos(null, pageNumber);
      } else {
        actions.getPhotos(null, page);
        history.push("/myndir/?page=1");
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { actions, page, location } = this.props;
    const qsPageParam = queryString.parse(location.search);
    const pageNumber = Number(qsPageParam.page);

    if (prevProps.page !== page || (pageNumber && pageNumber !== page)) {
      actions.setPhotosLoading();

      if (qsPageParam.page) {
        const pageNumber = Number(qsPageParam.page);
        actions.setPhotosPage(pageNumber);
        actions.getPhotos(null, pageNumber);
      } else {
        actions.getPhotos(null, page);
      }
    }
  }

  /**
   * Sets active album in Redux store and navigates
   * to /myndir/:slug/:id
   * @param {Number} id - Album id
   * @param {String} slug - Album slug
   */
  albumClickHandler = (id, slug) => {
    const { actions, history } = this.props;

    actions.setActiveAlbum(id, slug);

    // Navigates user to /myndir/:slug
    history.push(`/myndir/${slug}/${id}`);
  };

  /**
   * Changes pagination
   *
   * @param {Object} obj
   * @param {Number} obj.selected - Selected page in pagination
   */
  paginateHandler = ({ selected }) => {
    const { actions, history } = this.props;
    const page = selected + 1;
    history.push(`/myndir/?page=${page}`);
    actions.setPhotosPage(page);
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
    const { photos, error, loading, totalPages, page } = this.props;

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
        <div className={s.paginationContainer}>
          <Pagination
            pageCount={totalPages}
            initialPage={page}
            onPageChangeHandler={this.paginateHandler}
          />
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
    photos: { data, error, loading, totalPages, page }
  } = state;

  return {
    photos: data,
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
      { getPhotos, setPhotosLoading, setPhotosPage, setActiveAlbum },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoAlbums);
