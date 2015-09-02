
let users = [
	{id:'edalorzo',name: 'Edwin Dalorzo'},
	{id:'jverne', name: 'Jules Verne'}
];

function findUser(userId){
	return new Promise((resolve, reject) => {
		let found = users.filter(({id}) => id === userId);
		if(found.length > 0) {
			return resolve(found[0]);
		}
		return reject('User not found: ' + userId);
	});
}

/*
function findUser(userId){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let found = users.filter(({id}) => id === userId);
			if(found.length > 0) {
				return resolve(found[0]);
			}
			return reject('User not found: ' + userId);
		}, 5000);
	});
}
*/

class User {

	constructor(userId) {
		this.userId = userId;
		this.profile = null;
	}

	getProfile(){
		if(this.profile == null){
			this.profile = findUser(this.userId);
		}
		return this.profile;
	}
}


let navbar = {
	show(user) {
		user.getProfile().then(profile => {
			console.log('*** Navbar ***');
			console.log('Name: ' + profile.name);
		});
	}
};

let account = {
	show(user) {
		user.getProfile().then(profile => {
			console.log('*** Account ***');
			console.log('Name: ' +  profile.name);
		});
	}
};


let user = new User('edalorzo');
navbar.show(user);
account.show(user);

