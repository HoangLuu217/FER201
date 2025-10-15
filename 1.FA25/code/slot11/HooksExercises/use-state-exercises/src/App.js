import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import CounterComponent from "./components/CounterComponent";
import LightSwitch from "./components/LightSwitch";
import LoginForm from "./components/LoginForm";
import LoginForm2 from "./components/LoginForm2";
import SearchItem from "./components/SearchItem";
import AccountsSearch from "./components/AccountsSearch";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">useState Hook Exercises</h1>
      
      <div className="mb-4">
        <h2 className="text-primary border-bottom pb-2">Exercise 1: Bộ đếm đa năng</h2>
        <CounterComponent />
      </div>
      
      <div className="mb-4">
        <h2 className="text-primary border-bottom pb-2">Exercise 2: Bật/tắt trạng thái</h2>
        <LightSwitch />
      </div>
      
      <div className="mb-4">
        <h2 className="text-primary border-bottom pb-2">Exercise 3: Form đăng nhập</h2>
        <LoginForm />
      </div>
      
      <div className="mb-4">
        <h2 className="text-primary border-bottom pb-2">Exercise 4: Quản lý nhiều trường input bằng object state</h2>
        <LoginForm2 />
      </div>
      
      <div className="mb-4">
        <h2 className="text-primary border-bottom pb-2">Exercise 5: Tìm kiếm với state chuỗi</h2>
        <SearchItem />
      </div>
      
      <div className="mb-4">
        <h2 className="text-primary border-bottom pb-2">Exercise 6: Tìm kiếm account by username</h2>
        <AccountsSearch />
      </div>
      
      <div className="mb-4">
        <h2 className="text-primary border-bottom pb-2">Exercise 7: Form đăng ký tài khoản</h2>
        <RegisterForm />
      </div>
    </Container>
  );
}

export default App;
