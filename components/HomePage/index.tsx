import React, {useEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import styles from './HomePage.module.css';
import {FireOutlined, HeartOutlined, NotificationOutlined} from "@ant-design/icons";
import ChangingColorText from "@/components/AniBanner";
import {useGSAP} from "@gsap/react";
import {PatoInfo} from "@/common";
import commandDataContainer from "@/container/command";

// Define types for ref elements
interface HomePageProps {
	activeId: string;
}

const HomePage: React.FC<HomePageProps> = ({activeId}) => {
	const upgradeRef = useRef<HTMLDivElement>(null);
	const trendingVideoRef = useRef<HTMLDivElement>(null);
	const [avatar, setAvatar] = useState('/images/notlogin.png')
	const [userInfo, setUserInfo] = useState<PatoInfo>();
	const command = commandDataContainer.useContainer()
	const images = [
		{ id: 1, url: 'images/ad-1.webp', title: '鸢尾花' },
		{ id: 2, url: 'images/ad-2.webp', title: "春晓" },
		{ id: 3, url: 'images/ad-3.webp', title: '诗人' },
		{ id: 4, url: 'images/splash_image.jpg', title: '海底' },
		{ id: 5, url: 'images/background.jpeg', title: "异星" },
		{ id: 1, url: 'images/ad-1.webp', title: '鸢尾花' },
		{ id: 2, url: 'images/ad-2.webp', title: "春晓" },
		{ id: 3, url: 'images/ad-3.webp', title: '诗人' },
		{ id: 4, url: 'images/splash_image.jpg', title: '海底' },
		{ id: 5, url: 'images/background.jpeg', title: "异星" },
	];

	useEffect(() => {
		command.getPatoInfo(activeId).then((res): void => {
			if ( res !== null){
				setUserInfo(res);
				setAvatar(res.avatar)
			}
		})
	},[activeId]);

	useGSAP(() => {
		// Animate elements when the page loads using GSAP
		if (upgradeRef.current) {
			gsap.from(upgradeRef.current, { y: 30, opacity: 0, duration: 2 });
			gsap.from(trendingVideoRef.current, { y: 50, opacity: 0, duration: 2 });
		}
	}, []);

	return (
		<div className={styles.home_container}>
			<div className={styles.header}>
				<img
					src={avatar}
					className={styles.avatar}
					alt={userInfo?.name ?? ''}
				/>
				<div className={styles.date}>2024年9月20日</div>
				<div className={styles.notification}><NotificationOutlined/></div>
			</div>

			<div style={{overflow: "scroll", height: "95%"}}>
				<div className={styles.upgrade_section} ref={upgradeRef}>
					<div className={styles.upgrade_content}>
						<img src={images[0].url} className={styles.video_thumbnail}/>
						<div style={{padding: 15}}>
							<p>今日特卖： 吐鲁番葡萄</p>
							<p>产地:阿凡提乡 下降指数:1000</p>
							<p>团购热度:988<FireOutlined/> 结束时间:14:00</p>
							<p>当前价格:20元/kg 下降梯度:0.01</p>
							<button className={styles.upgrade_btn}>推一把</button>
							<button className={styles.upgrade_btn}>看一看</button>
						</div>
					</div>
				</div>

				{/* Trending Video Section */}
				<div>
					<div className={styles.trending_video} ref={trendingVideoRef}>
						<div className={styles.category_text}>水果</div>
						<div className={styles.category_text}>肉类</div>
						<div className={styles.category_text}>干果</div>
						<div className={styles.category_text}>美食</div>
					</div>
				</div>
				<div>
					{
						[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
							<div key={index} className="goods">
								<div className={styles.video_item}>
									<img src={images[index].url} className={styles.video_thumbnail}/>
									<div className={styles.video_info}>
										<p>库尔勒香梨</p>
										<button>猜价</button>
										<button>喜欢 <HeartOutlined/></button>
										<button>购买</button>
									</div>
								</div>
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
