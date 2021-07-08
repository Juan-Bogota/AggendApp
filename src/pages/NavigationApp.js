
import React, { Fragment, useEffect, Suspense } from "react";

import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import { Splash } from "./Splash";
import { Signup } from "./Signup";
import { Signin } from "./Signin";
import { NotFound } from "./NotFound";
//import Home from "./Home";
//import Schedule from "./Schedule";
import { CreateTask } from "./CreateTask";
import { TaskDetail } from "./TaskDetail";
import { Profile } from "./Profile";
import { Menu } from "../components/Menu";
import { PageWrapperMenu } from "../globalStyles";
import { useSelector, useDispatch } from 'react-redux';
import { autologin, redirectDone } from '../store'
const Home = React.lazy(() => import('./Home'));
const Schedule = React.lazy(() => import("./Schedule"));

const AuthenticatedUser = ({ children }) => {

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(redirectDone())
  }, [pathname])
  return (
    <Fragment>
      <PageWrapperMenu>
        {children}
      </PageWrapperMenu>
      <Menu pathname={pathname} />
    </Fragment>
  )
}

const NotAuthenticatedUser = ({ children }) => {
  return children;
}

export const NavigationApp = () => {

  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(autologin());
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (userData.splash) {
    return <Splash />
  }

  return (
    <Router>
      {
        !userData.isAuth && (
          <NotAuthenticatedUser>
            <Switch>
              <Route exact path="/" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path="*" component={NotFound} />
            </Switch>
          </NotAuthenticatedUser>
        )
      }

      {
        userData.isAuth && (
          <AuthenticatedUser>
            <Switch>
              <Route exact path="/">
                <Suspense fallback={'Loading...'}>
                  <Home title="Tasks" />
                </Suspense>
              </Route>
              <Route path="/schedule">
                <Suspense fallback={'Loading...'}>
                  <Schedule title="Schedules" />
                </Suspense>
              </Route>
              <Route path="/create">
                <CreateTask title="Create new task" />
              </Route>
              <Route path="/detail/:id">
                <TaskDetail title="Task detail" />
              </Route>
              <Route path="/profile">
                <Profile title="Profile" />
              </Route>
              <Route path="*" component={NotFound} />
            </Switch>
          </AuthenticatedUser>
        )
      }

    </Router>
  );
};
