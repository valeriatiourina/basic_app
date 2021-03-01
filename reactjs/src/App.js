import React from "react";

import "./App.css";
import { getApp } from "./utils/realm";

function App() {
  const [realmApp, setRealmApp] = React.useState(undefined);
  const [pageErr, setPageErr] = React.useState("");

  React.useEffect(() => {
    const getAndSetApp = async () => {
      try {
        setPageErr("");
        const app = await getApp();
        console.log("got app:", app);
        setRealmApp(app);
      } catch (err) {
        setPageErr(err);
      }
    };

    getAndSetApp();
  }, []);

  React.useEffect(() => {
    console.log(realmApp);
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Basic Template App yee</h1>
        {pageErr && <p>{pageErr}</p>}
        <p>{`Connected to app: ${realmApp.id}`}</p>
        <p>{`Base url: ${realmApp.baseUrl}`}</p>
      </header>
    </div>
  );
}

export default App;
