import React, { useState } from 'react'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useDispatch } from 'react-redux'

export default function ({ content = '', idx, mode = 'view' }) {
	let type = 'text_answer'
	const dispatch = useDispatch()

	const [editorState, setEditorState] = useState(() => {
		let editorContent = ''
		if (editorContent !== '') {
			return EditorState.createWithContent(
				ContentState.createFromText(editorContent)
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

	function updateField(content) {
		dispatch({
			type: 'question/updateField',
			payload: {
				idx: idx,
				type: type,
				content: content,
			},
		})
	}

	return (
		<>
			{mode === 'view' ? (
				<p className='my-2'>{content.label}</p>
			) : (
				<input
					type='text'
					value={content.label}
					className='border rounded my-2 w-full px-2 py-1 my-2'
					onChange={(e) => updateField({ label: e.target.value })}
				/>
			)}
			<Editor
				editorState={editorState}
				view={mode !== 'answer'}
				wrapperClassName='min-h-1/4'
				toolbarClassName='border border-gray-800 rounded-t mb-0'
				editorClassName='border border-gray-800 rounded-b px-4'
				view={true}
				onEditorStateChange={(e) => handleEditorChange(e)}
			/>
			<div className='mt-4 float-right'>
				{mode === 'exam' ? (
					''
				) : mode === 'view' ? (
					<>
						Score
						<span className='border border-gray-800 rounded ml-4 mb-4 w-12 px-2 py-1'>
							{content.score}
						</span>
					</>
				) : (
					<>
						Score
						<input
							type='text'
							value={content.score}
							className='border border-gray-800 rounded ml-4 mb-4 w-12 px-2 py-1'
							onChange={(e) => updateField({ score: e.target.value })}
						/>
					</>
				)}
			</div>
		</>
	)
}
