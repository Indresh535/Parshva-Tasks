import pandas as pd

# Load the Excel file
input_file = 'export29913.xlsx'
output_file = 'output_excel_file.xlsx'

df = pd.read_excel(input_file)

# Forward fill (ffill) to fill in the missing supplier information

df['Chg'].fillna(method='ffill', inplace=True)
df['Supplier'].fillna(method='ffill', inplace=True)
df['Com'].fillna(method='ffill', inplace=True)
df['Type'].fillna(method='ffill', inplace=True)
df['Conf'].fillna(method='ffill', inplace=True)
df['Order Date'].fillna(method='ffill', inplace=True)
df['Buyer'].fillna(method='ffill', inplace=True)
df['Account Number'].fillna(method='ffill', inplace=True)
df['Supplier'].fillna(method='ffill', inplace=True)
df['Curr'].fillna(method='ffill', inplace=True)
df['Contract'].fillna(method='ffill', inplace=True)
df['Remarks'].fillna(method='ffill', inplace=True)

# Save the modified DataFrame to a new Excel file
df.to_excel(output_file, index=False, engine='openpyxl')
