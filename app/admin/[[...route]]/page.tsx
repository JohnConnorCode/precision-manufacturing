'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Simple local authentication check
function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user has admin token in localStorage
    const token = localStorage.getItem('tina_admin_token');
    const password = process.env.NEXT_PUBLIC_TINA_ADMIN_PASSWORD;

    if (token === password) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (password: string) => {
    const correctPassword = process.env.NEXT_PUBLIC_TINA_ADMIN_PASSWORD;
    if (password === correctPassword) {
      localStorage.setItem('tina_admin_token', password);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('tina_admin_token');
    setIsAuthenticated(false);
    router.push('/');
  };

  return { isAuthenticated, isLoading, login, logout };
}

// Login component
function LoginPage({ onLogin }: { onLogin: (password: string) => boolean }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(password)) {
      setPassword('');
      setError('');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          Tina CMS Admin
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500',
            }}>
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
              autoFocus
            />
          </div>
          {error && (
            <div style={{ color: '#d32f2f', marginBottom: '15px', fontSize: '14px' }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>
        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          color: '#666',
          fontSize: '14px',
        }}>
          Set <code>NEXT_PUBLIC_TINA_ADMIN_PASSWORD</code> env variable
        </p>
      </div>
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #ddd',
        padding: '20px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#333', fontWeight: '700' }}>
            Tina CMS Admin
          </h1>
          <p style={{ margin: '4px 0 0 0', color: '#999', fontSize: '14px' }}>
            Precision Manufacturing Content Editor
          </p>
        </div>
        <button
          onClick={onLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f5222d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 30px' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '800px'
        }}>
          <h2 style={{ marginTop: 0, color: '#333', fontSize: '18px', fontWeight: '700' }}>
            👋 Welcome to Tina CMS
          </h2>

          <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
            The visual editor interface is being configured. For now, you can:
          </p>

          <div style={{
            backgroundColor: '#f0f4ff',
            padding: '20px',
            borderRadius: '6px',
            borderLeft: '4px solid #0070f3',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#0070f3', fontSize: '16px' }}>
              Content Management
            </h3>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#666' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Services:</strong> Edit your services at <code>/content/services/*.mdx</code>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Industries:</strong> Update industries at <code>/content/industries/*.mdx</code>
              </li>
              <li>
                <strong>Auto-Deploy:</strong> Changes are automatically committed to Git and deployed by Vercel
              </li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '16px' }}>
              📝 Editing Content
            </h3>
            <p style={{ margin: '0', color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
              Content is stored as MDX (Markdown + React) files with YAML frontmatter. Each file has:
            </p>
            <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px', color: '#666', fontSize: '14px' }}>
              <li>Structured metadata (title, slug, description, etc.)</li>
              <li>Rich text body content with markdown formatting</li>
              <li>Support for images, lists, code blocks, and more</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#fffbf0',
            padding: '20px',
            borderRadius: '6px',
            borderLeft: '4px solid #fa8c16'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#fa8c16', fontSize: '16px' }}>
              🚀 Next Steps
            </h3>
            <ol style={{ margin: '0', paddingLeft: '20px', color: '#666', fontSize: '14px' }}>
              <li style={{ marginBottom: '8px' }}>
                Use your Git repository to edit content files directly, or
              </li>
              <li style={{ marginBottom: '8px' }}>
                Configure your Git credentials for automatic commits, or
              </li>
              <li>
                Deploy a dedicated visual editor UI (available via Tina Cloud)
              </li>
            </ol>
          </div>

          <p style={{
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #ddd',
            color: '#999',
            fontSize: '13px',
            margin: '30px 0 0 0'
          }}>
            You are logged in as Admin. Your session is stored locally in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { isAuthenticated, isLoading, login, logout } = useAdminAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  return <AdminDashboard onLogout={logout} />;
}
