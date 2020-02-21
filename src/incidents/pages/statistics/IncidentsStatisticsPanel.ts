import { IStatisticsDateService } from '../../../new_statistics/services/IStatisticsDateService';
import { StatisticsDateSteps } from '../../../new_statistics/services/StatisticsDateSteps';
import { IIncidentsStatisticsSaveService } from './IIncidentsStatisticsSaveService';

interface IIncidentsStatisticsPanelBindings {
    [key: string]: any;
}

const IncidentsStatisticsPanelBindings: IIncidentsStatisticsPanelBindings = {}

class IncidentsStatisticsPanelChanges implements ng.IOnChangesObject, IIncidentsStatisticsPanelBindings {
    [key: string]: ng.IChangesObject<any>;
}

class IncidentsStatisticsPanelController implements ng.IController {
    public $onInit() { }
    public startDate: Date | string;
    public endDate: Date | string;
    public dateType: string;
    public filterVisibility: any = {
        ObjectFilter: true,
        IncidentFilter: true,
        DatePeriod: true
    };
    public filterValues: any = {};
    public filterParams: any;
    public formatX: Function;
    public formatY: Function;
    public formatGridX: Function;
    public formatGridY: Function;
    public view: string = 'chart';
    public statType: string = 'events';
    public gridType: string = iqs.shell.GridTypes.Formated;
    public statsDescription: string = null;
    public gridNameLabel: string;
    public gridValueLabel: string;
    private ruleCollection: iqs.shell.EventRule[];
    public statsDescriptionDetails: string = null;
    private isPreloaded: boolean = false;
    private cf: Function[] = [];

    constructor(
        private $rootScope: ng.IRootScopeService,
        private $state: ng.ui.IStateService,
        private $interval: ng.IIntervalService,
        private iqsStatisticsViewModel: iqs.shell.IStatisticsViewModel,
        private $location: ng.ILocationService,
        private iqsIncidentsStatisticsSaveService: IIncidentsStatisticsSaveService,
        private iqsEventRulesViewModel: iqs.shell.IEventRulesViewModel,
        private iqsStatisticsDateService: IStatisticsDateService,
        private iqsLoading: iqs.shell.ILoadingService
    ) {
        "ngInject";

        this.restore();
        // this.createStatisticsRequest();

        this.formatX = (x) => {
            return this.iqsStatisticsDateService.formatXTick(x, this.dateType);
        }

        this.formatY = (y) => {
            let fY = Number(y).toFixed();

            return fY === String(y) ? fY : '';
        }

        this.formatGridX = (item) => {
            if (!this.filterParams || !this.filterParams.ruleId || this.filterParams.ruleId == 'all') {
                return item.key;
            } else {
                return this.iqsStatisticsDateService.formatXGridTick(item.x, this.dateType);
            }
        }

        this.formatGridY = (item) => {
            if (angular.isObject(item)) {
                return item.value;
            } else {
                return item;
            }
        }

        const runWhenReady = () => {
            if (this.iqsEventRulesViewModel.state === iqs.shell.States.Data) {
                this.ruleCollection = this.iqsEventRulesViewModel.getCollection();
            }
            this.isPreloaded = true;
            this.updateStatistics(this.filterParams);
        };

        if (this.iqsLoading.isDone) { runWhenReady(); }
        this.cf.push(this.$rootScope.$on(iqs.shell.LoadingCompleteEvent, runWhenReady.bind(this)));
    }

    private restore(): void {
        this.filterParams = this.iqsIncidentsStatisticsSaveService.filterParams;
        this.setFilterValues();
    }

    public updateStatistics(params) {
        if (!this.isPreloaded) { return; }
        this.filterParams = params;
        this.filterParams.paramName = params.rule ? params.rule.name : params.paramName;
        this.filterParams.dateStep = StatisticsDateSteps[params.datePeriod];
        this.view = 'chart';
        this.setUrlParams(params);
        this.createStatisticsRequest(params);
        this.iqsIncidentsStatisticsSaveService.filterParams = params;
    }

    public get state() {
        return this.iqsStatisticsViewModel.state;
    }

