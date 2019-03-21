import React from "react";
import PropTypes from "prop-types";
import CardMedia from "@material-ui/core/CardMedia";
import Title from "../Title";
import s from "./Instagram.module.scss";

function Instagram({ data, loading, error }) {
  if (error) return null;
  return (
    <div>
      <Title className={s.title}>Instagram</Title>
      <div className={s.imagesContainers}>
        {data.map(item => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CardMedia
              alt={item.caption.text}
              className={s.image}
              image={item.images.low_resolution.url}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

Instagram.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool
};

export default Instagram;
