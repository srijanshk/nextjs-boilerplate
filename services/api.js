import apisauce from "apisauce";

const Config = {
  API_URL: process.env.API_URL,
  api_key_id: process.env.APP_KEY_ID,
};

const authenticated = (api) => {
  api.setHeader("Authorization", window.token);
  return api;
};

const create = (baseURL = Config.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // 50 second timeout...
    timeout: 50000,
  });

  const formdataApi = apisauce.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      apikeyid: Config.api_key_id,
    },
    // 50 second timeout...
    timeout: 50000,
  });

  const postLogin = (payload) => api.post("user/login", payload);

  return {
    postLogin,
  };
};

export default {
  create,
};
