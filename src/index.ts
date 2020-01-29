/// <reference path="../typings/tsd.d.ts" />
class ClientPositronAppController implements ng.IController {
    public $onInit() {}
    public isChrome: boolean;

    constructor(
        $rootScope: ng.IRootScopeService,
        $state: ng.ui.IStateService,
        pipSystemInfo: pip.services.ISystemInfo,
    ) {
        "ngInject";

        this.isChrome = pipSystemInfo.browserName == 'chrome' && pipSystemInfo.os == 'windows';
    }
}

angular
    .module('iqsPositronIncidentsApp', [
        'iqsPositronIncidents.Config',
        'iqsPositronIncidents.Templates',
        'iqsOrganizations.Service',
        'iqsIncidentsApp'            
    ])
    .controller('iqsPositronIncidentsAppController', ClientPositronAppController);


