/**
 * Created by joelmarquez on 4/19/17.
 */
'use strict';

var d3charts = function(){
    var chart1;
    var chart2;
    var chart3;
    this.draw = function (state, data) {
        chart1 = c3.generate({
            bindto: '#chart1',
            data: {
                x: 'x',
                columns: [
                    ['x', '2017-01-14', '2017-02-15', '2017-03-7', '2017-01-11', '2017-02-10', '2017-03-19'],
                    ['data1', 5, 20, 46, 60, 75, 100]
                ],
                // type: 'spline',
                colors: {
                    data1: '#9b0000'
                },
                names: {
                    data1: 'Hate (%)'
                }
            },
            axis: {
                x: {
                    label: { // ADD
                        text: 'Date',
                        position: 'outer-middle'
                    },
                    type: 'timeseries',
                    tick: {
                        values: ['2017-01-01', '2017-02-01', '2017-03-01']
                        // format: '%m-%d'
                    }
                },
                y: {
                    label: { // ADD
                        text: 'Hate (%)',
                        position: 'outer-middle'
                    }
                }
            },
            title: {
                text: state? state + ' hate over time': 'Total hate over time'
            }
        });

        chart2 = c3.generate({
            bindto: '#chart2',
            data: {
                columns: [
                    ['data1', 30],
                    ['data2', 70]
                ],
                colors: {
                    data1: '#9b0000',
                    data2: '#1ab2ff'
                },
                names: {
                    data1: 'Hate Tweets',
                    data2: 'Non-Hate Tweets'
                },
                type : 'donut'
            },
            donut: {
                title: state || "Total"
            }
        });
        chart3 = c3.generate({
            bindto: '#chart3',
            data: {
                columns: [
                    ['data1', 30],
                    ['data2', 50]
                ],
                type: 'bar',
                colors: {
                    data1: '#9975b9',
                    data2: '#9b0000'
                },
                names: {
                    data1: 'Average Hate Tweets',
                    data2: state + ' Hate Tweets'
                },
                axis: {
                    y: {
                        label: { // ADD
                            text: 'Hate (%)',
                            position: 'outer-middle'
                        }
                    },
                    x: {
                        label: { // ADD
                            text: 'Date',
                            position: 'outer-middle'
                        }
                    }
                }
            },
            title: {
                text: state? state + ' vs Average': 'Average',
            },
            bar: {
                width: {
                    ratio: 0.25 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
            }

        });
    };
};
