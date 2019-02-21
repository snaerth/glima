import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import formatDate from "../../utils/dateHelper";

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
});

function PhotosGrid({ classes, photos, onClick }) {
  return photos.map((photo, idx) => {
    const img = photo.gallery_data.gallery[0];

    return (
      <Card key={idx} onClick={() => onClick(photo.id, photo.slug)}>
        <CardActionArea>
          <CardHeader
            title={photo.title.rendered}
            subheader={formatDate(photo.date, false)}
            className={classes.title}
          />
          <CardMedia
            className={classes.media}
            image={img.src}
            title={img.title}
          />
        </CardActionArea>
      </Card>
    );
  });
}

PhotosGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  photos: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(PhotosGrid);
