import React, { useState } from 'react'
import { EditorState, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function QuestionText(props) {
  const [editorState, setEditorState] = useState(() => {
    if (props.content) {
      return EditorState.createWithContent(
        ContentState.createFromText(props.content)
      )
    } else {
      return EditorState.createEmpty()
    }
  })

  return (
    <Editor
      editorState={editorState}
      wrapperClassName="min-h-1/4"
      toolbarClassName="border border-gray-800 rounded-t mb-0"
      editorClassName="border border-gray-800 rounded-b px-4 py-2"
      onEditorStateChange={setEditorState}
    />
  )
}
