import React from 'react';
import {Card} from "antd";
import Meta from "antd/es/card/Meta";
import {MessageCategory} from "@/common";

const CardReply = ({imageUrl, message}:{message: string, imageUrl: string}) => {
	return (
		<>
			<Card
				style={{ width: 240, boxShadow: "0 0 5px #79c5c5aa", marginLeft: "auto"}}
				cover={<img height={60} alt="example" src={imageUrl} />}
			>
				<Meta description={message} />
			</Card>
		</>
	);
}
const HumanQuestion = ({message}:{message: string}) => {
	return (
		<Card style={{ width: 240, boxShadow: "0 0 5px #79c5c5aa" }}>
			<Meta description={message} />
		</Card>
	);
}


const AiReplyComponent = ({category, imageUrl, message}:{category: MessageCategory, message: string, imageUrl: string}) => {
	return (
		<>
			{
				category === MessageCategory.Card && <CardReply imageUrl={imageUrl} message={message}/>
			}
			{
				category === MessageCategory.Human && <HumanQuestion message={message}/>
			}
		</>
	);
}

export default AiReplyComponent
