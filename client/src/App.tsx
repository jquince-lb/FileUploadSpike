import React from "react";
import { Route, Routes } from "react-router-dom";
import FileList from "./components/FileList";
import Home from "./components/Home";

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/files' element={<FileList />} />
		</Routes>
	);
};

export default App;
