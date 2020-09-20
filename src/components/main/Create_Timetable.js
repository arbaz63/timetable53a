import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Add_Teacher_Form } from '../Add_Teacher_Form'
import { Add_Course_Form } from '../Add_Course_Form'
import { Add_Room_Form } from '../Add_Room_Form'
import { Add_Section_Form } from '../Add_Section_Form'
import { Add_Timeslot_Form } from '../Add_Timeslot_Form'
import {  Button,Row, Col,Modal,Tabs,Spin  } from 'antd';
import 'antd/dist/antd.css';
import { Create } from './Create'
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
export const Create_Timetable = () => {
    const [departments, setDepartments] = useState([])
    const [department, setDepartment] = useState('')
    const [nameOfTimetable, setNameOfTimetable] = useState('')
    const [departmentId, setDepartmentId] = useState(-1)
    const [tflag, setTflag] = useState(0)
    const [teachers, setTeachers] = useState([])
    const [cflag, setCflag] = useState(0)
    const [courses, setCourses] = useState([])
    const [disable, setDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const [load,setLoad]=useState(false)
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
         setDisable(true)
         setLoading(true)
         let tid=-1
        axios.post('https://timetable53.herokuapp.com/scheduler_api/add_timetable/',{name:nameOfTimetable,department:departmentId})
        .then((res)=>{
            tid=res.data.id
            console.log('id',tid)
            // localStorage.setItem('id',`${res.data.id}`)
            // localStorage.setItem('did',`${res.data.department}`)
            
        }).then(()=>{
            console.log(nameOfTimetable)
            console.log(departmentId)
            axios.get(`https://timetable53.herokuapp.com/scheduler_api/generate_classes/${tid}`)
            .then((res)=>{
                console.log(res.data)
                 if(res.status===200)
                 {
                    setLoading(false)
                    success()
                 }
            }).catch((error)=>{
                setLoading(false)
                setDisable(false)
                errorMsg()
//window.location.reload(false)
            })

        })
        
        
     }
     //updating tab
     const onload=()=>{
         setLoad(!load)
     }
    return (
        <div>
            
                        {departmentId===-1?<Create details={(name,did)=>
                            {
                                setNameOfTimetable(name) 
                                setDepartmentId(did)}
                            }/>
                            :
             <div>
                <Tabs defaultActiveKey="1" centered onChange={onload}>
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
                        <Add_Room_Form load={load} flag={true}department_id={departmentId}/>
                        <br/>
                    </TabPane>
                    <TabPane tab="Add Section" key="4" >
                        <Add_Section_Form load={load} cflag={cflag} flag={true}departmentId={departmentId}coursess={courses}/>                   
                        <br/>
                    </TabPane>
                    <TabPane tab="Add Timeslot" key="5" >
                        <Add_Timeslot_Form load={load} flag={true}departmentId={departmentId}/>
                        <br/>
                    </TabPane>
                    </Tabs>
                            <Row>
                                <Col span={8}offset={8}>
                      <Button style={{marginBottom:'10px'}}size="large"type="danger"block disabled  ={disable} onClick={generate}>
                        Generate Timetable<Spin spinning={loading} style={{marginLeft:'5px'}}></Spin>
                      </Button>
                                </Col>    
                            </Row>
                    </div>
                }
                        
    </div>
        
    )
}
