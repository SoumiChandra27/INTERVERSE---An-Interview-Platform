# INTERVERSE---An-Interview-Platform
INTERVERSE is an interview preparation platform designed to  conduct interactive technical interviews using Natural Language Processing and transformer-based models. 

## Overview

INTERVERSE is an AI-powered interview preparation platform designed to help users practice interviews in a realistic environment. The platform generates interview questions, evaluates candidate answers using semantic similarity techniques, provides instant feedback, and supports voice-based interaction to improve communication skills and interview confidence.

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Forgot Password
- Reset Password

### Interview System
- Domain-based Interviews
- Dynamic Question Selection
- Adaptive Difficulty Progression
- Real-Time Interview Chat Interface
- Timer-Based Interview Sessions

### Answer Evaluation
- Semantic Similarity Analysis
- Logical Answer Validation
- Score Generation
- Feedback Generation

### Analytics
- Interview History
- Performance Dashboard
- Score Visualization
- Session Analytics

### Speech Features
- Text-to-Speech Questions
- Speech-Based Answer Input

---

## Technologies Used

### Frontend
- React.js
- React Router
- Axios
- Recharts
- CSS

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication

### NLP Models
- Sentence-BERT (all-MiniLM-L6-v2)
- RoBERTa (roberta-large-mnli)

### Other Libraries
- Pandas
- Transformers
- Sentence Transformers
- Scikit-Learn

---

## Project Structure

```text
INTERVERSE
│
├── backend
│   │
│   ├── app
│   │   ├── ai
│   │   │   
│   │   ├── core
│   │   │
│   │   ├── database
│   │   │
│   │   ├── routes
│   │   │
│   │   ├── schemas
│   │   │
│   │   ├── services
│   │   │
│   │   ├── __init__.py
│   │   └── main.py
│   │
│   ├── data
│   │   └── Interview1_dataset.csv
│   │
│   ├── evaluation_dataset.csv
│   ├── evaluation_metrics.py
│   ├── import_questions.py
│   ├── intervrse.db
│   ├── requirements.txt
│   └── run.py
│
├── frontend
│   │
│   ├── public
│   │
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── requirements_frontend.txt
│
├── README.md

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


### 5. Run the Application

```bash
python run.py inside backend terminal
```
```bash
npm run dev inside frontend terminal
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
