import {Button, Card, Col, Descriptions, Divider, Flex, Modal, Row, Timeline} from "antd";
import utilStyles from "@/styles/utils.module.css";
import {
	GoldFilled,
	InfoCircleFilled,
	QrcodeOutlined, ShareAltOutlined,
	TagsOutlined
} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import commandDataContainer from "@/container/command";
import {useTranslations} from "next-intl";
import {PatoInfo} from "@/common";
import styles from './HeaderPanelMobile.module.css'
import SubscriptionsComponent from "@/components/Subscriptions";
import QRCodeComponent from "@/components/QRCode";
import Meta from "antd/es/card/Meta";
import TagsComponent from "@/components/tags";
import ImageTagsComponent from "@/components/ImageTags";
import SlidePanel from "@/components/SlidePanel";

const HeaderPanelMobile = ({activeId, onChangeId, onShowProgress}:
   {activeId:string,
	   onShowProgress: (s: boolean)=>void,
	   onChangeId: (s: boolean)=>void,
	 }) =>
{
	const [userInfo, setUserInfo] = useState<PatoInfo>();
	const command = commandDataContainer.useContainer()
	const [showSubscription, setShowSubscription] = useState<boolean>(false)
	const [openCode, setOpenCode] = useState(false);
	const [openPanel, setOpenPanel] = useState<boolean>(false)
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const t = useTranslations('Login');

	const aiCharacterTags: string[] = ["情感", "历史", "游戏", "婚恋", "科技", "投资", "职业", "音乐", "助手"]
	const achievementTags: string[] = ["金牌", "银牌", "铜牌"]
	const fansTags: string[] = ["粉丝", "关注", "好友", "好友", "好友", "好友"]

	const tagsHead = ()=>{
		return(
			<>
				<TagsOutlined style={{fontWeight: "bold", color: "#eeb075", fontSize: 14}}/>
				<span style={{marginLeft: 5, fontWeight: "bold", color: "#eeb075", fontSize: 12}}>我的标签</span>
			</>
		)
	}

	const awardHead = ()=>{
		return(
			<>
				<GoldFilled style={{fontWeight: "bold", color: "#eeb075", fontSize: 14}}/>
				<span style={{marginLeft: 5, fontWeight: "bold", color: "#eeb075", fontSize: 12}}>我的勋章</span>
			</>
		)
	}

	const relationshipHead = (title: string)=>{
		return(
			<>
				<ShareAltOutlined style={{fontWeight: "bold", color: "#eeb075", fontSize: 14}}/>
				<span style={{marginLeft: 5, fontWeight: "bold", color: "#eeb075", fontSize: 12}}>{title}</span>
			</>
		)
	}

	const infoHead = ()=>{
		return(
			<>
				<InfoCircleFilled style={{fontWeight: "bold", color: "#eeb075", fontSize: 14}}/>
				<span style={{marginLeft: 5, fontWeight: "bold", color: "#eeb075", fontSize: 14}}>我的资料</span>
			</>
		)
	}

	const pad = function(src: Number, size: number) {
		let s = String(src);
		while (s.length < (size || 2)) {s = "0" + s;}
		return s;
	};
	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			console.log('Text copied to clipboard');
		} catch (err) {
			console.error('Failed to copy text to clipboard: ', err);
		}
	};
	useEffect(() => {
		command.getPatoInfo(activeId).then((res): void => {
			if ( res !== null){
				setUserInfo(res);
			}
		})
		command.getPatoISS(activeId).then((res) => {
			if (res !== undefined){
				setSelectedTags([res.currently])
			}
		})
	},[activeId]);

	return (
		<header className={styles.header_panel_mobile_container}>
			<div className={styles.header_user}>
				<Row align={"middle"}>
					<Col span={5} style={{textAlign:"center"}}>
						<img
							src="/images/notlogin.png"
							className={utilStyles.borderCircle}
							height={72}
							width={72}
							alt={userInfo?.name ?? ''}
						/>
					</Col>
					<Col span={13}>
						<h5 className={utilStyles.headingLg}>
							{userInfo?.name}
						</h5>
						<h5>{t("Balance")}: {userInfo?.balance.toString()}</h5>
						{/*<h5>{t("RegisteredTime")}: {userInfo?.registered_datetime}</h5>*/}
						{/*<h5>{t("SN")}: {pad(userInfo === undefined ? 0 : userInfo.sn, 5).toString()}</h5>*/}

						{/*<a onClick={() => {*/}
						{/*	copyToClipboard(userInfo?.id ?? '')*/}
						{/*	Modal.success({*/}
						{/*		content: ("已复制ID")*/}
						{/*	})*/}
						{/*}}>{userInfo?.id === undefined ? '' : userInfo?.id.substring(0, 14) + '...' + userInfo?.id.substring(28, 36)}</a>*/}
					</Col>
					<Col span={5} style={{textAlign: "end"}}>
						<QrcodeOutlined style={{fontSize: 36}} onClick={()=>setOpenPanel(true)}/>
					</Col>
				</Row>
			</div>

			<div className={styles.header_panel_mobile_info}>
			<Card bodyStyle={{padding:5}} style={{marginLeft: 20, marginRight: 20, top: 105, zIndex: 3, position: "absolute", height: 550, overflow: "scroll"}}>
					<Meta title={tagsHead()}/>
					<div style={{padding: 20}}>
						<TagsComponent height={60} tags={aiCharacterTags} myTags={(tags) => {
							setSelectedTags(tags)
						}}/>
					</div>

					<Meta title={awardHead()}/>
					<div style={{padding: 20}}>
						<ImageTagsComponent height={80} tags={achievementTags}/>
					</div>

					<Meta title={relationshipHead("我的粉丝")}/>
					<div style={{padding: 20}}>
						<ImageTagsComponent height={80} tags={fansTags}/>
					</div>

					<Meta title={relationshipHead("我的关注")}/>
					<div style={{padding: 20}}>
						<ImageTagsComponent height={80} tags={fansTags}/>
					</div>
				</Card>
			</div>
			<SlidePanel activeId={activeId} isOpen={openPanel}  onClose={()=> setOpenPanel(false)}>
				<QRCodeComponent id={activeId}/>
			</SlidePanel>
				{/*<Row style={{padding:10}}>*/}
				{/*	<Col span={24}>*/}
				{/*		<Button style={{width: "100%"}} type={"primary"} onClick={() => onChangeId(false)}>切换账号</Button>*/}
				{/*	</Col>*/}
				{/*</Row>*/}
			<SubscriptionsComponent mobile={false} id={activeId} onClose={() => setShowSubscription(false)} visible={showSubscription} onShowProgress={onShowProgress}/>
		</header>
	)
}

export default HeaderPanelMobile
