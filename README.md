# React Food Order App 🍔

A full-stack equivalent Practice Project built to master **Advanced Component patterns, Custom Hooks, and React Portals**.

This application simulates a real-world food ordering platform (like UberEats) where users can browse meals, manage a complex shopping cart, and submit orders via a checkout form. It focuses heavily on **"Senior Engineer"** mental models: separation of concerns, finite state machines for UI, and declarative HTTP handling.

## 🚀 Key Features & Concepts Implemented

### 1. Advanced State Management (The "Brain")

- **Context API + useReducer:** Instead of passing props down 5 levels (Prop Drilling), we built a `CartContext` that acts as a centralized "Store".
- **Finite State Machine (FSM):** The User Interface (Modals) is controlled by a `UserProgressContext`. It enforces strict states (`'cart'`, `'checkout'`, or `null`), preventing "Modal Hell" (impossible states where two modals overlap).

### 2. Architectural Patterns

- **React Portals:** Used `createPortal` to render Modals outside the DOM hierarchy (attached to `document.body`) to avoid CSS stacking context issues.
- **Custom Hooks (`useHttp`):** Extracted API fetching logic into a reusable hook, separating mechanism from policy.
- **Optimistic UI:** Designed priority for immediate user feedback while handling background data synchronization.

### 3. Forms & Data Handling

- **React Actions Pattern:** Moved from imperative handlers to declarative actions using `useActionState`, handling pending states automatically.
- **Native Validation:** Leveraged HTML5 constraint validation for immediate feedback.

---

## 🧠 Under the Hood & Advanced JS

- **Function Hoisting:** Understanding how the JS Engine's **Creation Phase vs. Execution Phase** affects where we define our actions and how closures capture variables.
- **The Event Loop & Transitions:** How React manages async actions and how Promises resolve in the **Microtask Queue**, ensuring UI updates happen at the optimal time in the render cycle.
- **FormData Internals:** Deep dive into the **FormData Web API**, understanding how it extracts values from the DOM and using methods like `Object.fromEntries(formData.entries())` to convert iterators into usable JSON objects.
- **Immutability:** Why we strictly use `[...array]` spread operators instead of `.push()` to ensure Reference Equality checks in React's reconciliation process trigger re-renders correctly.

---

## 🤖 AI-Assisted Learning

This project was built with the assistance of advanced AI tools to ensure a deep understanding of "Under the Hood" concepts:

- **Google Antigravity with Gemini 3:** Used as an intelligent pair programmer to explain the _why_ behind architectural decisions and debug complex flow issues.
- **Code Wiki:**  Used to analyze the official React source code repositories to understand internal mechanisms
---

## 📚 Course Context

This project is part of the **React - The Complete Guide 2025 (incl. Next.js, Redux)** course.

It serves as the capstone practice project for the "Food Order App" section, integrating multiple advanced concepts into a single application.

**Course Link:** [React - The Complete Guide 2025](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
