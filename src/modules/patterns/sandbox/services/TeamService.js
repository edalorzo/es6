
(function(modules){

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

	//this is the export feature
	modules.TeamService = function(box){
		box.TeamService = TeamService;
	};

}(Sandbox.modules = Sandbox.modules || {}));