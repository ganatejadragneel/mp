import React, { useState, FormEvent } from 'react';

import axios from 'axios';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscribeModal = ({ isOpen, onClose }: SubscribeModalProps) => {
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('/api/subscribe', { userType, email });
      setIsSubscribed(true);
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {isSubscribed ? (
          <div className="modal-success">
            <h2>Congrats! You have been subscribed to Mindful Performance!</h2>
            <button className="modal-button" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Subscribe to Mindful Performance</h2>
            <div className="modal-form-group">
              <label htmlFor="userType">Are you a:</label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="">Select user type</option>
                <option value="athlete">Student Athlete</option>
                <option value="coach">Mindful Coach</option>
              </select>
            </div>
            {userType && (
              <div className="modal-form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            <button
              className="modal-button bg-blue-500 hover:bg-blue-600"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubscribeModal;
