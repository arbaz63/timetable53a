import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Form, Input, Button, Tabs,Row, Col,Select,Modal,Carousel   } from 'antd';
import 'antd/dist/antd.css';
const { TabPane } = Tabs;
  
  
  
export const Timetable = (props) => {
    const [data, setData] = useState([])
    const [timeslots, setTimeslots] = useState([])
    const [sections, setSections] = useState([])
    const [rooms, setRooms] = useState([])
    const [courses, setCourses] = useState([])
    const [teachers, setTeachers] = useState([])
    const [timetables, setTimetables] = useState([])
    const [departments, setDepartments] = useState([])
    let l=[]
    useEffect(()=>{
        axios.get(`https://timetable53.herokuapp.com/scheduler_api/get_timetable/${props.match.params.id}`)
        .then((res)=>{
            setData(res.data)
        })
    },[])
   
    //getting timeslots
    let r=[]
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/timeslot_list')
        .then((res)=>{
          setTimeslots(res.data)
          l=res.data
        }).then(()=>{
            axios.get('https://timetable53.herokuapp.com/scheduler_api/room_list')
            .then((res)=>{
                setRooms(res.data)
                r=res.data
            })
        })
        
        .then(()=>{
            axios.get(`https://timetable53.herokuapp.com/scheduler_api/get_timetable/${props.match.params.id}`)
        .then((res)=>{
            setData(res.data)
            for(let i in res.data)
            {
                // l.map((timeslot)=>{
                //     return  console.log(timeslot.id===res.data[i].timeslot&&timeslot.day==='Tuesday'&&timeslot.timing,r.map((room)=>{
                //        return res.data[i].room===room.id&&room.name
                //     }))
                // })
                // console.log(res.data[i].timeslot)
            }
        })
    })
      }, [])
     
       //getting sections
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/section_list')
        .then((res)=>{
          setSections(res.data)
        })
      }, [])
         //getting teachers
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/teacher_list')
        .then((res)=>{
          setTeachers(res.data)
        })
      }, [])
        //getting rooms
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/room_list')
        .then((res)=>{
            setRooms(res.data)
        })
    }, [])
     //getting course list
     useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/course_list')
        .then((res)=>{
          setCourses(res.data)
        })
      }, [])
  
      let available_sections=[]
      data.map((d)=>(
          sections.map((section)=>(
              section.id===d.section&&available_sections.push(section.name)
              
          ))
      ))
      let uniqueArray = available_sections.filter(function(item, pos) {
        return available_sections.indexOf(item) == pos;
    })
      let days=['Monday','Tuesday','Wednesday','Thursday','Friday']
      let slots=['8:00 AM - 9:00 AM','9:00 AM - 10:00 AM','10:00 AM - 11:00 AM','11:00 AM - 12:00 PM','12:00 PM - 1:00 PM','1:00 PM - 2:00 PM','2:00 PM - 3:00 PM','3:00 PM - 4:00 PM']
    return (
        <div>
           
           <Tabs defaultActiveKey="1" centered>
                    {
                        sections.map((section,id)=>(
                          uniqueArray.map((a)=>(
                              section.name===a&&
                              <TabPane tab={section.name} key={id}className='timetable'  ><h2 style={{textAlign:'center'}}>Section: {section.name}</h2>
                              {/* headings */}
                             <Row>
                                 <Col span={4}offset={4}><h2 className='blue'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Monday</h2></Col>
                                 <Col span={3}><h2 className='blue'>Tuesday</h2></Col>
                                 <Col span={4}><h2 className='blue'>&nbsp;&nbsp;&nbsp;Wednesday</h2></Col>
                                 <Col span={3}><h2 className='blue'>Thursday</h2></Col>
                                 <Col span={3}><h2 className='blue'>&nbsp;&nbsp;&nbsp;Friday</h2></Col>
                             </Row>
                             <Row>
                                         <Col span={2}offset={2}>
                                     <br/>
                                     <h2 className='blue'>8:00 AM - 9:00 AM</h2>
                                     <br/>
                                     <br/>
                                     <h2 className='blue'>9:00 AM - 10:00 AM</h2>
                                     <br/>
                                     <br/>
                                     <h2 className='blue'>10:00 AM - 11:00 AM</h2>
                                     <br/>
                                     <br/>
                                     <br/>
                                     <h2 className='blue'>11:00 AM - 12:00 PM</h2>
                                     <br/>
                                     <br/>
                                     <h2 className='blue'>12:00 PM - 1:00 PM</h2>
                                     <br/>
                                     <br/>
                                     <h2 className='blue'>1:00 PM - 2:00 PM</h2>
                                     <br/>
                                     <br/>
                                     <h2 className='blue'>2:00 PM - 3:00 PM</h2>
                                     <br/>
                                     <br/>
                                     <h2 className='blue'>3:00 PM - 4:00 PM</h2>
                                 </Col>
                                 <Col span={20}>
                                 {
                                                     //for slots
                                         slots.map((slot)=>{
                                             return <Row> 
                                                 {
                                                     //for days
                                                     days.map((day)=>{
                                                         return <Col span={4} className='gray-slot' style={{height:'120px',overflowY:'auto',background:'gray'}}> 
                                                             {
                                                                 
                                                                 //classes
                                                             data&& data.map((d)=>{
                                                                     return <div>
                                                                         
                                                                         {
                                                                             //for timeslots
                                                                             timeslots.map((timeslot)=>{
                                                                                 return <div > 
                                                                                 {
                                                                                     timeslot.id===d.timeslot&&timeslot.day===day&&timeslot.timing===slot&&d.section===section.id&&
                                                                                     <div >
                                                                                         <Col span={24} style={{background:'white',width:'100%',height:'120px'}}>
                                                                                             <Row>
                                                                                     
                                                                                                 <Col span={16}offset={2}>
                                                                                                     {/* //for rooms */}
                                                                                                     {
                                                                                                     rooms.map((room)=>{
                                                                                                         return <div>{room.id===d.room&& <h4>{room.name}</h4> }</div>
                                                                                                     })
                                                                                                     }
                                                                                                     {/* //for teachers */}
                                                                                                     {
                                                                                                         courses.map((course)=>(
                                                                                                             teachers.map((teacher)=>{
                                                                                                                 return <div>{teacher.id===course.teacher&&course.id===d.course&&
                                                                                                                      <h4>{teacher.name}</h4> }</div>
                                                                                                             })
                                                                                                         ))
                                                                                                     }
                                                                                                     {/* //for course */}
                                                                                                     {
                                                                                                     courses.map((course)=>{
                                                                                                         return <div>{course.id===d.course&& <h3 style={{fontWeight:'bolder'}}>{course.name}</h3>}</div>
                                                                                                     })
                                                                                                     }
     
                                                                                                 </Col>
                                                                                             </Row>
                                                                                         </Col>
                                                                                     </div>
                                                                                 
                                                                                 }
                                                                                 
                                                                                 </div>
                                                                             })
                                                                         }
                                                                     </div>
                                                                 })
                                                             }
                                                         </Col>
                                                     })
                                                 }
                                             </Row>
                                         })
                                     }
                                 </Col>
                             </Row>
                                     
                                 </TabPane>
                          ))
                       
                        ))
                        
                    }
                </Tabs>
                
        </div>
    )
}
