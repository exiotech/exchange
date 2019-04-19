import { createActions } from 'redux-actions';

import tokenActions from './TokenActions';
import exioExChangeActions from './ExioExChangeActions';
import erc20TokenActions from './ERC20TokenActions';

export default createActions(Object.assign(
    {},
    tokenActions,
    exioExChangeActions,
    erc20TokenActions,
));
