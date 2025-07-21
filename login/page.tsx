'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useNotification } from '../components/Notification';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showNotification } = useNotification();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      showNotification(result.error, 'error');
    } else {
      router.push('/');
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/' });
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
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Sign In</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
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
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white p-3 rounded-lg font-semibold hover:bg-gradient-to-l hover:from-purple-500 hover:to-purple-300 transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Google Sign-In Button */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white p-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
          >
            <Image
              src="https://www.google.com/favicon.ico"
              alt="Google Icon"
              width={24}
              height={24}
              className="rounded-full"
            />
            Sign in with Google
          </button>
        </div>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-300">
          Don't have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className="text-purple-400 hover:text-purple-300 transition duration-200"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}