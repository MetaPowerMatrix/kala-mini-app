import React, { useState } from 'react'
import { Button, Col, Row, Tag } from 'antd'

const TagsComponent = ({ tags, myTags }:{tags: string[], myTags: (tags: string[])=>void}) =>{
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const handleTagChange = (tag: string, checked: boolean) => {
		const nextSelectedTags = checked
			? [...selectedTags, tag]
			: selectedTags.filter((t) => t !== tag);
		console.log('You are interested in: ', nextSelectedTags);
		setSelectedTags(nextSelectedTags);
		myTags(nextSelectedTags);
	};

	return (
		<>
			<div style={{ height: 120, overflow: 'scroll', width: '100%' }}>
				{tags.map<React.ReactNode>((tag) => (
					<Tag.CheckableTag
						key={tag}
						checked={selectedTags.includes(tag)}
						onChange={(checked) => handleTagChange(tag, checked)}
					>
						<h3 style={{ fontSize: 12 }}>{tag}</h3>
					</Tag.CheckableTag>
				))}
			</div>
		</>
	);
}

export default TagsComponent
