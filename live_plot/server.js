const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const plotly = require('plotly')({}); 

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve your HTML page with the Plotly chart
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// WebSocket server logic
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Function to generate random data
  const generateRandomData = () => {
    return Math.random() * 0.1; 
  };

  // Function to send data to the client
  const sendDataToClient = () => {
    const x = new Date();
    const y = generateRandomData();

    ws.send(JSON.stringify({ x, y }));

    // Schedule the next data send in 1 second 
    setTimeout(sendDataToClient, 1000);
  };

  // Start sending data to the client
  sendDataToClient();

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
