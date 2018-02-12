import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// import { routerMiddleware } from 'react-router-redux'


import rootReducer from '../reducers';
import rootEpic from '../epics';

let store;
export default function configureStore(initialState) {
    if (store) {
        return store;
    }

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // const middleware = routerMiddleware(history);

    store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(
                createEpicMiddleware(rootEpic)
            )
        )
    );
    return store;
}