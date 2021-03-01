import * as Realm from "realm-web";
import config from "./realm_config.json";

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
