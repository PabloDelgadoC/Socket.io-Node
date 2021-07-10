const socket = io.connect('http://10.1.10.1:6677',{'forceNew':true});

socket.on('messages', (data) => {
    console.log(data);
    render(data);
});

function render(data) {
    let html = data.map(function(messages, i){
        return (`
            <div class='message'>
                <strong>${message.nickmane}</strong> dice: 
                <p>${message.text}</p>
            </div>
        `).join(' ');
    });

    let msg = document.getElementById('messages');
    msg.innerHTML = html;
    msg.scrollTop = msg.scrollHeight;
};

function addMessage(event) {
    let message = {
        nickname: document.getElementById('nickname').nodeValue,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    
    return false;
};