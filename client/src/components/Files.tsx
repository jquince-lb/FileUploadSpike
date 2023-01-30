import axios from "axios";
import { useEffect, useState } from "react";
import FileList from "./FileList";

const Files: React.FC = () => {
	const [files, setFiles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
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
	}, []);

	return (
		<div>{isLoading ? <p>Loading...</p> : <FileList files={files} />}</div>
	);
};

export default Files;
