import React, { useState } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useDispatch } from 'react-redux'
import { stateToHTML } from 'draft-js-export-html'
import cx from 'classnames'

export default function ({ content = '', idx, mode = 'view' }) {
	let type = 'text_label'
	const dispatch = useDispatch()
	const tempImages = {}

	const [editorState, setEditorState] = useState(() => {
		if (content.label !== '') {
			return EditorState.createWithContent(
				convertFromRaw(JSON.parse(content.label))
			)
		} else {
			return EditorState.createEmpty()
		}
	})

	function updateField() {
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
		//  Handle by file upload
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
			<Editor
				editorState={editorState}
				readOnly={mode === 'view'}
				toolbarHidden={mode === 'view'}
				wrapperClassName='min-h-1/4 mt-2'
				toolbar={{
					embedded: {
						defaultSize: {
							height: 315,
							width: 560,
						},
					},
					image: {
						uploadCallback: handleUploadImage,
						previewImage: true,
					},
				}}
				toolbarClassName='border border-gray-800 rounded-t mb-0'
				editorClassName={cx({
					'border border-gray-800 rounded-b px-4 bg-white': mode !== 'view',
				})}
				onEditorStateChange={(e) => setEditorState(e)}
				onBlur={() => updateField()}
			/>
		</>
	)
}
