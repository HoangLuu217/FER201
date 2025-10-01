import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Banner from './components/banner';
import Navbar from './components/navbar';
import GridContainer from './components/GridContainer';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <div>
      <Banner />
      <Navbar />
      <GridContainer />
      <Footer />
    </div>
  );

}

export default App;
