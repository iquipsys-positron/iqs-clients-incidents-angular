import './dialogs/IncidentsResolutionDialog';
// import './pages/history/IncidentsHistoryPage';
// import './pages/quality/IncidentsQualityPage';
// import './pages/statistics/IncidentsStatisticsPage';

import { IncidentsStateName } from './Incidents';

class IncidentsController implements ng.IController {
    public $onInit() { }
    private cf: Function[] = [];
    private mediaSizeGtSm: boolean;
    public sections: any[] = [
        {
            title: 'INSIDENT_TOOL_STATISTICS',
            icon: 'iqs:stats',
            state: 'app.statistics'
        },
        {
            title: 'INSIDENT_TOOL_HISTORY',
            icon: 'webui-icons:clock-back',
            state: 'app.history'
        },
        // {
        //     title: 'INSIDENT_TOOL_QUALITY',
        //     icon: 'icons:warn-star',
        //     state: 'incidents.quality'
        // }
    ];
    public selectIndex: number = 0;
    public details: boolean = false;

    constructor(
        private $window: ng.IWindowService,
        $scope: ng.IScope,
        private $state: ng.ui.IStateService,
        private $rootScope: ng.IRootScopeService,
        private pipMedia: pip.layouts.IMediaService,
        private pipNavService: pip.nav.INavService
    ) {
        "ngInject";

        this.selectIndex = _.findIndex(this.sections, { state: $state.current.name });
        this.mediaSizeGtSm = this.pipMedia('gt-sm');
        this.pipNavService.breadcrumb.breakpoint = 'gt-sm';
        this.cf.push(this.$rootScope.$on('pipMainResized', () => {
            if (this.mediaSizeGtSm !== this.pipMedia('gt-sm')) {
                this.mediaSizeGtSm = this.pipMedia('gt-sm');

                if (this.pipMedia('gt-sm')) {
                    this.details = false;
                }

                this.appHeader();
            }
        }));
        this.cf.push($rootScope.$on(pip.services.IdentityChangedEvent, this.appHeader.bind(this)));

        this.appHeader();
    }

    public $onDestroy() {
        for (const f of this.cf) { f(); }
    }

    public selectItem(index: number): void {
        this.selectIndex = index;
        this.$state.go(this.sections[this.selectIndex].state, {});
        if (!this.pipMedia('gt-sm')) {
            this.details = true;
            this.appHeader();
        }
    }

    private toMainFromDetails() {
        this.details = false;
        this.appHeader();
    }

    private appHeader(): void {
        this.pipNavService.appbar.parts = { 'icon': true, 'actions': 'primary', 'menu': true, 'title': 'breadcrumb', 'organizations': true };
        this.pipNavService.actions.hide();
        this.pipNavService.appbar.removeShadow();

        if (!this.pipMedia('gt-sm')) {
            this.pipNavService.icon.showMenu();

            if (!this.details) {
                this.pipNavService.breadcrumb.text = 'INCIDENT_TITLE';
            } else {
                this.pipNavService.breadcrumb.items = [
                    <pip.nav.BreadcrumbItem>{ title: "INCIDENT_TITLE", click: () => { this.$state.go('app.statistics'); this.details = false; } },
                    <pip.nav.BreadcrumbItem>{
                        title: this.sections[this.selectIndex].title
                    }
                ];
                this.pipNavService.icon.showBack(() => {
                    this.toMainFromDetails();
                });
            }
        } else {
            this.pipNavService.breadcrumb.text = 'INCIDENT_TITLE';
            this.pipNavService.icon.showMenu();
        }

        this.pipNavService.actions.hide();
    }

    public onRetry() {
        this.$window.history.back();
    }

}

function configureIncidentsRoute(
    $stateProvider: pip.rest.IAuthStateService
) {
    "ngInject";

    $stateProvider
        .state(IncidentsStateName, {
            url: '/incidents',
            auth: true,
            abstract: true,
            reloadOnSearch: false,
            views: {
                '@': {
                    controller: IncidentsController,
                    controllerAs: '$ctrl',
                    templateUrl: 'incidents/IncidentsPage.html'
                }
            }
        });
}

function configureIncidentsAccess(
    iqsAccessConfigProvider: iqs.shell.IAccessConfigProvider
) {
    "ngInject";

    let accessLevel: number = iqs.shell.AccessRole.user;
    let accessConfig: any = {
        incidentClose: iqs.shell.AccessRole.manager,
        incidentConfig: iqs.shell.AccessRole.user
    };
    iqsAccessConfigProvider.registerStateAccess(IncidentsStateName, accessLevel);
    iqsAccessConfigProvider.registerStateConfigure(IncidentsStateName, accessConfig);
}

(() => {

    angular
        .module('iqsIncidents.Page', [
            'iqsIncidents.Page.Statistics',
            'iqsIncidents.Page.History',
            // 'iqsIncidents.Page.Quality',
            'iqsStatistics.DateService',
            'iqsFilterDialog',
            'iqsStatisticsGridPanel'
        ])
        .config(configureIncidentsRoute)
        .config(configureIncidentsAccess);
})();
