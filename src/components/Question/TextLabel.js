import React, { useState } from 'react'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useDispatch } from 'react-redux'

export default function ({content, idx}) {

  let type = 'text_label'
  const dispatch = useDispatch()

  const [editorState, setEditorState] = useState(() => {
    if (content !== '') {
      return EditorState.createWithContent(
        ContentState.createFromText(content)
      )
    } else {
      return EditorState.createEmpty()
    }
  })

  function handleEditorChange(e) {

    dispatch({
      type: 'question/updateField',
      payload: {
        idx: idx,
        type: type,
        content: e.getCurrentContent().getPlainText(),
        },
    })

    setEditorState(e)

  }

  return (
    <Editor
      editorState={editorState}
      wrapperClassName="min-h-1/4 my-2"
      toolbarClassName="border border-gray-800 rounded-t mb-0"
      editorClassName="border border-gray-800 rounded-b px-4"
      onEditorStateChange={(e) => handleEditorChange(e)}
    />
  )
}
