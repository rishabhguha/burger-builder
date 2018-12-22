import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-builder-b633d.firebaseio.com/'
});

export default instance;