# Real Estate Management System

A comprehensive full-stack platform designed to streamline property listings, agent-client interactions, and real estate management. This project was developed as a university group project to solve real-world problems in the hospitality and housing industry.

## 🏗️ Architecture & Design
*   **Full-Stack Separation:** Built with a clear separation between a high-performance .NET REST API and a modern React.js frontend.
*   **Role-Based Access Control (RBAC):** Implemented secure, multi-level authentication for three distinct user types: Admins, Agents, and Clients.
*   **Modular Backend:** Developed using ASP.NET Core Web API with Entity Framework Core, following the MVC pattern to ensure clean business logic.

## 🛠️ Tech Stack
*   **Backend:** .NET Core Web API (C#)
*   **Frontend:** React.js (Vite)
*   **Styling:** Bootstrap (Responsive UI/UX)
*   **Database:** MSSQL (Microsoft SQL Server)
*   **ORM:** Entity Framework Core
*   **Security:** JWT (JSON Web Tokens) for secure session management

## 🚀 Key Features
*   **Advanced Property Search:** Users can browse, search, and filter available properties by type, location, and price range.
*   **Dual-Dashboard System:** 
    *   **Agent Dashboard:** Tools for agents to manage their own listings and respond to inquiries.
    *   **Admin Dashboard:** Centralized control for monitoring platform activity and managing user accounts.
*   **Appointment Scheduling:** Integrated system for users to book viewings or virtual tours directly with agents.
*   **Client Inquiry System:** Secure registration and inquiry flow, allowing clients to save favorite properties and contact agents.
*   **Responsive Design:** Fully optimized for mobile and desktop using Bootstrap and modern CSS practices.

## 🚦 Getting Started
1. Clone the repo: `git clone https://github.com/EdisonAlushaj/Real-Estate-App`
2. **Backend:**
   - Update `appsettings.json` with your MSSQL connection string.
   - Run `dotnet ef database update`.
   - Run `dotnet run`.
3. **Frontend:**
   - Navigate to the frontend folder.
   - Run `npm install` and `npm run dev`.
