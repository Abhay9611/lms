import pandas as pd
import psycopg2
import re
# Database connection parameters
DB_NAME = "learnify_db"
DB_USER = "postgres"
DB_PASSWORD = "c0nverg3nce"
DB_HOST = "localhost"
DB_PORT = "5432"

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)

# Read the CSV file
csv_file_path = 'quiz_data.csv'
data = pd.read_csv(csv_file_path, encoding='utf-8')

# Print the data to verify
print(data.head())

# Function to fetch gradeId by gradeName
def get_grade_id(grade_name, conn):
    with conn.cursor() as cur:
        cur.execute("SELECT id FROM public.\"Grades\" WHERE name = %s", (grade_name,))
        result = cur.fetchone()
        return result[0] if result else None

# Function to fetch subjectId by gradeId and subjectName
def get_subject_id(grade_id, subject_name, conn):
    with conn.cursor() as cur:
        cur.execute("SELECT id FROM public.\"Subjects\" WHERE \"gradeId\" = %s AND name = %s", (grade_id, subject_name))
        result = cur.fetchone()
        return result[0] if result else None

# Function to fetch topicId by subjectId and topicName
def get_topic_id(subject_id, topic_name, conn):
    with conn.cursor() as cur:
        cur.execute("SELECT id FROM public.\"Topics\" WHERE \"subjectId\" = %s AND title = %s", (subject_id, topic_name))
        result = cur.fetchone()
        return result[0] if result else None

# Insert data into Quizzes table
def insert_into_quizzes(row, topic_id, conn):
    with conn.cursor() as cur:
        # Convert specific fields to appropriate types
        def safe_str(val):
            if pd.isna(val):
                return ''
            val_str = str(val)
            val_str = val_str.replace("'", "''")
            return val_str

        time_limit = int(row['timeLimit']) if not pd.isna(row['timeLimit']) else 0
        passing_score = int(row['passingScore']) if not pd.isna(row['passingScore']) else 0
        option1_is_correct = str(row['option1_isCorrect']).upper() == 'TRUE'
        option2_is_correct = str(row['option2_isCorrect']).upper() == 'TRUE'
        option3_is_correct = str(row['option3_isCorrect']).upper() == 'TRUE'
        option4_is_correct = str(row['option4_isCorrect']).upper() == 'TRUE'

        values = (
            safe_str(row['title']), safe_str(row['description']), time_limit, passing_score, str(topic_id),
            safe_str(row['question']), safe_str(row['points']), safe_str(row['order']),
            safe_str(row['option1_text']), option1_is_correct, safe_str(row['option1_explanation']),
            safe_str(row['option2_text']), option2_is_correct, safe_str(row['option2_explanation']),
            safe_str(row['option3_text']), option3_is_correct, safe_str(row['option3_explanation']),
            safe_str(row['option4_text']), option4_is_correct, safe_str(row['option4_explanation'])
        )

        # Construct the SQL query using f-string for debugging
        sql_query = f"""
        INSERT INTO public."Quizzes" (
            id, "title", "description", "timeLimit", "passingScore", "topicId", "question", "points", "order",
            "option1_text", "option1_iscorrect", "option1_explanation",
            "option2_text", "option2_iscorrect", "option2_explanation",
            "option3_text", "option3_iscorrect", "option3_explanation",
            "option4_text", "option4_iscorrect", "option4_explanation", "createdAt", "updatedAt"
        ) VALUES (uuid_generate_v4(), '{safe_str(row['title'])}', '{safe_str(row['description'])}', {time_limit}, {passing_score}, '{str(topic_id)}',
        '{safe_str(row['question'])}', '{safe_str(row['points'])}', '{safe_str(row['order'])}',
        '{safe_str(row['option1_text'])}', {option1_is_correct}, '{safe_str(row['option1_explanation'])}',
        '{safe_str(row['option2_text'])}', {option2_is_correct}, '{safe_str(row['option2_explanation'])}',
        '{safe_str(row['option3_text'])}', {option3_is_correct}, '{safe_str(row['option3_explanation'])}',
        '{safe_str(row['option4_text'])}', {option4_is_correct}, '{safe_str(row['option4_explanation'])}', NOW(), NOW())
        """

        # Print the formatted SQL query
        print("Insertion Successful", safe_str(row['question']))

        # Execute the query
        cur.execute(sql_query)

# List to store questions that cause TypeError
error_questions = []

# Process each row in the CSV
def process_csv_data(data, conn):
    for index, row in data.iterrows():
        try:
            grade_id = get_grade_id(row['gradeName'], conn)
            if grade_id is None:
                print(f"Grade not found for {row['gradeName']}")
                continue

            subject_id = get_subject_id(grade_id, row['subjectName'], conn)
            if subject_id is None:
                print(f"Subject not found for {row['subjectName']} under grade {row['gradeName']}")
                continue

            topic_id = get_topic_id(subject_id, row['topicName'], conn)
            if topic_id is None:
                print(f"Topic not found for {row['topicName']} under subject {row['subjectName']}")
                continue

            insert_into_quizzes(row, topic_id, conn)
        except TypeError as e:
            print(f"TypeError for question: {row['question']}, error: {e}")
            error_questions.append(row['question'])

# Execute the process
process_csv_data(data, conn)

# Print questions that caused TypeError
if error_questions:
    print("Questions that caused TypeError:")
    for question in error_questions:
        print(question)

# Commit the transaction
conn.commit()

# Close the connection
conn.close() 