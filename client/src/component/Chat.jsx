import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const socket = io.connect('http://localhost:3001');

const Chat = () => {
    const { topic } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [image, setImage] = useState(null);
    const [fileSelected, setFileSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!username) {
            navigate('/login');
            return;
        }

        setMessages([]);
        socket.emit('joinTopic', topic);
        socket.on('chatMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.emit('leaveTopic', topic);
            socket.off('chatMessage');
        };
    }, [topic, username, navigate]);

    const sendMessage = async (e) => {
        e.preventDefault();

        let imageUrl = '';

        if (image) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('image', image);

            try {
                const res = await axios.post('http://localhost:3001/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                imageUrl = res.data.url;
            } catch (err) {
                console.error('Failed to upload image:', err);
                setIsLoading(false);
                return;
            }

            setImage(null);
            setFileSelected(false);
            setIsLoading(false);
        }

        if (message || imageUrl) {
            const msg = { topic, text: message, image: imageUrl, user: username };
            socket.emit('chatMessage', msg);

            // Menambahkan placeholder sementara
            if (imageUrl) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        user: username,
                        text: message,
                        image: 'loading',
                    },
                ]);
            }

            setMessage('');
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setFileSelected(true);
    };

    const leaveRoom = () => {
        socket.emit('leaveTopic', topic);
        navigate('/topics');
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{topic.charAt(0).toUpperCase() + topic.slice(1)} Chat</h2>
            <div className="chat-box h-64 overflow-y-scroll border p-2 mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <div className="font-bold">{msg.user}</div>
                        <div>{msg.text}</div>
                        {msg.image && msg.image === 'loading' ? (
                            <div className="text-blue-500">Uploading image...</div>
                        ) : (
                            msg.image && <img src={msg.image} alt="chat-image" className="mt-2 max-w-xs" />
                        )}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="flex items-center">
                <label htmlFor="image-upload" className="cursor-pointer mr-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={`w-6 h-6 ${fileSelected ? 'text-blue-500' : 'text-gray-700'}`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 6l3 1m0 0l1-3h8l1 3 3 1v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7l3-1zm3 5a3 3 0 116 0 3 3 0 01-6 0z"
                        />
                    </svg>
                    <input
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />
                </label>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                    className="flex-grow p-2 border rounded-l"
                    disabled={isLoading}
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-r" disabled={isLoading}>
                    Send
                </button>
            </form>
            <button onClick={leaveRoom} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">
                Leave Room
            </button>
        </div>
    );
};

export default Chat;
