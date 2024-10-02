import { WebSocketServer } from 'ws'; // Mengimpor modul ws

// Membuat server WebSocket di port 8080
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Kirim pesan sambutan ke client saat terhubung
  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

  // Menerima pesan dari client
  ws.on('message', (message) => {
    console.log('Received:', message.toString());

      

    // Mengonversi pesan ke objek JSON
    const receivedMessage = JSON.parse(message);

    // Broadcast pesan ke semua client yang terhubung, kecuali pengirimnya sendiri
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === client.OPEN) {
        // Mengirim kembali pesan ke semua klien kecuali pengirim
        client.send(JSON.stringify(receivedMessage));
      }
    });
  });

  // Ketika client terputus
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Menampilkan pesan di konsol bahwa server sudah berjalan
console.log('WebSocket server started on ws://localhost:8080');
