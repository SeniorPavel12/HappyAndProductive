all_apiview_description = {
    'create_records': '''
        Use a POST request
        --> Group: Required fields: title, color(9-digit number representing color(RGB)); Unique fields: color\n
        --> Plan: Required fields: title, info__date_completion; Related fields directly: timer, Related fields remotely: group\n
        --> Notification: Required fields: time_reaction\n
        --> Reminder: Required fields: title, date_completion; Related fields directly: notifications(required fields: time_reaction); Related fields remotely: group\n
        --> Schedule: Required fields: title, days; Related fields directly: days(the fields title_day of which must be equal to different days of the week (in the upper font), if the condition field (according to WORKING) is equal to WEEKEND, then the fields describing the work must be empty, the fields execution_time and start_time+end_time are interchangeable, but can also be empty); Related fields remotely: group
    ''',
    'initial_window': '''
        Use a GET request
        --> GetRecordsForPeriod: If you do not specify the parameters, then the period will be equal to a day.Period options: month, week, day; specify them in the url bar as ?period=<period>\n  
        --> GetAllGroup: Don't specify anything\n
        --> GetAllRecordsForStatus: If you do not specify the parameters, then the condition will be equal to a UNFULFILLED.Condition options: REMOTE, UNFULFILLED, OVERDUE, COMPLETED, RUNNING, specify them in the url bar as ?condition =<period>\n
    ''',
    'actions_schedule': '''
        Use a GET request
        --> GetAllSchedule: Don't specify anything\n
    ''',
    'reminder': '''
        GET: Outputs all reminder fields; POST: all fields are optional except for the cases listed below, you specify the field you want to change, taking into account its position and set a new value. In the group field in the list, specify the id of the groups that you want to link.In the notifications field, you can immediately change objects, but the required field is id.PUT: used for working with related objects: in the group field, specify the id of the groups that you want to untie from the object, in the notifications field, specify the fields that will be removed and untied from the object.DELETE: completely deletes the object
    ''',
    'plan': '''
        GET: Outputs all plan fields; POST: all fields are optional except for the cases listed below, you specify the field you want to change, taking into account its position and set a new value. In the group field in the list, specify the id of the groups that you want to link.PUT: used for working with related objects: in the group field, specify the id of the groups that you want to untie from the object.DELETE: completely deletes the object
    ''',
    'group': '''
        GET: Output all fields of the group; POST: all fields are optional, it is not advised to change the color field; DELETE: completely deletes the object
    ''',
    'timer': '''
        GET: Output all timer; POST fields: all fields are optional 
    ''',
    'notifications': '''
        GET: Output all timer fields; POST: available fields for changing descriptionb condition
    ''',
    'schedule': '''
        ТЫ ЛОХ ВСЁ РАВНО НЕ НАПИШЕШЬ ДЛЯ СХЕМЫ ФРОНТ ЛОХ
    '''

}

# Schedule
'''
{
    "title": "first_schedule",
    "description": "This is opisania",
    "days": [{
        "title_day": "MONDAY",
        "condition": "WORKING",
        "description": "Позаниматься программированием некоторое время",
        "execution_time": "2:34:12"},
            {
        "title_day": "TUESDAY",
        "condition": "WORKING",
        "description": "Позаниматься кулинарией некоторое время",
        "execution_time": "1:00:53"},
            {
        "title_day": "WEDNESDAY",
        "condition": "WORKING",
        "description": "Позаниматься спортом некоторое время",
        "execution_time": "0:30:00"},
            {
        "title_day": "THURSDAY",
        "condition": "WORKING",
        "description": "Позаниматься чем нибудь в четверг некоторое время",
        "execution_time": "0:30:00"},
            {
        "title_day": "FRIDAY",
        "condition": "WORKING",
        "description": "Позаниматься чем нибудь в пятницу некоторое время",
        "execution_time": "0:30:00"}, 
            {
        "title_day": "SATURDAY",
        "condition": "WORKING",
        "description": "Позаниматься чем нибудь в субботу некоторое время",
        "execution_time": "0:30:00"}                
        ]
}
['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
{   
    "title": "update_first_schedule",
    "description": "This not is opisania",
    "days": [{
        "title_day": "MONDAY",
        "condition": "WORKING",
        "description": "Позаниматься программированием некоторое время",
        "execution_time": "2:34:12"},
            {
        "title_day": "TUESDAY",
        "condition": "WORKING",
        "description": "Позаниматься кулинарией некоторое время",
        "execution_time": "1:00:53"},
            {
        "title_day": "WEDNESDAY",
        "condition": "WORKING",
        "description": "Позаниматься спортом некоторое время",
        "execution_time": "0:30:00"},
            {
        "title_day": "FRIDAY",
        "condition": "WORKING",
        "description": "Позаниматься всем остальным некоторое время",
        "execution_time": "0:05:00"}        


            ]
}
'''
# Plan
'''
{
    "title":"first_plan",
    "info": {
            "description":"Чё нибудь запланировано",
            "date_completion":"2033-04-25",
            "timer":
                {"time_left":"3600"}
        },
    "group":["64eb600ff4ca4f78800983e775fd87bd"]
}
'''
# Reminder
'''
{
    "title":"third_reminder",
    "info": {
            "description":"Чё нибудь напомнить",
            "date_completion":"2033-04-25"
        },
    "group":["64eb600ff4ca4f78800983e775fd87bd"],
    "notifications":[
            {
        "time_reaction":"2023-03-23 10:47:39.113445",
        "description":"Первое напоминание"},
            {
        "time_reaction":"2023-03-23 10:47:39.113445",
        "description":"Второе напоминание"}            
    ]
}
{
    "notifications":[
            {
        "id":"df24f94214354a09a4441c0410a76664",
        "time_reaction":"2023-03-23 10:47:39.113445",
        "description":"Первое напоминание"},
            {
        "id":"55894960a7714d57b022f2ff872be380",
        "time_reaction":"2023-03-23 10:47:39.113445",
        "description":"Второе напоминание"}            
    ]
}
'''
# Group
'''
{
    "title":"first_group",
    "color":"123432712",
    "description":"какая то группа"
}
{
    "group":["64eb600ff4ca4f78800983e775fd87bd"]
}
'''
# Notifications
'''
{
    "time_reaction":"2023-03-23 10:47:39.113445",
    "description":"Первое напоминание"
}
'''
# User
'''
{
"username":"json_user",
"password":"123456789!",
"email":"pavelvel12@yandex.ru"
}
'''