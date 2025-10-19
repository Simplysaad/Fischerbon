// DraftEditor.js
import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

const DraftEditor = ({ onChange, initialContent }) => {
  const [editorState, setEditorState] = useState(
    initialContent
      ? EditorState.createWithContent(initialContent)
      : EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
    if (onChange) {
      const contentState = state.getCurrentContent();
      onChange(convertToRaw(contentState));
    }
  };

  return (
    <div
      style={{ border: '1px solid #ccc', minHeight: '6em', padding: '10px' }}
    >
      <Editor editorState={editorState} onChange={handleEditorChange} />
    </div>
  );
};

export default DraftEditor;
