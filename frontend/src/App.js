import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetailsPage from "./components/SpotDetailsPage";
import CreateNewSpotForm from "./components/CreateNewSpotForm";
import ManageSpotsPage from "./components/ManageSpotsPage";
import UpdateSpotForm from "./components/ManageSpotsPage/UpdateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/spots/current'>
            <ManageSpotsPage />
          </Route>
          <Route exact path='/spots/new'>
            <CreateNewSpotForm />
          </Route>
          <Route path='/spots/:spotId/edit'>
            <UpdateSpotForm />
          </Route>
          <Route path='/spotDetails/:spotId'>
            <SpotDetailsPage />
          </Route>
          <Route exact path='/'>
            <LandingPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;