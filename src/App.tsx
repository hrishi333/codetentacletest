import React, {ReactElement} from 'react';
import './App.css';
import { BrowserRouter as Router,Routes, Route ,Navigate} from 'react-router-dom';
import Signup from '../src/view/auth/Signup';
import Login from '../src/view/auth/Login';
import Home from '../src/view/home/Home';
import PageNotFound from "../src/components/PageNotFound";
import { Toaster } from 'react-hot-toast';
import SuccessPage from "./view/success/SuccessPage";


function App() {




    return (
      <div className="bg-[#e5e7eb] h-[100vh]">
          <Toaster/>
          <Router>
              <Routes>
                  <Route path="/signup" Component={Signup} />
                  <Route path="/login" Component={Login} />
                  <Route path="/page" Component={SuccessPage}/>
                  <Route  path="/" Component={Home} />
                  <Route path={"*"} element={<PageNotFound />} />
              </Routes>

          </Router>
      </div>

  );
}

export default App;
