export const IncidentsStateName: string = 'app';

function initIncidents(
    $rootScope: ng.IRootScopeService,
    $state: ng.ui.IStateService,
    $timeout: ng.ITimeoutService,
    pipTimer: pip.services.ITimerService,
    pipAuxPanel: pip.layouts.IAuxPanelService,
    pipMedia: pip.layouts.IMediaService,
    pipActions: pip.nav.IActionsService,
    pipSession: pip.services.ISessionService,
    // iqsLoading: ILoadingService,
    iqsIncidentsViewModel: iqs.shell.IIncidentsViewModel,
    iqsShell: iqs.shell.IShellService,
    iqsOrganization: iqs.shell.IOrganizationService
) {

    let isNotLoaded = true;
    // open panel if incidents exist
    $rootScope.$on('iqsIncidentsOpen', () => {
        // open panel
        if (iqsOrganization.orgId && iqsIncidentsViewModel.incidentsCount && pipSession.isOpened() && !notOpenIncidents($state.current.name)) {
            if (!pipAuxPanel.isOpen()) {
                pipAuxPanel.open();
                iqsIncidentsViewModel.reCalcElapsedDate();
            }
            iqsShell.panel = 'incident';
        }
        // update bage
        $timeout(() => {
            pipActions.updateCount('global.incidents', iqsIncidentsViewModel.incidentsCount);
        }, 0);
    });

    $timeout(
        () => {
            pipTimer.removeEvent('iqsReadIncident');
            pipTimer.addEvent('iqsReadIncident', 15 * 1000); // 15 sec
            pipTimer.removeEvent('iqsUpdateElapsedTime');
            pipTimer.addEvent('iqsUpdateElapsedTime', 60 * 1000); // 1 min
        }, 1000
    );

    $rootScope.$on(iqs.shell.LoadingCompleteEvent, () => {
        isNotLoaded = false;
    });

    function notOpenIncidents(stateName): boolean {
        return stateName == 'organizations' ||
            stateName == 'organizations.home' || stateName == 'verify_email' || stateName == 'verify_email_success' ||
            stateName == 'organizations.create' || stateName == 'expire_change_password' ||
            stateName == 'organizations.connection' || stateName == 'organizations.quick_start' || stateName == 'organizations.welcome' || stateName.name == 'organizations.invitation'
            || isNotLoaded;
    }

    // reread incidents evry 60 second
    $rootScope.$on('iqsReadIncident', () => {
        if (iqsOrganization.orgId && pipSession.isOpened() && !iqsIncidentsViewModel.getTransaction().busy()) {
            iqsIncidentsViewModel.filter = {
                skip: 0,
                take: 100,
                total: true
            };//null;
            iqsIncidentsViewModel.isSort = false;
            iqsIncidentsViewModel.read();
        }
    });

    pipSession.addCloseListener((callback) => {
        pipAuxPanel.close();
        if (callback) {
            $timeout(callback(), 500);
        }
    });
}

angular
    .module('iqsIncidentsApp', [
        'iqsIncidents.Page',
        'iqsIncidents.Panel',
        'iqsIncidents'
    ])
    .run(initIncidents);
