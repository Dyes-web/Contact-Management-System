import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Invalid email or password');
        setLoading(false);
        return;
      }

      // Save user to localStorage
      localStorage.setItem('cordia_user', JSON.stringify(data.user));

      toast.success('Welcome back!');
      router.push('/');
    } catch (error) {
      toast.error('Error logging in');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gray-800 rounded-full flex items-center justify-center">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Welcome to Cordia</h2>
          <p className="mt-2 text-sm text-gray-200">
            Sign in to manage your contacts
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-gray-700 py-8 px-6 shadow-xl rounded-lg space-y-4 border border-gray-700">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full pl-10 px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full pl-10 px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md cordia-btn-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign in
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-200">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Create one here
              </Link>
            </p>
            <p className="text-sm text-gray-200">
              <Link href="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Forgot your password?
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
