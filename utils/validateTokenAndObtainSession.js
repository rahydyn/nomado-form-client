import { post } from "./sdk"

export const validateTokenAndObtainSession = ({ data, idToken }) => {
  console.log("validateTokenAndObtainSession")
  const headers = {
    Authorization: idToken,
    "Content-Type": "application/json",
  };
  return post("users/init/", data, { headers });
};
