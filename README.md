# Ma, Anong Ulam?

> **Helping Filipino families answer one simple question:**
>
> **"Ma, anong ulam?"**

---

# Overview

**Ma, Anong Ulam?** is a web application that helps users quickly decide what to cook based on their available budget, pantry ingredients, and meal preferences.

Unlike traditional recipe websites that present hundreds of recipes, this application focuses on **making a decision**, giving users a small set of practical meal suggestions that fit their situation.

The application is designed specifically for Filipino households and uses a curated database of common Filipino viands.

---

# MVP Features

## 🍽️ Kahit Ano

The fastest way to decide what to cook.

Users answer a few simple questions:

- Budget
- Family size
- Preferred meal style (Dry / With Sauce / Soup)

The app returns 3–5 recommended viands.

---

## 🥕 Pantry

Users select the ingredients they already have.

The app recommends:

- Recipes they can cook immediately.
- Recipes that only require a few additional ingredients.

---

## 📅 Weekly Planner

Users enter:

- Weekly food budget
- Family size

The app generates a balanced weekly meal plan while staying within the specified budget.

---

## 🛒 Grocery List

Generate a grocery list directly from the weekly meal plan.

The grocery list:

- Merges duplicate ingredients.
- Groups ingredients by category.
- Estimates total cost.

---

## ❤️ Favorites

Users can save their favorite recipes for quick access.

Favorites sync across devices for signed-in users.

---

## 👤 Accounts

The application supports two modes:

### Guest Mode

No registration required.

Guests can:

- Browse recipes
- Use Kahit Ano
- Use Pantry
- Generate Weekly Plans

Guest data is stored locally in the browser.

### Account Mode

Registered users can:

- Sync favorites
- Sync pantry
- Sync weekly plans
- Continue using the app across multiple devices

---

# What This App Is

- A meal decision assistant
- A Filipino viand recommendation app
- A practical cooking companion
- A budget meal planner

---

# What This App Is Not

The MVP is **not**:

- A social media platform
- A recipe-sharing website
- A nutrition tracker
- An AI chatbot
- A food delivery service

These may be considered in future versions but are **not** part of the MVP.

---

# Core Principles

Every feature should support one primary goal:

> Help the user decide what to cook.

The application should be:

- Simple
- Fast
- Helpful
- Mobile-friendly
- Budget-conscious

---

# Technology Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js Route Handlers

## Database

- PostgreSQL

## ORM

- Prisma

## Authentication

- Auth.js

## Hosting

- Vercel

---

# Project Structure

```
ma-anong-ulam/

├── README.md
├── CLAUDE.md
│
└── docs/
    ├── PRODUCT_BLUEPRINT.md
    ├── DATABASE_SPEC.md
    ├── API_SPEC.md
    ├── UI_UX_SPEC.md
    └── TASKS.md
```

---

# Development Status

Current Version

**MVP**

Current Focus

Building the core recommendation experience before adding additional features.

---

# MVP Scope

Included

- Recipe database
- Recipe browser
- Kahit Ano recommendations
- Pantry
- Weekly planner
- Grocery list
- Favorites
- User accounts

Not Included

- AI recommendations
- Community recipes
- Ratings
- Comments
- Recipe submissions
- Nutrition tracking
- Social features

---

# Installation

Clone the repository.

```bash
git clone <repository-url>
```

Install dependencies.

```bash
npm install
```

Configure environment variables.

```bash
cp .env.example .env.local
```

Run database migrations.

```bash
npx prisma migrate dev
```

Seed the database.

```bash
npm run seed
```

Start the development server.

```bash
npm run dev
```

---

# Documentation

| Document | Purpose |
|----------|---------|
| CLAUDE.md | Instructions for Claude Code |
| PRODUCT_BLUEPRINT.md | Complete product specification |
| DATABASE_SPEC.md | Database design |
| API_SPEC.md | Backend API specification |
| UI_UX_SPEC.md | Screens and user flows |
| TASKS.md | Development milestones |

---

# Development Workflow

1. Read `CLAUDE.md`
2. Open `TASKS.md`
3. Implement the current milestone
4. Test
5. Commit
6. Repeat

---

# Success Criteria

The MVP is considered successful when a user can:

1. Open the app.
2. Receive meal recommendations.
3. Browse recipe details.
4. Save favorite recipes.
5. Maintain a pantry.
6. Generate a weekly meal plan.
7. Generate a grocery list.
8. Access their data across devices after signing in.

---

# Vision

The goal of **Ma, Anong Ulam?** is not to become the biggest recipe database.

The goal is to become the easiest way for Filipino families to answer one everyday question:

> **"Ma, anong ulam?"**