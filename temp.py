import pandas as pd
import sqlite3

# Load the Excel file
excel_file = r"C:\node js\airportapi\Database.xlsx"  # Change this to your file path
db_file = "airport.db"  # SQLite database file

# Read all sheets from the Excel file
xls = pd.ExcelFile(excel_file)

# Connect to SQLite database
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

# Convert each sheet to a table in SQLite
for sheet_name in xls.sheet_names:
    df = xls.parse(sheet_name)  # Read each sheet
    df.to_sql(sheet_name, conn, if_exists="replace", index=False)  # Save to SQLite

# Commit and close the connection
conn.commit()
conn.close()

print("Conversion complete!")
