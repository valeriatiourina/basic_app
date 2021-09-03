import React from "react";

import "./App.css";
import { getApp, logInAnonymously, getRealmData } from "./utils/realm";

function App() {
  const [realmApp, setRealmApp] = React.useState();
  const [realmData, setRealmData] = React.useState();
  const [realmUser, setRealmUser] = React.useState();
  const [filteredUser, setFilteredUser] = React.useState();
  const [pageErr, setPageErr] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const getAndSetApp = async () => {
      setIsLoading(true);
      try {
        setPageErr("");
        if (!realmApp) {
          const app = await getApp();
          setRealmApp(app);
        }

        if (realmApp) {
          const user = await logInAnonymously();
          console.log("user:", user);
          setRealmUser(user);
        }
      } catch (err) {
        setPageErr(String(err));
      } finally {
        setIsLoading(false);
      }
    };

    getAndSetApp();
  }, [realmApp]);

  // filter out circular fields of the user object
  React.useEffect(() => {
    if (realmUser) {
      const { providerType, id } = realmUser;
      setFilteredUser({
        providerType,
        id,
      });
    }
  }, [realmUser]);

  const handleGetRealmData = () => {
    setRealmData(undefined);
    setPageErr(undefined);
    setIsLoading(true);
    getRealmData()
      .then((data) => setRealmData(data))
      .catch((err) => setPageErr(String(err)))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Basic Template App</h1>
        {pageErr && <p className="error">{pageErr}</p>}
        {realmApp && (
          <>
            <p>{`Connected to app: ${realmApp.id}`}</p>
            <p>{`Base url: ${realmApp.baseUrl}`}</p>
            {filteredUser && <p>{`User: ${JSON.stringify(filteredUser)}`}</p>}
          </>
        )}

        <div>
          <button disabled={isLoading} onClick={handleGetRealmData}>
            Get Data
          </button>
          <button
            onClick={() => {
              setRealmData(undefined);
              setPageErr(undefined);
            }}
          >
            Clear Data
          </button>
        </div>
        <br />

        {realmData && (
          <>
            <h2>Data from Realm:</h2>
            <code>{realmData}</code>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
