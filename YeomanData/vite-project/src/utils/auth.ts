export const getApiHeaders = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Access-Control-Allow-Credentials", "true");
  myHeaders.append("Access-Control-Allow-Origin", "true");
  myHeaders.append(
    "x-auth-token",
    localStorage.getItem("IronHeart.alpha.V0.003") ?? ""
  );
  return myHeaders;
};

export const getUploadHeaders = () => {
  var myHeaders = new Headers();
  myHeaders.append(
    "x-auth-token",
    localStorage.getItem("IronHeart.alpha.V0.003") ?? ""
  );
  return myHeaders;
};
