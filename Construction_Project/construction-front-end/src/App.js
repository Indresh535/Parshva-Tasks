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
        <div>
          <div className='fixed bottom-0 left-0 right-0 bg-slate-100'>
            <div className="flex justify-center items-center py-4 font-semibold">
              © 2023  All Rights Reserved By Indresh
            </div>
          </div>
        </div>
      </Suspense>       
  </div>
  );
}

export default App;
