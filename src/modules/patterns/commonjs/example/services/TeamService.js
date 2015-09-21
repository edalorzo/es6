
//privacy members
var teams = [
		{name: 'Heredia'},
		{name: 'Saprissa'},
		{name: 'Alajuela'},
		{name: 'Uruguay'}
	];

	//constructor
function TeamService(){}

//prototype
TeamService.prototype.getTeams = function(){
	return teams;
};

module.exports = TeamService;

