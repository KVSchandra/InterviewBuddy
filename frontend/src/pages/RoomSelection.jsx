import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RoomSelection() {
  const [roomId, setRoomId] = useState('');
  const [createdRoomId, setCreatedRoomId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/rooms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: createdRoomId }),
      });
      const data = await response.json();
      if (data.success) {
        setCreatedRoomId(data.roomId);
      } else {
        setError('Failed to create room. Please try again.');
      }
    } catch (err) {
      setError('Failed to create room. Please try again.');
    }
  };

  const joinCreatedRoom = () => {
    if (createdRoomId.trim()) navigate(`/editor/${createdRoomId}`);
  };

  const joinRoom = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/rooms/exists/${roomId}`);
      const data = await response.json();
      if (data.exists) {
        navigate(`/editor/${roomId}`);
      } else {
        setError('Room does not exist.');
      }
    } catch (err) {
      setError('Failed to join room. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mb-8">
        <h1 className="text-3xl font-bold text-center mb-6">Create a Room</h1>
        <input
          className="border p-2 mb-4 rounded w-full"
          placeholder="Enter Room ID"
          value={createdRoomId}
          onChange={(e) => setCreatedRoomId(e.target.value)}
        />
        <button
          onClick={createRoom}
          className="bg-green-500 text-white px-6 py-3 mb-4 rounded hover:bg-green-600 transition w-full"
        >
          Create Room
        </button>
        {createdRoomId && (
          <>
            <p className="text-center mb-4">Room ID: {createdRoomId}</p>
            <button
              onClick={joinCreatedRoom}
              className="bg-blue-500 text-white px-6 py-3 mb-4 rounded hover:bg-blue-600 transition w-full"
            >
              Join Created Room
            </button>
          </>
        )}
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Join a Room</h1>
        <input
          className="border p-2 mb-4 rounded w-full"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          onClick={joinRoom}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition w-full"
        >
          Join Room
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default RoomSelection;