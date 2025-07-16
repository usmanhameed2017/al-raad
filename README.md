# Al-Ra’ad 📖

### 📜 Description
An Islamic web platform to explore Tafseer, download PDFs, read books, watch videos, and get daily Ayat guidance — built with MERN stack.

---

### 📚 Sections
- Tafseer
- Seerah
- Research Work
- Videos

---

### 🧠 Features
- Tafseer upload & daily Ayat display
- Books & PDFs download section
- Videos section
- Admin panel to manage content
- Responsive UI with React
- REST API with Node.js & Express
- MongoDB for data storage

---

### 🎨 Tech Stack
- Frontend: React.js, react-bootstrap, react-router-dom, axios, yup, formik 
- Backend: Node.js, Express.js, REST APIs
- Database: MongoDB
- Cloudinary for PDFs storage

--- 

## 📝 Thought Process

### 🚀 Initial Setup
I started this project by focusing on the backend first. My initial step was to carefully design the data models using Mongoose to ensure the database structure would support all the application features.

After setting up the models, I configured essential middlewares in the `app.js` file, such as **cookie-parser**, **cors**, and **error handling**, to make the API robust and secure.

Moving forward, I implemented the authentication flow, including user signup and login. For signup, I integrated an email service using the **nodemailer** package to send verification emails, which helped in making the system more secure and user-friendly.

### ☁️ File Uploading To Cloudinary
Later, I created an account on Cloudinary and obtained its API keys to handle file uploads. Since storing files directly on the server is not scalable and only suitable for temporary storage, I decided to upload all files to Cloudinary.

I also developed multiple utility functions inside a utils folder to handle these operations — such as uploading files from the temporary server directory to Cloudinary, deleting files from the temp storage, and managing Cloudinary deletions during edit or delete operations.

This approach ensured that the server remains lightweight, and file storage is efficiently handled by Cloudinary.

#### 🛠️ A Tricky File Deletion Problem
While building the CRUD REST APIs for the Book model, I encountered an interesting challenge.
Each book record needed both a cover image and a PDF file upload option, which meant managing multiple file types on Cloudinary.

The tricky part was handling deletions on Cloudinary. To delete a file there, you need its public ID. I noticed that Cloudinary generates different public IDs based on the resource type:

1. For cover images (uploaded with resource_type: `image`), the public ID is generated without the file extension.

2. For PDF files (uploaded as resource_type: `raw`), the public ID is generated with the file extension.

Initially, this difference caused confusion — the cover image was successfully getting deleted, but the PDF file wasn’t. It took some investigation to realize that this was due to how Cloudinary treats different resource types.

To solve this, I adjusted the logic to extract the public ID differently for image and raw files. I used Node’s path module to carefully parse the URL and construct the correct public ID, ensuring that deletion works reliably for both types.

I created parameterized utility functions for uploading and deleting files from Cloudinary. These functions take three parameters — **cloudinaryUrl**, **resourceType**, and **folderName** — allowing files to be managed in an organized way. This setup ensures that files are stored on Cloudinary within a proper folder structure and are also categorized by their respective resource types, making the overall file management neat and scalable.

This not only cleared the confusion but also made the file management process much more robust.

---

### ⚙ Setup Installation
```bash
# Clone this repository
git clone https://github.com/usmanhameed2017/al-raad.git

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Start development servers
npm start
```

---

### 📌 Note
This project is intended for learning and educational purpose. Contributions and suggestions are welcome!

---

## 📧 Contact
Feel free to connect on [LinkedIn](https://www.linkedin.com/in/usman-hameed-05b513240)