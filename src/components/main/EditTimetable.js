import React,{useState} from 'react'
import { Add_Department_Form } from '../Add_Department_Form'
import { Add_Teacher_Form } from '../Add_Teacher_Form'
import { Add_Course_Form } from '../Add_Course_Form'
import { Add_Room_Form } from '../Add_Room_Form'
import { Add_Section_Form } from '../Add_Section_Form'
import { Add_Timeslot_Form } from '../Add_Timeslot_Form'
import { Create_Timetable } from './Create_Timetable'
import { Edit } from './Edit'

export const EditTimetable = () => {
    const [courses, setCourses] = useState([])
    return (
        <div>
            
            <br/>
            <Edit editFlag={false}/>

        </div>
    )
}
