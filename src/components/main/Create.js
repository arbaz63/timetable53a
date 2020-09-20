import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { TimeTables } from './TimeTables'
import {createBrowserHistory} from 'history'
import { Form, Input, Button, Tabs,Row, Col,Select,Modal  } from 'antd';
import 'antd/dist/antd.css';
const history=createBrowserHistory()

  function errorMsg() {
    Modal.error({
      title: 'Invalid info',
      content: 'timetable already exist',
    });
  }
const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
  };
export const Create = ({details}) => {
    const [name, setName] = useState('')
    const [timetables, setTimetables] = useState([])
    const [department, setDepartment] = useState('')
    const [deprtments, setDeprtments] = useState([])
    const [did, setDid] = useState(-1)
    //getting departments
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/department_list')
        .then((res)=>{
            setDeprtments(res.data)
        })
    }, [])
    useEffect(()=>{
        axios.get('https://timetable53.herokuapp.com/scheduler_api/timetable_list')
        .then((res)=>{
            setTimetables(res.data)
        })
    },[])
    
    //adding timetable
    let d=-1
    const add_timetable=()=>{
        //getting selected department id
        for(let i in deprtments){
            if(deprtments[i].name===department){
                setDid(deprtments[i].id)
                d=deprtments[i].id
            }
        }
        //checking for existing
        
        for(let i in timetables)
        {
            if(timetables[i].name===name&&timetables[i].department===d)
            {
                d=-1
                errorMsg()
                

            }
                
        }
        if(d!==-1)
        {
            details(name,d)
            localStorage.setItem('did',d)
        }
        
    }
    //setting passing data to parent component
    
    return (
        <div>
                <Form className='white' style={{width:'50%',height:'300px',padding:'20px',margin:'auto'}}
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={add_timetable}
                    >
                    <Form.Item
                        label="Name"
                        name="Name"
                        rules={[{ required: true, message: 'Please input Timetable Name!' }]}
                    >
                        <Input placeholder="Timetable name" value={name} onChange={(e)=>setName(e.target.value.toUpperCase().trim())}/>
                    </Form.Item>
                    <Form.Item
                        label="Department"
                        name="Department"
                        rules={[{ required: true, message: 'Please Select department!' }]}
                    >
                        <Select value={department} onChange={(value)=>setDepartment(value)}placeholder="Select Department">
                            {
                                deprtments.map((department)=>(
                                    <Option value={department.name}>{department.name}</Option>
                                    ))
                                }
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                            <Button size="large" type="primary"htmlType='submit' block >Next</Button>
                                               
                    
                    </Form.Item>
                    </Form>
                   
                
            
        </div>
    )
}
