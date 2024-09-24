# Home Documentation for Port de Plaisance Russell API

## Overview
The **Port de Plaisance Russell API** is a RESTful web service designed to facilitate the management of catway reservations at the Russell Marina. This API provides functionalities for creating, retrieving, updating, and deleting both catways and reservations. It also ensures secure access through authentication, allowing users to manage their resources efficiently.

## Objectives
This project aims to achieve the following:
- Develop an application in an object-oriented programming language.
- Create dynamic server-side components using a defensive programming style.
- Call web services from server components.
- Implement secure access to relational or non-relational data for CRUD operations.
- Utilize a distant service via a RESTful API.

## Mission Brief
The Russell Marina is seeking an API to manage the reservation of catways, small docks for mooring boats. The API should support the following key features:
- Create a catway
- List all catways
- Retrieve details of a specific catway
- Update the status description of a specific catway
- Delete a catway
- Make a reservation for a catway
- Delete a reservation
- List all reservations
- Display details of a specific reservation

## API Endpoints
The API follows RESTful principles, centering routes around resources with appropriate HTTP methods reflecting action intent. The key routes include:

### Catways
- `GET /catways` - List all catways
- `GET /catways/:id` - Retrieve a specific catway
- `POST /catways` - Create a new catway
- `PUT /catways/:id` - Update a specific catway (full replacement)
- `PATCH /catways/:id` - Update a specific catway (partial update)
- `DELETE /catways/:id` - Delete a specific catway

### Reservations (Sub-resource of Catways)
- `GET /catways/:id/reservations` - List all reservations for a specific catway
- `GET /catways/:id/reservations/:idReservation` - Retrieve details of a specific reservation
- `POST /catways/:id/reservations` - Make a new reservation for a specific catway
- `DELETE /catways/:id/reservations/:idReservation` - Delete a specific reservation

## User Requirements
### Users
Users are characterized by:
- **Name**: The name of the user
- **Email**: User's email address
- **Password**: User's password for authentication

### Catways
Catways are characterized by:
- **Catway Number**: Unique identifier for each catway
- **Type**: Type of the catway (e.g., "long" or "short")
- **Catway State**: Description of the catway's current state

### Reservations
Reservations are characterized by:
- **Catway Number**: The catway being reserved
- **Client Name**: Name of the client making the reservation
- **Boat Name**: Name of the boat being moored
- **Check-in Date**: Start date of the reservation
- **Check-out Date**: End date of the reservation

## Getting Started

To set up the **Port de Plaisance Russell API** locally and start working with it, follow these steps:

### Prerequisites

- **Node.js** (version 20 or higher) - Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB** - A MongoDB database instance. You can set up a local MongoDB server or use a cloud-based service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation

```bash
# Clone the repository
git clone https://github.com/IekoTsu/le_port_de_plaisance.git

# Navigate to the project directory
cd port-de-plaisance-api

# Install the required dependencies
npm install

# Create a .env file in the root directory of your project with the following content:
# URL_MONGO=mongodb://yourMongoDBUri
# SECRET_KEY=yourSecretKey

# Start the server
npm start

#The credential to connect with the test user are (if using the default db):
    email: test@example.com
    password: test123

# Populate your MongoDB database with initial data using the following commands:
mongoimport --jsonArray --db your_database_name --collection catways --file catways.json
mongoimport --jsonArray --db your_database_name --collection reservations --file reservations.json
