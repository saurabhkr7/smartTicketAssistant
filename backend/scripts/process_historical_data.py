import sys
import pandas as pd
import json
from sklearn.feature_extraction.text import TfidfVectorizer
import warnings
warnings.simplefilter("ignore", UserWarning)


def preprocess_text(text):
    # Lowercase, remove special characters, and split into words
    text = text.lower()
    return ' '.join(e for e in text.split() if e.isalnum())

def main():
    try:
        # Read the Excel file
        file_path = sys.argv[1]
        data = pd.read_excel(file_path)

        # Ensure the required columns exist
        required_columns = ['Number', 'Subject', 'Description']
        if not all(col in data.columns for col in required_columns):
            raise ValueError("Missing required columns in the uploaded file.")

        # Drop duplicates and handle missing values
        data = data.drop_duplicates().dropna(subset=required_columns)

        # Preprocess the text fields
        data['Subject'] = data['Subject'].apply(preprocess_text)
        data['Description'] = data['Description'].apply(preprocess_text)

        # Create a tags column using TF-IDF
        vectorizer = TfidfVectorizer(max_features=5, stop_words='english')
        data['Tags'] = vectorizer.fit_transform(data['Description']).toarray().tolist()

        # Convert to JSON format
        incidents = data.rename(columns={
            'Number': 'number',
            'Subject': 'subject',
            'Description': 'description',
        }).to_dict(orient='records')

        # Output the JSON for backend consumption
        print(json.dumps(incidents))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)

if __name__ == "__main__":
    main()
