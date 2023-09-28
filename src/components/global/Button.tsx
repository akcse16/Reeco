import React from "react";
interface ButtonProps {
	type?: any;
	btnTxt: string;
	onClick: () => void;
	btnClass?: string;
	isLoading?: boolean;
	disabled?: boolean;
}
const Button = (props: ButtonProps) => {
	const { type, btnTxt, onClick, btnClass, isLoading, disabled } = props;
	return (
		<button
			type={type || "submit"}
			disabled={disabled}
			onClick={() => {
				if (!isLoading) onClick();
			}}
			className={`common_btn ${btnClass ? btnClass : ""} ${
				disabled ? "disabled" : ""
			}`}
		>
			{isLoading ? "isLoading..." : <>{btnTxt}</>}
		</button>
	);
};

export default Button;
