import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.status === 404) {
        toast.error('Email not found');
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.message || 'Error checking email');
        setLoading(false);
        return;
      }

      // Simulate sending reset email (in real app, send an email)
      toast.success('Password reset link has been sent to your email!');
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => router.push('/login'), 3000);
    } catch (error) {
      toast.error('Error checking email');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-right" />
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="mx-auto h-16 w-16 bg-gray-800 rounded-full flex items-center justify-center animate-bounce">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white">Check your email</h2>
            <p className="mt-4 text-gray-200">
              We've sent a password reset link to <span className="font-semibold text-white">{email}</span>
            </p>
            <p className="mt-2 text-sm text-gray-200">
              Click the link in the email to reset your password. Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gray-800 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-200">
            Enter your email address and we'll send you a link to reset your password.
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
                  className="appearance-none rounded-md relative block w-full pl-10 px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md cordia-btn-danger disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Mail className="h-5 w-5 mr-2" />
                    Send Reset Link
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="text-center">
            <Link href="/login" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
