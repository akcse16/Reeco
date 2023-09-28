import React from "react";
interface CommonModalInterFace {
	onSubmit?: any;
	title?: string;
	desc?: string;
	onClose?: any;
	className?: string;
	onCancel?: any;
}
const CommonModal = (props: CommonModalInterFace) => {
	const { onSubmit, title, desc, onClose, className, onCancel } = props;
	return (
		<div className={"modal show"}>
			<div
				className={className ? `${className} modal-section` : " modal-section"}
			>
				<div className="modal-top-part">
					<button className="close">
						<img src="/images/close.png" alt="" onClick={onClose} />
					</button>
					{title && <h5>{title}</h5>}
					{desc && <p>{desc}</p>}
				</div>
				<div className="options d_flex align_items_center">
					<span onClick={onCancel}>No</span>
					<span onClick={onSubmit}>Yes</span>
				</div>
			</div>
		</div>
	);
};

export default CommonModal;
