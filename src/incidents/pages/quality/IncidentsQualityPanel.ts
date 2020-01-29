interface IIncidentsQualityPanelBindings {
    [key: string]: any;
}

const IncidentsQualityPanelBindings: IIncidentsQualityPanelBindings = {}

class IncidentsQualityPanelChanges implements ng.IOnChangesObject, IIncidentsQualityPanelBindings {
    [key: string]: ng.IChangesObject<any>;
}

class IncidentsQualityPanelController implements ng.IController {
    public $onInit() { }
    constructor(
        private $state: ng.ui.IStateService
    ) {
        "ngInject";

    }

}

angular
    .module('iqsIncidents.Panel.Quality', [])
    .component('iqsIncidentsQualityPanel', {
        bindings: IncidentsQualityPanelBindings,
        templateUrl: 'incidents/pages/quality/IncidentsQualityPanel.html',
        controller: IncidentsQualityPanelController,
        controllerAs: '$ctrl'
    });


