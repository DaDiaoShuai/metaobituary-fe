/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./mint/index.html", "./index.html", "./src/**/*.vue"],
	theme: {
		extend: {},
		colors: {
			"bg-soft": "#f7f3f0",
			"font-light": "#201f1e",
			"highlight-color": "#a58d7f"
		},
	},
	plugins: [],
};
