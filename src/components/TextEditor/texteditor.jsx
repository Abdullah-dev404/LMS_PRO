import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './textEditor.css';
import { Button } from 'react-bootstrap';
import { stateToHTML } from 'draft-js-export-html';
import { v4 as uuidv4 } from 'uuid'; 

function ContentEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };


  const getData = () => {
 
    const rawContent = convertToRaw(editorState.getCurrentContent());
    console.log(rawContent)

    
    const contentHTML = stateToHTML(editorState.getCurrentContent());

    const data = {
      id: uuidv4(),  
      content: contentHTML,  
      createdOn: new Date().toISOString(), 
    };

    console.log(data); 
}

  return (
    <div className='container textEditorModule'
    style={{
      maxWidth: '1000px',
      backgroundColor: '#FFFFFF',
      height: 'auto',
      padding: '35px',
      borderRadius: '20px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
    }}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />
      <Button className="mt-3 save-content" onClick={getData}>
        Save Content
      </Button>
    </div>
  );
}

export default ContentEditor;
