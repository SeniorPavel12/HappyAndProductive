# def diffWaysToCompute(expression):
#     def recursion(expression, cash):
#         # if count == comparator:
#         #     ans.append([''.join(now.copy()), eval(''.join(now.copy()))])
#         #     return
#         # for left in range(0, n - 2):
#         #     now.insert(left, '(')
#         #     if left == 0 or (now[left + 1].isdigit() and not now[left - 1].isdigit()):
#         #         for right in range(left + 2, n):
#         #             now.insert(right, ')')
#         #             if (now[right - 1].isdigit() and not now[right + 1].isdigit()):
#         #                 print(''.join(expression))
#         #                 recursion(sup, now, count + 1)
#         #             del now[right]
#         #     del now[left]
#         if cash not in last_cash:
#             last_cash.append(cash)
#             now = expression
#             for p in cash:
#                 now[]
#         for left in range(max_left):
#             for right in range(left + 2, len(expression)):
#                 if [left, right] not in cash:
#                     cash.append([left, right])
#                     recursion(expression, cash)
#                 else:
#                     continue
#
#
#
#
#
#     last_cash = []
#     sup = []
#     last = -1
#     for ind in range(len(expression)):
#         if not expression[ind].isnumeric():
#             last = ind
#             sup.append(expression[ind])
#         else:
#             if ind == len(expression)-1:
#                 sup.append(expression[last+1:])
#                 last = ind
#             elif not expression[ind+1].isdigit():
#                 sup.append(expression[last+1:ind+1])
#                 last = ind
#
#     print(f"sup - {sup}")
#     max_left = 0
#     for ind in range(len(sup)):
#         if sup[ind].isdigit():
#             max_left = max(max_left, ind)
#     ans = []
#     recursion(expression, sup, 0)
#     return ans
#
#
#
#
#
#
#
#
#
#
# x = diffWaysToCompute("21-13-1")
# for i in x:
#     print(i)
import datetime
import time
import uuid
from calendar import monthrange
from time import timezone



# print(date.today() - timedelta(days=date.today().weekday()), date.today() + timedelta(days=6 - date.today().weekday()))
# print(monthrange(2024, 3))


# def create(validated_data):
#     def recursion(name, validated_data):
#         for k, v in validated_data.items():
#             print(k,v)
#             if type(v) == dict:
#                 recursion(name + k + '__', v)
#             else:
#                 data[name + k] = v
#
#     data = {}
#     print(data)
#     recursion('', validated_data)
#     return data
#
# print(create({'one': '1', 'two': '2', 'three': {'one': '3.1', 'two': '3.2'}}))

# #
# print(datetime.date.today())
# x = '''{
#     "title": "first_create",
#     "info": {
#         "description": "This is my opisania",
#         "date_completion": "2023-03-05"
#     }
# }'''
# print(x[131])
# print(len(x))
#Schedule
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
        "execution_time": "0:30:00"}, 
            {
        "title_day": "SUNDAY",
        "condition": "WORKING",
        "description": "Позаниматься чем нибудь в воскресенье некоторое время",
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
#Plan
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
#Reminder
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
#Group
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
#Notifications
'''
{
    "time_reaction":"2023-03-23 10:47:39.113445",
    "description":"Первое напоминание"
}
'''
#User
'''
{
"username":"json_user",
"password":"123456789!",
"email":"pavelvel12@yandex.ru"
}
'''
# ПРОВЕРИТЬ МЕТОД CLEAR В МОДЕЛИ SCHEDULEMODEL ТАМ ВОЗНИКАЕТ ОШИБКА ИЗ ЗА ИСПОЛЬЗОВАНИЯ ADD ДО СОХРАНЕНИЯ ОБЪЕКТА
# print(type(datetime.datetime.now().date()))

# x = {1, 2, 3, 4}
# y = {1, 2, 3, 4, 5, 6, 7}
# print(y.difference(x))
# print(datetime.datetime.now())
x = {'a': 1}
print(x['b'])