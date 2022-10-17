import { getApiFormHeaders } from "./auth";

// Initial Fetch
export const getLatestData = (endpoint: string, action: Function): void => {
  fetch(endpoint, {
    method: "GET",
    headers: getApiFormHeaders(),
  })
    .then((response) => response.json())
    .then((result) => {
      // console.log("Success:", result);
      action(result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
