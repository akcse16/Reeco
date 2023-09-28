import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
	return (
		<header className="d_flex align_items_center justify_content_between">
			<div className="left d_flex align_items_center justify_content_between">
				<Link to="/">Reeco</Link>
				<ul className="links">
					<li>
						<Link to="/">Store</Link>
					</li>
					<li>
						<Link to="/">Orders</Link>
					</li>
					<li>
						<Link to="/">Analytics</Link>
					</li>
				</ul>
			</div>
			<div className="others d_flex align_items_center justify_content_between">
				<div className="cart">
					<span>3</span>
					<img src="/images/buy.png" alt="" />
				</div>
				<div className="user">Hello, James</div>
			</div>
		</header>
	);
};

export default Header;
