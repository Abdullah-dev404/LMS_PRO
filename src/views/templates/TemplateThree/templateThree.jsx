import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { IoIosAddCircle } from 'react-icons/io';
import { MdOutlineQuiz } from 'react-icons/md';
import { FaImage } from 'react-icons/fa';
import { CiText } from 'react-icons/ci';
import Quiz from '../../quiz/quiz';
import TextEditor from 'components/TextEditor/texteditor';
import SelectImage from 'components/SelectImage/selectImage';
import SelectVedio from 'components/SelectVedio/selectVideo'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Container } from 'react-bootstrap';
import { MdOutlineVideoLibrary } from 'react-icons/md';

function TemplateThree() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addComponent = (component) => {
    setSelectedComponents((prev) => [...prev, component]);
    handleClose();
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.index === source.index) return;

    const reorderedComponents = Array.from(selectedComponents);
    const [removed] = reorderedComponents.splice(source.index, 1);
    reorderedComponents.splice(destination.index, 0, removed);

    setSelectedComponents(reorderedComponents);
  };

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {selectedComponents.map((component, index) => {
                return (
                  <Draggable key={index} draggableId={String(index)} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{marginTop:"10px"}}
                        >

                        {component === 'quiz' && <Quiz/>}
                        {component === 'image' && <SelectImage/>}
                        {component === 'textEditor' && <TextEditor/>}
                        {component === 'video' && <SelectVedio/>}
        
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ color: '#514AC9', marginTop: '20px' }}
      >
        <IoIosAddCircle style={{ fontSize: '20px', marginRight: '5px' }} />
        <b style={{fontSize:"15px"}} > Add content type </b>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => addComponent('quiz')}>
          <MdOutlineQuiz style={{ marginRight: '5px' }} />
          <b>Quiz</b>
        </MenuItem>

        <MenuItem onClick={() => addComponent('image')}>
          <FaImage style={{ marginRight: '5px' }} />
          <b>Image</b>
        </MenuItem>

        <MenuItem onClick={() => addComponent('textEditor')}>
          <CiText style={{ marginRight: '5px' }} />
          <b>Text Editor</b>
        </MenuItem>

        
        <MenuItem onClick={() => addComponent('video')}>
          <MdOutlineVideoLibrary style={{ marginRight: '5px' }} />
          <b>Video</b>
        </MenuItem>
      </Menu>
    </Container>
  );
}

export default TemplateThree;
