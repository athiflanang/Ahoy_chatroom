import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useProfile } from '../../ProfileContext';

const socket = io.connect('https://server.halofarhan.my.id/');

const ChatSkeleton = () => {
    const { topic } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [image, setImage] = useState(null);
    const [fileSelected, setFileSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    // Get profile context
    const { currentProfile, toggleProfile } = useProfile();

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

            if (imageUrl) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        user: username,
                        text: message,
                        image: 'loading',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    },
                ]);
            }

            setMessage('');
            setPreviewImage(null);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setFileSelected(true);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const cancelImageSelection = () => {
        setPreviewImage(null);
        setImage(null);
        setFileSelected(false);
    };

    const leaveRoom = () => {
        socket.emit('leaveTopic', topic);
        navigate('/');
    };

    return (
        <div className="p-4">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold mb-4">{topic.charAt(0).toUpperCase() + topic.slice(1)} Chat</h2>
                <label className="inline-flex items-center cursor-pointer mb-4">
                    <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        onChange={toggleProfile}
                    />
                    <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-300 peer-checked:bg-neutral-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 "></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-700">Profile</span>
                </label>
            </div>

            <div className="chat-box h-[75vh] overflow-y-scroll border p-2 mb-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex items-start gap-2.5 ${msg.user === username ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.user !== username && (
                            <img
                                className="w-auto h-8 rounded-full"
                                src={currentProfile}
                                alt="Profile image"
                            />
                        )}
                        <div>
                            <div
                                className={`flex items-center space-x-2 rtl:space-x-reverse pb-2 ${msg.user === username ? 'justify-end' : 'justify-start'}`}
                            >
                                <span className="text-sm font-semibold text-gray-900">
                                    {msg.user === username ? 'You' : msg.user}
                                </span>
                                <span className="text-sm font-normal text-gray-500">
                                    {msg.timestamp}
                                </span>
                            </div>

                            <div
                                className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 pt-0 border-gray-200 ${msg.user === username
                                    ? 'bg-blue-500 text-white rounded-s-xl rounded-se-xl'
                                    : 'bg-[#EFF1F4] text-gray-900 rounded-e-xl rounded-es-xl'
                                    } mb-4`}
                            >
                                <p className="text-sm font-normal py-2.5">
                                    {msg.text}
                                </p>
                                {msg.image && msg.image === 'loading' ? (
                                    <div className="text-white">Uploading image...</div>
                                ) : (
                                    msg.image && <img src={msg.image} alt="chat-image" className="max-w-xs rounded-xl mb-1" />
                                )}
                                <span className={`text-sm font-normal ${msg.user === username
                                    ? 'text-gray-300'
                                    : 'text-gray-400'
                                    } `}>
                                    Delivered
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {previewImage && (
                <div className="mt-2 relative">
                    <img src={previewImage} alt="Preview" className="max-w-xs" />
                    <button
                        onClick={cancelImageSelection}
                        className="absolute top-0 right-0 text-neutral-800 rounded-full p-1"
                    >
                        ✕
                    </button>
                </div>
            )}
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
                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-r disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </form>
            <button onClick={leaveRoom} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">
                Leave Room
            </button>
        </div>
    );
};

export default ChatSkeleton;
