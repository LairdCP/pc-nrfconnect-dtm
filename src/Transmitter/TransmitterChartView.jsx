/* Copyright (c) 2015 - 2021, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { colors } from 'pc-nrfconnect-shared';

import { getTxPower } from '../reducers/settingsReducer';
import { getCurrentChannel, getIsRunning } from '../reducers/testReducer';
import { bleChannels, channelTotal, dbmValues } from '../utils/constants';

const frequencyBase = 2402;
const frequencyInterval = 2;

const chartColors = {
    inactive: 'rgba(255,99,132,0.2)',
    active: 'rgba(110,205,172,0.5)',
    background: colors.gray50,
    label: colors.gray300,
};

const chartDataTransmit = (currentChannel, txPower) => {
    const active = Array.from(Array(channelTotal), () => 0);
    if (currentChannel !== undefined) {
        active[currentChannel] = txPower;
    }

    const bleChannelsUpdated = bleChannels.map(
        (channel, index) =>
            `${channel} | ${frequencyBase + index * frequencyInterval} MHz`
    );

    const datasets = [
        {
            label: 'Active transmission power',
            data: active,
            backgroundColor: chartColors.active,
            borderColor: chartColors.active,
            borderWidth: 1,
            hoverBackgroundColor: chartColors.active,
            hoverBorderColor: chartColors.active,
        },
        {
            label: 'bgBars',
            backgroundColor: chartColors.background,
            borderWidth: 0,
            data: Array(bleChannelsUpdated.length).fill(active.length),
            display: false,
        },
    ];

    return {
        labels: bleChannelsUpdated,
        datasets,
    };
};

const getOptions = () => {
    const options = {
        scaleShowGridLines: true,
        scaleGridLineColor: 'rgba(10,100,100,.05)',
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        bezierCurve: true,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        maintainAspectRatio: false,
        legend: { display: false },
    };

    options.animation = false;
    options.scales = {
        yAxes: [
            {
                beginAtZero: true,
                ticks: {
                    display: true,
                    min: 0,
                    max: 13,
                    suggestedMin: undefined,
                    suggestedMax: undefined,
                    stepSize: 1,
                    callback: value =>
                        value in dbmValues ? dbmValues[value] : '',
                    fontColor: chartColors.label,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Strength (dBm)',
                    fontColor: chartColors.label,
                    fontSize: 14,
                },
                gridLines: {
                    display: false,
                    drawBorder: false,
                },
            },
        ],
        xAxes: [
            {
                type: 'category',
                position: 'top',
                offset: true,
                stacked: true,
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: (_, index) =>
                        String(bleChannels[index]).padStart(2, '0'),
                    minRotation: 0,
                    maxRotation: 0,
                    labelOffset: 0,
                    autoSkipPadding: 5,
                    fontColor: chartColors.label,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'BLE channel',
                    fontColor: chartColors.label,
                    fontSize: 14,
                },
            },
            {
                type: 'category',
                position: 'bottom',
                offset: true,
                stacked: true,
                gridLines: {
                    offsetGridLines: true,
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    callback: (_, index) =>
                        frequencyBase + index * frequencyInterval,
                    minRotation: 90,
                    labelOffset: 0,
                    autoSkipPadding: 5,
                    fontColor: chartColors.label,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'MHz',
                    fontColor: chartColors.label,
                    fontSize: 14,
                    padding: { top: 10 },
                },
            },
        ],
    };
    options.tooltips = {
        enabled: true,
        callbacks: {
            label: (item, data) => {
                const dataset = data.datasets[item.datasetIndex];
                const value = dataset.data[item.index];
                return value in dbmValues
                    ? `${dataset.label}: ${dbmValues[value]} dbm`
                    : '';
            },
        },
    };

    return options;
};

const TransmitterChartView = () => {
    const currentChannel = useSelector(getCurrentChannel);
    const isRunning = useSelector(getIsRunning);
    const txPower = useSelector(getTxPower);

    return (
        <Bar
            data={chartDataTransmit(
                isRunning ? currentChannel : undefined,
                txPower
            )}
            options={getOptions()}
            width={600}
            height={250}
        />
    );
};

export default TransmitterChartView;
