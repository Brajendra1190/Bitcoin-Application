import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bitcoin, Home, User, MessageCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { logout, user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Support', href: '/support', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Bitcoin className="h-8 w-8 text-yellow-500" />
                <span className="text-xl font-bold text-white">BitSimple</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user?.email}</span>
              <button
                onClick={() => logout()}
                className="flex items-center space-x-1 text-gray-300 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.href
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}