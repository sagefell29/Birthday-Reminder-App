# Birthday Reminder Desktop App

A lightweight desktop application for managing birthdays, tracking upcoming events, and receiving notifications directly on your computer.

Built as a learning and portfolio project using modern frontend and desktop technologies, while following clean architecture and reusable component patterns.

---

## Features

### Birthday Management

* Add birthdays
* Edit birthdays
* Delete birthdays
* Store notes for each contact
* Persistent local storage using SQLite

### Dashboard

* Today's birthdays
* Upcoming birthdays (next 7 days)
* Upcoming birthdays (next 30 days)
* Total birthdays tracked
* Average age statistics
* Most common birth month

### Search & Filtering

* Search by name
* Filter by birth month
* Filter by minimum age
* Filter by maximum age

### Notifications

* Native desktop notifications
* Automatic birthday notifications
* Notification throttling (only once per day)
* Test notification utility

### Import / Export

* Export birthday database to JSON
* Import birthdays from JSON
* Duplicate-safe imports
* Error handling and user feedback

### User Experience

* Reusable loading buttons
* Success and error feedback messages
* Modular React hooks
* Reusable utility functions
* Dedicated Settings page

---

## Tech Stack

### Frontend

* React 19
* TypeScript
* Vite

### Desktop Runtime

* Tauri 2

### Database

* SQLite
* Tauri SQLite Plugin

### Styling

* Tailwind CSS v4

### Package Manager

* pnpm

---

## Architecture

The application follows a feature-oriented structure with clear separation of concerns.

### Design Principles

* UI components focus on rendering
* Hooks contain page/business logic
* Services handle external operations
* Utilities contain pure helper functions
* Database access is centralized

---

## Running Locally

### Prerequisites

* Node.js
* pnpm
* Rust
* Tauri CLI

### Install Dependencies

```bash
pnpm install
```

### Start Development Server

```bash
pnpm tauri dev
```

### Create Production Build

```bash
pnpm tauri build
```

---

## Current Development Status

### Completed

* [x] SQLite integration
* [x] Birthday CRUD operations
* [x] Dashboard statistics
* [x] Search and filtering
* [x] Desktop notifications
* [x] Import / Export
* [x] Settings page
* [x] Reusable hooks architecture
* [x] Error handling and loading states

### In Progress

* [ ] System tray support
* [ ] Minimize to tray
* [ ] Launch on startup
* [ ] Notification preferences
* [ ] Database backup tools

### Future Ideas

* [ ] Birthday categories
* [ ] Favorite contacts
* [ ] Analytics page
* [ ] CSV import/export
* [ ] Dockerized web version
* [ ] Cloud synchronization

---

## Why This Project?

The goal of this project is to explore:

* Desktop application development with Tauri
* React architecture patterns
* SQLite integration
* Native operating system features
* TypeScript best practices
* Clean code and maintainable project structure

while building a genuinely useful application rather than a simple CRUD demo.

---

## Screenshots

Screenshots and release builds will be added as the application evolves.

---

## License

MIT License

