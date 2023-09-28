import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useStore from "../store/useStore";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "./global/Button";
import { AddProductValidation } from "./global/FormValidation";
import { EditReasons } from "../utils/Constant";

// Defining the types of properties that AddProduct component receives
interface AddProductProps {
	onClose?: any;
	particularOrder?: number;
	isEdit?: boolean;
	item?: any;
}
// Defining the types of form values
interface FormValues {
	name: string;
	brand: string;
	price: number;
	quantity: number;
	image: any;
}
const AddProduct = (props: AddProductProps) => {
	const { onClose, particularOrder, item, isEdit } = props;
	// calling the global states from the store
	const setParticularOrder = useStore((state: any) => state.setParticularOrder);

	// Creating the local state variable
	const [reason, setReason] = useState("");
	const {
		handleSubmit,
		register,
		formState: { errors },
		watch,
		setValue,
		reset,
	} = useForm<FormValues>({
		defaultValues: {
			name: "",
			brand: "",
			price: 0,
			image: "",
			quantity: 0,
		},
		resolver: yupResolver(AddProductValidation),
		mode: "onSubmit",
	});

	// Effect to reset form fields when in edit mode
	useEffect(() => {
		if (isEdit) {
			reset(item);
		}
	}, [isEdit]);

	// Function to decrease quantity
	const decreaseQuantity = () => {
		if (watch("quantity") > 0) {
			setValue("quantity", watch("quantity") - 1);
		} else {
			alert("quantity must be greater then 0");
		}
	};
	// Function to increase quantity
	const increaseQuantity = () => {
		setValue("quantity", watch("quantity") + 1);
	};
	// Function to handle form submission
	const handleSend = () => {
		handleSubmit((data) => {
			const decoData = {
				...data,
				image: data.image[0],
				total: data.price * data.quantity,
				status: "pending",
			};
			let tempData: any = particularOrder;
			if (isEdit) {
				let index = tempData?.products.findIndex(
					(prod: any) => prod.name == item.name
				);
				tempData.products[index].price = decoData.price;
				tempData.products[index].quantity = decoData.quantity;
				tempData.products[index].total = decoData.total;
			} else {
				tempData?.products.push(decoData);
				setParticularOrder(tempData);
			}
			onClose();
		})();
	};

	return (
		<div className={"modal show"}>
			<div className={" add_modal modal-section"}>
				<div className="modal-top-part">
					<button className="close">
						<img src="/images/close.png" alt="" onClick={onClose} />
					</button>
					<div className="form_group">
						<input
							{...register("name")}
							type="text"
							placeholder="Enter product name"
							disabled={isEdit}
						/>
					</div>
					<>
						{errors.name && (
							<span className="danger">{errors?.name?.message}</span>
						)}
					</>
					<div className="form_group">
						<input
							{...register("brand")}
							type="text"
							placeholder="Enter your brand"
							disabled={isEdit}
						/>
					</div>
					<>
						{errors.brand && (
							<span className="danger">{errors?.brand?.message}</span>
						)}
					</>
					<div className="form_row d_flex">
						<div className="imgb">
							{isEdit ? (
								<img
									src={
										typeof item?.image != "string"
											? URL.createObjectURL(item?.image)
											: item?.image
									}
									width={200}
								/>
							) : (
								<div className="form_group">
									<input {...register("image")} type="file" />
								</div>
							)}
						</div>
						<div className="right_box">
							<div className="form_group">
								<label>Price ($)</label>
								<div>
									<input
										{...register("price")}
										type="number"
										placeholder="Enter the price"
									/>{" "}
									/ 6 * 1LB
								</div>
							</div>
							<>
								{errors.price && (
									<span className="danger">{errors?.price?.message}</span>
								)}
							</>
							<div className="form_group">
								<label>Quantity</label>
								<div className="d_flex align_items_center quantity_box">
									<button onClick={decreaseQuantity}> - </button>
									<input
										{...register("quantity")}
										type="number"
										placeholder="0"
									/>
									<button onClick={increaseQuantity}> + </button>
								</div>
								/ 6 * 1LB
							</div>
							<>
								{errors.quantity && (
									<span className="danger">{errors?.quantity?.message}</span>
								)}
							</>
							<div className="form_group">
								<label>Total</label>
								<p>{watch("price") * watch("quantity")}</p>
							</div>
						</div>
					</div>
					{isEdit && (
						<>
							<h4>
								Choose reason <span>(Optional)</span>
							</h4>
							<ul className="edit_reason">
								{EditReasons.map((item, index) => {
									return (
										<li
											className={reason === item ? "green" : ""}
											key={index}
											onClick={() => {
												setReason(item);
											}}
										>
											{item}
										</li>
									);
								})}
							</ul>
						</>
					)}
				</div>
				<div className="options d_flex align_items_center">
					<Button btnTxt="Cancel" onClick={onClose} />
					<Button btnTxt="Send" btnClass="green" onClick={handleSend} />
				</div>
			</div>
		</div>
	);
};

export default AddProduct;
