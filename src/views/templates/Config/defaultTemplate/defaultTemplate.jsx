import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { HiTemplate } from 'react-icons/hi';
import LayoutOne from '../../../../assets/images/template/templateOne.png';
function DefaultTemplate() {
  return (
    <Container>
      <h4 style={{fontWeight:'bolder',color:'gray'}}>Select an Temlate</h4>
      <Button 
      style={{ 
        fontWeight: 'bolder', 
        backgroundColor: 'transparent', 
        color: '#514AC9', 
        border: 'none',
        marginTop:'10px',
        fontSize:"15px"
         }}>
        <HiTemplate className="me-1" style={{ fontSize: '20px' }} />
        Quick Start ediiting
      </Button>
      
      <div className="TemplateButtons">
        <Button
        variant="outline-primary "
          style={{ 
            fontWeight: 'bolder',
            backgroundColor: '#ECECFF',
            color: '#514AC9', 
            border:"1px solid #514AC9",
            fontSize:"15px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
             }}
        >
          <img src={LayoutOne} alt="" style={{height:"15px",width:"18px", marginRight:"5px"}}/>
          Template One
        </Button>
      </div>
    </Container>
  );
}

export default DefaultTemplate;
