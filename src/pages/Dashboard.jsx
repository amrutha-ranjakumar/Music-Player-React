import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Myproject from '../components/Myproject'

function Dashboard() {
  return (
    <div >



      <Row>
        <Col md={12} lg={12} style={{ backgroundColor: '#1a0006', color: '#fff' }}>
          <Myproject />
        </Col>

      </Row>





    </div>
  )
}

export default Dashboard