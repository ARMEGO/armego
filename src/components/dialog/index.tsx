import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";

type IDialogProps = {
	isOpen: boolean;
	headerLabel: string;
	btnYesLabel?: string;
	btnNoLabel?: string;
	onClickYes?: () => void;
	onClickNo: () => void;
	children?: ReactElement;
};

const CustomDialog = (props: IDialogProps) => {
	const {
		isOpen,
		headerLabel,
		btnYesLabel,
		btnNoLabel,
		onClickYes,
		onClickNo,
	} = props;
	const footer = (
		<>
			<Button
				label={btnNoLabel || "No"}
				icon="pi pi-times"
				className="p-button-text"
				onClick={onClickNo}
			/>
			<Button
				label={btnYesLabel || "Yes"}
				icon="pi pi-check"
				className="p-button-text"
				onClick={onClickYes}
			/>
		</>
	);
	return (
		<Dialog
			visible={isOpen}
			style={{ width: "450px" }}
			header={headerLabel}
			modal
			footer={footer}
			onHide={onClickNo}
		>
			{props.children}
		</Dialog>
	);
};

export default CustomDialog;
