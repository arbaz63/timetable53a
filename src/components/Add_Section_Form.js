import React,{useState,useEffect} from 'react'
import axios from 'axios'
import MultiSelect from 'react-multi-select-component'
import { Form, Input, Button, Tabs,Row, Col,Select,Modal  } from 'antd';
import 'antd/dist/antd.css';
function success() {
    Modal.success({
      content: 'Section has been successfully added',
    });
  }
  function errorMsg() {
    Modal.error({
      title: 'Invalid info',
      content: 'Section cannot be added',
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
//for courses
const coursesLayout = {
    wrapperCol: {
      offset: 0,
      span: 8,
    },
  };

export const Add_Section_Form = ({flag,departmentId,coursess,load}) => {
    const [selected, setSelected] = useState([])
    const [sections, setSections] = useState([])
    const [departments, setDepartments] = useState([])
    const [department, setDepartment] = useState('')
    const [courses, setCourses] = useState([])
    const [selected_courses, setSelected_courses] = useState([])
    const [name, setName] = useState('')
    const [teaccher_list, setTeacher_list] = useState([])
    const [form] = Form.useForm();
    //getting course list
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/course_list')
        .then((res)=>{
          setCourses(res.data)
           //coursess.length&&setCourses(coursess)
        })
      }, [load])
    //getting departments
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/department_list')
        .then((res)=>{
          setDepartments(res.data)
        })
      }, [load])
    //getting sections
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/section_list')
        .then((res)=>{
          setSections(res.data)
        })
      }, [load])
    //fetching teachers
    useEffect(() => {
        axios.get('https://timetable53.herokuapp.com/scheduler_api/teacher_list')
        .then((res)=>{
          setTeacher_list(res.data)
          
        })
      }, [])
    const options = []
    let option=''
    //populating options with courses
    // courses.map((course)=>{
    //     return 
    //     options.push({
           
    //         label:`${course.name}-${option}`, value:`${course.name}-${course.teacher}`,id:course.id
    //     })
    // })
    for(let i in courses)
    {
        for(let j in teaccher_list)
        {
            if(teaccher_list[j].id===courses[i].teacher)
            {
                option=teaccher_list[j].name
                options.push({
               
                    label:`${courses[i].name}-${option}`, value:`${courses[i].name}-${option}`,id:courses[i].id
                })
            }
        }
    }
    //pushing selected options to list of courses
    let list_of_courses=[]
    selected.map((selection)=>(
        list_of_courses.push(selection.id) //we can also use selection.label for course name
    ))
    //getting department id of selected department
    let department_id=-1
    for(let i in departments)
    {
        if(departments[i].name===department)
        {
            department_id=departments[i].id
        }
    }
    let did=flag?departmentId:department_id
    //adding section
    const add_section=(e)=>{
        // e.preventDefault();
        axios.post('https://timetable53.herokuapp.com/scheduler_api/add_section/',{name,courses:list_of_courses,department:did})
        .then((res)=>{
            if(res.status===200)
            {
                const list = [...sections]
                list.push(res.data)
                setSections(list)
                form.resetFields();
                success()
            }
        }).catch((error)=>{
            if(error.response.status===400)
            {
                errorMsg()
            }
        })
        setName('')        
    }
    //removing section
    const remove_section=(id)=>{
        axios.delete(`https://timetable53.herokuapp.com/scheduler_api/delete_section/${id}`)
        .then((res)=>{
            let index=-1
            for(let i in sections){
                if(sections[i].id===id){
                    index=i
                }
            }
            if(index!==-1){
                const list=[...sections]
                list.splice(index,1)
                setSections(list)
            }
        })
    }
 
    return (
        <div>
            <Tabs defaultActiveKey="1"className='white desktop' centered  >
                <TabPane tab="Add Section" key="1" >
                    <Form form={form}
                        {...layout}
                        name="basic"  
                        
                        onFinish={add_section}
                        >
                        <Form.Item
                            label="Section Name"
                            name="section"
                            rules={[
                            {
                                required: true,
                                message: 'Please input Section Name!',
                            },
                            ]}
                        >
                            <Input placeholder="Enter Section name" value={name} onChange={(e)=>setName(e.target.value.toUpperCase().trim())}/>
                        </Form.Item>
                        <Form.Item {...coursesLayout}
                            label="Courses"
                            name="Course"
                            rules={[
                            {
                                required: true,
                                message: 'Please select courses!',
                            },
                            ]}
                        >
                                    <MultiSelect
                                        options={options}
                                        value={selected}
                                        onChange={setSelected}
                                        labelledBy={"Select Courses"}
                                        />
                                  
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
                            
                                {departments.map((department)=>{
                                        return <Option value={department.name}>{department.name}</Option>
                                    })}
                            </Select>
                        </Form.Item>}
                        <Form.Item style={{display:'flex',justifyContent:'center'}}>
                             
                                    <Button type="primary"block htmlType="submit">Add Section</Button>
                            
                        </Form.Item>
                        </Form>               
                     </TabPane>
                <TabPane tab="Sections" key="2" >
                   {sections.length?
                   <div>

                    <Row>
                        <Col span={4}offset={2}><h2 className='blue'>Name</h2></Col>
                        {!flag&&<Col span={8}><h2 className='blue'>Department</h2></Col>}
                        <Col span={6}><h2 className='blue'>Courses</h2></Col>
                    </Row>
                    {
                        sections.map((section)=>(
                            <div>
                                {flag?section.department===did&&
                            <Row className='gray' style={{padding:'7px'}}>
                                <Col span={4}><h3>{section.name}</h3></Col>
                               {!flag&&
                                <Col span={8}>
                                    {
                                        departments.map((department)=>{
                                            return department.id===section.department&&
                                            <h3>{department.name}</h3>
                                        })
                                    }
                                   </Col>
                                }
                                <Col span={6}>
                                        {
                                            <Select placeholder='Courses'>
                                               {
                                            section.courses.map((course)=>(
                                               
                                                courses.map((c)=>{
                                                    return c.id===course&&
                                                    <Option value={c.name}>{c.name}</Option>
                                                })
                                                
                                                ))
                                            }
                                               </Select>
                                        }
                                </Col>
                                    
                                <Col span={2}offset={1}>
                                    <Button className='white' onClick={()=>remove_section(section.id)}>
                                        <i className="fa fa-trash blue" aria-hidden="true"></i>
                                    </Button>
                                </Col>
                            </Row>
                            :
                            <Row className='gray' style={{padding:'7px'}}>
                                <Col span={4}offset={2}><h3>{section.name}</h3></Col>
                               {!flag&&
                                <Col span={8}>
                                    {
                                        departments.map((department)=>{
                                            return department.id===section.department&&
                                            <h3>{department.name}</h3>
                                        })
                                    }
                                   </Col>
                                }
                                <Col span={6}>
                                        {
                                            <Select placeholder='Courses'>
                                               {
                                            section.courses.map((course)=>(
                                               
                                                courses.map((c)=>{
                                                    return c.id===course&&
                                                    <Option value={c.name}>{c.name}</Option>
                                                })
                                                
                                                ))
                                            }
                                               </Select>
                                        }
                                </Col>
                                    
                                <Col span={2}offset={1}>
                                    <Button className='white' onClick={()=>remove_section(section.id)}>
                                        <i className="fa fa-trash blue" aria-hidden="true"></i>
                                    </Button>
                                </Col>
                            </Row>
                        }
                        </div>
                        ))
                    }
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
