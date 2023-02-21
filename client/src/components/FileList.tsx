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
import axios, { AxiosResponse } from "axios";
import React, { MouseEvent, useEffect, useState } from "react";

const FileList: React.FC = () => {
	const [isDeleting, setIsDeleting] = useState(false);
	const [files, setFiles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getFiles = () => {
		setIsLoading(true);
		axios
			.get("http://localhost:3001/api/files")
			.then(response => {
				setFiles(response.data.files);
				setIsLoading(false);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const downloadFileHandler = async (
		e: MouseEvent<HTMLButtonElement>,
		filename: string
	) => {
		try {
			const response: AxiosResponse = await axios.get(
				`http://localhost:3001/api/files/${filename}`
			);
			const data: string = response.data.result;
			window.open(data);
		} catch (error) {
			console.error(`error ${error}`);
		}
	};

	const deleteFileHandler = async (
		e: MouseEvent<HTMLButtonElement>,
		filename: string
	): Promise<void> => {
		try {
			setIsDeleting(true);
			const response: AxiosResponse = await axios.delete(
				`http://localhost:3001/api/files/${filename}`
			);
			setIsDeleting(false);
			getFiles();
			console.log(response);
		} catch (error) {
			console.error(`error ${error}`);
		}
	};

	useEffect(() => {
		getFiles();
	}, []);
	return (
		<Flex alignItems='center' justifyContent='center'>
			{isLoading ? (
				<p>Loading ...</p>
			) : (
				<Box width='70%'>
					<TableContainer>
						<Table variant='striped' colorScheme='gray'>
							<TableCaption>File List {files.length}</TableCaption>
							<Thead>
								<Tr>
									<Th>File name</Th>
									<Th>Donwload</Th>
									<Th>Delete</Th>
								</Tr>
							</Thead>
							{!isDeleting && (
								<Tbody>
									{files.map((file: any) => (
										<Tr key={file._id}>
											<Td>{file.name}</Td>
											<Td>
												<Button
													onClick={e => downloadFileHandler(e, file.name)}
													colorScheme='green'
													variant='outline'>
													Download
												</Button>
											</Td>
											<Td>
												<Button
													onClick={e => deleteFileHandler(e, file.name)}
													colorScheme='red'
													variant='outline'>
													Delete
												</Button>
											</Td>
										</Tr>
									))}
								</Tbody>
							)}
						</Table>
					</TableContainer>
				</Box>
			)}
		</Flex>
	);
};

export default FileList;
