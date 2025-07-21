'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useNotification } from '../components/Notification';
import Image from 'next/image';
import zxcvbn from 'zxcvbn';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [name, setName] = useState('');
  const { showNotification } = useNotification();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email.includes('@')) {
      showNotification('Invalid email address', 'error');
      return;
    }
    if (password.length < 6) {
      showNotification('Password must be at least 6 characters', 'error');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', { email, password, name });
      showNotification(response.data.message, 'success');
      router.push('/login');
    } catch (err: any) {
      showNotification(err.response?.data.error || 'Registration failed', 'error');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordStrength(zxcvbn(e.target.value).score);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
        {/* Logo and Header */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.webp"
                alt="VibeVault Logo"
                fill
                className="rounded-full object-cover animate-pulse-slow"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm bg-purple-600/80 rounded-full">
                VV
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              VibeVault
            </h1>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Create Your Account</h2>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
            />
            <div className="mt-2 text-sm text-gray-300">
              Password Strength: {['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][passwordStrength]}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white p-3 rounded-lg font-semibold hover:bg-gradient-to-l hover:from-purple-500 hover:to-purple-300 transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-300">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-purple-400 hover:text-purple-300 transition duration-200"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}