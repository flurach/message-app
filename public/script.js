// Constants
let socket = io();
let root = document.getElementById('root');
let messages = document.getElementById('messages');
let message_box = document.getElementById('message-box');

// State
let last_sender = undefined;

// Reviece messages
socket.on('message', data => {
    messages.innerHTML += `
        <div class="${data.sender == localStorage.ME ? 'my' : 'someones'} message ${data.sender == last_sender ? 'continue' : ''}">
            <div class="inner">
                <div class="decor"></div>
                <p class="sender">${data.sender}</p>
                <p class="content">
                    ${data.content}
                    <p class="time">${data.time}</p>
                </p>
            </div>
        </div>
    `;

    if (messages.scrollTop > messages.scrollHeight - messages.clientHeight - 100)
        messages.scrollTop = messages.scrollHeight;

    last_sender = data.sender;
})

// Send messages
let send_message = document.getElementById('send-message');
send_message.onclick = function () {
    let message_value = message_box.value.trim();
    let date = new Date();

    if (message_value != '')
        socket.emit('message', {
            'sender': localStorage.ME,
            'content': message_value,
            'time': `${date.getHours()}:${date.getMinutes()}`
        });

    message_box.value = '';
};
addEventListener('keyup', event =>
    event.keyCode == 13 ? send_message.onclick() : {}
);

// online counter
socket.on('peopleCount', count => {
	const counter = document.querySelector('#peopleCounter')
	counter.innerHTML = `Çevrimiçi (${count - 1})`

	if (count - 1 === 0)
		counter.classList.remove('active')
	else
		counter.classList.add('active')
});

// Login
let login_page = document.getElementById('login-page');
let username_input = document.getElementById('username');
let set_username_btn = document.getElementById('set-username');

set_username_btn.onclick = function () {
    if (username_input.value.trim() != '') {
        localStorage.ME = username_input.value;
        username_input.value = '';

        login_page.style.left = '200%';
        root.style.filter = 'blur(0px)';
    }
};

// Initial
window.onload = function () {

    // Check login
    if (localStorage.ME != undefined) {
        login_page.style.display = 'none';
        root.style.filter = 'blur(0px)';
    }

};