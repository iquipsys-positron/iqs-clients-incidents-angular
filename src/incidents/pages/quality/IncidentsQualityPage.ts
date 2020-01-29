export const IncidentsQualityStateName: string = 'incidents.quality';

class IncidentsQualityPageController implements ng.IController {          public $onInit() {}

    constructor(
        private $window: ng.IWindowService,
        $scope: ng.IScope,
        private $state: ng.ui.IStateService,
        $mdMedia: angular.material.IMedia,
        private pipNavService: pip.nav.INavService
    ) {
        "ngInject";

    }
}

function configureIncidentsQualityRoute(
    $injector: angular.auto.IInjectorService,
    $stateProvider: pip.rest.IAuthStateService
) {
    "ngInject";

    $stateProvider
        .state(IncidentsQualityStateName, {
            url: '/quality',
            controller: IncidentsQualityPageController,
            auth: true,
            controllerAs: '$ctrl',
            templateUrl: 'incidents/pages/quality/IncidentsQualityPage.html'
        });
}

function configureIncidentsQualityAccess(
    iqsAccessConfigProvider: iqs.shell.IAccessConfigProvider
) {
    "ngInject";

    let accessLevel: number = iqs.shell.AccessRole.user;
    let accessConfig: any = {
        
            }

    iqsAccessConfigProvider.registerStateAccess(IncidentsQualityStateName, accessLevel);

    iqsAccessConfigProvider.registerStateConfigure(IncidentsQualityStateName, accessConfig);
}

(() => {

    angular
        .module('iqsIncidents.Page.Quality', ['iqsIncidents.Panel.Quality'])
        .config(configureIncidentsQualityRoute)
        .config(configureIncidentsQualityAccess);
})();
