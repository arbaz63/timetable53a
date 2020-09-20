import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Form, Input, Button, Tabs,Row, Col,Select,Modal  } from 'antd';
import 'antd/dist/antd.css';
function success() {
    Modal.success({
      content: 'Course has been successfully added',
    });
  }
  function errorMsg() {
    Modal.error({
      title: 'Invalid info',
      content: 'Course cannot be added',
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
export const Add_Course_Form = ({setCoursess,teacherss,load}) => {
    const [courses, setCourses] = useState([])
    const [name, setName] = useState('')
    const [credit_hours, setCredit_hours] = useState(0)
    const [course_code, setCourse_code] = useState('')
    const [teacher, setTeacher] = useState('Select Teacher')
    const [teachers, setTeachers] = useState([])
    const [form] = Form.useForm();
    //getting course list
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/course_list')
        .then((res)=>{
          setCourses(res.data)
        })
      }, [load])
       //fetching teachers
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/teacher_list')
        .then((res)=>{
        setTeachers(res.data)
        teacherss&& teacherss.length&& setTeachers(teacherss)
        
        })
      }, [load])
   
     
      
      //adding course 
      const add_course=(e)=>{
        // e.preventDefault();
        axios.post('https://timetable53.herokuapp.com/scheduler_api/add_course/',{name,creditHours:credit_hours,courseCode:course_code,teacher})
        .then((res)=>{
            if(res&&res.status===200)
            {

                const list = [...courses]
                list.push(res.data)
                setCourses(list)
                form.resetFields();
                success()
                //for passing data to sibling: add section form
                setCoursess(list)
            }
        }).catch((error)=>{
            if(error.response&&error.response.status===400)
            {
                errorMsg()
            }
        })
    }
    //removing course
    const remove_course=(id)=>{
        axios.delete(`https://timetable53.herokuapp.com/scheduler_api/delete_course/${id}`)
        .then((res)=>{
            let index=-1
            for(let i in courses){
                if(courses[i].id===id){
                    index=i
                }
            }
            if(index!==-1){
                const list=[...courses]
                list.splice(index,1)
                setCourses(list)
                //for passing data to sibling: add section form
                setCoursess(list)
            }
        })
    }
    return (
        <div>
            
                  

    <Tabs defaultActiveKey="1"className='white desktop' centered >
        <TabPane tab="Add Course" key="1">
            <Form form={form}
                {...layout}
                name="basic"
                onFinish={add_course}
                >
                <Form.Item
                    label="Course Name"
                    name="Course Name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input Course Name!',
                    },
                    ]}
                >
                    <Input placeholder="Enter course name"value={name} onChange={(e)=>{setName(e.target.value.toUpperCase())}}/>
                </Form.Item>

                <Form.Item
                    label="Credit Hours"
                    name="Credit Hours"
                    rules={[
                    {
                        required: true,
                        message: 'Please input Credit Hours',
                    },
                    ]}
                >
                    <Input placeholder="Enter credit hours"value={credit_hours} onChange={(e)=>{setCredit_hours(e.target.value)}}/>
                </Form.Item>
                <Form.Item
                    label="Course Code"
                    name="Course Code"
                    rules={[
                    {
                        required: true,
                        message: 'Please input Course Code!',
                    },
                    ]}
                >
                    <Input placeholder="Enter course code"value={course_code} onChange={(e)=>{setCourse_code(e.target.value.toUpperCase().trim())}}/>
                </Form.Item>
                <Form.Item
                    label="Teacher"
                    name="Teacher"
                    rules={[
                    {
                        required: true,
                        message: 'Please Select Teacher!',
                    },
                    ]}
                >
                    <Select 
                            onChange={(value)=>setTeacher(value)} 
                            placeholder="Select Teacher"
                            allowClear
                    >
                            
                                 {
                                     teachers.map((teacher)=>{
                                        return <Option value={teacher.id}>{teacher.name}</Option>
                                     })
                                }
                        </Select>
                </Form.Item>
                <Form.Item style={{display:'flex',justifyContent:'center'}}>
                                 <Button type="primary"block htmlType="submit">Add Course</Button>
                              
                </Form.Item>
                </Form>
            </TabPane>
            <TabPane tab="Courses" key="2">
                               {courses.length? <div>
                                   
                                 <Row>
                                    <Col span={4}><h2 className='blue'>Course Code</h2></Col>
                                    <Col span={2}offset={1}><h2 className='blue'>CH</h2></Col>
                                    <Col span={8}><h2 className='blue'>Course Name</h2></Col>
                                    <Col span={6} className='blue'> <h2 className='blue'>Teacher</h2></Col>
                                </Row>              
           
           
            {courses.map((course)=>(
                    <Row id={course.id}className='gray' style={{padding:'7px'}}>
                        <Col span={4}>
                           <h3> {course.courseCode}</h3>
                        </Col>
                        <Col span={2} offset={1}>
                            <h3>{course.creditHours}</h3>
                        </Col>
                        <Col span={8}>
                            <h3>{course.name}</h3>
                        </Col>
                        <Col span={6}>
                            {
                                teachers.map((teacher)=>(
                                course.teacher===teacher.id
                                &&
                            <h3>{teacher.name}</h3>
                                
                            ))
                            
                            }
                        </Col>
                        <Col span={2} >
                            <Button className='white' onClick={()=>remove_course(course.id)}>
                                <i className="fa fa-trash blue" aria-hidden="true"></i>    
                            </Button>
                        </Col>
                    </Row>
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
