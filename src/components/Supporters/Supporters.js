import React from "react";
import Title from "../Title";
import { ReactComponent as AvisLogo } from "../../assets/img/avis.svg";
import { ReactComponent as UmfiLogo } from "../../assets/img/umfi.svg";
import { ReactComponent as IsiLogo } from "../../assets/img/isi.svg";
import s from "./Supporters.module.scss";

function Supporters() {
  return (
    <div>
      <Title className={s.title}>Styrktaraðilar</Title>
      <ul className={s.list}>
        <li>
          <a
            href="https://games.lotto.is/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/lotto.png" alt="lotto" className={s.lotto} />
          </a>
        </li>
        <li>
          <a
            href="https://www.avis.is/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AvisLogo className={s.avis} />
          </a>
        </li>
        <li>
          <a
            href="http://www.isi.is/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IsiLogo className={s.isi} />
          </a>
        </li>
        <li>
          <a
            href="http://www.hotelgeysir.is/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/geysir.png" alt="Geysir" className={s.geysir} />
          </a>
        </li>
        <li>
          <a
            href="https://www.umfi.is/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <UmfiLogo className={s.umfi} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Supporters;
