import React, { Suspense } from "react";
import './styles/tailwind.css';
import Navbar from './components/NavBar/Navbar'
import Construction from './views/construction'
import Footer from './components/Footer/Footer'
import UserInfo from './data/UserInfo'
import Loader from './components/Loader/Loading'
const App = () => {

  return (
    <div className='app'>     
      <Suspense fallback={<Loader />}>
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='main'>
          <Construction />
          <UserInfo/>
        </div>
        <div className='footer'>
          <Footer/>
        </div>
      </Suspense>       
  </div>
  );
}

export default App;
