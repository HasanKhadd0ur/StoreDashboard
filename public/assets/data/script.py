import pandas as pd

# Load the dataset
df = pd.read_csv("vgsales.csv")

# Drop rows with any null values
df_cleaned = df.dropna()

# Save the cleaned dataset (optional)
df_cleaned.to_csv("vgsales.csv", index=False)

# Print the number of rows before and after cleaning
print(f"Original rows: {len(df)}, Cleaned rows: {len(df_cleaned)}")
