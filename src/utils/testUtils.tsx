/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */

import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const createPreparedStore = (actions: AnyAction[]) => {
    const store = createStore(
        combineReducers({ app: reducer }),
        applyMiddleware(thunk)
    );
    actions.forEach(store.dispatch);

    return store;
};

jest.mock('nrf-dtm-js/src/DTM', () => ({
    DTM: {
        DTM_PARAMETER: {
            PHY_LE_1M: 0x01,
        },
    },
}));

window.ResizeObserver = class {
    observe() {}
    disconnect() {}
    unobserve() {}
};

window.MutationObserver = class {
    observe() {}
    disconnect() {}
    takeRecords() {
        return [];
    }
};

const customRender = (
    element: React.ReactElement,
    actions: AnyAction[] = [],
    options: RenderOptions = {}
) => {
    const Wrapper: FC = props => (
        <Provider store={createPreparedStore(actions)} {...props} />
    );
    return render(element, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
