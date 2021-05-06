import tokenService from './tokenService';

const getLocalUser = () => tokenService.getUserFromToken();

const authUtil = async (res, setUser, setErrorMessage) => {
	if(res.ok) {
		const { token } = await res.json();
		tokenService.setToken(token);

		const id = getLocalUser();
		setUser(id);
	}
	else {
		// const { errors } = await res.json();
		setErrorMessage('Error: Please try again later');
	}
};

const getSignup = (setUser) => async (payload, setErrorMessage) => {
	const res = await fetch('/api/auth/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	
	authUtil(res, setUser, setErrorMessage);
};

export default {
	getLocalUser,
	getSignup,
};
