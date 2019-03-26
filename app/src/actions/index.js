import { createActions } from 'redux-actions';

import tokenActions from './TokenActions';
import exioExChangeActions from './ExioExChangeActions';

export default createActions(Object.assign(
    {},
    tokenActions,
    exioExChangeActions,
));