    private setFilterValues() {
        this.startDate = this.$location.search()['date'] ? this.$location.search()['date'] :
            this.filterParams && this.filterParams.fromDate && this.filterParams.fromDate.toISOString() ? this.filterParams.fromDate.toISOString() : this.iqsStatisticsDateService.getStartDate();
        this.dateType = this.$location.search()['type'] ? this.$location.search()['type'] :
            this.filterParams && this.filterParams.datePeriod ? this.filterParams.datePeriod : this.iqsStatisticsDateService.getDateType();

        this.filterValues.ruleValue = this.$location.search()['event_stat_id'] ? this.$location.search()['event_stat_id'] :
            this.filterParams ? this.filterParams.ruleId : 'all';

        this.filterValues.objectValue = this.$location.search()['object_stat_id'] ? this.$location.search()['object_stat_id'] :
            this.filterParams ? this.filterParams.objectId || this.filterParams.objectGroupId : 'all';

        if (!this.filterParams) {
            this.filterParams = {};
        }
        this.filterParams.datePeriod = this.dateType;
        this.filterParams.ruleId = this.filterValues.ruleValue;
        this.filterParams.objectId = this.filterValues.objectValue;
        this.filterParams.zoneId = 'all';
    }

    public $onDestroy() {
        this.iqsIncidentsStatisticsSaveService.filterParams = this.filterParams;
        for (const f of this.cf) { f(); }
    }

    private setUrlParams(params) {
        this.$location.search('object_stat_id', params.objectId || params.objectGroupId);
        this.$location.search('event_stat_id', params.ruleId || 'all');
        if (params.fromDate) this.$location.search('date', params.fromDate.toISOString());
        if (params.toDate) this.$location.search('to_date', params.toDate.toISOString());
        this.$location.search('type', params.datePeriod);
        this.setFilterValues();
    }

    private generateStatsDescription(secondArg: string, forthArg: string, each: boolean = false) {
        this.gridValueLabel = 'STATISTICS_INCIDENT_VALUE';
        this.gridNameLabel = 'STATISTICS_INCIDENT_TIME';

        if (!this.filterParams.ruleId || this.filterParams.ruleId == 'all') {
            this.statsDescription = 'STATS_INCIDENT_ALL_RULES';
            this.statsDescriptionDetails = null;
        } else {
            this.statsDescription = 'STATS_INCIDENT_BY_RULES';
            let rule = this.iqsEventRulesViewModel.getEventRuleById(this.filterParams.ruleId)
            this.statsDescriptionDetails = rule ? rule.name : '';
        }
    }

    private createStatisticsRequest(params = null, each = false) {
        let secondArg, forthArg, startDate, endDate, dateType;

        this.startDate = this.iqsStatisticsDateService.getStartDate();
        this.endDate = this.iqsStatisticsDateService.getEndDate();
        this.dateType = this.iqsStatisticsDateService.getDateType();

        if (params !== null) {
            secondArg = params.objectId || params.objectGroupId || 'all';
            forthArg = params.ruleId ? params.ruleId : 'all';
        } else {
            secondArg = this.$location.search()['object_stat_id'] ? this.$location.search()['object_stat_id'] : 'all';
            forthArg = this.$location.search()['event_stat_id'] ? this.$location.search()['event_stat_id'] : 'all';
        }
        this.iqsStatisticsViewModel.getStatistics('incidents', secondArg, 'all', forthArg, this.startDate, this.endDate, this.dateType, each);
        this.generateStatsDescription(secondArg, forthArg, each);
    }

    public get statistics() {
        return this.iqsStatisticsViewModel.statistics;
    }

    public changeView(newView, prevView) {
        if (newView === 'list' && (prevView === 'chart' || prevView === 'grid')) {
            this.createStatisticsRequest(null, true);
        }

        if (prevView === 'list' && (newView === 'chart' || newView === 'grid')) {
            this.createStatisticsRequest(null, false);
        }

        this.view = newView;
    }

    public onOpenDetails(item: any): void {
        let index: number = _.findIndex(this.ruleCollection, (rule: iqs.shell.EventRule) => {
            return rule.name == item.key;
        });

        if (index != -1) {
            this.$location.search('zone_stat_id', this.ruleCollection[index].id);
            this.filterValues = {
                ruleValue: this.ruleCollection[index].id
            }
        }
    }

}


angular
    .module('iqsIncidents.Panel.Statistics', [
        'iqsIncidents.SaveService.Statistics',
        'iqsStatistics.ViewModel',
        'iqsEventRules.ViewModel',
        'iqsStatistics.DateService',
        'iqsHorizontalBars'
    ])
    .component('iqsIncidentsStatisticsPanel', {
        bindings: IncidentsStatisticsPanelBindings,
        templateUrl: 'incidents/pages/statistics/IncidentsStatisticsPanel.html',
        controller: IncidentsStatisticsPanelController,
        controllerAs: '$ctrl'
    });


