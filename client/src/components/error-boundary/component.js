import React, { Component } from 'react';
import { Collapse, Result, Button } from 'antd';
import { withRouter } from 'react-router';

import cn from 'utils/cn';
import './style.less';

const { Panel } = Collapse;

@withRouter
@cn('error-boundary')
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
    }

    goToHomePage = () => {
        const { history } = this.props;
        history?.push('/home');
    };

    render() {
        const { cn } = this;
        const { children } = this.props;
        const { errorInfo, error } = this.state;

        if (errorInfo) {
            return (
                <Result status="error"
                    title="Opps, it's an error"
                    subTitle="Sorry for this happened!"
                    extra={[
                        <Button type="primary" onClick={this.goToHomePage}>Go Home</Button>
                    ]}>
                    <Collapse>
                        <Panel key="error" header="Some errors detail" className={cn('error-detail')}>
                            {error && error.toString()}
                            <br />
                            {errorInfo?.componentStack}
                        </Panel>
                    </Collapse>
                </Result>
            );
        }

        return children;
    }
}
