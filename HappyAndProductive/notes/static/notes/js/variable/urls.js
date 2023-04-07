/*!--URLs--start--!*/

const URLNotesPeriod = 'http://127.0.0.1:8000/my_notes/api/initial_window/get_records_for_period/';

const funcUrl = (period, URLPeriod = URLNotesPeriod) => {
    switch (period) {
        case 'day':
            URLPeriod += '?period=day'
            return URLPeriod
        case 'week':
            URLPeriod += '?period=week'
            return URLPeriod
        case 'month':
            URLPeriod += '?period=month'
            return URLPeriod
    }
    URLPeriod = URLNotesPeriod
}

const URLCategories = 'http://127.0.0.1:8000/my_notes/api/initial_window/get_all_groups/';

/*!--URLs--end--!*/

export { funcUrl, URLCategories }