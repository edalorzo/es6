
/**
  * Avoid overriding other's peoples namespaces
 */
 INFORMATECH.services = INFORMATECH.namespace('services');

 INFORMATECH.services.TeamService = function(){};
 INFORMATECH.services.TeamService.prototype.getTeams = function(){
 	return [
 		{name: 'Heredia'},
 		{name: 'Saprissa'},
 		{name: 'Alajuela'},
 	];
 };

