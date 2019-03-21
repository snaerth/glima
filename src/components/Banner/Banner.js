import React, { PureComponent } from "react";
import Container from "../../components/Container";
import { ReactComponent as FacbookIcon } from "../../assets/img/facebook.svg";
import { ReactComponent as InstagramIcon } from "../../assets/img/instagram.svg";
import BannerImage from "../../assets/img/banner.png";
import BannerImageWebP from "../../assets/img/banner.webp";
import s from "./Banner.module.scss";

// Check if webp is supported
const isWebP = document.body.classList.contains("webp");

class Banner extends PureComponent {
  state = {
    imageLoaded: false,
    imageSrc: ""
  };

  componentDidMount() {
    // Preload banner image and set state when loaded
    const img = new Image();
    img.src = isWebP ? BannerImageWebP : BannerImage;

    img.onload = () => {
      this.setState({
        imageLoaded: true,
        imageSrc: img.src
      });
    };
  }

  render() {
    const { imageLoaded, imageSrc } = this.state;

    return (
      <div className={s.container}>
        <Container className={s.containerInner}>
          <div className={s.contentContainer}>
            <h1 className={s.title}>Glímusamband Íslands</h1>
            <div className={s.diamondBig}>
              <div className={s.diamond} />
            </div>
            <div className={s.socialsContainer}>
              <a
                href="https://www.facebook.com/glimaIsl/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacbookIcon className={s.facebookIcon} />
              </a>
              <a
                href="https://www.instagram.com/glimaisl/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className={s.instagramIcon} />
              </a>
            </div>
          </div>
          {imageLoaded && (
            <div className={s.imageContainer}>
              <div
                className={s.image}
                style={{
                  backgroundImage: `url(${imageSrc})`
                }}
              />
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default Banner;
