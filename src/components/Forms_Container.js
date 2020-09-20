import React,{useState,useEffect} from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import axios from 'axios'
import { Add_Teacher_Form } from './Add_Teacher_Form'
import { Add_Course_Form } from './Add_Course_Form'
import { Add_Room_Form } from './Add_Room_Form'
import { Add_Department_Form } from './Add_Department_Form'
import { Add_Timeslot_Form } from './Add_Timeslot_Form'
import { Add_Section_Form } from './Add_Section_Form'
import { Header } from './Header'
import { TimeTables } from './main/TimeTables'
export const Forms_Container = () => {
    
    
    
    return (
        <div>
            <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                    <Route path='/add_teacher' component={Add_Teacher_Form}/>
                    <Route path='/add_course' component={Add_Course_Form}/>
                    <Route path='/add_room' component={Add_Room_Form}/>
                    <Route path='/add_department' component={Add_Department_Form}/>
                    <Route path='/add_timeslot' component={Add_Timeslot_Form}/>
                    <Route path='/add_section' component={Add_Section_Form}/>
                    {/* for main  */}
                    
                    
                </Switch>
            </div>
            </BrowserRouter>
            {/* <Add_Teacher_Form/>
            <Add_Course_Form/> */}
            {/* <Add_Room_Form/>
            <Add_Department_Form/> */}
            {/* <Add_Timeslot_Form/> */}
            {/* <Add_Section_Form/> */}
        </div>
    )
}
