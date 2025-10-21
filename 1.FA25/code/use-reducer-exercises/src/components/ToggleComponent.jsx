import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';

// 1. Khởi tạo trạng thái ban đầu
const initialState = { isOn: false };

// 2. Định nghĩa hàm reducer
function toggleReducer(state, action) {
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

function ToggleComponent() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(toggleReducer, initialState);

  // Action handlers
  const toggle = () => dispatch({ type: 'toggle' });
  const turnOn = () => dispatch({ type: 'turnOn' });
  const turnOff = () => dispatch({ type: 'turnOff' });

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
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Bật/Tắt Trạng Thái</h2>
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 'bold',
        color: state.isOn ? '#28a745' : '#dc3545',
        marginBottom: '20px'
      }}>
        Trạng thái: {state.isOn ? 'BẬT' : 'TẮT'}
      </div>
      
      <div style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: state.isOn ? '#28a745' : '#dc3545',
        margin: '0 auto 20px',
        transition: 'background-color 0.3s ease'
      }}></div>
      
      <Button
        onClick={toggle}
        style={{ ...buttonStyle, background: '#6c757d', color: 'white' }}
      >
        Toggle
      </Button>
      <Button
        onClick={turnOn}
        style={{ ...buttonStyle, background: '#28a745', color: 'white' }}
      >
        Bật
      </Button>
      <Button
        onClick={turnOff}
        style={{ ...buttonStyle, background: '#dc3545', color: 'white' }}
      >
        Tắt
      </Button>
    </div>
  );
}

export default ToggleComponent;
