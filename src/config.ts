(() => {
    function iqsPositronIncidentsConfig(
        pipActionsProvider: pip.nav.IActionsProvider
    ) {
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