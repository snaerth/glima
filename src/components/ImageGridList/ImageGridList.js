import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import generateRandomInteger from "../../utils/generateRandomInteger";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 700,
    height: 500
  }
});

/**
 * The example data is structured as follows:
 *
 * const photos = [
 *   {
 *     id: 30,
 *     title: 'Image title',
 *     src: 'http src link',
 *     etc...
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function ImageGridList(props) {
  const { classes, photos } = props;

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3}>
        {photos.map(photo => (
          <GridListTile key={photo.id} cols={generateRandomInteger(1, 2)}>
            <img src={photo.src} alt={photo.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  photos: PropTypes.array.isRequired
};

export default withStyles(styles)(ImageGridList);
