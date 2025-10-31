import React, { useState } from 'react';
import axiosInstance from '../utils/axios.util';

const WaitlistForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [receiveUpdates, setReceiveUpdates] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please enter both your name and email.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const { data: response } = await axiosInstance.post('/waitlist', {
        name,
        email,
        receiveUpdates,
      });
      setSubmitted(response.success);
    } catch (err) {
      setError(`Failed to join waitlist. Please try again. ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="bg-white max-w-2xl mx-auto rounded-lg shadow-lg border border-gray-300 my-20 px-8 py-16 text-center"
    >
      <h3 className="text-3xl font-bold text-blue-700 mb-6">
        Get Early Access - Join Our Wait-List
      </h3>
      <p className="mb-8 text-gray-700 max-w-prose mx-auto">
        Sign up now to secure your spot in our upcoming courses and receive
        exclusive updates, discounts, and free resources.
      </p>
      {submitted && (
        <p className="mb-6 text-green-600 font-semibold">
          Thank you for joining the wait-list! We will notify you by email.
        </p>
      )}
      {error && (
        <p className="mb-6 text-red-600 font-semibold" role="alert">
          {error}
        </p>
      )}
      <form
        id="waitlist-form"
        className={
          'flex flex-col w-full items-center' + (submitted ? ' hidden' : '')
        }
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex px-4 flex-col gap-5 mb-5 w-full">
          <input
            id="waitlist-name"
            type="text"
            required
            placeholder="Enter your full name"
            aria-label="Full name for wait-list"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full sm:w-auto px-5 py-3 border border-gray-400 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            id="waitlist-email"
            type="email"
            required
            placeholder="Enter your email address"
            aria-label="Email address to join wait-list"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto px-5 py-3 border border-gray-400 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div className="flex gap-3 mb-8">
            <input
              type="checkbox"
              checked={receiveUpdates}
              onChange={(e) => setReceiveUpdates(e.target.checked)}
              id="receive-updates"
              className="w-5 h-5 rounded border-gray-400 focus:ring-2 focus:ring-blue-600"
            />
            <label
              htmlFor="receive-updates"
              className="text-gray-700 font-medium select-none"
            >
              Receive Weekly Updates
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-bold text-white transition ${
            isSubmitting
              ? 'bg-blue-500 cursor-not-allowed'
              : 'bg-cyan-600 hover:bg-blue-700'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
        </button>
      </form>
    </section>
  );
};

export default WaitlistForm;
