const createWebSocket = (token, onMessageCallback) => {
    const apiUrl = `wss://undhny2537.execute-api.us-east-1.amazonaws.com/production/?token=${token}`;
    const ws = new WebSocket(apiUrl);

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Message from server:', data);

        onMessageCallback(data)
    };

    return ws;
};

export default createWebSocket;