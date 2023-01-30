import {
	Box,
	Button,
	Flex,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import React from "react";
interface Props {
	files: any;
}
const FileList: React.FC<Props> = ({ files }) => {
	return (
		<Flex alignItems='center' justifyContent='center'>
			<Box width='70%'>
				<TableContainer>
					<Table variant='striped' colorScheme='gray'>
						<TableCaption>File List {files.length}</TableCaption>
						<Thead>
							<Tr>
								<Th>File name</Th>
								<Th>Donwload</Th>
							</Tr>
						</Thead>
						<Tbody>
							{files.map((file: any) => (
								<Tr key={file._id}>
									<Td>{file.name}</Td>
									<Td>
										<Button colorScheme='green' variant='outline'>
											<a href={file.path}>Download</a>
										</Button>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
		</Flex>
	);
};

export default FileList;
