import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useEffect } from "react";
import AlertStatus from "./AlertStatus";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	isError: boolean;
}
const StatusModal: React.FC<Props> = ({ isError, isOpen, onClose }) => {
	useEffect(() => {
		setTimeout(() => onClose(), 4000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<AlertStatus isError={isError} />
			</ModalContent>
		</Modal>
	);
};

export default StatusModal;
