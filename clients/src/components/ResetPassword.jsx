import React, { useState } from 'react';
import { resetPassword } from './api';

const ResetPasswordButton = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleResetPassword = async () => {
        try {
            // Call the resetPassword function
            await resetPassword(email, password);
            // Reset email and password fields
            setEmail('');
            setPassword('');
            // Hide the dropdown after successful reset
            setShowDropdown(false);
            // Display a success message or perform any other action
            alert('Password reset successfully!');
        } catch (error) {
            console.error('Error resetting password:', error);
            // Handle error: display an error message or perform any other action
            alert('Failed to reset password. Please try again.');
        }
    };

    return (
        <div >
            <button id = 'loginbutton'onClick={handleToggleDropdown}>Reset Password</button>
            {showDropdown && (
                <div >
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button id = 'loginbutton'onClick={handleResetPassword}>Confirm Reset</button>
                </div>
            )}
        </div>
    );
};

export default ResetPasswordButton;
