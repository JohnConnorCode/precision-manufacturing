'use client';

import React, { useEffect } from 'react';

/**
 * Admin Page - Routes to Tina Cloud editor or setup instructions
 *
 * This page integrates with Tina Cloud for professional content editing.
 * If Tina Cloud is not configured, it shows setup instructions.
 */

function TinaCloudSetupGuide() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        maxWidth: '700px',
        padding: '40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            margin: '0 0 10px 0',
            fontSize: '32px',
            color: '#333',
            fontWeight: '700'
          }}>
            🎨 Tina CMS Editor
          </h1>
          <p style={{
            margin: '0',
            color: '#666',
            fontSize: '16px'
          }}>
            Professional Visual Editor for Content
          </p>
        </div>

        <div style={{
          backgroundColor: '#fff3cd',
          padding: '20px',
          borderRadius: '8px',
          borderLeft: '4px solid #ffc107',
          marginBottom: '30px'
        }}>
          <h2 style={{
            margin: '0 0 10px 0',
            color: '#856404',
            fontSize: '18px'
          }}>
            ⚙️ Setup Required
          </h2>
          <p style={{
            margin: '0',
            color: '#856404',
            lineHeight: '1.6'
          }}>
            Tina Cloud is not yet configured. To enable the visual editor, you need to:
          </p>
        </div>

        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '25px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h3 style={{
            margin: '0 0 15px 0',
            color: '#333',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            📝 Quick Setup (5-10 minutes)
          </h3>

          <ol style={{
            margin: '0',
            paddingLeft: '20px',
            lineHeight: '1.8',
            color: '#666'
          }}>
            <li style={{ marginBottom: '12px' }}>
              <strong>Sign up for Tina Cloud</strong><br/>
              Visit: <code style={{ backgroundColor: '#e8e8e8', padding: '2px 6px', borderRadius: '3px' }}>https://app.tina.io/register</code>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Create a new project</strong><br/>
              Connect to <code style={{ backgroundColor: '#e8e8e8', padding: '2px 6px', borderRadius: '3px' }}>iismet/precision-manufacturing</code> GitHub repo
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Get API credentials</strong><br/>
              Copy <code style={{ backgroundColor: '#e8e8e8', padding: '2px 6px', borderRadius: '3px' }}>TINA_CLIENT_ID</code> and <code style={{ backgroundColor: '#e8e8e8', padding: '2px 6px', borderRadius: '3px' }}>TINA_TOKEN</code>
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Add to environment variables</strong><br/>
              Update <code style={{ backgroundColor: '#e8e8e8', padding: '2px 6px', borderRadius: '3px' }}>.env.local</code> with credentials
            </li>
            <li>
              <strong>Redeploy</strong><br/>
              Push changes to GitHub, Vercel auto-deploys, refresh this page
            </li>
          </ol>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          marginBottom: '30px'
        }}>
          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '15px',
            borderRadius: '8px',
            borderLeft: '3px solid #2196f3'
          }}>
            <p style={{ margin: '0', fontSize: '13px', color: '#1565c0' }}>
              <strong>📚 Detailed Guide</strong><br/>
              See <code style={{ backgroundColor: 'rgba(0,0,0,0.1)', padding: '2px 4px', borderRadius: '2px' }}>TINA_CLOUD_SETUP.md</code> in your repository
            </p>
          </div>
          <div style={{
            backgroundColor: '#f3e5f5',
            padding: '15px',
            borderRadius: '8px',
            borderLeft: '3px solid #9c27b0'
          }}>
            <p style={{ margin: '0', fontSize: '13px', color: '#6a1b9a' }}>
              <strong>💰 Pricing</strong><br/>
              Free tier available ($0), Team plan $29/mo
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '30px',
          fontSize: '13px',
          color: '#666',
          lineHeight: '1.6'
        }}>
          <p style={{ margin: '0 0 10px 0' }}>
            <strong>What You Get with Tina Cloud:</strong>
          </p>
          <ul style={{ margin: '0', paddingLeft: '18px' }}>
            <li>🎨 Professional visual editor (drag-and-drop, WYSIWYG)</li>
            <li>👥 User management (add team members)</li>
            <li>🔐 Secure OAuth authentication</li>
            <li>📁 Git integration (auto-commits)</li>
            <li>🖼️ Image management (upload and optimize)</li>
            <li>📊 Real-time collaboration (multiple editors)</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: '#e8f5e9',
          padding: '20px',
          borderRadius: '8px',
          borderLeft: '4px solid #4caf50'
        }}>
          <p style={{ margin: '0', color: '#2e7d32', fontSize: '13px', lineHeight: '1.6' }}>
            <strong>✅ After Setup:</strong> Refresh this page, and the visual editor will load automatically. Your team can then log in with their Tina Cloud credentials and start editing content!
          </p>
        </div>

        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #ddd',
          textAlign: 'center',
          fontSize: '12px',
          color: '#999'
        }}>
          <p style={{ margin: '0' }}>
            Questions? Visit the Tina documentation at <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '3px' }}>https://tina.io/docs/</code>
          </p>
        </div>
      </div>
    </div>
  );
}

function TinaCloudEditor() {
  // This component loads the Tina Cloud editor
  // Tina Cloud serves the editor at /admin route automatically
  // The page needs to be accessible at /admin for Tina to handle it

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#333',
          marginBottom: '10px'
        }}>
          Loading Tina CMS Editor...
        </h2>
        <p style={{
          color: '#666',
          fontSize: '14px'
        }}>
          If the editor doesn't load automatically, <a href="https://app.tina.io" style={{ color: '#0070f3', textDecoration: 'none' }}>click here to access Tina Cloud directly</a>
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const tinaClientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
  const tinaIsLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

  // Tina Cloud is enabled if we have credentials and not in local mode
  const tinaCloudEnabled = tinaClientId && !tinaIsLocal;

  if (!tinaCloudEnabled) {
    return <TinaCloudSetupGuide />;
  }

  // Tina Cloud is configured - editor loads here
  // Tina Cloud's backend handles the actual editor UI
  return <TinaCloudEditor />;
}
