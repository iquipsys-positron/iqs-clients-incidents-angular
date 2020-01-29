{
    function declareIncidentsPageResources(pipTranslateProvider: pip.services.ITranslateProvider) {
        pipTranslateProvider.translations('en', {
            INCIDENT_HISTORY_EMPTY_TITLE: 'Incidents was not found',
            INCIDENT_HISTORY_LOADING_TITLE: 'Loading incidents',
            INCIDENT_HISTORY_NEXT_BUTTON_OPTIONS: 'Load previous incidents',
            GRID_SUMM_LABEL: 'Total'
        });
        pipTranslateProvider.translations('ru', {
            INCIDENT_HISTORY_EMPTY_TITLE: 'Происшествия не найдены',
            INCIDENT_HISTORY_LOADING_TITLE: 'Загрузка происшествий',
            INCIDENT_HISTORY_NEXT_BUTTON_OPTIONS: 'Загрузить предыдущие происшествия',
            GRID_SUMM_LABEL: 'Итого'
        });
    }

    angular
        .module('iqsIncidents.Page')
        .config(declareIncidentsPageResources);
}
