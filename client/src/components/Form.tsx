import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import axios from "axios";

import React, { useState } from "react";

// import StatusModal from './StatusModal';

const Form: React.FC = () => {
	const [fileName, setFileName] = useState<string>("");
	const [file, setFile] = useState<string | Blob>();

	const filePicker = (event: any) => {
		setFile(event.target.files[0]);
		setFileName(event.target.files[0].name);
	};

	const sendData = new FormData();
	const onSubmitData = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		sendData.append("path", file!);

		axios
			.post("http://localhost:3001/api/upload", sendData)
			.then((response: any) => {
				setFile("");
				setFileName("");
				console.log(response.data.message);
			})
			.catch(error => {
				console.log(error);
			});
	};
	return (
		<>
			<form onSubmit={onSubmitData}>
				<Box
					h='20rem'
					width='100%'
					borderColor='gray.300'
					borderStyle='dashed'
					borderWidth='1px'
					rounded='md'
					shadow='sm'
					role='group'
					transition='all 150ms ease-in-out'>
					<Box position='relative' height='100%' width='100%'>
						<Box
							position='absolute'
							top='0'
							left='0'
							height='100%'
							width='100%'
							display='flex'
							flexDirection='column'>
							<Stack
								height='100%'
								width='100%'
								display='flex'
								alignItems='center'
								justify='center'
								spacing='4'>
								<Stack p='8' textAlign='center' spacing='1'>
									<Heading fontSize='lg' color='gray.700' fontWeight='bold'>
										Drop images here
									</Heading>
									<Text fontWeight='light'>or click to upload</Text>
								</Stack>
							</Stack>
						</Box>
						<Input
							name='path'
							type='file'
							height='100%'
							width='100%'
							position='absolute'
							top='0'
							left='0'
							opacity='0'
							aria-hidden='true'
							accept='.jpg, .jpeg, .png, .svg, .gif, .txt, .pdf, .csv, .xlxs, .docx'
							onChange={filePicker}
						/>
						{fileName}
					</Box>
				</Box>
				<Button
					type='submit'
					mt='2rem'
					w='100%'
					colorScheme='#3399ff'
					color='#3399ff'
					variant='outline'>
					Send
				</Button>
			</form>
		</>
	);
};

export default Form;
