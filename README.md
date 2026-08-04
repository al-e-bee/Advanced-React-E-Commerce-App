# Advanced React E-Commerce Application

A modern, responsive e-commerce web application built with **React**, **TypeScript**, **Redux Toolkit**, and **React Query** (TanStack Query), fetching real-time data from the **FakeStoreAPI**.

---

## Key Features

- **Dynamic Category Navigation:** Fetch and filter product listings dynamically by category using React Query.
- **Global Shopping Cart State:** Fully managed via Redux Toolkit with persistent state synchronized to `sessionStorage`.
- **Interactive Cart Drawer:** Sliding `<Offcanvas>` drawer displaying total items, itemized price calculations, quantity adjustments, and single-click item removals.
- **Simulated Checkout Flow:** Accessible checkout modal that validates inputs, clears Redux state and `sessionStorage`, and provides visual order confirmation.
- **Unit Testing & High Coverage:** Robust suite of unit tests written with Vitest and React Testing Library covering Redux reducers and edge cases.
- **Responsive Styling:** Designed with **React-Bootstrap** for clean mobile and desktop layouts.

---

## Tech Stack & Tools

- **Frontend Framework:** React (Vite)
- **Language:** TypeScript
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Data Fetching & Caching:** React Query (`@tanstack/react-query`)
- **Styling & UI Components:** React-Bootstrap, Bootstrap 5
- **Testing:** Vitest, React Testing Library, JSDOM
- **API Integration:** [FakeStoreAPI](https://fakestoreapi.com/)

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/al-e-bee/Advanced-React-E-Commerce-App.git](https://github.com/al-e-bee/Advanced-React-E-Commerce-App.git)
   cd Advanced-React-E-Commerce-App
   ```
