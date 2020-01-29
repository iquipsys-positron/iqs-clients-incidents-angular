(() => {
    function iqsPositronIncidentsConfig(
        pipActionsProvider: pip.nav.IActionsProvider,
        pipAuthStateProvider: pip.rest.IAuthStateProvider,
        pipErrorPageConfigServiceProvider: pip.errors.IErrorPageConfigProvider,
    ) {
        pipAuthStateProvider.authorizedState = 'app.statistics';
        pipErrorPageConfigServiceProvider.configs.NoConnection.RedirectSateDefault = pipAuthStateProvider.authorizedState;

        pipActionsProvider.primaryGlobalActions.unshift(...[
            { name: 'global.incidents', icon: 'icons:bell', count: 0, event: 'iqsIncidentsOpen' },
        ]);
    }

    angular
        .module('iqsPositronIncidents.Config', [
            'ngCookies',
            'iqsShell',
            'iqsIncidents.Panel',
            'pipSystem',
            'pipSystem.Templates',
        ])
        .config(iqsPositronIncidentsConfig);
})();