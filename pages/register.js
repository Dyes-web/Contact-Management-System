import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Error creating account');
        setLoading(false);
        return;
      }

      localStorage.setItem('cordia_user', JSON.stringify(data.user));

      toast.success('Account created successfully!');
      router.push('/');
    } catch (error) {
      toast.error('Error creating account');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gray-800 rounded-full flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Join Cordia</h2>
          <p className="mt-2 text-sm text-gray-200">
            Create your account to get started
          </p>
        </div>

        {/* FORM */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-gray-700 py-8 px-6 shadow-xl rounded-lg space-y-4 border border-gray-700">

            {/* NAME */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  required
                  className="appearance-none rounded-md w-full pl-10 px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-transparent focus:ring-2 focus:ring-green-400"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  className="appearance-none rounded-md w-full pl-10 px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-transparent focus:ring-2 focus:ring-green-400"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  required
                  className="appearance-none rounded-md w-full pl-10 px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-transparent focus:ring-2 focus:ring-green-400"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-md w-full pl-10 px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-transparent focus:ring-2 focus:ring-green-400"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md cordia-btn-primary disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Create Account
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-200">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:text-blue-300">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
