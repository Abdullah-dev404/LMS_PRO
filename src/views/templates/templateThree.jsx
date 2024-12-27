import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineQuiz } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { CiText } from "react-icons/ci";
import "./template.css"
import Quiz from "../quiz/quiz"
import TextEditor from 'components/TextEditor/texteditor'
import SelectImage from "components/SelectImage/selectImage"
function TemplateThree() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedComponents, setSelectedComponents] = useState([])
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const addComponent =(component)=>{
        setSelectedComponents((prev)=>[...prev,component])
        handleClose()
    }
    return (
        <div className='container'
        style={{maxWidth: '1000px',}}
        >
        <div>
            {selectedComponents.map((component,index)=>{
                if(component === "quiz") return <Quiz key={index }/>
                if(component === "image") return <SelectImage key={index}/>
                if(component === "textEditor") return <TextEditor key={index}/>
            })}
        </div>
        <Button
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{color:"#514AC9", marginTop:"20px"}}
          >
            <IoIosAddCircle style={{fontSize:"20px", marginRight:"5px"}}/>
          <b> Add content type </b>
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
          <MenuItem onClick={()=>addComponent("quiz")} >
          <MdOutlineQuiz style={{marginRight:"5px"}}/>
           <b>Quiz</b> </MenuItem>
          
          <MenuItem onClick={()=>addComponent("image")}> 
          <FaImage style={{marginRight:"5px"}}/> 
          <b>Image</b> </MenuItem>
          
          <MenuItem onClick={()=>addComponent("textEditor")}>
          <CiText style={{marginRight:"5px"}}/> 
          <b>Text Editor</b> </MenuItem>
        </Menu>
      </div>
    )
}

export default TemplateThree