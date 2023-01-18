import { Box, Flex } from "@chakra-ui/react";
import Form from "./Form";

const Home: React.FC = () => {
	return (
		<Flex alignItems='center' justifyContent='center' h='100vh'>
			<Box minWidth='40%'>
				<Form />
			</Box>
		</Flex>
	);
};

export default Home;
