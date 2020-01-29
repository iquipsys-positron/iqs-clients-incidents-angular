import { IIncidentsStatisticsSaveService } from './IIncidentsStatisticsSaveService';

class IncidentsStatisticsSaveService implements IIncidentsStatisticsSaveService {
    private _filterParams: any;
    private _objectId: string;
    private _details: boolean;
    private _view: string;

    constructor(

    ) {
        "ngInject";

        this._view = iqs.shell.StatisticsView.Chart;
    }

    public set filterParams(value: any) {
        this._filterParams = value;
    }

    public get filterParams(): any {
        return this._filterParams;
    }

    public set details(details: boolean) {
        this._details = details;
    }

    public get details(): boolean {
        return this._details;
    }

}

{
    angular.module('iqsIncidents.SaveService.Statistics', [])
        .service('iqsIncidentsStatisticsSaveService', IncidentsStatisticsSaveService);

}