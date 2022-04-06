const host = location.origin.replace(/^http/, "ws");

const socket = new WebSocket(host);
const rand = Math.random() * 10000;
const clientName = "Anonymous " + Math.floor(rand).toString();
const imgNode = document.createElement("img");

function sendMessage(message, type = null) {
  if (message.trim().length === 0) {
    return;
  }
  if (type === null) {
    type = "message";
  }
  var msg = {
    id: rand,
    type: type,
    message: message,
    owner: clientName,
    timestamp: Date.now(),
  };
  socket.send(JSON.stringify(msg));
}

socket.onopen = (event) => {
  var node = document.createElement("div");
  imgNode.src = "https://i.pravatar.cc/250";
  imgNode.classList.add("avatar");
  node.innerText =
    "Hi! " + clientName + ". You are connected to MassiveQ public chat room";
  header_section.appendChild(node);
  sendMessage(clientName, "initial");
};

socket.onmessage = (message) => {
  var node = document.createElement("div");
  data = JSON.parse(message.data);
  send_time = getCurrentTime(data.timestamp);

  if (data.type === "internal") {
    node.innerText = data.message + " left the channel";
    node.classList.add("notification");
  } else if (data.type === "initial") {
    if (data.id === rand) {
      node.innerText = "You joined the public channel";
    } else {
      node.innerText = data.message + " joined the public channel";
    }
    node.classList.add("notification");
  } else {
    node.innerText = data.owner + `: ` + data.message;
    if (data.id === rand) {
      node.classList.add("self-message");
    } else {
      node.classList.add("message");
    }
  }

  node.title = `Sent at ${send_time}`;
  message_section.appendChild(node);
  node.scrollIntoView();
};

socket.onclose = () => {
  var msg = {
    id: rand,
    type: "internal",
    data: clientName,
    owner: clientName,
    timestamp: Date.now(),
  };
  socket.send(msg);
};
