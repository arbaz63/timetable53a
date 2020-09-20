import React from 'react'
import {Button,Row, Col  } from 'antd';
import 'antd/dist/antd.css';
import pic from '../../images/blue.jpg'
export const LandingPage = () => {
    return (
        <div>
            <Row>
                <Col span={8}offset={2} style={{margin:'auto'}}>
                    <img src={pic} style={{width:'400px',height:'400px'}}/>
                </Col>
                <Col span={8}offset={2} style={{margin:'auto'}}>
            <Row>
                <Col span={16} offset={2}>
                    <a href="/create_timetable"><Button className='landing' block type="primary" size="large">Create Timetable</Button></a>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={16} offset={2}>
                    <a href="/timetables"><Button className='landing' block type="danger" size="large">Saved Timetables</Button></a>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={16} offset={2}>
                    <a href='/edit_timetable'><Button className='landing' block style={{color:'white',background:'black',border:'none'}} size="large">Edit Data</Button></a>
                </Col>
            </Row>

                </Col>
            </Row>
                  
                    
            
        </div>
    )
}
