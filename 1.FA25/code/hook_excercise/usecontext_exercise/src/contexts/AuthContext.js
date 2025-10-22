//1. Khởi tạo auth context
import React, { createContext, useState } from "react";

//1. Khởi tạo context với giá trị mặc định
export const AuthContext = createContext({
    user: null, //giá trị mặc định là null (chưa đăng nhập)
    login: () => {}, //hàm đăng nhập mặc định là hàm rỗng
    logout: () => {} //hàm đăng xuất mặc định là hàm rỗng
});

//2. Tạo provider để bao bọc ứng dụng
export const AuthProvider = ({ children }) => {
 // State quản lý user hiện tại 
    const [user, setUser] = useState(null);

  // Hàm đăng nhập
  const login = (userData) => {
    setUser(userData);
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
  };

//Tạo object context chứa giá trị và hàm
  const contextValue = {
    user, //trạng thái user hiện tại
    login, //hàm đăng nhập
    logout //hàm đăng xuất
  };

//3.  Cung cấp giá trị context cho các component con, truyền contextValue vào prop value
  return (
    <AuthContext.Provider value={contextValue}>
      {children} {/* Các component con sẽ có thể truy cập context này */}
    </AuthContext.Provider>
  );
};

//4.Custom hook để sử dụng context dễ dàng hơn
export const useAuth = () => {
  const context = React.useContext(AuthContext); //Lấy giá trị context hiện tại
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
