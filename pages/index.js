import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';
import { Plus, Edit, Star, LogOut } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = JSON.parse(localStorage.getItem('cordia_user') || 'null');
    if (savedUser) {
      setUser(savedUser);
      // Fetch contacts only if user is logged in
      fetch('/api/contacts')
        .then(async (res) => {
          if (!res.ok) throw new Error(await res.text());
          return res.json();
        })
        .then(setContacts)
        .catch(() => toast.error('Failed to load contacts from MySQL'));
    } else {
      setUser(null);
    }
  }, []);

  const handleAdd = async (data) => {
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(await res.text());
      const newContact = await res.json();
      setContacts(prev => [newContact, ...prev]);
      toast.success('Contact added');
    } catch (e) {
      toast.error('Error adding contact');
    }
  };

  const handleUpdate = async (data) => {
    try {
      const res = await fetch(`/api/contacts/${editingContact.id}` , {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(await res.text());
      const updated = await res.json();
      setContacts(prev => prev.map(c => c.id === updated.id ? updated : c));
      setEditingContact(null);
      toast.success('Contact updated');
    } catch (e) {
      toast.error('Error updating contact');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) throw new Error(await res.text());
      setContacts(prev => prev.filter(c => c.id !== id));
      toast.success('Contact deleted');
    } catch (e) {
      toast.error('Error deleting contact');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cordia_user');
    setUser(null);
    toast.success('Logged out');
  };

  if (!user) {
    return (
      <Layout>
        <Toaster position="top-right" />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-2xl w-full">
            {/* Hero Section */}
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="mx-auto h-20 w-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl text-white">📇</span>
              </div>
              <h1 className="text-5xl font-extrabold text-white mb-4">Welcome to Cordia</h1>
              <p className="text-xl text-gray-200 mb-2">Manage your contacts beautifully and efficiently</p>
              <p className="text-gray-400">Organize, search, and keep all your important contacts in one place</p>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl mb-3 text-white">✨</div>
                <h3 className="text-lg font-semibold text-white mb-2">Easy Management</h3>
                <p className="text-gray-200 text-sm">Add, edit, and delete contacts with just a few clicks</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl mb-3 text-white">🔍</div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Search</h3>
                <p className="text-gray-200 text-sm">Find contacts instantly by name or email address</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl mb-3 text-white">🔒</div>
                <h3 className="text-lg font-semibold text-white mb-2">Secure</h3>
                <p className="text-gray-200 text-sm">Your contact information is safe and secure</p>
              </div>
            </div>

            {/* Authentication Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 justify-center">
              {/* Sign In Card */}
              <div className="bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className="h-12 w-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl text-white">🔐</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Already have an account?</h3>
                <p className="text-gray-200 mb-6">Sign in to access your contacts and manage them on the go.</p>
                <a href="/login" className="w-full inline-block cordia-btn-primary font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center transform hover:scale-105">
                  <span className="text-white">Sign In</span>
                </a>
              </div>

              {/* Sign Up Card */}
              <div className="bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className="h-12 w-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl text-white">✍️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Create a new account</h3>
                <p className="text-gray-200 mb-6">Start managing your contacts right away with a new account.</p>
                <a href="/register" className="w-full inline-block cordia-btn-primary font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center transform hover:scale-105">
                  <span className="text-white">Create Account</span>
                </a>
              </div>
            </div>

            {/* Forgot Password Card */}
            <div className="bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-100 text-center transform hover:scale-105 transition-all duration-300">
              <div className="h-12 w-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl text-white">🔑</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Forgot your password?</h3>
              <p className="text-gray-200 mb-6">No worries! We can help you reset your password and regain access to your account.</p>
              <a href="/forgot-password" className="inline-block cordia-btn-danger font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                <span className="text-white">Reset Password</span>
              </a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gray-700 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-gray-600 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gray-500 rounded-full opacity-20 animate-ping"></div>
        </div>

        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
            <p className="text-gray-600">Manage your contacts efficiently and beautifully</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="animate-fade-in-up animation-delay-200">
            {editingContact ? (
              <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-700 transform hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-4 flex items-center text-white">
                  <Edit className="w-6 h-6 mr-2 text-blue-400 animate-pulse" />
                  Edit Contact
                </h2>
                <ContactForm
                  initialData={editingContact}
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingContact(null)}
                />
              </div>
            ) : (
              <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-700 transform hover:scale-105 transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-4 flex items-center text-white">
                  <Plus className="w-6 h-6 mr-2 text-green-400 animate-bounce" />
                  Add New Contact
                </h2>
                <ContactForm onSubmit={handleAdd} />
              </div>
            )}
          </div>

          <div className="bg-gray-700 p-6 rounded-xl shadow-xl border border-gray-700 animate-fade-in-up animation-delay-400 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400 animate-spin-slow" />
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-gray-600 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:scale-110">
                <div className="text-3xl font-bold text-white">{contacts.length}</div>
                <div className="text-gray-300">Total Contacts</div>
              </div>
              <div className="text-center bg-gray-600 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:scale-110">
                <div className="text-3xl font-bold text-white">
                  {contacts.filter(c => c.phone).length}
                </div>
                <div className="text-gray-300">With Phone</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
            <h2 className="text-2xl font-semibold text-white">Your Contacts</h2>
            <input
              type="text"
              placeholder="Search name or email..."
              onChange={(e) => {
                const q = e.target.value.toLowerCase();
                fetch('/api/contacts')
                  .then((r) => r.json())
                  .then((rows) => {
                    setContacts(
                      rows.filter((c) =>
                        c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
                      )
                    );
                  });
              }}
              className="w-full md:w-72 rounded-lg border border-gray-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{c.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{c.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{c.phone || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        className="inline-flex items-center px-3 py-1.5 rounded-md text-blue-300 hover:text-white border border-blue-800 hover:bg-blue-600 transition-colors"
                        onClick={() => setEditingContact(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-1.5 rounded-md text-red-300 hover:text-white border border-red-800 hover:bg-red-600 transition-colors"
                        onClick={() => handleDelete(c.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
