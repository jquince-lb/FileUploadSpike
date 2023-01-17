import React from "react";
import { Route, Routes } from "react-router-dom";
import Files from "./components/Files";
import Home from "./components/Home";

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/files' element={<Files />} />
		</Routes>
	);
};

export default App;
