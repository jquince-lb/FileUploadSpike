import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@chakra-ui/react";
import React from "react";

interface Props {
	isError: boolean;
}
const AlertStatus: React.FC<Props> = ({ isError }) => {
	return (
		<>
			<Alert
				status={!isError ? "success" : "error"}
				variant='top-accent'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				textAlign='center'
				height='200px'>
				<AlertIcon boxSize='40px' mr={0} />
				{!isError ? (
					<>
						<AlertTitle mt={4} mb={1} fontSize='lg'>
							Saved
						</AlertTitle>
						<AlertDescription maxWidth='sm'>
							Uploaded Successfully
						</AlertDescription>
					</>
				) : (
					<>
						<AlertTitle mt={4} mb={1} fontSize='lg'>
							An error has occured
						</AlertTitle>
						<AlertDescription maxWidth='sm'>
							Please verify your files
						</AlertDescription>
					</>
				)}
			</Alert>
		</>
	);
};

export default AlertStatus;
