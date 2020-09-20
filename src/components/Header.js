import React from 'react'
import { Row, Col  } from 'antd';
import 'antd/dist/antd.css';
import logo from '../images/logo.png'
export const Header = () => {
    return (
        <div>
            <Row className='head' style={{background:'#3385ff',padding:'5px'}}>
                <Col span={2}offset={1}>
                   <a href="/"> <img src={logo} style={{width:'70x',height:'30px',marginTop:'5px'}}/></a>
                </Col>
                <Col span={12}offset={1}>
                    <h1 style={{fontSize:'1.5rem',color:'white'}}>Timetable Generator</h1>
                </Col>
            </Row>
        </div>
    )
}
