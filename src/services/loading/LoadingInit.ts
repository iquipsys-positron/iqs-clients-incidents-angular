function initPopulating(
    iqsStatesViewModel: iqs.shell.IStatesViewModel,
    iqsOperationalEventsViewModel: iqs.shell.IOperationalEventsViewModel,
    iqsResolutionsViewModel: iqs.shell.IResolutionsViewModel,
    iqsIncidentsViewModel: iqs.shell.IIncidentsViewModel,
    iqsEventRulesViewModel: iqs.shell.IEventRulesViewModel,
    iqsObjectRoutesViewModel: iqs.shell.IObjectRoutesViewModel,
    pipIdentity: pip.services.IIdentityService,
    iqsLoading: iqs.shell.ILoadingService
) {
    iqsLoading.push('data', [
        iqsStatesViewModel.clean.bind(iqsStatesViewModel),
        iqsOperationalEventsViewModel.clean.bind(iqsOperationalEventsViewModel),
        iqsResolutionsViewModel.clean.bind(iqsResolutionsViewModel),
        iqsIncidentsViewModel.clean.bind(iqsIncidentsViewModel),
        iqsEventRulesViewModel.clean.bind(iqsEventRulesViewModel),
        iqsObjectRoutesViewModel.cleanUp.bind(iqsObjectRoutesViewModel)
    ], async.parallel, [
            (callback) => {
                iqsStatesViewModel.cleanUpAllStates();
                iqsStatesViewModel.initStates(new Date().toISOString(), 'all',
                    (data: any) => {
                        callback();
                    },
                    (error: any) => {
                        callback(error);
                    });
            },
            (callback) => {
                iqsOperationalEventsViewModel.filter = null;
                iqsOperationalEventsViewModel.isSort = true;
                iqsOperationalEventsViewModel.selectAllow = false;
                iqsOperationalEventsViewModel.reload(
                    (data: any) => {
                        callback();
                    },
                    (error: any) => {
                        callback(error);
                    });
            },
            (callback) => {
                iqsResolutionsViewModel.filter = null;
                iqsResolutionsViewModel.isSort = true;
                iqsResolutionsViewModel.reload(
                    (data: any) => {
                        callback();
                    },
                    (error: any) => {
                        callback(error);
                    });
            },
            (callback) => {
                iqsIncidentsViewModel.filter = null;
                iqsIncidentsViewModel.isSort = true;
                iqsIncidentsViewModel.reload(
                    (data: any) => {
                        callback();
                    },
                    (error: any) => {
                        callback(error);
                    });
            },
            (callback) => {
                iqsEventRulesViewModel.filter = null;
                iqsEventRulesViewModel.isSort = true;
                iqsEventRulesViewModel.reload(
                    (data: any) => {
                        callback();
                    },
                    (error: any) => {
                        callback(error);
                    });
            }
        ]);
    if (pipIdentity.identity && pipIdentity.identity.id) {
        iqsLoading.start();
    }
}


let m: any;
const requires = [
    'iqsStates.ViewModel',
    'iqsOperationalEvents.ViewModel',
    'iqsResolutions.ViewModel',
    'iqsIncidents.ViewModel',
    'iqsEventRules.ViewModel',
    'iqsObjectRoutes.ViewModel'
];

try {
    m = angular.module('iqsLoading');
    m.requires.push(...requires);
    m.run(initPopulating);
} catch (err) { }