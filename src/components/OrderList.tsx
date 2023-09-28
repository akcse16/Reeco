import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import { OrderArray } from "../utils/Constant";
import Header from "./global/Header";

const OrderList = () => {
	// calling the global states from the store
	const orders = useStore((state: any) => state.orders);
	const setOrders = useStore((state: any) => state.setOrders);

	useEffect(() => {
		setOrders(OrderArray);
	}, []);
	const navigate = useNavigate();
	return (
		<>
			<Header />
			<div className="wrapper">
				<h2 className="cart_title">Your Cart</h2>
				<div className="table_box">
					<table>
						<thead>
							<tr>
								<th>Order Id</th>
								<th>Supplier</th>
								<th>Shipping Date</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{orders?.map((item: any, index: number) => {
								return (
									<tr
										className=" cursor_pointer"
										key={index}
										onClick={() => navigate(`/order/${index + 1}`)}
									>
										<td>{item.id}</td>
										<td>{item.supplier}</td>
										<td>{item.shipping_date}</td>
										<td>{item.status}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default OrderList;
