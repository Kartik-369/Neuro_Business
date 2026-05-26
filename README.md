# NeuroBusiness
**Predictive Customer Intelligence & Retention Platform**

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Project-emerald?style=for-the-badge)](https://neuro-business.vercel.app/)
[![Stack](https://img.shields.io/badge/Stack-FARM_(FastAPI,_React,_MongoDB)-blue?style=for-the-badge)]()

NeuroBusiness is an end-to-end B2B Machine Learning platform designed to move beyond black-box predictions. It ingests transaction data, predicts customer churn using XGBoost, explains the exact risk drivers using SHAP, and dynamically generates actionable retention strategies using Google's Gemini LLM.

## Features

* **Data Engineering Pipeline:** Automated parsing, validation, and encoding of raw CSV transaction data.
* **Predictive Analytics:** XGBoost classification model trained to identify at-risk customers with high accuracy.
* **Explainable AI (XAI):** SHAP (SHapley Additive exPlanations) integration translates mathematical probabilities into human-readable business drivers.
* **Generative AI Strategies:** Contextual prompt injection via the Gemini API to formulate customized, 3-step retention plans based on specific customer risk profiles.
* **Secure Cloud Architecture:** Full JWT-based authentication, password hashing via bcrypt, and secure MongoDB Vault integration.

## 💻 Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS
* GSAP & Lenis (Scroll Animations)
* Recharts (Data Visualization)

**Backend:**
* FastAPI (Python)
* MongoDB (Motor AsyncIO)
* XGBoost & Scikit-Learn
* SHAP (TreeExplainer)
* Google GenAI API (Gemini)
* Resend API (Transactional Emails)

## 📸 System Preview
*(Add a screenshot)*
`![Dashboard Preview](./assets/dashboard-screenshot.png)`

## 🛠️ Local Development Setup

### Prerequisites
* Node.js (v18+)
* Python (3.10+)
* MongoDB Cluster URL

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

## Create a .env file in the backend directory (see .env.example for required keys).

### 2. Frontend Setup
```bash
cd frontend
npm install
```
## Update the API fetch URLs in the React components to point to http://localhost:8000 for local testing
```bash
npm run dev
```
## Architecture Overview
* **Client Layer**: User uploads CSV datasets via the React interface.

* **API Gateway**: FastAPI receives the multipart file, validates the JWT, and triggers the inference pipeline.

* **Inference Engine**: Pandas parses the data, XGBoost calculates the risk probabilities, and SHAP extracts the feature importance.

* **LLM Augmentation**: Top risk features are injected into a structured prompt for the Gemini API.

* **Storage & Delivery**: Results are persisted in MongoDB and returned to the client for interactive charting.
