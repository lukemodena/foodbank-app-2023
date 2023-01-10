import './App.css';
import React, { Fragment } from 'react';

import {Home} from './Home';
import Navigation from './Navigation';
import NewLogin from './Components/Accounts/NewLogin';
import DonorPageEdit from './Components/Donor/DonorPageEdit';
import CollectionPageEdit from './Components/Collection/CollectionPageEdit';
import CollectionArchiveEdit from './Components/CollectionHistory/CollectionArchiveEdit';
import ParPageEdit from './Components/Participation/ParPageEdit';

import {HashRouter as Router, Route, Routes} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  
  return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <div className="container">

              <Navigation/>
              <div style={{paddingTop: "45px"}}> 
                <Routes>
                  <Route exact path='/' element={<Home/>}/>
                  <Route path='/contacts' element={<DonorPageEdit/>}/>
                  <Route path='/collections' element={<CollectionPageEdit/>}/>
                  <Route path='/archive' element={<CollectionArchiveEdit/>}/>
                  <Route exact path='/login' element={<NewLogin/>}/>
                  <Route exact path='/participants' element={<ParPageEdit/>}/>
                </Routes>
              </div>
              
            </div>
          </Fragment>
        </Router>
      </Provider>
  );
}

export default App;
