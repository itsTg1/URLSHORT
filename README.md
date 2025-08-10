# URL Shortener - 

URL Shortener project, built with **React** and **Vite**.  
It allows users to shorten long URLs and access an admin page to view all stored links.

---

## 🚀 Features
- Shorten long URLs into clean, shareable links.
- Automatically returns the same short URL if the original link already exists.
- Copy short URLs with one click.
- Admin page to view all URLs and visit counts.

---

## 📦 Installation

### 1. Clone the repository 
```bash
git clone https://github.com/itsTg1/URLSHORT.git
cd Frontend
npm install
Create a .env file in the project root and add:
VITE_BASE_URL=http://localhost:5000
Start Command:
npm run dev
---
### For Backend
cd UrlBackend
npm install
Create a .env file in the project root and add:
- PORT=5000
- MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/urlshortener
Start Backend command:
npm start

