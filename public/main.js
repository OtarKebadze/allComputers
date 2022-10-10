const socket = io();

let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  let email = document.querySelector('#userMail').innerHTML
  let message =  document.querySelector('#message').value
  const author = {
    email,
    type:'User',
    date: new Date(),
    message
  }
  socket.emit("new_message", author);
  return false;
});

const createTags = (message) => {
  let html = `
  <section class="chatMessage">
  <p>||${message.type}||=>${message.email}</p>:
  <p>${message.message}</p>
  </section>
  `;
  return html;
};

const addMessages = (messages) => {
  const finalMessage = messages
    .map((message) => createTags(message))
    .join(" ");
  document.getElementById("messages").innerHTML = finalMessage;
};

socket.on("messages", (messages) => addMessages(messages));