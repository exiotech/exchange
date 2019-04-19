import { createActions } from 'redux-actions';

import tokenActions from './TokenActions';
import exioExChangeActions from './ExioExChangeActions';
import erc20TokenABIAction from './ERC20TokenABIAction';

export default createActions(Object.assign(
    {},
    tokenActions,
    exioExChangeActions,
    erc20TokenABIAction,
));
