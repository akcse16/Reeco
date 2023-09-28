import * as Yup from "yup";

export const AddProductValidation = Yup.object().shape({
	name: Yup.string().required("Product name is required"),
	brand: Yup.string().required("Brand name is required"),
	price: Yup.number()
		.required("Price is required")
		.min(1, "Price must be greater than 0"),
	image: Yup.mixed().required("Please select a file"),

	quantity: Yup.number()
		.required("Quantity is required")
		.min(1, "Quantity must be greater than 0"),
});
