import React,{useState,useEffect} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import { Forms_Container } from './components/Forms_Container';
import { Header } from './components/Header';
// import './Styles/bootstrap-4.4.1-dist/css/bootstrap.min.css'




import { LandingPage } from './components/main/LandingPage';
import { TimeTables } from './components/main/TimeTables';
import { Create } from './components/main/Create';
import { Create_Timetable } from './components/main/Create_Timetable';
import { Timetable } from './components/main/Timetable';
import './Styles/styles.css'
import { EditTimetable } from './components/main/EditTimetable';
import { NotFound } from './components/main/NotFound';
function App() {
 
  return (
    <div className="App">
      <Header/>
      <br/>
      <BrowserRouter >
        <Switch>
          <Route path='/'component={LandingPage} exact/>
          <Route path='/timetables'component={TimeTables}exact/>
          <Route path='/timetables/:id'component={Timetable}exact/>
          <Route path='/create_timetable'component= {Create_Timetable}exact/>
          <Route path='/edit_timetable'component={EditTimetable}exact/>
          <Route component={NotFound}/>
          
        </Switch>
      </BrowserRouter>
      {/* <Forms_Container/> */}
      
      
    </div>
  );
}

export default App;
