// WebSocket connection to server
    const ws = new WebSocket('ws://localhost:3000'); 

    // Initialize an empty data array for the Plotly chart
    const data = [{
        x: [],
    y: [],
    mode: 'lines',
    type: 'scatter',
        }];

    const layout = {
        title: 'Live Data Streaming with Plotly',
    xaxis: {
        title: 'Time',
            },
    yaxis: {
        title: 'Value',
            },
        };

    // Create the Plotly chart
    const plotlyChart = document.getElementById('plotly-chart');
    Plotly.plot(plotlyChart, data, layout);

        // Handle incoming data from the server
        ws.addEventListener('message', (event) => {
            const {x, y} = JSON.parse(event.data);

    // Update the data and redraw the chart
    data[0].x.push(x);
    data[0].y.push(y);

    Plotly.update(plotlyChart, data);
        });
