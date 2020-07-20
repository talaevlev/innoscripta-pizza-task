import React, { Suspense } from 'react';
import { Switch } from 'react-router';

import ErrorBoundary from 'components/error-boundary';
import Fallback from 'components/lazy-fallback';
import * as Pages from 'pages';

export default (
    <ErrorBoundary>
        <Suspense fallback={<Fallback />}>
            <Switch>
                { Object.values(Pages) }
            </Switch>
        </Suspense>
    </ErrorBoundary>
);
