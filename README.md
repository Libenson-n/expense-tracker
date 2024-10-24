# Expense Tracker App

## Overview

This is an **Expense Tracker** application built with **Next.js**, **MongoDB**, **Mongoose**, **Shadcn UI**, **Tailwind CSS**, and **TypeScript**. The app enables users to manage their expenses effectively and track their financial health over time.

## Features

- **User Authentication**: Secure registration and login functionality.
- **Transaction Management**: Easily add, edit, and delete transactions.
- **Income vs. Expenses Tracking**: Visual representation of financial health through a dashboard.
- **Responsive Design**: Optimized for both mobile and desktop devices using Tailwind CSS.
- **Type Safety**: Leveraging TypeScript for a robust development experience.

## Technologies Used

- **Next.js**: Framework for building React applications with server-side rendering.
- **MongoDB**: NoSQL database for storing user and transaction data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Shadcn UI**: A collection of accessible UI components for building interfaces.
- **Tailwind CSS**: Utility-first CSS framework for custom styling.
- **TypeScript**: Adds static types to JavaScript for improved developer experience.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (locally or a cloud instance)

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
Install dependencies:

bash
Copy code
npm install
Create a .env.local file in the root of the project and add your MongoDB connection string:

env
Copy code
MONGODB_URI=your_mongodb_connection_string
Run the development server:

bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000.

Usage
Register: Create a new account to start tracking your expenses.
Login: Access your account to manage transactions.
Add Transactions: Input details for income and expenses.
View Overview: Check your total balance, income, and expenses at a glance.
Contributing
Contributions are welcome! If you have suggestions or improvements, please create a pull request or open an issue.

Fork the repository.
Create your feature branch (git checkout -b feature-branch).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
