# Niloofar-Nayebi-open-api
(https://github.com/niloofar62/Niloofar-Nayebi-open-api)
# 🎨 Art Explorer - Fetch & Search Artworks from the Art Institute of Chicago API

## 📌 Overview  
Art Explorer is a **JavaScript-based web application** that allows users to browse **random artworks** and **search for specific artworks** from the **Art Institute of Chicago's Open API**. The app fetches **high-quality images** and artwork details, making art more accessible and engaging for users.

## 🚀 Features  
✅ **Display Random Artworks** – Load a fresh selection of **12 artworks** every time the page loads.  
✅ **Search Artworks** – Enter a keyword to find artworks by title, artist, or description.  
✅ **High-Quality Images** – Uses the **IIIF Image API** to retrieve **high-resolution artwork images**.  
✅ **Fallback Images** – If an artwork lacks a high-quality image, a **placeholder image** is used.  

---

## 🛠️ Technologies Used  
- **JavaScript** – Fetch API & DOM manipulation  
- **HTML & CSS** – Responsive UI design  
- **Art Institute of Chicago API** – Open API for fetching artwork details  

---

## 📌 How It Works  

### 1️⃣ Fetching Random Artworks  
- A random page number is generated to retrieve **12 random artworks** from the API.  
- The API response is parsed, and each artwork is displayed with its **title, artist, and image**.  
- If an artwork lacks an image, a **placeholder image** is used.  

### 2️⃣ Searching for Artworks  
- Users enter a search query, and the app fetches matching artworks from the API.  
- Each search result is displayed with **high-quality images (if available)**.  
- The app fetches **detailed artwork information**, ensuring accurate data.  


## 💡 How to Run the Project

1️⃣ **Open VS Code** and navigate to your project folder:
   - Open **VS Code** and go to:
     - **File** → **Open Folder** → Select your project folder.
   - OR use the **terminal**:
     ```bash
     cd path/to/your/project
     ```

2️⃣ **Open `index.html` in a browser**:
   - **Method 1 (Right-Click in VS Code)**:
     - Right-click on `index.html` → **"Open with Live Server"** (if installed).
   - **Method 2 (Without Live Server)**:
     - Locate the `index.html` file in your project folder.
     - Double-click it to open in your **default browser**.

3️⃣ **Alternative: Run the Project with Live Server in VS Code**:
   - If you have **Live Server extension** installed:
     - Click on **Go Live** in the bottom-right corner of VS Code.
     - OR open the terminal and type:
       ```bash
       npm install -g live-server  # If not installed
       live-server
       ```
   - Your project will launch at **`http://127.0.0.1:5500/`**.

4️⃣ **Enjoy browsing and searching for artworks!** 🎨  

