import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { HiTemplate } from 'react-icons/hi';
import LayoutOne from '../../../assets/images/template/templateOne.png';
import LayoutTwo from '../../../assets/images/template/templateTwo.png';
import LayoutThree from '../../../assets/images/template/templateThree.png';
import LayoutFour from '../../../assets/images/template/TemplateFour.png'
import TemplateOne from '../TemplateOne/templateOne';
import TemplateTwo from '../TemplateTwo/templateTwo';
import TemplateThree from '../TemplateThree/templateThree';
import TemplateFour  from '../TemplateFour/templateFour';
import TemplateOneSS from '../../../assets/images/template/TemplateOneSS.png';
import TemplateTwoSS from '../../../assets/images/template/TemplateTwoSS.png';
import TemplateThreeSS from '../../../assets/images/template/TemplateThreeSS.png';
import TemplateFourSS from '../../../assets/images/template/TemplateFourSS.png';

function DefaultTemplate() {
  const [showButton, setShowButton] = useState(false);
  const [selectedLayouts, setSelectedLayouts] = useState([]);
  const [hoverButton, setHoverButton] = useState('');

  const handleTemplateSelection = (template) => {
    setSelectedLayouts((prevLayouts) => [...prevLayouts, template]);
    setShowButton(false);
    setHoverButton('');
  };

  const renderSelectedLayouts = () => {
    return selectedLayouts.map((layout, index) => {
      switch (layout) {
        case 'templateOne':
          return <TemplateOne key={index} />;
        case 'templateTwo':
          return <TemplateTwo key={index} />;
        case 'templateThree':
          return <TemplateThree key={index} />;
        case 'templateFour':
          return <TemplateFour/>
        default:
          return null;
      }
    });
  };

  const getImages = () => {
    switch (hoverButton) {
      case 'templateOne':
        return TemplateOneSS;
      case 'templateTwo':
        return TemplateTwoSS;
      case 'templateThree':
        return TemplateThreeSS;
      case 'templateFour':
        return TemplateFourSS;
      default:
        return null;
    }
  };

  return (
    <Container>
      <div>
        <h4 style={{ fontWeight: 'bolder', color: 'gray' }}>Select a Template</h4>
        <div style={{ marginTop: '20px' }}>{renderSelectedLayouts()}</div>
        <Button
          style={{
            fontWeight: 'bolder',
            backgroundColor: 'transparent',
            color: '#514AC9',
            border: 'none',
            marginTop: '10px',
            fontSize: '17px'
          }}
          onClick={() => setShowButton(!showButton)}
        >
          <HiTemplate className="me-1" style={{ fontSize: '20px' }} />
          Add template
        </Button>
      </div>
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
            // onMouseLeave={() => {
            //   setHoverButton('');
            // }}
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
            // onMouseLeave={() => {
            //   setHoverButton('');
            // }}
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
            // onMouseLeave={() => {
            //   setHoverButton('');
            // }}
            onClick={() => handleTemplateSelection('templateThree')}
          >
            <img src={LayoutThree} alt="" style={{ height: '15px', width: '18px', marginRight: '5px' }} />
            Template Three
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
              setHoverButton('templateFour');
            }}
            // onMouseLeave={() => {
            //   setHoverButton('');
            // }}
            onClick={() => handleTemplateSelection('templateFour')}
          >
            <img src={LayoutFour} alt="" style={{ height: '15px', width: '18px', marginRight: '5px' }} />
            Template Four
          </Button>
        </div>
      )}
      {hoverButton && (
        <div style={{ marginTop: '10px' }}>
          <img
            src={getImages()}
            alt="Hovered Template Preview"
            style={{
              maxHeight: '250px',
              maxWidth: '120%',
              border: '1px solid #0000FF',
              borderRadius: '10px',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
            }}
          />
        </div>
      )}      
    </Container>
  );
}

export default DefaultTemplate;
