import React, { lazy } from 'react';
import { Route } from 'react-router';

const Page = lazy(() => import('./component'));

export default <Route exact
    key="/no-match"
    component={Page} />;
