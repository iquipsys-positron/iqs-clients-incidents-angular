class ReturnParams {
    from: string;
}

interface IIncidentsHistoryPanelBindings {
    [key: string]: any;

    collection: any;
    ngDisabled: any;
    onChangeDate: any;
}

const IncidentsHistoryPanelBindings: IIncidentsHistoryPanelBindings = {
    collection: '<?iqsIncidentsCollection',
    ngDisabled: '&?',
    onChangeDate: '&iqsChangeDate'
}

class IncidentsHistoryPanelChanges implements ng.IOnChangesObject, IIncidentsHistoryPanelBindings {
    [key: string]: ng.IChangesObject<any>;

    collection: ng.IChangesObject<iqs.shell.OperationalEvent[]>;
    ngDisabled: ng.IChangesObject<() => ng.IPromise<void>>;
    onChangeDate: ng.IChangesObject<() => ng.IPromise<void>>;
}

class IncidentsHistoryPanelController implements ng.IController {
    public $onInit() { }
    public collection: iqs.shell.OperationalEvent[];
    public severityHigh: number = iqs.shell.Severity.High;
    public onChangeDate: (params: ReturnParams) => void;
    public organizationName: string;

    constructor(
        private $state: ng.ui.IStateService,
        private $element: JQuery,
        public pipMedia: pip.layouts.IMediaService,
        private iqsObjectFormat: iqs.shell.IObjectFormatService,
        private iqsOperationalEventsViewModel: iqs.shell.IOperationalEventsViewModel,
        private pipDateFormat: pip.dates.IDateFormatService,
        private iqsAccountsViewModel: iqs.shell.IAccountsViewModel,
        private iqsObjectStatesViewModel: iqs.shell.IObjectStatesViewModel,
        private iqsOrganization: iqs.shell.IOrganizationService
    ) {
        "ngInject";

        $element.addClass('iqs-incidents-history-panel');
        this.organizationName = this.iqsOrganization.organization ? this.iqsOrganization.organization.name : '';
    }

    public $onChanges(changes: IncidentsHistoryPanelChanges): void {

    }

    private getAccountName(accountId: string): string {
        let account: iqs.shell.Account = this.iqsAccountsViewModel.getAccountById(accountId);

        return account ? account.name : '';
    }

    public onExpand(item: iqs.shell.OperationalEvent) {
        _.each(this.collection, (obj: iqs.shell.OperationalEvent) => {
            if (obj.id != item.id) {
                obj['expand'] = false;
            }
        });
        item['expand'] = !item['expand'];
        this.iqsOperationalEventsViewModel.referenceDetails(item);
        this.iqsOperationalEventsViewModel.readRefEvent(
            item.id,
            (incidents: iqs.shell.DataPage<iqs.shell.OperationalEvent>) => {
                if (incidents && incidents.data && incidents.data.length > 0) {
                    let start: moment.Moment = moment();
                    item.ref.resolution = incidents.data[0].description;
                    // item.ref.resolution_time = incidents.data[0].close_time ?  this.pipDateFormat.formatMiddleElapsed(incidents.data[0].close_time, null, start) : ''; 
                    item.ref.resolution_close = this.getAccountName(incidents.data[0].creator_id);
                }
            },
            (error: any) => { }
        );
    }

    public openRetrospective(item: iqs.shell.OperationalEvent) {
        if (item && item.object_id) {
            this.iqsObjectStatesViewModel.clean();
            let date = item.time ? moment(item.time).add('seconds', 1).toDate().toISOString() : '';
            // this.$state.go('retrospective.map', { focus_object_id: item.object_id, retro_date: date });
            window.location.href = window.location.origin + `/retrospective/index.html#/app/map?focus_object_id=${item.object_id}&retro_date=${date}`;
        }
    }

    public onChange() {
        // take last event. change from date
        let index: number = this.collection.length - 1;
        if (index < 1) return;

        let lastEvent = this.collection[index];

        let params: ReturnParams = {
            from: lastEvent.time
        };

        if (this.onChangeDate) {
            this.onChangeDate(params);
        }
    }
}

angular
    .module('iqsIncidents.Panel.History', [
        'iqsOperationalEvents.ViewModel',
        'iqsAccounts.ViewModel',
        'iqsObjectStates.ViewModel'
    ])
    .component('iqsIncidentsHistoryPanel', {
        bindings: IncidentsHistoryPanelBindings,
        templateUrl: 'incidents/pages/history/IncidentsHistoryPanel.html',
        controller: IncidentsHistoryPanelController,
        controllerAs: '$ctrl'
    });


