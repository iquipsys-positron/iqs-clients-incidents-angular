import { IIncidentHistorySaveService } from './IIncidentHistorySaveService';

class IncidentsHistorySaveService implements IIncidentHistorySaveService {
    private _filterValues: iqs.shell.StatisticsFilterValues;
    private _startDate: Date;

    constructor(
        private $log: ng.ILogService,
        private $location: ng.ILocationService,
        private $timeout: ng.ITimeoutService,
    ) {
        "ngInject";

        this._startDate = new Date();
    }

    public set filterValues(value: iqs.shell.StatisticsFilterValues) {
        this._filterValues = value;
    }

    public get filterValues(): iqs.shell.StatisticsFilterValues {
        return this._filterValues;
    }

    public set startDate(value: Date) {
        this._startDate = value;
    }

    public get startDate(): Date {
        return this._startDate;
    }
}

{
    angular.module('iqsIncidents.SaveService.History', [])
        .service('iqsIncidentsHistorySaveService', IncidentsHistorySaveService);

}