import { createActions } from 'redux-actions';

import tokenActions from './TokenActions';

export default createActions(Object.assign(
    {},
    tokenActions,
));
