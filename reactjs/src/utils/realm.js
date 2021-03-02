import * as Realm from "realm-web";
import config from "./realm_config.json";
import axios from "axios";

let app = undefined;

export const getApp = () => {
  if (!app) {
    const { app_id, url } = config;
    app = new Realm.App({
      id: app_id,
      baseUrl: url,
    });
  }

  return app;
};

export const logInAnonymously = async () => {
  const realmApp = getApp();
  let user;
  if (Object.keys(realmApp.allUsers).length === 0) {
    // Create an anonymous credential
    console.log("creating");
    const credentials = Realm.Credentials.anonymous();

    // Authenticate the user
    // `App.currentUser` updates to match the logged in user
    user = await realmApp.logIn(credentials);
  } else {
    user = realmApp.currentUser;
  }

  return user;
};

export const getRealmData = async () => {
  const webhookUrl = `http://localhost:8080/api/client/v2.0/app/${config.app_id}/service/httpSvc/incoming_webhook/helloWorld`;

  const res = await axios.post(webhookUrl);
  return res.data;
};
