# Courses and Lessons API Documentation

Base URL: `https://fischerbon.onrender.com`

---

## API Overview

This API enables management of courses and lessons. It supports creating, retrieving, updating, and deleting courses and lessons, with support for multimedia content such as images, PDFs, and videos uploaded as form-data.

---

## Endpoints

### 1. Get All Courses

```
GET /courses/
```

- **Description**: Retrieve a list of all courses.
- **Request Parameters**: None
- **Response**:
  - Status: `200 OK`
  - Body: Array of course objects

---

### 2. Get Single Course

```
GET /courses/{course_id}
```

- **Description**: Retrieve details of a single course by its ID. Includes populated lessons.
- **URL Parameters**:
  - `course_id` (string, required): ID of the course to retrieve.
- **Response**:
  - Status: `200 OK`
  - Body: Course object with lessons populated.
- **Errors**:
  - `401 Unauthorized` if the user is not authenticated.
  - `404 Not Found` if the course does not exist.

---

### 3. Create Course

```
POST /courses/create
Content-Type: multipart/form-data
```

- **Description**: Create a new course with title, description, price, and optional thumbnail image.
- **Request Body (multipart/form-data)**:
  - `thumbnail` (file, optional): Image file (JPEG, PNG) for course thumbnail.
  - `title` (string, required): Course title.
  - `description` (string, optional): Course description.
  - `price` (number, required): Course price.
- **Response**:
  - Status: `201 Created`
  - Body: Created course object with assigned ID.
- **Example Body**:

```
--boundary
Content-Disposition: form-data; name="thumbnail"; filename="thumbnail.jpg"
Content-Type: image/jpeg

<binary image data>
--boundary
Content-Disposition: form-data; name="title"

lorem ipsum dolor
--boundary
Content-Disposition: form-data; name="description"

lorem ipsum dolor
--boundary
Content-Disposition: form-data; name="price"

5000
--boundary--
```

---

### 4. Edit Course

```
POST /courses/{course_id}
Content-Type: multipart/form-data
```

- **Description**: Update fields of an existing course, such as title, description, price, and thumbnail.
- **URL Parameters**:
  - `course_id` (string, required): ID of the course to update.
- **Request Body (multipart/form-data)**:
  - Any combination of:
    - `thumbnail` (file, optional): New thumbnail image file.
    - `title` (string, optional): New title.
    - `description` (string, optional): New description.
    - `price` (number, optional): New price.
- **Response**:
  - Status: `200 OK`
  - Body: Updated course object.
- **Example Body**:

```
--boundary
Content-Disposition: form-data; name="title"

a very good course
--boundary--
```

---

### 5. Delete Course

```
DELETE /courses/{course_id}
```

- **Description**: Delete a course by its ID.
- **URL Parameters**:
  - `course_id` (string, required): ID of the course to delete.
- **Response**:
  - Status: `200 OK`
  - Body: Deleted course object.
- **Errors**:
  - `400 Bad Request` if course or user IDs are invalid.
  - `401 Unauthorized` if user is not owner or admin.
  - `404 Not Found` if course doesn’t exist.

---

### 6. Add New Lesson to Course

```
POST /courses/{course_id}/lessons
Content-Type: multipart/form-data
```

- **Description**: Add a new lesson with title, text content, supporting files (PDFs), and an optional video.
- **URL Parameters**:
  - `course_id` (string, required): ID of the course to add the lesson to.
- **Request Body (multipart/form-data)**:
  - `title` (string, required): Lesson title.
  - `text` (string, optional): Lesson textual content.
  - `lessonFiles` (files, optional, multiple): One or more PDF files supporting the lesson.
  - `lessonVideo` (file, optional): Video file for the lesson (MP4 or other supported video formats).
- **Response**:
  - Status: `201 Created`
  - Body: Created lesson object.
- **Example Body**:

```
--boundary
Content-Disposition: form-data; name="title"

great lesson
--boundary
Content-Disposition: form-data; name="text"

lorem ipsum dolor sit amet ...
--boundary
Content-Disposition: form-data; name="lessonFiles"; filename="lessonFile1.pdf"
Content-Type: application/pdf

<binary PDF data>
--boundary
Content-Disposition: form-data; name="lessonFiles"; filename="lessonFile2.pdf"
Content-Type: application/pdf

<binary PDF data>
--boundary
Content-Disposition: form-data; name="lessonVideo"; filename="lessonVideo.mp4"
Content-Type: video/mp4

<binary video data>
--boundary--
```

---

### 7. Get Single Lesson

```
GET /courses/{course_id}/lessons/{lesson_id}
```

- **Description**: Retrieve details of a single lesson under a course.
- **URL Parameters**:
  - `course_id` (string, required): ID of the course.
  - `lesson_id` (string, required): ID of the lesson.
- **Response**:
  - Status: `200 OK`
  - Body: Lesson object.
- **Errors**:
  - `404 Not Found` if the lesson or course does not exist.

---

### 8. Delete Lesson

```
DELETE /courses/{course_id}/lessons/{lesson_id}
```

- **Description**: Delete a lesson by ID within a course.
- **URL Parameters**:
  - `course_id` (string, required): ID of the course.
  - `lesson_id` (string, required): ID of the lesson.
- **Response**:
  - Status: `200 OK`
  - Body: Course object with updated lessons list.
- **Errors**:
  - `400 Bad Request` if IDs invalid.
  - `401 Unauthorized` if user is not authorized.
  - `404 Not Found` if the lesson or course doesn’t exist.

---

## Notes on Multipart Form-Data Format

- All file uploads (images, PDFs, videos) must be sent as separate parts with correct `Content-Disposition` and `Content-Type`.
- Boundary in the header must match boundaries separating parts in the request body.
- Example boundary delimiter in requests: `--boundary`
- Final boundary must end with `--boundary--`

---

## Response Format (JSON)

All endpoints return JSON responses structured as:

```json
{
  "success": true,
  "message": "Informative message",
  "data": { ... }
}
```

Error responses have status codes 4xx or 5xx and look like:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ] // Optional detailed errors
}
```

---

## Authentication and Authorization

- Most endpoints require authentication; user ID is typically extracted from the auth token.
- Sensitive operations like delete or update require ownership or admin privileges.

---
