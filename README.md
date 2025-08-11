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

📅 29th July, 2025

- Successfully designed neat and clean `About` and `Contact` pages. Faced layout issues where the contact form was overlapping with the navbar and footer on smaller screens. Resolved it by applying **media queries** and setting **min-height** to ensure proper spacing and responsiveness.

📅 1st August, 2025

- Completed Tafseer Section - Carefully implemented the full Tafseer section with attention to every edge case for a seamless user experience.

- Created a dedicated Loader component and integrated it based on the loading state during API fetch to ensure a smooth UX.

- Applied isLoading flag strategically around the fetchAllTafseers() call to control when the loader is shown and hidden.

- Developed a modular server-side pagination component that receives paginated data via props from the parent. Configured it to handle navigation based on hasNextPage, hasPrevPage, and page values from the server response.

- Ensured responsive layout and dynamic rendering of Tafseer cards using Framer Motion animations to improve UI feedback and appearance.

📅 8th August, 2025

- Today, I worked on implementing Cloudinary’s `upload_large` function to handle large video file uploads.

- Initially, it didn’t work as expected and was returning `undefined`. After some investigation, I discovered that the `upload_large` function doesn’t directly support the **await** syntax out of the box. This was causing the unexpected behavior.

- After extensive debugging and trial and error, I figured out that wrapping the `upload_large` call inside a **Promise** allowed me to properly handle the async behavior. This way, I was able to successfully extract the `secure_url` from the response once the upload was completed, enabling large video uploads without any issues.

- To further improve the frontend experience, I applied Cloudinary transformation parameters:

- **q_auto:good** → for automatic, high-quality compression.

- **br_500k** → to set a target bitrate of `500kbps` for smoother streaming.

- **f_auto** → to automatically deliver the optimal video format for the user’s browser.

- These optimizations ensure that videos on the frontend are fully optimized and compressed, loading instantly and playing smoothly without delays.

- I feel really confident after discovering such complexity in file uploads, especially when uploading to a cloud-based service and having to apply additional optimization for the best user experience.

📅 11th August, 2025

Today I made a significant refactor to my project.

Previously, I was handling video optimization in the server-side Node.js code. I completely removed that part and instead implemented video compression and optimization directly in the React frontend. For this, I installed Cloudinary’s React SDK, configured cld, and used the AdvancedVideo component.

To transform the videos, I used Cloudinary’s built-in methods such as:

`transcode()` → to set the bitrate

`delivery()` → for quality & format optimization

`format()` & `quality()` → to deliver the best output based on the browser

I also generated an optimized thumbnail using Cloudinary’s transformation features, ensuring fast loading without compromising quality.

This change simplified my backend, reduced processing time, and made the overall video loading much faster on the client side.

Afterwards, I realized that the free plan on Cloudinary comes with limited bandwidth, but it’s actually enough if used smartly with proper optimization.

In the Videos section, which was meant for lecture videos, I observed that audio files are much smaller in size compared to videos and consume significantly less bandwidth. Since the requirement for the lecture section was mostly to display just a thumbnail or some short Ayah transitions with minimal actual video content, I discussed this with my partner and we agreed that video was not really necessary.

So, I decided to refactor the **Videos section** into an **Audio section** instead. I migrated everything — components, pages, models, routes, controllers — from handling video to handling audio, moving the entire flow from server to client for audio delivery.

But to my surprise, Cloudinary still classifies audio files under the video resource type. This means that, technically, they are still processed as videos by the service, even though the actual content is just audio. So I simply call `uploadOnCloudinary()` function by passing same arguments to it as videos except folder name.

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