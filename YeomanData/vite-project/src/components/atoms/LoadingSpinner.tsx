import React from "react";

export enum LoadingSpinnerSize {
  SMALL,
  MEDIUM,
  LARGE,
}

function LoadingSpinner({
  size,
  classes,
}: {
  size: LoadingSpinnerSize;
  classes?: string;
}) {
  let spinnerSize;
  switch (size) {
    case LoadingSpinnerSize.SMALL:
      spinnerSize = "small";
      break;
    case LoadingSpinnerSize.MEDIUM:
      spinnerSize = "medium";
      break;
    case LoadingSpinnerSize.LARGE:
      spinnerSize = "large";
      break;
    default:
      spinnerSize = "medium";
  }

  return (
    <div className={`loading-systems ${spinnerSize} ${classes}`}>
      <div className="arc"></div>
      <div className="arc"></div>
      <div className="arc"></div>
    </div>
  );
}

export default LoadingSpinner;
