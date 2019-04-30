import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import allowNull from '../../utils/propTypesHelpers';
import formatDate from '../../utils/dateHelper';
import getPhotos, { setPhotosLoading } from '../../actions/photos';
import ImageGridList from '../../components/ImageGridList';
import Loading from '../../components/Loading';
import Title from '../../components/Title';
import NoData from '../../components/NoData';
import s from './Photos.module.scss';

class Photos extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    photos: allowNull(
      PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
    ),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool
  };

  state = {
    activePhotosBatchIdx: 0,
    open: false,
    imageSrc: '',
    imageTitle: ''
  };

  componentDidMount() {
    const { actions, match, photos } = this.props;

    if (!photos || photos.length === 0) {
      actions.setPhotosLoading();
      actions.getPhotos(match.params.slug);
    }
  }

  handleClickOpen = ({ src, title, id }) => {
    this.setState({
      open: true,
      imageSrc: src,
      imageTitle: title,
      imageId: id
    });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  handleListItemClick(index) {
    this.setState({ activePhotosBatchIdx: index });
  }

  handleSelectChange = event => {
    this.setState({ activePhotosBatchIdx: event.target.value });
  };

  /**
   * Handles image arrow click. Sets next or previous photo
   * @param {String} dir - next or prev direction
   */
  imageChangeHandler(dir) {
    const { photos } = this.props;
    const { imageId } = this.state;
    const photosArr = photos.gallery_data.gallery;

    for (let i = 0; i < photosArr.length; i++) {
      const data = photosArr[i];

      if (data.id === parseInt(imageId, 10)) {
        let newImage = null;

        if (dir === 'next') {
          if (photosArr.length === i + 1) {
            newImage = photosArr[0];
          } else {
            newImage = photosArr[i + 1];
          }
        } else {
          if (i === 0) {
            newImage = photosArr[photosArr.length - 1];
          } else {
            newImage = photosArr[i - 1];
          }
        }

        this.setState({
          imageSrc: newImage.src,
          imageTitle: newImage.title,
          imageId: newImage.id
        });

        break;
      }
    }
  }

  render() {
    const { photos, error, loading } = this.props;
    const { open, imageSrc, imageTitle } = this.state;

    if (loading) {
      return <Loading text="Sæki myndir..." />;
    }

    if (error || !photos || photos.length === 0) {
      return (
        <NoData>
          <h1>Engar myndir fundust</h1>
        </NoData>
      );
    }

    return (
      <section className={s.container}>
        <header className={s.header}>
          <Title>{photos.title.rendered}</Title>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {formatDate(photos.date, false)}
          </Typography>
        </header>
        <ImageGridList
          key={photos.id}
          photos={photos.gallery_data.gallery}
          onClick={this.handleClickOpen}
        />
        <Dialog
          maxWidth="md"
          open={open}
          onClose={this.handleClickClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <img src={imageSrc} alt={imageTitle} className={s.modalImage} />
            <span className={s.iconContainer}>
              <Fab
                color="secondary"
                onClick={this.imageChangeHandler.bind(this, 'prev')}
                size="small"
              >
                <ArrowBackIcon />
              </Fab>
            </span>
            <span className={classNames(s.iconContainer, s.iconContainerRight)}>
              <Fab
                color="secondary"
                onClick={this.imageChangeHandler.bind(this, 'next')}
                size="small"
              >
                <ArrowForwardIcon />
              </Fab>
            </span>
          </DialogContent>
        </Dialog>
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
    photos: { error, loading, activeAlbum }
  } = state;

  return {
    photos: activeAlbum,
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
)(withMobileDialog()(Photos));
