import React from 'react';
import { useHistory } from 'react-router';
import { Result, Button } from 'antd';

import { useClassName } from 'utils/cn';
import './style.less';

export default () => {
    const cn = useClassName('no-match-page');
    const history = useHistory();

    const toHomePage = () => { history.push('/home'); };

    return (
        <div className={cn()}>
            <Result status="404"
                title="404"
                subTitle="Sorry, not found"
                extra={(
                    <Button onClick={toHomePage} type="primary">
                        Go Home
                    </Button>
                )} />
        </div>
    );
};
