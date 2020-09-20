import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {  Button,Row, Col } from 'antd';
import 'antd/dist/antd.css';

export const TimeTables = (props) => {
    const [timetables, setTimetables] = useState([])
    const [departments, setDepartments] = useState([])
    //getting timetables
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/timetable_list')
        .then((res)=>{
          setTimetables(res.data)
        })
      }, [])
      //getting departments
      useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/department_list')
        .then((res)=>{
          setDepartments(res.data)
        })
      }, [])
      //removing timetable
    const remove_timetable=(id)=>{
        axios.delete(`https://timetable53.herokuapp.com/scheduler_api/delete_timetable/${id}`)
        .then((res)=>{
            let index=-1
            for(let i in timetables){
                if(timetables[i].id===id){
                    index=i
                }
            }
            if(index!==-1){
                const list=[...timetables]
                list.splice(index,1)
                setTimetables(list)
            }
        })
    }
    return (
        <div>
            

            {
               timetables.length? timetables.map((timetable)=>{
                    return <Row className='gray' style={{width:'70%',margin:'auto',marginBottom:'5px',padding:'10px'}}>
                       <Col span={5}offset={2}> <h2 style={{color:'#3385ff'}}>{timetable.name}</h2></Col>
                       <Col span={8}>{departments.map((department)=>{return department.id===timetable.department&&<h2 style={{color:'#3385ff'}}>{department.name}</h2>})}</Col>
                       <Col span={1}offset={4}><a href={`/timetables/${timetable.id}`}>
                           <Button className='white'>
                                <i  className="fa fa-eye blue" aria-hidden="true"></i>
                           </Button></a></Col>
                       <Col span={2}offset={1}> 
                            <Button className='white'onClick={()=>remove_timetable(timetable.id)}>
                                <i className="fa fa-trash blue" aria-hidden="true"></i>
                            </Button>
                        </Col>
                    </Row>
                })
                : 
                <div style={{display:'flex',justifyContent:'center',marginTop:'100px'}}>
                    <i  className='fa fa-folder-open' style={{fontSize:'10rem'}}></i>

                </div>
                
            }
            
        </div>
    )
}
