# Smart Ticket Assistant

Smart Ticket Assistant is a full-stack application designed to streamline ticket management by identifying similar past incidents for faster resolution. It features a React-based frontend and a Node.js backend integrated with Python scripts for machine learning processing. This project simplifies the process of uploading historical data, matching new tickets with existing incidents, and improving overall efficiency in handling customer or internal support tickets.

Live: https://smartticketassistant.netlify.app/

## Features
- Upload historical incident data (Excel files).
- Find similar incidents for new tickets using machine learning (TF-IDF + Cosine Similarity).
- Backend API with MongoDB integration for storing and retrieving historical incidents.
- React-based frontend for user interaction.
- Deployed frontend on Netlify and backend on Render.

## Tech Stack
### Frontend
- **React**: Frontend framework for building the user interface.
- **Material-UI**: UI component library for styling.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Node.js**: Backend runtime for API handling.
- **Express**: Framework for building RESTful APIs.
- **MongoDB**: Database for storing historical incidents.
- **Python**: Used for processing data and running machine learning scripts (TF-IDF + Cosine Similarity).

### Deployment
- **Frontend**: Deployed on Netlify.
- **Backend**: Deployed on Render.

---

## Installation and Setup

### Prerequisites
1. **Node.js**: Install from [https://nodejs.org](https://nodejs.org).
2. **Python**: Install Python 3.9 or higher from [https://python.org](https://python.org).
3. **MongoDB**: Use MongoDB Atlas or a local instance.
4. **Git**: Install Git for version control.

### Clone the Repository
```bash
git clone https://github.com/saurabhkr7/smartTicketAssistant.git
cd smartTicketAssistant
```

---

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up a `.env` file in the `backend` directory with the following variables:
   ```plaintext
   PORT=8000
   MONGO_URI=<your-mongodb-connection-string>
   PYTHON_SCRIPT_PATH=./scripts
   ```

5. Start the backend server:
   ```bash
   npm start
   ```
   The backend will be running at `http://localhost:8000`.

---

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```
   The frontend will be running at `http://localhost:3000`.

---

## Deployment

### Frontend Deployment on Netlify
1. Build the React app:
   ```bash
   npm run build
   ```

2. Deploy to Netlify:
   - Go to [Netlify](https://www.netlify.com/).
   - Create a new site and link it to your GitHub repository.
   - Set the build command to `npm run build` and the publish directory to `frontend/build`.

3. Add `_redirects` file in the `public` folder:
   ```plaintext
   /* /index.html 200
   ```
   This ensures React routing works correctly.

### Backend Deployment on Render
1. Go to [Render](https://render.com/) and create a free account.
2. Create a new Web Service and link your GitHub repository.
3. Configure the deployment:
   - **Environment**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
   - Add environment variables (`MONGO_URI`, `PYTHON_SCRIPT_PATH`) in the Render dashboard.

4. Deploy the backend service. It will provide you with a public URL for the API.

---

## Usage

### 1. Upload Historical Data
- Navigate to `http://localhost:3000/upload-historical` (or your Netlify URL).
- Select an Excel file containing historical incident data.
- Click the **Upload** button.

### 2. Find Matches
- Navigate to `http://localhost:3000/find-matches` (or your Netlify URL).
- Select an Excel file containing a new ticket.
- Click the **Find Matches** button.
- View the top-matching historical incident in a table format.

---

## Project Structure
```
smartTicketAssistant/
├── backend/               # Backend API and Python scripts
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── scripts/           # Python scripts (ML processing)
│   ├── uploads/           # Temporary file storage
│   ├── app.js             # Main backend server file
│   └── package.json       # Node.js dependencies
├── frontend/              # React frontend
│   ├── public/            # Public assets
│   ├── src/               # React components and pages
│   ├── package.json       # React dependencies
│   └── README.md          # Frontend-specific documentation
└── README.md              # Project-level documentation
```

---

## API Endpoints

### Upload Historical Data
**POST** `/api/historical-data/upload`
- **Description**: Upload an Excel file to store historical data in MongoDB.
- **Request**: Multipart form-data with a file.

### Find Matches
**POST** `/api/match-finder/find-match`
- **Description**: Upload an Excel file with a new ticket to find similar historical incidents.
- **Request**: Multipart form-data with a file.
- **Response**:
  ```json
  {
    "number": "INC12345",
    "subject": "Token rendering issue",
    "description": "Rendering tokens causes application crash in module XYZ."
  }
  ```

---

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact
For any inquiries or support, please contact:
- **Name**: Saurabh Kumar
- **GitHub**: [https://github.com/saurabhkr7](https://github.com/saurabhkr7)

