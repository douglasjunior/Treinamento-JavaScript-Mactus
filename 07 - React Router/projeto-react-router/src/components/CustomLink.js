import React from 'react';

import {
    Link, Route
} from 'react-router-dom';

export default ({ children, to, exact }) => (
    <Route path={to} exact={exact} children={({ match }) => (
        <li className={match ? 'active' : ''}>
            {match ? '> ' : ''}
            <Link to={to}>{children}</Link>
        </li>
    )} />
)
