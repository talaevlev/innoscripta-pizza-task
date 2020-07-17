import React, { lazy } from 'react';
import { Route } from 'react-router';

const Page = lazy(() => import('./component'));

export default <Route exact
    key="/home"
    path={['/no-match', '/home']}
    component={Page} />;
