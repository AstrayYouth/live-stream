// Initialize Ably with your API key
const ably = new Ably.Realtime('17JzFw.AdOMSg:6kIAmGWjab9EDWoty6ntDd_Y2iRtdpnxhfWX0IKdCTI');

// Get a reference to an Ably channel
const channel = ably.channels.get('chat-channel');

// Get UI elements
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');

// Subscribe to the channel to listen for new messages
channel.subscribe('message', (message) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = message.data;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll
});

// Send a message when the user presses Enter
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && messageInput.value.trim() !== '') {
    // Publish the message to the channel
    channel.publish('message', messageInput.value);
    messageInput.value = ''; // Clear the input field
  }
});
