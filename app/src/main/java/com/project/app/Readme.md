# Event Management Backend API

This is the backend application for managing events in a college or organization. The application is built using **Spring Boot** and provides RESTful APIs to interact with event data. The frontend for this application is expected to run on React (`http://localhost:3000`).

---
## View-Page backend
## Features

- Fetch all events
- Retrieve ongoing events
- Fetch public events
- Retrieve event images by ID
- Update an existing event
- Delete an event
- Cross-Origin Resource Sharing (CORS) enabled for React frontend

---


## Endpoints

### 1. **Fetch All Events**
- **Endpoint:** `GET /viewevents`
- **Description:** Retrieves a list of all events.

### 2. **Fetch Event Image**
- **Endpoint:** `GET /event/{id}/image`
- **Description:** Retrieves the image of a specific event by ID.
- **Path Parameter:**
    - `id`: Event ID

### 3. **Fetch Ongoing Events**
- **Endpoint:** `GET /ongoingevents`
- **Description:** Retrieves a list of all ongoing events.

### 4. **Fetch Public Events**
- **Endpoint:** `GET /public/events`
- **Description:** Retrieves a list of public events.
- **Response:**
    - `200 OK` if there are public events
    - `204 No Content` if no public events are found

### 5. **Delete an Event**
- **Endpoint:** `DELETE /event/{id}`
- **Description:** Deletes an event by ID.
- **Path Parameter:**
    - `id`: Event ID
- **Response:**
    - `100 Continue` if the event was successfully deleted
    - `404 Not Found` if the event does not exist

### 6. **Get Event for Update**
- **Endpoint:** `GET /getEvent/{id}`
- **Description:** Retrieves an event by ID for updating.
- **Path Parameter:**
    - `id`: Event ID

### 7. **Update Event**
- **Endpoint:** `PUT /updateEvent/{id}`
- **Description:** Updates an event by ID.
- **Path Parameter:**
    - `id`: Event ID
- **Request Body:** JSON object representing the updated event data.

---

## Add-Event Backend
## Features

- Add a new event with an image upload
- Fetch all events
- Retrieve ongoing events
- Fetch public events
- Retrieve event images by ID
- Update an existing event
- Delete an event
- Cross-Origin Resource Sharing (CORS) enabled for React frontend

---

## Endpoints

### 1. **Add a New Event**
- **Endpoint:** `POST /addevent`
- **Description:** Adds a new event to the system along with an image.
- **Request Parts:**
    - `event` (JSON): The event object containing details such as title, description, date, etc.
    - `image` (MultipartFile): The image file associated with the event.
- **Response:**
    - `201 Created` if the event is added successfully
    - `500 Internal Server Error` if there is an error while saving the event or image

### 2. **Fetch All Events**
- **Endpoint:** `GET /viewevents`
- **Description:** Retrieves a list of all events.

### 3. **Fetch Event Image**
- **Endpoint:** `GET /event/{id}/image`
- **Description:** Retrieves the image of a specific event by ID.
- **Path Parameter:**
    - `id`: Event ID

### 4. **Fetch Ongoing Events**
- **Endpoint:** `GET /ongoingevents`
- **Description:** Retrieves a list of all ongoing events.

### 5. **Fetch Public Events**
- **Endpoint:** `GET /public/events`
- **Description:** Retrieves a list of public events.
- **Response:**
    - `200 OK` if there are public events
    - `204 No Content` if no public events are found

### 6. **Delete an Event**
- **Endpoint:** `DELETE /event/{id}`
- **Description:** Deletes an event by ID.
- **Path Parameter:**
    - `id`: Event ID
- **Response:**
    - `100 Continue` if the event was successfully deleted
    - `404 Not Found` if the event does not exist

### 7. **Get Event for Update**
- **Endpoint:** `GET /getEvent/{id}`
- **Description:** Retrieves an event by ID for updating.
- **Path Parameter:**
    - `id`: Event ID

### 8. **Update Event**
- **Endpoint:** `PUT /updateEvent/{id}`
- **Description:** Updates an event by ID.
- **Path Parameter:**
    - `id`: Event ID
- **Request Body:** JSON object representing the updated event data.

---





