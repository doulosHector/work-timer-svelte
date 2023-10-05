import { timeToString } from './timeToString';

// Function to format time in seconds to HH:MM:SS
export const formatTimeWithSeconds = (time) => {
	const seconds = time >= 60 ? time % 60 : time;
	const minutes = Math.floor(time / 60) % 60;
	const hours = Math.floor(Math.floor(time / 60) / 60);
	return `${timeToString(hours)}:${timeToString(minutes)}:${timeToString(seconds)}`;
};

export const formatTime = (time) => {
	const minutes = time >= 60 ? time % 60 : time;
	const hours = Math.floor(time / 60) % 60;
	return `${timeToString(hours)}:${timeToString(minutes)}:00`;
};
