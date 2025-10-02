import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Banner from './components/Banner';
import MenuSection from './components/MenuSection';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <MenuSection />
      <BookingForm />
    </div>
  );
}

export default App;
