export const IncidentsStatisticsStateName: string = 'app.statistics';

class IncidentsStatisticsPageController implements ng.IController {
    public $onInit() { }

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

function configureIncidentsStatisticsRoute(
    $injector: angular.auto.IInjectorService,
    $stateProvider: pip.rest.IAuthStateService
) {
    "ngInject";

    $stateProvider
        .state(IncidentsStatisticsStateName, {
            url: '/statistics?event_stat_id&details&view&type&date&to_date&object_stat_id',
            controller: IncidentsStatisticsPageController,
            auth: true,
            controllerAs: '$ctrl',
            reloadOnSearch: false,
            templateUrl: 'incidents/pages/statistics/IncidentsStatisticsPage.html'
        });
}

function configureIncidentsStatisticsAccess(
    iqsAccessConfigProvider: iqs.shell.IAccessConfigProvider
) {
    "ngInject";

    let accessLevel: number = iqs.shell.AccessRole.user;
    let accessConfig: any = {

    }

    iqsAccessConfigProvider.registerStateAccess(IncidentsStatisticsStateName, accessLevel);
    iqsAccessConfigProvider.registerStateConfigure(IncidentsStatisticsStateName, accessConfig);
}

(() => {

    angular
        .module('iqsIncidents.Page.Statistics', [
            'iqsIncidents.Panel.Statistics',
            'iqsStatisticsFilterPanel'
        ])
        .config(configureIncidentsStatisticsRoute)
        .config(configureIncidentsStatisticsAccess);
})();
