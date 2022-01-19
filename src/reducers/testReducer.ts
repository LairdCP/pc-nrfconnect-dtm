/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { createSlice } from '@reduxjs/toolkit';

import { RootState, TestState } from './types';

const initialState: TestState = {
    isRunning: false,
    lastStatusMessage: '',
    lastReceived: new Array(40).fill(0),
    currentChannel: undefined,
    lastChannel: { channel: 0, received: 0 },
};

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        startedAction(state) {
            state.isRunning = true;
            state.lastStatusMessage = 'Running test';
            state.lastReceived = new Array(40).fill(0);
        },
        stoppedAction(state) {
            state.isRunning = false;
        },
        actionSucceeded(state, action) {
            state.lastReceived = action.payload;
            state.lastStatusMessage = 'Test ended successfully';
            state.isRunning = false;
        },
        actionFailed(state, action) {
            state.lastStatusMessage = action.payload;
        },
        startedChannel(state, action) {
            state.currentChannel = action.payload;
        },
        resetChannel(state) {
            state.currentChannel = undefined;
        },
        endedChannel(state, action) {
            const { channel, received } = action.payload;
            const packets = received === undefined ? 0 : received;
            const nextReceivedCount = [...state.lastReceived];
            nextReceivedCount[channel] += packets;
            state.lastChannel = { channel, received: packets };
            state.lastReceived = nextReceivedCount;
        },
    },
});

export default testSlice.reducer;

const {
    startedAction,
    stoppedAction,
    actionSucceeded,
    actionFailed,
    startedChannel,
    resetChannel,
    endedChannel,
} = testSlice.actions;

const getIsRunning = (state: RootState) => state.app.test.isRunning;
const getLastStatusMessage = (state: RootState) =>
    state.app.test.lastStatusMessage;
const getLastReceived = (state: RootState) => state.app.test.lastReceived;
const getCurrentChannel = (state: RootState) => state.app.test.currentChannel;
const getLastChannel = (state: RootState) => state.app.test.lastChannel;

export {
    startedAction,
    stoppedAction,
    actionSucceeded,
    actionFailed,
    startedChannel,
    resetChannel,
    endedChannel,
    getIsRunning,
    getLastStatusMessage,
    getLastReceived,
    getCurrentChannel,
    getLastChannel,
};
