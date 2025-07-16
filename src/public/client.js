const socket = io();

const messageInput = document.getElementById('messageInput');
const messageForm = document.getElementById('messageForm');
const messagesList = document.getElementById('messagesList');

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value;
    if (message) {
        socket.emit('chat message', message);
        messageInput.value = '';
    }
});

socket.on('chat message', (message) => {
    const listItem = document.createElement('li');
    listItem.textContent = message;
    messagesList.appendChild(listItem);
});