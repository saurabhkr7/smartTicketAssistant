import sys
import pandas as pd
import json
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def preprocess_text(text):
    # Lowercase, remove special characters, and split into words
    text = text.lower()
    return ' '.join(e for e in text.split() if e.isalnum())

def main():
    try:
        # Load the new ticket
        new_ticket_path = sys.argv[1]
        new_ticket = pd.read_excel(new_ticket_path)

        # Ensure the required columns exist
        required_columns = ['Number', 'Subject', 'Description']
        if not all(col in new_ticket.columns for col in required_columns):
            raise ValueError("Missing required columns in the new ticket file.")

        # Preprocess new ticket text
        new_ticket['Subject'] = new_ticket['Subject'].apply(preprocess_text)
        new_ticket['Description'] = new_ticket['Description'].apply(preprocess_text)

        # Fetch historical data from MongoDB
        client = MongoClient("mongodb+srv://arthwiseMongo:%40rthwiseMongo@arthwiseusers.g7y5n.mongodb.net/Arthwise?retryWrites=true&w=majority&appName=ArthwiseUsers")  # Update with your MongoDB URI
        db = client["Arthwise"]  # Replace with your database name
        collection = db["historicalincidents"]  # Replace with your collection name

        historical_data = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB `_id`
        client.close()

        # Convert historical data to a DataFrame
        historical_df = pd.DataFrame(historical_data)

        # Ensure historical data has the necessary columns
        if 'subject' not in historical_df.columns or 'description' not in historical_df.columns:
            raise ValueError("Historical data is missing required columns.")

        # Preprocess historical data text
        historical_df['subject'] = historical_df['subject'].apply(preprocess_text)
        historical_df['description'] = historical_df['description'].apply(preprocess_text)

        # Combine text fields for vectorization
        corpus = historical_df['subject'] + " " + historical_df['description']
        query = new_ticket['Subject'][0] + " " + new_ticket['Description'][0]

        # Calculate cosine similarity
        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = vectorizer.fit_transform(corpus)
        query_vector = vectorizer.transform([query])
        similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()

        # Get the top-most match
        top_index = similarities.argmax()
        top_match = historical_df.iloc[top_index].to_dict()

        # Output the match as JSON
        print(json.dumps(top_match, ensure_ascii=False))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)

if __name__ == "__main__":
    main()
