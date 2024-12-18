import React, { useState } from 'react';
import { Editor } from 'primereact/editor';
function TemplateOne() {
  const [text, setText] = useState('');

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <div
        className="card"
        style={{
        //   display:"flex",
        //   justifyContent:"center",
        //   alignItems:"center",
          minWidth: '80%',
          padding: '30px',
          borderRadius: '10px'
        }}
      >
        <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} />
      </div>
    </div>
  );
}

export default TemplateOne;
