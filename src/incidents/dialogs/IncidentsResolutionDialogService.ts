import { IIncidentsResolutionDialogService, IncidentsResolutionDialogParams } from './IIncidentsResolutionDialogService';

class IncidentsResolutionDialogService implements IIncidentsResolutionDialogService {
    public _mdDialog: angular.material.IDialogService;

    public constructor($mdDialog: angular.material.IDialogService) {
        this._mdDialog = $mdDialog;
    }

    public show(event: any, params: IncidentsResolutionDialogParams, successCallback?: (data?: any) => void, cancelCallback?: () => void) {
        this._mdDialog.show({
            targetEvent: event,
            templateUrl: 'incidents/dialogs/IncidentsResolutionDialog.html',
            controller: 'iqsIncidentsResolutionDialogController',
            controllerAs: '$ctrl',
            locals: params,
            bindToController: true,
            clickOutsideToClose: true
        })
            .then(
                (data?: any) => {
                    if (successCallback) {
                        successCallback(data);
                    }
                },
                () => {
                    if (cancelCallback) {
                        cancelCallback();
                    }
                }
            );
    }

}

angular
    .module('iqsIncidents.Dialog.Resolution')
    .service('iqsIncidentsResolutionDialog', IncidentsResolutionDialogService);