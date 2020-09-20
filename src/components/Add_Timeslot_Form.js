import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Form, Input, Button, Tabs,Row, Col,Select,Modal  } from 'antd';
import 'antd/dist/antd.css';
function success() {
    Modal.success({
      content: 'Timeslot has been successfully added',
    });
  }
  function errorMsg() {
    Modal.error({
      title: 'Invalid info',
      content: 'Timeslot cannot be added',
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
export const Add_Timeslot_Form = ({flag,departmentId,load}) => {
    const [timeslots, setTimeslots] = useState([])
    const [day, setDay] = useState('Select Day')
    const [timing, setTiming] = useState('Select Timing')
    const [department, setDepartment] = useState('Select Department')
    const [departments, setDepartments] = useState([])
    const [form] = Form.useForm();
    //getting departments
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/department_list')
        .then((res)=>{
          setDepartments(res.data)
        })
      }, [load])
    //getting timeslots
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/timeslot_list')
        .then((res)=>{
          setTimeslots(res.data)
        })
      }, [])
      //getting selected department id
      let department_id=-1
    for(let i in departments)
    {
        if(departments[i].name===department)
        {
            department_id=departments[i].id
        }
    }
    let did=flag?departmentId:department_id
       //adding timeslot
       const add_timeslot=(e)=>{
        // e.preventDefault();
        axios.post('https://timetable53.herokuapp.com/scheduler_api/add_timeslot/',{day,timing,department:did})
        .then((res)=>{
            if(res.status===200)
            {
                const list = [...timeslots]
                list.push(res.data)
                setTimeslots(list)
                form.resetFields();
                success()
            }
        }).catch((error)=>{
            if(error.response.status===400)
            {
                errorMsg()
            }
        })
    }
    //removing department
    const remove_timeslot=(id)=>{
        axios.delete(`https://timetable53.herokuapp.com/scheduler_api/delete_timeslot/${id}`)
        .then((res)=>{
            let index=-1
            for(let i in timeslots){
                if(timeslots[i].id===id){
                    index=i
                }
            }
            if(index!==-1){
                const list=[...timeslots]
                list.splice(index,1)
                setTimeslots(list)
            }
        })
    }
    return (
        <div>
             <Tabs defaultActiveKey="1"className='white desktop' centered>
                <TabPane tab="Add Timeslot" key="1" >
                    <Form form={form}
                        {...layout}
                        name="basic"  
                        
                        onFinish={add_timeslot}
                        >
                        <Form.Item
                            label="Select Day"
                            name="day"
                            rules={[
                            {
                                required: true,
                                message: 'Please Select Day!',
                            },
                            ]}
                        >
                            <Select  onChange={(value)=>setDay(value)}placeholder="Select Day">
                                <Option value="Monday">Monday</Option>
                                <Option value="Tuesday">Tuesday</Option>
                                <Option value="Wednesday">Wednesday</Option>
                                <Option value="Thursday">Thursday</Option>
                                <Option value="Friday">Friday</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Select Timing"
                            name="timing"
                            rules={[
                            {
                                required: true,
                                message: 'Please Select Timeslot!',
                            },
                            ]}
                        >
                            <Select  
                                onChange={(value)=>setTiming(value)}
                                placeholder="Select Timing"
                                allowClear
                                >                                
                                <Option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</Option>
                                <Option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</Option>
                                <Option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</Option>
                                <Option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</Option>
                                <Option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</Option>
                                <Option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</Option>
                                <Option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</Option>
                                <Option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</Option>
                            </Select>
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
                                onChange={(value)=>setDepartment(value)}
                                placeholder='Select Department'
                                allowClear
                                >
                            
                                {departments.map((department)=>(
                                    <Option value={department.name}>{department.name}</Option>
                                    ))}
                            </Select>
                        </Form.Item>}
                        <Form.Item style={{display:'flex',justifyContent:'center'}}>
                               <Button type="primary"block htmlType="submit">Add Timeslot</Button>
                               
                        </Form.Item>
                        </Form>               
                     </TabPane>
                <TabPane tab="Timeslots" key="2">
                    {timeslots.length?
                        <div>

                                    <Row>
                                        <Col span={6}offset={2}><h2 className='blue'>Day</h2></Col>
                                        <Col span={6}><h2 className='blue'>Timing</h2 ></Col>
                                       {!flag&& <Col span={6}><h2 className='blue'>Department</h2></Col>}
                                    </Row>
                        {timeslots.map((timeslot)=>(
                            <div>
                         {flag?timeslot.department===did&&
                        <Row className='gray' style={{padding:'7px'}}>
                            <Col span={6}offset={2}><h3>{timeslot.day}</h3></Col>
                            <Col span={6}><h3>{timeslot.timing}</h3></Col>
                            {!flag&&<Col span={6}>
                                {
                                    departments.map((department)=>{
                                        return department.id===timeslot.department&&
                                        <h3>{department.name}</h3>
                                    })
                                }
                               </Col>}
                            <Col span={4}>
                                <Button className='white' onClick={()=>remove_timeslot(timeslot.id)}>
                                    <i className="fa fa-trash blue" aria-hidden="true"></i>
                                </Button>

                            </Col>
                        </Row>
                        :
                        <Row className='gray' style={{padding:'7px'}}>
                            <Col span={6}offset={2}><h3>{timeslot.day}</h3></Col>
                            <Col span={6}><h3>{timeslot.timing}</h3></Col>
                            {!flag&&<Col span={6}>
                                {
                                    departments.map((department)=>{
                                        return department.id===timeslot.department&&
                                        <h3>{department.name}</h3>
                                    })
                                }
                               </Col>}
                            <Col span={4}>
                                <Button className='white' onClick={()=>remove_timeslot(timeslot.id)}>
                                    <i className="fa fa-trash blue" aria-hidden="true"></i>
                                </Button>

                            </Col>
                        </Row>
                        }
                    </div>
                    ))}                               
                </div>
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
