import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { HiTemplate } from 'react-icons/hi';
import LayoutOne from '../../../../assets/images/template/templateOne.png';
import LayoutTwo from '../../../../assets/images/template/templateTwo.png';
import LayoutThree from '../../../../assets/images/template/templateThree.png';
import TemplateOne from 'views/templates/templateOne';
import TemplateTwo from 'views/templates/templateTwo';
import TemplateThree from 'views/templates/templateThree';
import TemplateOneSS from '../../../../assets/images/template/TemplateOneSS.png';
import TemplateTwoSS from '../../../../assets/images/template/TemplateTwoSS.png';
import TemplateThreeSS from '../../../../assets/images/template/TemplateThreeSS.png';

function DefaultTemplate() {
  const [showButton, setShowButton] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState('');
  const [startButton, setStartButton] = useState(true);
  const [hoverButton, setHoverButton] = useState('');

  const handleTemplateSelection = (template) => {
    setSelectedLayout(template);
    setShowButton(false);
    setStartButton(false);
    setHoverButton("")
  };

  const renderSelectedLayout = () => {
    switch (selectedLayout) {
      case 'templateOne':
        return <TemplateOne />;
      case 'templateTwo':
        return <TemplateTwo />;
      case 'templateThree':
        return <TemplateThree />;
      default:
        return null;
    }
  };

  const getImages = () => {
    switch (hoverButton) {
      case 'templateOne':
        return TemplateOneSS;
      case 'templateTwo':
        return TemplateTwoSS;
      case 'templateThree':
        return TemplateThreeSS;
      default:
        return null;
    }
  };
  return (
    <Container>
      {/* {startButton && ( */}
      <div>
        <h4 style={{ fontWeight: 'bolder', color: 'gray' }}>Select a Template</h4>
        <Button
          style={{
            fontWeight: 'bolder',
            backgroundColor: 'transparent',
            color: '#514AC9',
            border: 'none',
            marginTop: '10px',
            fontSize: '15px'
          }}
          onClick={() => setShowButton(!showButton)}
        >
          <HiTemplate className="me-1" style={{ fontSize: '20px' }} />
          Quick Start Editing
        </Button>
      </div>
      {/* )} */}
      {showButton && (
        <div
          className="TemplateButtons"
          style={{
            display: 'flex',
            marginTop: '10px'
          }}
        >
          <Button
            variant="outline-primary"
            style={{
              fontWeight: 'bolder',
              backgroundColor: '#ECECFF',
              color: '#514AC9',
              border: '1px solid #514AC9',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={() => {
              setHoverButton('templateOne');
            }}
            onMouseLeave={() => {
              setHoverButton('');
            }}
            onClick={() => handleTemplateSelection('templateOne')}
          >
            <img src={LayoutOne} alt="" style={{ height: '15px', width: '18px', marginRight: '5px' }} />
            Template One
          </Button>

          <Button
            variant="outline-primary"
            style={{
              fontWeight: 'bolder',
              backgroundColor: '#ECECFF',
              color: '#514AC9',
              border: '1px solid #514AC9',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={() => {
              setHoverButton('templateTwo');
            }}
            onMouseLeave={() => {
              setHoverButton('');
            }}
            onClick={() => handleTemplateSelection('templateTwo')}
          >
            <img src={LayoutTwo} alt="" style={{ height: '15px', width: '18px', marginRight: '5px' }} />
            Template Two
          </Button>

          <Button
            variant="outline-primary"
            style={{
              fontWeight: 'bolder',
              backgroundColor: '#ECECFF',
              color: '#514AC9',
              border: '1px solid #514AC9',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={() => {
              setHoverButton('templateThree');
            }}
            onMouseLeave={() => {
              setHoverButton('');
            }}
            onClick={() => handleTemplateSelection('templateThree')}
          >
            <img src={LayoutThree} alt="" style={{ height: '15px', width: '18px', marginRight: '5px' }} />
            Template Three
          </Button>
        </div>
      )}

      {hoverButton && (
        <div style={{marginTop: '10px'}}>
          <img src={getImages()} alt="Hovered Template Preview" 
          style={{ maxHeight: '250px', maxWidth: '120%',border:"1px solid #0000FF",borderRadius:"10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} />
        </div>
      )}

      {/* Render the selected template */}
      <div style={{ marginTop: '20px' }}>{renderSelectedLayout()}</div>
    </Container>
  );
}

export default DefaultTemplate;
