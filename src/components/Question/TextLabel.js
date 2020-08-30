import React, { useState } from 'react'
import {
	EditorState,
	ContentState,
	convertToRaw,
	convertFromRaw,
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useDispatch } from 'react-redux'
import { stateToHTML } from 'draft-js-export-html'

export default function ({ content = '', idx, mode = 'view' }) {
	let type = 'text_label'
	const dispatch = useDispatch()
	const [tempImages, setTempImages] = useState([])

	const [editorState, setEditorState] = useState(() => {
		if (content.label !== '') {
			return EditorState.createWithContent(
				convertFromRaw(JSON.parse(content.label))
			)
		} else {
			return EditorState.createEmpty()
		}
	})

	function updateField(e) {
		dispatch({
			type: 'question/updateField',
			payload: {
				idx: idx,
				type: type,
				content: {
					label: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
				},
			},
		})
	}

	function handleUploadImage(file) {
		return new Promise((resolve, reject) => {
			const formData = new FormData()
			formData.append('ownerType', 'Question')
			formData.append('image', file)

			fetch(`${process.env.REACT_APP_API_URL}/file/store`, {
				method: 'POST',
				headers: new Headers({
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				}),
				body: formData,
			})
				.then((res) => {
					resolve(res.json())
				})
				.catch((err) => reject(err))
		})
	}

	return (
		<>
			{mode === 'view' ? (
				<div
					dangerouslySetInnerHTML={{
						__html: stateToHTML(editorState.getCurrentContent()),
					}}
				></div>
			) : (
				<Editor
					editorState={editorState}
					wrapperClassName='min-h-1/4 mt-2'
					toolbarHidden={mode === 'view'}
					toolbar={{
						image: {
							uploadCallback: handleUploadImage,
							previewImage: true,
						},
					}}
					toolbarClassName='border border-gray-800 rounded-t mb-0'
					editorClassName='border border-gray-800 rounded-b px-4 bg-white'
					onEditorStateChange={(e) => setEditorState(e)}
					onBlur={() => updateField()}
				/>
			)}
		</>
	)
}
