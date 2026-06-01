# INTERVERSE---An-Interview-Platform
INTERVERSE is an interview preparation platform designed to  conduct interactive technical interviews using Natural Language Processing and transformer-based models. 

## Overview

INTERVERSE is an AI-powered interview preparation platform designed to help users practice interviews in a realistic environment. The platform generates interview questions, evaluates candidate answers using semantic similarity techniques, provides instant feedback, and supports voice-based interaction to improve communication skills and interview confidence.

## Features

* User Registration and Login
* AI-Based Interview Question Generation
* Technical and HR Interview Practice
* Semantic Answer Evaluation
* Real-Time Feedback Generation
* Text-to-Speech Support
* Interview Performance Tracking
* Secure Session-Based Authentication
* Admin Dashboard for Management

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Python
* Flask

### Database

* MySQL

### Machine Learning & NLP

* RoBERTa
* Sentence-BERT (all-MiniLM-L6-v2)
* Transformers
* Scikit-learn

### Additional Libraries

* gTTS / Text-to-Speech
* NumPy
* Pandas

---

## Project Structure

```text
INTERVERSE/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── static/
│   ├── templates/
│   ├── server.py
│   └── requirements.txt
│
├── frontend/
│   ├── css/
│   ├── js/
│   └── images/
│
├── database/
│   └── interverse.sql
│
├── README.md
└── .gitignore
```

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/SoumiChandra27/INTERVERSE---An-Interview-Platform.git
cd INTERVERSE---An-Interview-Platform
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### 3. Activate Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / Mac

```bash
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Database

1. Install MySQL.
2. Create a database named:

```sql
CREATE DATABASE interverse;
```

3. Import the SQL file:

```bash
mysql -u root -p interverse < database/interverse.sql
```

### 6. Run the Application

```bash
python server.py
```

### 7. Open in Browser

```text
http://localhost:5000
```

---

## How INTERVERSE Evaluates Answers

1. User submits an answer.
2. RoBERTa processes the text and extracts contextual features.
3. Sentence-BERT generates semantic embeddings.
4. Cosine similarity compares user responses with reference answers.
5. A score and feedback are generated automatically.

---

## Future Enhancements

* Video Interview Simulation
* Emotion Detection
* Attention Monitoring
* Resume Analysis
* AI Career Recommendations
* Multi-Language Support

---

## Contributors

Soumi Chandra
Aditya Panja

---

## License

This project is developed for educational and research purposes.
