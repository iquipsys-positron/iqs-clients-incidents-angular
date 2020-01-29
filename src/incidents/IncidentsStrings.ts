
{
    function declareIncidentsResources(pipTranslateProvider: pip.services.ITranslateProvider) {
        pipTranslateProvider.translations('en', {
            INCIDENT_TITLE: 'Incidents',
            INCIDENT_BUTTON_OPTIONS: 'Incidents settings',
            INCIDENTS_DATA_EMPTY_TITLE: 'There are no new incidents.',
            INCIDENTS_DATA_EMPTY_SUBTITLE: 'Everything is OK!',
            INCIDENT_EXPECTED: 'Limit',
            INCIDENT_CLOSE_BUTTON: 'Close',
            INCIDENT_DAY_COUNT_TEXT: 'Incidents',
            INCIDENT_DEFAULT_RESOLUTION: 'Acknowledged',
            INCIDENTS_RESOLUTION_SETTINGS: 'Configure resolutions',
            INCIDENTS_RESOLUTION_EMPTY_TITLE: 'Resolutions were not found',
            INCIDENT_UCNDER_CUNSTRUCTION: 'The page is under construction',
            INCIDENT_RESOLUTION: 'Resolution',

            INCIDENT_ONLINE: 'Online',
            INCIDENT_OFFLINE: 'Offline',
            INCIDENT_GROUPS: 'Groups',
            INCIDENT_FREEZED: 'Disabled',
            INCIDENT_PHONE: 'Phone',
            INCIDENT_COUNT_EVENT: 'in 24 hours',
            INCIDENT_VALUE: 'Limit',
            INCIDENT_TIME: 'Time',
            INCIDENT_LOCATION: 'Location',

            INCIDENT_OPEN: 'Open',
            INCIDENT_CLOSE: 'Close',
            INCIDENT_HIDE: 'Hide',
            INCIDENT_WHOLE_ORGANIZATION: 'Whole organization',

            INSIDENT_TOOL_STATISTICS: 'Statistics',
            INSIDENT_TOOL_HISTORY: 'History',
            INSIDENT_TOOL_QUALITY: 'Quality of processing',
            INCIDENT_DATE_FROM: 'Date from: ',
            INCIDENT_SHOW_ALL: 'Show all',
            INCIDENT_HIDE_ALL: 'Show last',
            INCIDENT_RESOLUTION_ACCOUNT_CLOSE: 'Employee',
            INCIDENT_RESOLUTION_CLOSE_TIME: 'Close time',
            INCIDENT_ASSIGNED: 'Assigned',

            STATISTICS_INCIDENT_VALUE: 'Number of incidents',
            STATISTICS_INCIDENT_TIME: 'Time',
            STATS_INCIDENT_ALL_RULES: 'Number of incidents by all rules',
            STATS_INCIDENT_BY_RULES: 'Number of incidents by rule: ',
            INCIDENT_CLOSE_ALL_BUTTON: 'Close all',
            INCIDENT_CLOSE_ALL_CONFIRMATION: 'Are you sure you want to close all incidents by default resolution?',
            STATISTICS_LOADING_TITLE: 'Statistics loading...',
        });
        pipTranslateProvider.translations('ru', {
            INCIDENT_TITLE: 'Происшествия',
            INCIDENT_BUTTON_OPTIONS: 'Настройка происшествий',
            INCIDENTS_DATA_EMPTY_TITLE: 'Новых происшествий нет.',
            INCIDENTS_DATA_EMPTY_SUBTITLE: 'Все в порядке!',
            INCIDENT_EXPECTED: 'Ограничение',
            INCIDENT_CLOSE_BUTTON: 'Закрыть',
            INCIDENT_DAY_COUNT_TEXT: 'происшествий',
            INCIDENT_DEFAULT_RESOLUTION: 'Принято к сведению',
            INCIDENTS_RESOLUTION_SETTINGS: 'Настроить резолюции',
            INCIDENTS_RESOLUTION_EMPTY_TITLE: 'Резолюции не найдены',
            INCIDENT_UCNDER_CUNSTRUCTION: 'Страница находится в разработке',
            INCIDENT_RESOLUTION: 'Резолюция',

            INCIDENT_ONLINE: 'На связи',
            INCIDENT_OFFLINE: 'Не на связи',
            INCIDENT_GROUPS: 'Группы',
            INCIDENT_FREEZED: 'Отключен',
            INCIDENT_PHONE: 'Телефон',
            INCIDENT_COUNT_EVENT: 'за 24 часа',
            INCIDENT_VALUE: 'Ограничение',
            INCIDENT_TIME: 'Время',
            INCIDENT_LOCATION: 'Место',
            INCIDENT_OPEN: 'Открыть',
            INCIDENT_CLOSE: 'Закрыть',
            INCIDENT_HIDE: 'Скрыть',
            INCIDENT_WHOLE_ORGANIZATION: 'Все предприятие',

            INSIDENT_TOOL_STATISTICS: 'Статистика',
            INSIDENT_TOOL_HISTORY: 'История',
            INSIDENT_TOOL_QUALITY: 'Качество обработки',
            INCIDENT_DATE_FROM: 'Начиная с даты: ',
            INCIDENT_SHOW_ALL: 'Показать все',
            INCIDENT_HIDE_ALL: 'Показать последние',
            INCIDENT_RESOLUTION_ACCOUNT_CLOSE: 'Сотрудник',
            INCIDENT_RESOLUTION_CLOSE_TIME: 'Время закрытия',
            INCIDENT_ASSIGNED: 'Назначение',

            STATISTICS_INCIDENT_VALUE: 'Число происшествий',
            STATISTICS_INCIDENT_TIME: 'Время',
            STATS_INCIDENT_ALL_RULES: 'Число происшествий по всем правилам',
            STATS_INCIDENT_BY_RULES: 'Число происшествий по правилу: ',
            INCIDENT_CLOSE_ALL_BUTTON: 'Закрыть все',
            INCIDENT_CLOSE_ALL_CONFIRMATION: 'Вы уверены, что хотите закрыть все происшествия резолюцией по умолчанию?',
            STATISTICS_LOADING_TITLE: 'Статистики загружаются...',
        });
    }

    angular
        .module('iqsIncidents')
        .config(declareIncidentsResources);
}
