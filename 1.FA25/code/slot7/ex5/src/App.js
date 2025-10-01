import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import Breadcrumbs from './components/Breadcrumbs';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Breadcrumbs />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
