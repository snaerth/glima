import React from "react";
import Link from "@material-ui/core/Link";
import config from "../../config";
import Container from "../Container";
import { ReactComponent as Logo } from "../../assets/img/glima_logo.svg";
import s from "./Footer.module.scss";

const {
  mail: { email, subject, body },
  phone: { number, formatted }
} = config;

function Footer() {
  return (
    <footer className={s.footer}>
      <Container className={s.container}>
        <Logo className={s.logo} />
        <p>
          <strong>Glímusamband Íslands</strong>
          <span className={s.dot}>&#8226;</span>
          <span>Engjavegi 6</span>
          <span className={s.dot}>&#8226;</span>
          <span>104 Reykjavík</span>
          <span className={s.dot}>&#8226;</span>
          <span>
            Netfang:{" "}
            <Link href={`mailto:${email}?subject=${subject}&body=${body}`}>
              {email}
            </Link>
          </span>
          <span className={s.dot}>&#8226;</span>
          <span>
            Sími: <Link href={`tel:${number}`}>{formatted}</Link>
          </span>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
