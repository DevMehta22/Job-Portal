
---

# DBMS Project - Job Portal

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Introduction

This project is a Job Portal developed using DBMS principles. It provides a platform for job seekers to find jobs and for employers to post job listings.

## Features

- **User Authentication:** Secure login and registration for job seekers and employers.
- **Job Listings:** Employers can create, update, and delete job postings.
- **Job Search:** Job seekers can search for jobs using various filters.
- **Application Management:** Job seekers can apply for jobs and track their applications.
- **Responsive Design:** Optimized for various devices.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript, React
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Other Tools:** npm, Git, RESTful APIs

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/DevMehta22/DBMS-PROJECT.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd DBMS-PROJECT
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Set up the MySQL database:**
   - Create a database named `job_portal`.
   - Import the schema from `db/schema.sql`.
   - Update the database configuration in `backend/config/db.js` with your MySQL credentials.

## Usage

1. **Start the backend server:**
   ```sh
   npm run server
   ```
2. **Start the frontend server:**
   ```sh
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
DBMS-PROJECT/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── frontend/
│   ├── public/
│   ├── src/
│   └── components/
├── db/
│   ├── schema.sql
├── .gitignore
├── package.json
└── README.md
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
