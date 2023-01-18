import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

const styles = {
	global: {
		body: {
			margin: 0,
			padding: 0,
			"font-family": "'Roboto', sans-serif",
		},
	},
};

const theme = extendTheme({ config, styles });

export default theme;
