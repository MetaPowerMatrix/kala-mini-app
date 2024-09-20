import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './HomePage.module.css';
import {FireOutlined, HeartOutlined} from "@ant-design/icons";
import {Divider} from "antd";
import ChangingColorText from "@/components/AniBanner";
import {useGSAP} from "@gsap/react";

// Define types for ref elements
interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
	const upgradeRef = useRef<HTMLDivElement>(null);
	const trendingVideoRef = useRef<HTMLDivElement>(null);
	const images = [
		{ id: 1, url: 'images/yuanweihua.jpeg', title: '鸢尾花' },
		{ id: 2, url: 'images/chunxiao.jpg', title: "春晓" },
		{ id: 3, url: 'images/two-poets.png', title: '诗人' },
		{ id: 4, url: 'images/splash_image.jpg', title: '海底' },
		{ id: 5, url: 'images/background.jpeg', title: "异星" },
		{ id: 1, url: 'images/yuanweihua.jpeg', title: '鸢尾花' },
		{ id: 2, url: 'images/chunxiao.jpg', title: "春晓" },
		{ id: 3, url: 'images/two-poets.png', title: '诗人' },
		{ id: 4, url: 'images/splash_image.jpg', title: '海底' },
		{ id: 5, url: 'images/background.jpeg', title: "异星" },
	];

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
				<div className={styles.avatar}/>
				<div className={styles.date}>2024年9月20日</div>
				<div className={styles.notification}/>
			</div>

			<div style={{color: "#eeb075", textAlign:"center"}}>
				<h4>你今天的幸运色是黄色</h4>
			</div>

			{/* Upgrade Pro section */}
			<div className={styles.upgrade_section} ref={upgradeRef}>
				<div className={styles.upgrade_content}>
					<p>今日特卖： 吐鲁番葡萄</p>
					<p>产地:阿凡提乡 下降指数:1000</p>
					<p>团购热度:988<FireOutlined/> 结束时间:14:00</p>
					<p>当前价格:20元/kg 下降梯度:0.01</p>
					<button className={styles.upgrade_btn}>推一把</button>
					<button className={styles.upgrade_btn}>看一看</button>
					<button className={styles.upgrade_btn}>顶一下</button>
				</div>
				<div className={styles.upgrade_icon}>
					<div className={styles.play_icon}/>
				</div>
			</div>

			{/* Trending Video Section */}
			<div className={styles.trending_video} ref={trendingVideoRef}>
				<img src={"images/texture-2.png"} alt={"tag"}/>
				<ChangingColorText text="发现新疆好物" fontSize={12}/>
				<img src={"images/texture-2.png"} alt={"tag"}/>
			</div>
			<div style={{overflow: "scroll", height: 340}}>
				{
					[1,2,3,4,5,6,7,8,9,10].map((item, index) => (
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
	);
};

export default HomePage;
