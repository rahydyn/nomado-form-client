// import { LOGIN_URL } from "config/urls";
import { notifyError } from "./notifications";

export const BASE_API_URL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/v1/`;

const GetBaseConfig = (method) => {
  return {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
};

const handle401 = (resp) => {
  if (resp.status === 401) {
    console.log("401")
    notifyError("Unauthenticated");
  }
  return resp;
};

const serializeResponse = (response) => {
  return response.text().then((text) => {
      return (text ? JSON.parse(text) : {});
    })
    .then((data) => {
      return ({ status: response.status, ok: response.ok, data })
    });
};

export const get = (url, options) => {
  return (
    fetch(`${BASE_API_URL}${url}`, { ...GetBaseConfig("get"), ...options})
    .then(serializeResponse)
    .then(handle401)
  )
}

export const post = (url, data, options) => {
  return fetch(`${BASE_API_URL}${url}`, {
    ...GetBaseConfig("post"),
    ...options,
    body: JSON.stringify(data),
  })
    .then(serializeResponse)
    .then(handle401);
};