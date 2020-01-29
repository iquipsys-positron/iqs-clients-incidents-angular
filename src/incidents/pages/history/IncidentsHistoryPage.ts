import { IIncidentHistorySaveService } from './IIncidentHistorySaveService';

export const IncidentsHistoryStateName: string = 'app.history';

class IncidentsHistoryPageController implements ng.IController {          public $onInit() {}
    public transaction: pip.services.Transaction;
    public state: string;

    public startDate: Date;
    public datePeriodType: string;
    public filterValues: iqs.shell.StatisticsFilterValues;
    public filterVisibility: iqs.shell.StatisticsFilterVisibility;
    public incidents: iqs.shell.OperationalEvent[];

    private params: any;

    constructor(
        private $window: ng.IWindowService,
        private $location: ng.ILocationService,
        private $log: ng.ILogService,
        private $scope: ng.IScope,
        private $timeout: ng.ITimeoutService,
        private pipDateFormat: pip.dates.IDateFormatService,
        private pipTransaction: pip.services.ITransactionService,
        private pipNavService: pip.nav.INavService,
        private iqsOperationalEventsViewModel: iqs.shell.IOperationalEventsViewModel,
        private iqsIncidentsHistorySaveService: IIncidentHistorySaveService
    ) {
        "ngInject";
        this.restoreState();

        this.init();
    }

    private restoreState() {
        this.startDate = this.$location.search().date ? new Date(Date.parse(this.$location.search().date)) : this.iqsIncidentsHistorySaveService.startDate;
        this.filterValues = this.iqsIncidentsHistorySaveService.filterValues ? this.iqsIncidentsHistorySaveService.filterValues : {
            ruleValue: 'all',
            objectValue: 'all'
        }
    }

    private init(): void {
        this.transaction = this.pipTransaction.create('INCIDENTS_STATISTICS');
        this.datePeriodType = iqs.shell.DatePeriodValues.Daily;
        this.filterVisibility = {
            ActionFilter: false,
            ObjectFilter: true,
            DatePeriod: false,
            EventRuleFilter: true,
            ZoneFilter: false
        }

        this.incidents = [];
        this.state = iqs.shell.States.Progress;
    }

    private setState(): void {
        this.$timeout(() => {
            this.state = (this.incidents && this.incidents.length > 0) ? iqs.shell.States.Data : iqs.shell.States.Empty;
        }, 0);
    }

    public onRefreshStatistics(params: iqs.shell.StatisticsFilterResult): void {
        this.state = iqs.shell.States.Progress;
        this.$location.search('date', params.toDate.toISOString());
        if (params.ruleId == 'all') {
            params.ruleId = null;
        }
        if (params.objectGroupId == 'all') {
            params.objectGroupId = null;
        }
        if (params.objectId == 'all') {
            params.objectId = null;
        }
        this.iqsIncidentsHistorySaveService.filterValues = {
            ruleValue: params.ruleId, 
            objectValue: params.objectId || params.objectGroupId
        };
        this.iqsIncidentsHistorySaveService.startDate = params.toDate;

        this.params = params;
        this.getIncidents(params);
    }

    private getIncidents(params: iqs.shell.StatisticsFilterResult): void {
        this.transaction.begin('read');
        this.$timeout(() => {
            this.state = iqs.shell.States.Progress;
        }, 0);

        this.iqsOperationalEventsViewModel.readOptionaly(
            {
                rule_id: params.ruleId,
                group_id: params.objectGroupId,
                object_id: params.objectId,
                to_time: params.toDate,
                from_time: null,
                type: iqs.shell.OperationalEventType.Incident
            },
            (eventIncidents: iqs.shell.OperationalEvent[]) => {
                let incidents: iqs.shell.OperationalEvent[] = [];
                this.incidents = _.sortBy(_.union(eventIncidents, incidents), (item) => {
                    return - new Date(item.time).getTime();
                });

                this.incidents = _.each(this.incidents, (item) => {
                    item.timeString = this.pipDateFormat.formatMiddleDateLongTime(item.time);
                });

                this.setState()
                this.transaction.end();
            },
            (error: any) => {
                this.transaction.end(error);
                this.setState();
                this.$log.error('Error: ' + JSON.stringify(error));
            }
        );
    }

    public onChangeDate(from: string) {
        this.startDate = new Date(from);
        if (this.params) {
            this.params.toDate = new Date(this.startDate.getTime() + 1000).toISOString();
            this.getIncidents(this.params);
        }
    }
}

function configureIncidentsHistoryRoute(
    $injector: angular.auto.IInjectorService,
    $stateProvider: pip.rest.IAuthStateService
) {
    "ngInject";

    $stateProvider
        .state(IncidentsHistoryStateName, {
            url: '/history?date',
            controller: IncidentsHistoryPageController,
            auth: true,
            controllerAs: '$ctrl',
            templateUrl: 'incidents/pages/history/IncidentsHistoryPage.html'
        });
}

function configureIncidentsHistoryAccess(
    iqsAccessConfigProvider: iqs.shell.IAccessConfigProvider
) {
    "ngInject";

    let accessLevel: number = iqs.shell.AccessRole.user;
    let accessConfig: any = {

    }

    iqsAccessConfigProvider.registerStateAccess(IncidentsHistoryStateName, accessLevel);

    iqsAccessConfigProvider.registerStateConfigure(IncidentsHistoryStateName, accessConfig);
}

(() => {

    angular
        .module('iqsIncidents.Page.History', [
            'iqsIncidents.Panel.History',
            'iqsIncidents.SaveService.History',
            'iqsOperationalEvents.ViewModel'
        ])
        .config(configureIncidentsHistoryRoute)
        .config(configureIncidentsHistoryAccess);
})();
