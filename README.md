# 🌿 careHeaven - Medical Camp Management System (Client Side)  

![Project Screenshot](https://via.placeholder.com/1200x600?text=Project+Screenshot)  

## 📖 Table of Contents  
1. [📜 Project Overview](#-project-overview)  
2. [🚀 Live Project Link](#-live-project-link)  
3. [🔑 Credentials (For Testing)](#-credentials-for-testing)  
4. [🛠️ Technologies Used](#-technologies-used)  
5. [🔥 Core Features](#-core-features)  
6. [📦 Dependencies](#-dependencies)  
7. [🛠️ Installation Guide](#-installation-guide)

---

## 📜 Project Overview  
The **Medical Camp Management System (MCMS)** is a **MERN stack** web application designed to streamline the process of **organizing and participating in medical camps**. It ensures efficient **communication, registration, and management** for both organizers and participants.  

---

## 🚀 Live Project Link  
🔗 **[Visit careHeaven Live](https://careheaven-a204d.web.app/)**  

---

## 🔑 Credentials (For Testing)  
📧 **Organizer Email**: `rimaakter6239@gmail.com`  
🔑 **Organizer Password**: `rima12345R`  

---

## 🛠️ Technologies Used  
- **Frontend**: React, React Router, React Hook Form, Recharts  
- **Backend**: Node.js, Express.js, MongoDB (handled separately)  
- **Authentication**: Firebase Authentication & JWT  
- **Payment Integration**: Stripe API  
- **UI & Notifications**: SweetAlert2, Toasts, Swiper  

---

## 🔥 Core Features  
✅ **Responsive Design** – Mobile, tablet, and desktop-friendly UI.  
✅ **Secure Login** – React Hook Form & social login options.  
✅ **Camp Registration** – Users can register for medical camps via a dedicated modal form.  
✅ **Real-time Updates** – Participant count dynamically updates as users join.  
✅ **Organizer Dashboard** – Manage camps, update profiles, and track registered participants.  
✅ **Participant Dashboard** – View registered camps, check payment history, and provide feedback.  
✅ **Payment Integration** – **Secure Stripe payments** for camp fees.  
✅ **Feedback & Ratings** – Users can leave feedback after attending a camp.  
✅ **Search & Sort** – Find camps by name, fees, or popularity.  
✅ **Toast Notifications** – SweetAlerts & toast messages for smooth user interactions.  
✅ **Custom 404 Page** – Designed error page for invalid routes.  
✅ **Pagination & Search in Tables** – Easy navigation of large datasets.  

---

## 📦 Dependencies  

```
"dependencies": {
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.2",
  "axios": "^1.7.9",
  "firebase": "^11.2.0",
  "jsonwebtoken": "^9.0.2",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-hook-form": "^7.54.2",
  "react-icons": "^5.4.0",
  "react-rating": "^2.0.5",
  "react-router-dom": "^7.1.3",
  "react-stars": "^2.2.5",  
  "recharts": "^2.15.1",
  "sweetalert2": "^11.15.10",
  "swiper": "^11.2.1"
}
 ```    

## 🛠️ Installation Guide  

To set up and run this project locally, follow these steps:  

### **1️⃣ Clone the Repository**  
```
git clone <repository-url>
cd careHeaven-client
```
### **2️⃣ Install Dependencies**
```
npm install
```
### **3️⃣ Run the Development Server**
```
npm start
```
## 🔧 Development
To build the project for production:
```
npm run build
```
