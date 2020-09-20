import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Form, Input, Button, Tabs,Row, Col,Modal  } from 'antd';
import 'antd/dist/antd.css';
const { TabPane } = Tabs;
function success() {
    Modal.success({
      content: 'Department has been added successfully',
    });
  }
  function errorMsg() {
    Modal.error({
      title: 'Invalid info',
      content: 'Failed to add department',
    });
  }
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 0,
      span: 16,
    },
  };

export const Add_Department_Form = () => {
    const [departments, setDepartments] = useState([])
    const [name, setName] = useState('')
    const [form] = Form.useForm();
    //getting departments
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/department_list')
        .then((res)=>{
          setDepartments(res.data)
        })
      }, [])
       //adding department
       const add_department=()=>{
        // e.preventDefault();
        axios.post('https://timetable53.herokuapp.com/scheduler_api/add_department/',{name})
        .then((res)=>{
            if(res.status===200)
            {
                const list = [...departments]
                list.push(res.data)
                setDepartments(list)
                form.resetFields();
                success()
            }
        }).catch((error)=>{
            if(error.response.status===400)
                errorMsg()
        })   
    }
    //removing department
    const remove_department=(id)=>{
        axios.delete(`https://timetable53.herokuapp.com/scheduler_api/delete_department/${id}`)
        .then((res)=>{
            let index=-1
            for(let i in departments){
                if(departments[i].id===id){
                    index=i
                }
            }
            if(index!==-1){
                const list=[...departments]
                list.splice(index,1)
                setDepartments(list)
            }
        })
    }
    return (
        <div>
            <Tabs defaultActiveKey="1" className='white desktop'centered>
                <TabPane tab="Add Department" key="1" >
                    <Form form={form}
                        {...layout}
                        name="basic"  
                        
                        onFinish={add_department}
                        >
                        <Form.Item
                            label="Name"
                            name="Name"
                            rules={[
                            {
                                required: true,
                                message: 'Please input Department Name!',
                            },
                            ]}
                        >
                            <Input placeholder="Enter Department name" value={name} onChange={(e)=>setName(e.target.value.toUpperCase().trim())}/>
                        </Form.Item>

                        <Form.Item style={{display:'flex',justifyContent:'center'}}>
                                
                                    <Button style={{alignContent:'center'}} type="primary"block htmlType="submit">Add Department</Button>
                                  
                            
                            
                        </Form.Item>
                        </Form>                </TabPane>
                <TabPane tab="Departments" key="2">
                            {departments.length?departments.map((department)=>(
                                <Row id={department.id}className='gray' style={{padding:'7px'}} >        
                                        <Col span={16} offset={2}><h3 >{department.name}</h3></Col>
                                        <Button className='white' onClick={()=>remove_department(department.id)}>
                                            <i className="fa fa-trash blue" aria-hidden="true"></i>    
                                        </Button>                                
                                </Row>
                            ))
                            : 
                            <div style={{display:'flex',justifyContent:'center',marginTop:'100px'}}>
                                <i  className='fa fa-folder-open' style={{fontSize:'10rem'}}></i>
                
                            </div>
                          }                               
                </TabPane>
                
            </Tabs>
            
        </div>
    )
}
