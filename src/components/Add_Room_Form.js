import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Form, Input, Button, Tabs,Row, Col,Select,Modal  } from 'antd';
import 'antd/dist/antd.css';
function success() {
    Modal.success({
      content: 'Room has been successfully added',
    });
  }
  function errorMsg() {
    Modal.error({
      title: 'Invalid info',
      content: 'Room cannot be added',
    });
  }
const { TabPane } = Tabs;
const { Option } = Select;
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

export const Add_Room_Form = ({flag,department_id,load}) => {
    const [rooms, setRooms] = useState([])
    const [name, setName] = useState('')
    const [department, setDapartment] = useState('Select Department')
    const [departments, setDepartments] = useState([])
    const [form] = Form.useForm();
    let existingDept='false'
    //getting departments
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/department_list')
        .then((res)=>{
            setDepartments(res.data)
        })
    }, [load])

    //getting rooms
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/room_list')
        .then((res)=>{
            setRooms(res.data)
        })
    }, [])
    //getting department id of selected room
    let did=-1
    for(let i in departments){
        if(departments[i].name===department){
            did=departments[i].id
        }
    }
    let departmentId=flag?department_id:did
      //adding room
      const add_room=(e)=>{
        // e.preventDefault();
        axios.post('https://timetable53.herokuapp.com/scheduler_api/add_room/',{name,department:departmentId})
        .then((res)=>{
            if(res.status===200)
            {
                const list = [...rooms]
                list.push(res.data)
                setRooms(list)
                form.resetFields();
                success()
            }

        }).catch((error)=>{
            if(error.response.status===400)
            errorMsg()
        })
        
    }
   
    //removing course
    const remove_room=(id)=>{
        axios.delete(`https://timetable53.herokuapp.com/scheduler_api/delete_room/${id}`)
        .then((res)=>{
            let index=-1
            for(let i in rooms){
                if(rooms[i].id===id){
                    index=i
                }
            }
            if(index!==-1){
                const list=[...rooms]
                list.splice(index,1)
                setRooms(list)
            }
        })
    }
    return (
        <div>
            <Tabs defaultActiveKey="1"className='white desktop' centered >
                <TabPane tab="Add Room" key="1" >
                    <Form form={form}
                        {...layout}
                        name="basic"  
                        
                        onFinish={add_room}
                        >
                        <Form.Item
                            label="Add Room"
                            name="Room"
                            rules={[
                            {
                                required: true,
                                message: 'Please input Room Name!',
                            },
                            ]}
                        >
                            <Input placeholder="Enter Room name" value={name} onChange={(e)=>setName(e.target.value.toUpperCase().trim())}/>
                        </Form.Item>
                        {!flag&& <Form.Item
                            label="Department"
                            name="Department"
                            rules={[
                            {
                                required: true,
                                message: 'Please Select Department!',
                            },
                            ]}
                        >
                            <Select  
                            onChange={(value)=>setDapartment(value)} 
                            placeholder='Select Department'
                            allowClear
                            >
                            
                                {
                                    departments.map((department)=>(
                                        
                                        <Option value={department.name}>{department.name}</Option>
                                        ))

                                }

                                    
                            </Select>
                        </Form.Item>}
                        <Form.Item style={{display:'flex',justifyContent:'center'}}>
                             
                                    <Button type="primary"block htmlType="submit">Add Room</Button>
                                
                        </Form.Item>
                        </Form>               
                     </TabPane>
                <TabPane tab="Rooms" key="2">
                            {rooms.length?rooms.map((room)=>(
                                <>        
                                        {
                                            flag?room.department===departmentId&&
                                            <Row id={room.id}className='gray' style={{padding:'7px'}}>
                                                <Col span={16} offset={2}>
                                                    <h3>{room.name}</h3>
                                                </Col>
                                                <Button className='white' onClick={()=>remove_room(room.id)}>
                                                    <i className="fa fa-trash blue" aria-hidden="true"></i>    
                                                </Button> 
                                            </Row>
                                            :
                                            <Row id={room.id}className='gray' style={{padding:'7px'}}>
                                                <Col span={8} offset={2}>
                                                    <h3>{room.name}</h3>
                                                </Col>
                                                <Col span={8} >
                                                    {
                                                        departments.map((department)=>{
                                                            return room.department===department.id&&
                                                            <h3>{department.name}</h3>
                                                        })
                                                    }
                                                </Col>
                                                <Button className='white' onClick={()=>remove_room(room.id)}>
                                                    <i className="fa fa-trash blue" aria-hidden="true"></i>    
                                                </Button> 
                                            </Row>
                                        }
                                                                       
                                </>
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
