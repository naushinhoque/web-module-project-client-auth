import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('Login Form Data:', formData);

        //perform login logic here ex: send a POST request w/ formData
        try {
            const response = await Axios.post('http://localhost:9000/api/login', {
                username: "Bloom",
                password: "Tech"
            });

            const token = response.data.token;

            localStorage.setItem('token', token);
            history.pushState('./friends');
        } catch (error) {
            console.error('Login failed', error)
        }
        navigate('./friends')
        //Redirect to the friendslist pg after successful login
        //you can use a history.push('/friends) here.
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}> 
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                        <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;