import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import { OrderArray } from "../utils/Constant";
import AddProduct from "./AddProduct";
import Button from "./global/Button";
import CommonModal from "./global/CommonModal";
import Header from "./global/Header";

const Order = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// calling the global states from the store
	const orders = useStore((state: any) => state.orders);
	const setOrders = useStore((state: any) => state.setOrders);
	const particularOrder = useStore((state: any) => state.particularOrder);
	const setParticularOrder = useStore((state: any) => state.setParticularOrder);

	// Creating the local state variable
	const [missingModal, setmissingModal] = useState<any>({
		item: {},
		isTrue: false,
	});
	const [addProductModal, setAddProductModal] = useState<any>({
		item: {},
		show: false,
		isEdit: false,
	});

	// Setting up orders when component mounts and updating particular order based on location
	useEffect(() => {
		setOrders(OrderArray);
		let currentOrder =
			parseInt(location.pathname.split("/").splice(-1)?.[0]) - 1;
		setParticularOrder(orders[currentOrder]);
	}, [orders]);

	// Function to handle action on a product (approve/missing)
	const handleAction = (action: string, prod: any) => {
		let tempData = particularOrder;
		let index = tempData.products.findIndex(
			(item: any) => item.name === prod.name
		);
		tempData.products[index].prod_status = action;
		setParticularOrder({ ...tempData });
	};
	// Function to handle product missing action
	const handleMissing = (prod: any) => {
		setmissingModal({ item: prod, isTrue: true });
	};

	// Function to render the product table
	const renderTable = () => {
		return (
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Product Name</th>
						<th>Brand</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{particularOrder?.products?.map((product: any, index: number) => {
						return (
							<tr key={index}>
								<td>
									<img
										src={
											typeof product.image != "string"
												? URL.createObjectURL(product.image)
												: product.image
										}
										alt=""
									/>
								</td>
								<td>{product.name}</td>
								<td>{product.brand}</td>
								<td>${product.price}/6*1LB</td>
								<td>{product.quantity} * 6 *1LB</td>
								<td>{product.total}</td>
								<td>
									<div className="order_action_btn d_flex align_items_center ">
										{product.prod_status !== "pending" && (
											<span className={product.prod_status}>
												{product.prod_status}
											</span>
										)}

										<img
											src="/images/tick.png"
											alt=""
											onClick={() => handleAction("approved", product)}
										/>
										<img
											src="/images/close.png"
											alt=""
											onClick={() => handleMissing(product)}
										/>
										<p
											onClick={() =>
												setAddProductModal({
													show: true,
													isEdit: true,
													item: { product },
												})
											}
										>
											Edit
										</p>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	};
	return (
		<>
			<Header />
			<div className="bredcrum_box">
				<div className="bredcrum">
					Order {">"} <span>{particularOrder?.id}</span>
				</div>
				<div className="bottom_row d_flex align_items_center justify_content_between">
					<h1>{particularOrder?.id}</h1>
					<div className="action_btns d_flex align_items_center">
						<Button
							btnTxt="Back"
							onClick={() => navigate(-1)}
							btnClass="back_btn"
						/>
						<Button
							btnTxt="Approve Order"
							btnClass="green"
							onClick={() => ""}
						/>
					</div>
				</div>
			</div>
			<div className="wrapper">
				<ul className="order_summary">
					<li>
						<div className="title">Supplier</div>
						<p>{particularOrder?.supplier}</p>
					</li>
					<li>
						<div className="title">Shipping Date</div>
						<p>{particularOrder?.shipping_date}</p>
					</li>
					<li>
						<div className="title">Total</div>
						<p>${particularOrder?.total}</p>
					</li>
					<li>
						<div className="title">Category</div>
						<p>
							{particularOrder?.categories?.map(
								(item: string, index: number) => {
									return <span key={index}>{item} &nbsp;</span>;
								}
							)}
						</p>
					</li>
					<li>
						<div className="title">Department</div>
						<p>{particularOrder?.department}</p>
					</li>
					<li>
						<div className="title">Status</div>
						<p>{particularOrder?.status}</p>
					</li>
				</ul>
				<div className="order_detail">
					<div className="top d_flex align_items_center justify_content_between">
						<input type="search" placeholder="Search..." className="search" />
						<div className="actions d_flex align_items_center justify_content_between">
							<Button
								btnTxt="Add Item"
								onClick={() =>
									setAddProductModal({
										show: true,
										isEdit: false,
									})
								}
							/>
							<img src="/images/printer.png" width={20} alt="" />
						</div>
					</div>
					<div className="table_box">{renderTable()}</div>
				</div>
			</div>

			{missingModal.isTrue && (
				<CommonModal
					title={"Missing Modal"}
					onClose={() => setmissingModal({ isTrue: false, item: {} })}
					desc={`Is '${missingModal.item.name}' urgent? `}
					onSubmit={() => {
						handleAction("missing-urgent", missingModal.item);
						setmissingModal({ isTrue: false, item: {} });
					}}
					onCancel={() => {
						handleAction("missing", missingModal.item);
						setmissingModal({ isTrue: false, item: {} });
					}}
				/>
			)}

			{addProductModal.show && (
				<AddProduct
					onClose={() =>
						setAddProductModal({ show: false, item: {}, isEdit: false })
					}
					isEdit={addProductModal.isEdit}
					item={addProductModal?.item?.product}
					particularOrder={particularOrder}
				/>
			)}
		</>
	);
};

export default Order;
