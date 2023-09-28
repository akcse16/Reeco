import React from "react";
import { Route, Routes } from "react-router-dom";
import Order from "../components/Order";
import OrderList from "../components/OrderList";

const RouteStack = () => {
	return (
		<Routes>
			<Route path="/orderlisting" element={<OrderList />} />
			<Route path={`/order/:id`} element={<Order />} />
			<Route path="/" element={<OrderList />} />
		</Routes>
	);
};

export default RouteStack;
