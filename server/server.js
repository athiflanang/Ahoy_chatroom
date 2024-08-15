const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:5173', // URL frontend Anda
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
    },
});

const PORT = process.env.PORT || 3001;

cloudinary.config({
    cloud_name: `dkpbcqs8y`,
    api_key: `386377821675533`,
    api_secret: `1kmgQMGuTBVWJNRwGEB6FL6xAyI`,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', 
}));

app.use(cors()); 
app.use(express.json());

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Mengubah buffer menjadi base64
        const base64 = req.file.buffer.toString('base64');
        const base64url = `data:image/png;base64,${base64}`;

        // Mengunggah ke Cloudinary
        let result = await cloudinary.uploader.upload(base64url);

        res.status(200).send({
            message: 'Image uploaded successfully!',
            url: result.secure_url,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Failed to upload image.');
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinTopic', (topic) => {

        // Leave all existing rooms
        const rooms = Array.from(socket.rooms);
        console.log(rooms);

        rooms.forEach(room => {
            if (room !== socket.id) { 
                socket.leave(room);
            }
        });

        // Join the new room
        socket.join(topic);
        console.log(`User joined topic: ${topic}`);
    });

    socket.on('leaveTopic', (topic) => {
        socket.leave(topic);
        console.log(`User left topic: ${topic}`);
    });

    socket.on('chatMessage', (msg) => {
        console.log(msg.user);
        
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const timestamp = `${hours}:${minutes}`; 
        io.to(msg.topic).emit('chatMessage', { ...msg, timestamp });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});




server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
