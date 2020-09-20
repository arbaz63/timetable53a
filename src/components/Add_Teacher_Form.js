import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Form, Input, Button, Tabs,Row, Col,Modal  } from 'antd';
import 'antd/dist/antd.css';
const { TabPane } = Tabs;
//for model success
function success() {
    Modal.success({
      content: 'Teacher has been successfully added',
    });
  }
  //for error
function errorMsg() {
    Modal.error({
      title: 'Invalid info',
      content: 'Teacher cannot be added',
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
      offset: 8,
      span: 16,
    },
  };
  
export const Add_Teacher_Form = ({setTeachers}) => {
    const [form] = Form.useForm();
    const [teacher_list, setTeacher_list] = useState([])
    const [name, setName] = useState('')
      
    //fetching teachers
    useEffect(() => {
      axios.get('https://timetable53.herokuapp.com/scheduler_api/teacher_list')
      .then((res)=>{
        setTeacher_list(res.data)
        
      })
    }, [])
    //adding new teacher
    const add_teacher=(e)=>{
        // e.preventDefault();
        axios.post('https://timetable53.herokuapp.com/scheduler_api/add_teacher/',{name})
        .then((res)=>{
            if(res&&res.status===200)
            {
                success()
                const list = [...teacher_list]
                list.push(res.data)
                setTeacher_list(list)
                form.resetFields();
               //for passing data to sibling
                setTeachers(list)

            }
        }).catch((error)=>{
            if( error.response.status===400)
            {
              errorMsg()
            }
        })
    }
  
    //removing teacher
    const remove_teacher=(id)=>{
        axios.delete(`https://timetable53.herokuapp.com/scheduler_api/delete_teacher/${id}`)
        .then((res)=>{
            let index=-1
            for(let i in teacher_list){
                if(teacher_list[i].id===id){
                    index=i
                }
            }
            if(index!==-1){
                const list=[...teacher_list]
                list.splice(index,1)
                setTeacher_list(list)
                  //for passing data to sibling
                  setTeachers(list)
            }
        })
    }
    return (
        <div>
            <Tabs defaultActiveKey="1" className='white desktop'centered >
                <TabPane tab="Add Teacher" key="1" >
                    <Form form={form}
                        {...layout}
                        name="basic"  
                        
                        onFinish={add_teacher}
                        >
                        <Form.Item
                            label="Name"
                            name="Teacher"
                            rules={[
                            {
                                required: true,
                                message: 'Please input Teacher Name!',
                            },
                            ]}
                        >
                            <Input placeholder="Enter teacher name" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </Form.Item>

                        <Form.Item style={{display:'flex',justifyContent:'center'}}>
                                    <Button className='btn' type="primary"block htmlType="submit">Add Teacher</Button>
                               
                            
                        </Form.Item>
                        </Form>                </TabPane>
                <TabPane tab="Teachers" key="2">
                            {teacher_list.length?teacher_list.map((teacher)=>(
                                <Row id={teacher.id}className='gray' style={{padding:'7px'}} >        
                                        <Col span={16} offset={2}><h3 >{teacher.name}</h3></Col>
                                        <Button className='white' onClick={()=>remove_teacher(teacher.id)}>
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
