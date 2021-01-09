
const socket = io.connect('http://localhost:3000', {
    transports: ['websocket']
});

let firstrun = true;

async function _request(url, body = null) {
    const headers = {
        "accept": "application/json",
        "authorization": `Bearer ${localStorage._at}`,
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-fingerprint": `${localStorage._fp}`
    }
    const method = body == null ? 'GET' : 'POST';
    const resp = await fetch(url, {headers,body,method,"mode": "cors","credentials": "include"})
    return await resp.json();
}

const newConnection = (ws) => {
    console.log('id:', ws.id);
    changeSeed();

    ws.emit('checkSeed', JSON.stringify(data))
}

const newMessage = (ws, message) => {
    console.log('response:', message);
    ws.send('data', message)
}


function changeSeed() {
    const body = firstrun ? function(){firstrun = false; return null}() : `{"clientSeed":"0abc123easy"}`; 

    return _request('https://duckdice.io/api/randomize', body)
        .then(({ current: { serverSeedHash } }) => {
            bet().then(() => newMessage.call(null, socket, serverSeedHash));
        })
        .catch(console.error);
}


socket.on('connect', newConnection.bind(null, socket));

socket.on('response', newMessage.bind(null, socket));