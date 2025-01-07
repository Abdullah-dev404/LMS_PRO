import React, { useEffect, useState, useContext } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './textEditor.css';
import { Button } from 'react-bootstrap';
import { stateToHTML } from 'draft-js-export-html';
import { v4 as uuidv4 } from 'uuid'; 
import { useLocation } from 'react-router';
import TemplateStore from 'views/templates/TemplateStore';

function ContentEditor({box}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { contentJson, setContentJson } = useContext(TemplateStore);

  const useQuery = () => new URLSearchParams(useLocation().search)
  const Query = useQuery()
  const section_id = Query.get('sectionId')

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const rawContent = convertToRaw(editorState.getCurrentContent());
  const contentHTML = stateToHTML(editorState.getCurrentContent());
  
  const saveTextData = ()=>{
    const textData = {
      textId: uuidv4(),  
      sectionId:section_id,
      content: contentHTML,  
    };

    setContentJson((prevContentJson)=>{
      return{
        ...prevContentJson,
        template:{
            ...prevContentJson?.template,
            boxes:{
              ...prevContentJson.template?.boxes,
              [box]:{
                ...prevContentJson.template.boxes?.[box],
                contentType:'text',
                boxContent:textData
              }
            }
        }
      }
    })

  

}

  return (
    <div className='container textEditorModule'
    style={{
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
      <Button className="mt-3 save-content" onClick={saveTextData}>
        Save Content
      </Button>
    </div>
  );
}

export default ContentEditor;
