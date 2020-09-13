import React, { useState } from 'react'
import ReactTags from 'react-tag-autocomplete'
import { Style } from 'react-style-tag'
import matchSorter from 'match-sorter'

export default function ({
	tags,
	setTags,
	suggestions,
	minInputLength = 2,
	width = 'w-full',
	allowNew = false,
}) {
	return (
		<>
			<ReactTags
				tags={tags}
				suggestions={suggestions}
				suggestionsTransform={(query, suggestions) => {
					const added = tags.map((tag) => tag.name)

					const suggested = suggestions.filter((tag) => {
						return added.indexOf(tag.name) == -1
					})

					return matchSorter(suggested, query, { keys: ['name'] })
				}}
				onDelete={(i) => {
					const newTags = tags.slice(0)
					newTags.splice(i, 1)
					setTags(newTags)
				}}
				onAddition={(tag) => {
					const newTags = [].concat(tags, tag)
					setTags(newTags)
				}}
				classNames={{
					root:
						'relative p-1 border rounded border-black bg-white inline-block align-top   ' +
						width,
					selected: 'p-1 inline',
					selectedTag:
						'border rounded border-gray-600 p-1 inline-block bg-white mr-1 mb-1 selected-tag',
					search: 'inline-block px-1 max-w-full',
					searchWrapper: 'max-w-full',
					searchInput: 'p-1 border rounded border-gray-600',
					suggestions:
						'p-1 absolute mt-1 bg-white border-black border rounded max-w-full z-10',
					suggestionActive: 'bg-blue-200',
				}}
				autoresize={false}
				minQueryLength={minInputLength}
				allowNew={allowNew}
			/>
			<Style>{`
              .selected-tag:after {
                content: '\u2715';
                color: #AAA;
                margin-left: 8px;
              }
          `}</Style>
		</>
	)
}
