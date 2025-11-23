# MeetUp Events Frontend

This is the frontend for the **MeetUp Events Web App**, built using **React.js**.  
It allows users to browse events, create new events, view details, and search/filter events.  
The application communicates with a backend API hosted on **Vercel**.

---

## 🌐 Live Deployment
You can access the deployed frontend application here:  
**https://meet-up-events-frontend.vercel.app**

---

## 🔗 Backend API
The frontend uses the backend API deployed at:  
**https://meet-up-events-backend.vercel.app/events**

---

## 🚀 Features
- View all events  
- Create new events  
- Search & filter events  
- View event details  
- Responsive UI design  
- Reusable components & custom hooks  
- Integrated with live backend API  

---

## 🔧 Tech Stack
- **React.js**
- **React Router**
- **Custom Hooks (useFetch)**
- **CSS**
- **Vercel (Deployment)**

---

## 📁 Project Structure
frontend/
│── src/
│ │── components/
│ │── pages/
│ │── hooks/
│ │── App.js
│ │── index.js
│── public/
│── package.json


---

## ▶️ Running the Frontend Locally

### 1. Install dependencies
npm install

### 2. Start the development server
npm start


The app will run at:
http://localhost:3000


---

## 🧩 API Usage in the Project

### Example `useFetch` usage:
```js
const { data, loading, error } = useFetch(
  "https://meet-up-events-backend.vercel.app/events"
);
📸 Pages Included
Home Page – Displays all events

Create Event Page – Add new event

Event Details Page – View full event information

Search/Filter Section – Quickly find events

📝 Sample Event Object json

{
  "title": "Tech Meetup",
  "description": "A meetup for developers",
  "date": "2024-11-21",
  "location": "Guwahati",
  "image": "https://example.com/image.jpg"
}
🙌 Author
Developed by Mridul Roy as part of a full-stack assignment project.
