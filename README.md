# Team: `3xdevs`

## Team Members
- Aniket Holkar
- Viraj Turakane
- Digvijay Katkar
- Rushikesh Divekar

An Integrated AI & IoT Based Crop Planning System


## Project Name : `🌾 Agritech`


# Project Abstract

## 📖 Overview

Smart Agritech is a comprehensive agricultural technology solution that combines Artificial Intelligence and Internet of Things to revolutionize modern farming practices. The system empowers farmers with real-time insights, intelligent crop planning, disease detection, and sustainable farming guidance through an intuitive multilingual interface.

## 🎯 Key Features
### 🌤️ Weather Monitoring & Analytics
- 🔄 Real-time weather data integration  
- 📈 Weather pattern analysis for crop planning  
- 🌦️ Visual weather charts and long-range forecasts  

---

### 🔐 User Authentication & Management
- 🔐 Secure login & registration system  
- 👤 Personalized user profile management  

---

### 🐄 Livestock Management
- 🥛 **Milk Production Calculator** – Track yield and trends  
- 🤖 **AI Health Chatbot** – 24/7 animal care support  
- 🐮 **Breed Identification** – Image recognition for livestock classification  

---

### 🌱 Crop Management
- 🦠 **AI Plant Disease Detection** – Instant diagnosis via image recognition  
- 🧑‍🌾 **Plant Care Chatbot** – Expert guidance tailored to crop and region  
- 🌍 **Nearby Nursery Locator** – Find trusted suppliers and seedlings  

---

### 🏛️ Government Integration
- 📜 Access to agricultural schemes & resources  
- 💰 Info on subsidies, grants, and support programs  

---

### 🌐 IoT Integration
- 📡 Real-time soil monitoring device  
- 📊 Soil data tracking: pH, moisture, nutrient levels  

---

### 🤖 AI-Based Crop Recommendation System
- 🌾 Intelligent crop suggestions based on local soil and weather data  

---

### 📊 Dashboard & Analytics
- 🐄 Livestock performance dashboard with **profit insights**  
- 🌾 Land & crop dashboard for **yield optimization**  
- 📉 Comprehensive farm performance tracking  

---

### 🌟 Additional Smart Features
- 📈 **Yield Maximization Tips** & expert recommendations  
- 💸 **Financial Assistant** – Loan management & calculators  
- 🌐 **Multi-Language Support** – Breaking language barriers  
- 🎙️ **Voice Input** for chatbot interactions  
- 🔊 **Text-to-Speech** – Accessibility through audio output  
- 🛒 **Farmer Marketplace** – Buy/sell goods within the platform  
- 💧 **Smart Irrigation Planning** – Efficient water usage strategies  

---

## 🏗️ System Architecture

---

### 💻 Technology Stack

#### **Frontend**
- React.js  
- Tailwind CSS  
- Flutter *(Mobile App)*  

#### **Backend**
- Node.js  
- Express.js  
- RESTful APIs  

#### **Database**
- PostgreSQL  

#### **IoT Components**
- Soil sensors *(pH, moisture, NPK)*  
- Microcontroller  
- Wi-Fi module for data transmission  

#### **AI/ML Integration**
- OpenAI API  
- Google Gemini AI  
- Custom ML models for plant disease detection  

#### **External APIs**
- OpenMeteo API *(for weather data integration)*  

---

### 🧪 Prototype Stack

> For initial prototype development, the following lightweight technologies were used:

- **Frontend:**  
  - EJS  
  - HTML, CSS, JavaScript  

- **Backend:**  
  - Node.js  

- **AI Integration:**  
  - Gemini API *(for quick integration and testing)*  

---



---
## 🛠️ Installation & Setup for Prototype

This section guides you through setting up the **prototype version** of the Smart Agriculture Platform using lightweight technologies like EJS, Node.js, and the Gemini API.

---

### ⚙️ Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)
- Git (optional, for cloning the repository)

---

### 📁 Project Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-repo/smart-agriculture-prototype.git
cd smart-agriculture-prototype
```

2. **Install dependencies**
```bash
npm install
```

3. **🔑 Environment Variables**
Create a .env file in the root directory to store your sensitive API keys details and add your api key before running the program 
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### 🚀 Running the Application 
Start the development server:
```bash
node app.js
```
The prototype will run locally on:

```bash
http://localhost:3000
```