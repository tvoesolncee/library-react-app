import { applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import reducer from './reducer';

const store = createStore(
    reducer,
    applyMiddleware(logger)
);

export default store;
