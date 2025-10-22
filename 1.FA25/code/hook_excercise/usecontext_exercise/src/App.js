//áp dụng ThemeProvider và AuthProvider để bao bọc toàn bộ ứng dụng
import React from 'react';
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LightSwitch from "./components/LightSwitch";
import CounterComponent from "./components/CounterComponent";
import LoginForm from "./components/LoginForm";
import 'bootstrap/dist/css/bootstrap.min.css';

// Component con để sử dụng theme và auth
function AppContent() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  
  // Style động dựa trên theme
  const appStyle = {
    minHeight: '100vh',
    transition: 'all 0.3s ease',
    backgroundColor: theme === 'light' ? '#f8f9fa' : '#212529',
    color: theme === 'light' ? '#212529' : '#f8f9fa',
    padding: '20px'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: theme === 'light' ? '#ffffff' : '#343a40',
    borderRadius: '10px',
    boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.1)' : '0 2px 10px rgba(255,255,255,0.1)',
    border: theme === 'light' ? '1px solid #dee2e6' : '1px solid #495057'
  };

  return (
    <div style={appStyle}>
      <div style={headerStyle}>
        <h1 style={{ 
          color: theme === 'light' ? '#007bff' : '#6f42c1',
          marginBottom: '20px'
        }}>
          🚀 React useContext Demo
        </h1>
        
        {/* User Info Section */}
        {user ? (
          <div style={{
            backgroundColor: theme === 'light' ? '#e9ecef' : '#495057',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: `1px solid ${theme === 'light' ? '#dee2e6' : '#6c757d'}`
          }}>
            <h3 style={{ 
              color: theme === 'light' ? '#28a745' : '#20c997',
              marginBottom: '10px'
            }}>
              👤 Thông tin người dùng
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '10px',
              fontSize: '16px'
            }}>
              <div>
                <strong style={{ color: theme === 'light' ? '#495057' : '#adb5bd' }}>Username:</strong>
                <span style={{ color: theme === 'light' ? '#212529' : '#f8f9fa', marginLeft: '8px' }}>
                  {user.username}
                </span>
              </div>
              <div>
                <strong style={{ color: theme === 'light' ? '#495057' : '#adb5bd' }}>Email:</strong>
                <span style={{ color: theme === 'light' ? '#212529' : '#f8f9fa', marginLeft: '8px' }}>
                  {user.email}
                </span>
              </div>
              <div>
                <strong style={{ color: theme === 'light' ? '#495057' : '#adb5bd' }}>Role:</strong>
                <span style={{ 
                  color: user.role === 'admin' ? '#dc3545' : '#007bff',
                  marginLeft: '8px',
                  fontWeight: 'bold'
                }}>
                  {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                </span>
              </div>
              <div>
                <strong style={{ color: theme === 'light' ? '#495057' : '#adb5bd' }}>Status:</strong>
                <span style={{ 
                  color: user.status === 'active' ? '#28a745' : '#dc3545',
                  marginLeft: '8px',
                  fontWeight: 'bold'
                }}>
                  {user.status === 'active' ? '✅ Active' : '❌ Locked'}
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              style={{
                marginTop: '15px',
                padding: '8px 16px',
                backgroundColor: theme === 'light' ? '#dc3545' : '#fd7e14',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              🚪 Đăng xuất
            </button>
          </div>
        ) : (
          <div style={{
            backgroundColor: theme === 'light' ? '#fff3cd' : '#664d03',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: `1px solid ${theme === 'light' ? '#ffeaa7' : '#ffc107'}`
          }}>
            <p style={{ 
              color: theme === 'light' ? '#856404' : '#ffc107',
              margin: 0,
              fontSize: '16px'
            }}>
              🔒 Chưa đăng nhập - Vui lòng đăng nhập để xem thông tin
            </p>
          </div>
        )}
        
        <p style={{ 
          fontSize: '18px',
          color: theme === 'light' ? '#6c757d' : '#adb5bd',
          margin: 0
        }}>
          Theme hiện tại: <strong>{theme === 'light' ? 'Sáng ☀️' : 'Tối 🌙'}</strong>
        </p>
      </div>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <LoginForm />
        <CounterComponent />
        <LightSwitch />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
