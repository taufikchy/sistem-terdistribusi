import WebSocket from 'ws'; // Mengimpor modul ws

// Menghubungkan WebSocket ke server
const ws = new WebSocket('ws://localhost:8080');

// Saat WebSocket terhubung
ws.onopen = () => {
  console.log('Connected to WebSocket server');
  sendMessage('Hello from the client!'); // Mengirim pesan contoh
};

// Saat menerima pesan dari server
ws.onmessage = (event) => {
  try {
    const receivedData = JSON.parse(event.data);
    console.log('Received:', receivedData.message); // Menampilkan pesan yang diterima
  } catch (error) {
    console.error('Error parsing message:', error);
  }
};

// Saat terjadi error pada WebSocket
ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Saat WebSocket ditutup
ws.onclose = () => {
  console.log('Disconnected from WebSocket server');
};

// Fungsi untuk mengirim pesan
function sendMessage(message) {
  if (ws.readyState === WebSocket.OPEN) {
    const messageObj = { message }; // Membuat objek pesan
    ws.send(JSON.stringify(messageObj)); // Mengirim pesan sebagai JSON
  } else {
    console.error('WebSocket is not open, unable to send message');
  }
}
