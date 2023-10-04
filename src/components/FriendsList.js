import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function FriendsList() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            Axios.get('http://localhost:9000/api/friends', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    setFriends(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching friends:', error);
                })
        }
    }, []);

    return (
        <div className='friends-list'>
            <h2>Friends List</h2>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.id}>
                        <strong>Name:</strong> {friend.name}
                        <br />
                        <strong>Age:</strong> {friend.age}
                        <br />
                        <strong>Email:</strong> {friend.email}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FriendsList;