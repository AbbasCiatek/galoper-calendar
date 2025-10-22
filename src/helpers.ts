export const colorMap: Record<string, string> = {
	red: "bg-red-100 text-red-900 border border-red-400 ",
	green: "bg-green-100 text-green-900 border border-green-400 ",
	blue: "bg-blue-100 text-blue-900 border border-blue-400 ",
	yellow: "bg-yellow-100 text-yellow-900 border border-yellow-400 ",
	gray: "bg-gray-100 text-gray-900 border border-gray-400 ",
	purple: "bg-purple-100 text-purple-900 border border-purple-400 ",
	orange: "bg-orange-100 text-orange-900 border border-orange-400 ",
};
export const getFirstLetters = (word: string): string => {
	if (!word) return "";
	const words = word.split(" ");
	if (words.length === 1) return words[0].charAt(0).toUpperCase();
	return `${words[0].charAt(0).toUpperCase()}${words[1].charAt(0).toUpperCase()}`;
};
