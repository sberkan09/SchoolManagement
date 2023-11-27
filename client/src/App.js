import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';

import LoginPage from './pages/LoginPage';
import Pills from './pages/Pills';
import Vaccines from './pages/Vaccines';
import Appointments from './pages/Appointments';
import PillPanel from './components/PillPanel';
import AppointmentPanel from './components/AppointmentPanel';
import LeftNavBar from './components/LeftNavBar';
import VaccinesPanel from './components/VaccinesPanel';
import PillDetails from './pages/PillDetails';
import Profile from './pages/Profile';
import AddPills from './pages/AddPills';

function App() {
  const [user, setUser] = useState({});
  return (
    <Routes>
      <Route path="/login" element={<LoginPage setUser={setUser} />} />
      <Route
        path="/"
        element={(
          <RequireAuth loginPath="/login">
            <Grid container>
              <LeftNavBar user={user} />
            </Grid>
          </RequireAuth>
        )}
      />
      <Route
        path="/pills"
        element={(
          <RequireAuth loginPath="/login">
            <Grid container>
              <LeftNavBar user={user} />
              <Pills user={user} />
            </Grid>
          </RequireAuth>
        )}
      />
      <Route
        path="/pills/add"
        element={(
          <RequireAuth loginPath="/login">
            <Grid container>
              <LeftNavBar user={user} />
              <PillPanel user={user} />
            </Grid>
          </RequireAuth>
        )}
      />
      <Route
        path="/pills/:ilacid"
        element={(
          <RequireAuth loginPath="/login">
            <Grid container>
              <LeftNavBar user={user} />
              <PillDetails user={user} />
            </Grid>
          </RequireAuth>
        )}
      />
      <Route
        path="/vaccines"
        element={(
          <RequireAuth loginPath="/login">
            <Grid container>
              <LeftNavBar user={user} />
              <Vaccines user={user} />
            </Grid>
          </RequireAuth>
        )}
      />
      <Route
        path="/vaccines/add"
        element={(
          <RequireAuth loginPath="/login">
            <Grid container>
              <LeftNavBar user={user} />
              <VaccinesPanel user={user} />
            </Grid>
          </RequireAuth>
        )}
      />
      <Route
        path="/appointments"
        element={(
          <RequireAuth loginPath="/login">
            <Grid container>
              <LeftNavBar user={user} />
              <Appointments user={user} />
            </Grid>
          </RequireAuth>
        )}
      />
      <Route
        path="/appointments/add"
        element={(
          <RequireAuth loginPath="/login">
            <Grid container>
              <LeftNavBar user={user} />
              <AppointmentPanel user={user} />
            </Grid>
          </RequireAuth>
        )}
      />
      <Route
        path="/add_pill_to_user"
        element={(
          <RequireAuth loginPath="/login">
            <Grid container>
              <LeftNavBar user={user} />
              <AddPills user={user} />
            </Grid>
          </RequireAuth>
        )}
      />
      <Route
        path="/profile"
        element={(
          <RequireAuth loginPath="/login">
            <Grid container>
              <LeftNavBar user={user} />
              <Profile user={user} />
            </Grid>
          </RequireAuth>
        )}
      />
    </Routes>
  );
}

export default App;
