import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import App from "./app";
import loadProfileContainer from "./loadProfileContainer";

const ProfileApp = lazy(loadProfileContainer());

const shouldShowProfile = true // a feature flag could be used

ReactDOM.render(
  <>
    {shouldShowProfile && (
      <Suspense fallback={null}>
        <ProfileApp />
      </Suspense>
    )}

    <App />
  </>,
  document.getElementById("root")
);
