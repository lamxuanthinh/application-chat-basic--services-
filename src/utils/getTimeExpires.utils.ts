export const getTimeExpires = (timeExpires: number) => {
	return new Date().getTime() + timeExpires;
};
