//LightSwitch.jsx is a functional component that uses the useReducer hook to manage a light switch state.
import React, { useReducer } from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext'; // Import custom hook useTheme

// 1. Khởi tạo trạng thái ban đầu
const initialState = { isOn: false };
// 2. Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return { isOn: !state.isOn };
    case 'turnOn':
      return { isOn: true };
    case 'turnOff':
      return { isOn: false };
    default:
      return state;
  }
}

function LightSwitch() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(reducer, initialState);  

    //Sử dụng ThemeContext
    const { theme, toggleTheme } = useTheme(); //Lấy giá trị theme từ context

    //action handlers - kết hợp với theme
    const toggle = () => {
      dispatch({ type: 'toggle' });
      toggleTheme(); // Thay đổi theme khi chuyển đổi đèn
    };
    const turnOn = () => {
      dispatch({ type: 'turnOn' });
      if (theme === 'dark') toggleTheme(); // Chuyển sang light khi bật đèn
    };
    const turnOff = () => {
      dispatch({ type: 'turnOff' });
      if (theme === 'light') toggleTheme(); // Chuyển sang dark khi tắt đèn
    };
    // Style chung cho các button
    const buttonStyle = {
        margin: '5px',
        padding: '10px 20px',   
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px'
    };
  return (  
    <div style={{ 
      padding: '20px', 
      border: `1px solid ${theme === 'light' ? '#dee2e6' : '#495057'}`,
      backgroundColor: theme === 'light' ? '#ffffff' : '#343a40',
      borderRadius: '10px',
      boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.1)' : '0 2px 10px rgba(255,255,255,0.1)'
    }}>
      <h2 style={{ color: theme === 'light' ? '#212529' : '#f8f9fa' }}>Công Tắc Đèn</h2>
      <p style={{ 
        fontSize: '24px', 
        fontWeight: 'bold',
        color: theme === 'light' ? '#212529' : '#f8f9fa'
      }}>
        Đèn hiện đang: {state.isOn ? 'Bật' : 'Tắt'} | Theme: {theme === 'light' ? 'Sáng' : 'Tối'}
      </p>   
      <Button 
      onClick={toggleTheme}
      style={{
        ...buttonStyle,
        background: theme === 'light' ? '#6c757d' : '#f8f9fa',
        color: theme === 'light' ? '#ffffff' : '#000000'
      }}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </Button>
       
        <Button
        onClick={toggle}
        style={{ 
          ...buttonStyle, 
          background: theme === 'light' ? '#007bff' : '#6f42c1', 
          color: 'white' 
        }}
      >
        Chuyển Đổi
      </Button>
      <Button
        onClick={turnOn}
        style={{ 
          ...buttonStyle, 
          background: theme === 'light' ? '#28a745' : '#20c997', 
          color: 'white' 
        }}
      > 
        Bật Đèn
      </Button>
      <Button
        onClick={turnOff}
        style={{ 
          ...buttonStyle, 
          background: theme === 'light' ? '#dc3545' : '#fd7e14', 
          color: 'white' 
        }}
      >
        Tắt Đèn
        </Button>
    </div>
  );
}   
export default LightSwitch;
