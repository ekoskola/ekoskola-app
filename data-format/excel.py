
import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile

excel_file = './games-database.xlsx'
df = pd.read_excel(excel_file)

print("Column headings:")
print(df.columns)

print('head')
print(df.head())

# import pandas
# import xlrd
# df = pandas.read_excel('./games-database.xlsx')
# #print the column names
# print(df.columns)
# #get the values for a given column
# # values = df['E'].values
# # #get a data frame with selected columns
# # FORMAT = ['Arm_id', 'DSPName', 'Pincode']
# # df_selected = df[FORMAT]
# from openpyxl import load_workbook
# wb = load_workbook(filename = './games-database.xlsx')

# games = [];
# # games.append('test');

# sheet = wb.get_sheet_by_name('Sheet1')
# for row in sheet.iter_rows():
#     print(row)


# print(games)
