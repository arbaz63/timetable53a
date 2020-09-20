import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Add_Teacher_Form } from '../Add_Teacher_Form'
import { Add_Course_Form } from '../Add_Course_Form'
import { Add_Room_Form } from '../Add_Room_Form'
import { Add_Section_Form } from '../Add_Section_Form'
import { Add_Timeslot_Form } from '../Add_Timeslot_Form'
import {  Button,Row, Col,Modal,Tabs  } from 'antd';
import 'antd/dist/antd.css';
import { Create } from './Create'
import { Add_Department_Form } from '../Add_Department_Form'
const { TabPane } = Tabs;
function success() {
    Modal.success({
      content: 'Timetable has been successfully generated',
    });
  }
  function errorMsg() {
    Modal.error({
      title: 'Invalid info',
      content: 'Timetable cannot be generated',
    });
  }
export const Edit = ({editFlag}) => {
    const [departments, setDepartments] = useState([])
    const [department, setDepartment] = useState('')
    const [nameOfTimetable, setNameOfTimetable] = useState('')
    const [departmentId, setDepartmentId] = useState(-1)
    const [tflag, setTflag] = useState(0)
    const [teachers, setTeachers] = useState([])
    const [cflag, setCflag] = useState(0)
    const [courses, setCourses] = useState([])
    const [load, setLoad] = useState(false)
    //getting departments
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/department_list')
        .then((res)=>{
          setDepartments(res.data)
          for(let i in departments)
          {
              if(departments[i].id===departmentId)
              {
                  setDepartment(departments[i].name)
              }
          }
        })
      }, [])
     //generate timetable
     const generate=()=>{
         let tid=-1
        axios.post('https://timetable53.herokuapp.com/scheduler_api/add_timetable/',{name:nameOfTimetable,department:departmentId})
        .then((res)=>{
            tid=res.data.id
            // localStorage.setItem('id',`${res.data.id}`)
            // localStorage.setItem('did',`${res.data.department}`)
            
        }).then(()=>{
            axios.get(`https://timetable53.herokuapp.com/scheduler_api/generate_classes/${tid}`)
            .then((res)=>{
                 if(res.status===200)
                 {
                     success()
                 }
            }).catch((error)=>{
                if(error.response.status===400)
                {
                    errorMsg()
                }
            })

        })
        
        
     }
     //updating tab
     const onload=()=>{
        setLoad(!load)
    }
    return (
        <div>
            
                        {editFlag&&departmentId===-1?<Create details={(name,did)=>
                            {
                                setNameOfTimetable(name) 
                                setDepartmentId(did)}
                            }/>
                            :
             <div>
                <Tabs defaultActiveKey="0" centered onChange={onload} >
                    <TabPane tab='Add Department' key='0'>
                        <Add_Department_Form load={load}/>
                        
                    </TabPane>
                    <TabPane tab="Add Teacher" key="1" >
                        <Add_Teacher_Form load={load}
                        setTeachers={(t)=>{
                            setTeachers(t)
                        }}/>
                        <br/>
                    </TabPane>
                    <TabPane tab="Add Course" key="2" >
                        <Add_Course_Form load={load} teacherss={teachers}setCoursess=
                        {
                            (c)=>{
                                setCourses(c)
                            }
                        }
                        />
                        <br/>
                    </TabPane>
                    <TabPane tab="Add Room" key="3" >
                        <Add_Room_Form load={load} flag={false}editFlag={false} department_id={departmentId}/>
                        <br/>
                    </TabPane>
                    <TabPane tab="Add Section" key="4" >
                        <Add_Section_Form load={load} cflag={cflag}editFlag={false} flag={false}departmentId={departmentId}coursess={courses}/>                   
                        <br/>
                    </TabPane>
                    <TabPane tab="Add Timeslot" key="5" >
                        <Add_Timeslot_Form load={load} flag={false}editFlag={false} departmentId={departmentId}/>
                        <br/>
                    </TabPane>
                    </Tabs>
                            <Row>
                                <Col span={8}offset={8}>
                     {editFlag&& <Button style={{marginBottom:'10px'}}size="large"type="danger"block onClick={generate}>Generate Timetable</Button>}
                                </Col>    
                            </Row>
                    </div>
                }
                        
    </div>
        
    )
}
