import React from "react";
import Responsive from "react-responsive";

export const Desktop = props => <Responsive {...props} minWidth={992} />;
export const MinToDesktop = props => <Responsive {...props} maxWidth={991} />;
export const Tablet = props => (
  <Responsive {...props} minWidth={768} maxWidth={991} />
);
export const TabletAndUp = props => <Responsive {...props} minWidth={768} />;
export const Mobile = props => <Responsive {...props} maxWidth={767} />;
export const MobileOnly = props => (
  <Responsive {...props} minWidth={320} maxWidth={767} />
);
export const MobileAndUp = props => <Responsive {...props} minWidth={480} />;
