# CLAUDE.md

# Ma, Anong Ulam?

Project Context for Claude Code

Version: MVP 1.0

Status: Active Development

---

# Purpose

This document provides permanent project context for Claude Code.

Always read this file before implementing any feature.

When making implementation decisions:

1. Follow the Product Blueprint.
2. Stay within MVP scope.
3. Keep the application simple.
4. Do not introduce new features.
5. Ask for clarification if implementation conflicts with documentation.

---

# Project Summary

Ma, Anong Ulam? is a Filipino meal decision assistant.

Its primary purpose is to help users quickly decide what to cook based on:

- Budget
- Available ingredients
- Family size
- Meal preference

This application is NOT a recipe website.

It is a recommendation system with recipes.

The recommendation experience always comes first.

---

# Project Goal

Allow a user to answer one question:

> "Ma, anong ulam?"

in less than one minute.

Everything in the application should support this goal.

---

# Product Philosophy

Prioritize:

- Simplicity
- Speed
- Practicality
- Familiarity
- Maintainability

Avoid unnecessary complexity.

Never build features simply because they are technically interesting.

---

# MVP Scope

Included

- Recipe Browser
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites
- User Accounts

Not Included

- AI
- Community Recipes
- Ratings
- Comments
- Nutrition
- Meal Tracking
- Social Features
- Recipe Submission
- Admin Dashboard

These are future ideas only.

Do not implement them unless the Product Blueprint is updated.

---

# Core User Flow

The primary user journey is:

Open App

↓

Choose Recommendation Method

↓

Answer Simple Questions

↓

Receive Meal Suggestions

↓

Open Recipe

↓

Cook

Every implementation decision should improve this flow.

---

# Recommendation Philosophy

Do NOT overwhelm users.

Return a small number of high-quality recommendations.

Prefer quality over quantity.

Every recommendation should include:

- Recipe
- Estimated Cost
- Cooking Time
- Reason for Recommendation

Recommendations should be deterministic.

Do not return random results.

---

# Design Principles

The interface should feel:

- Warm
- Friendly
- Fast
- Mobile-first
- Family-oriented

Avoid excessive animations.

Avoid visual clutter.

Every page should have one primary action.

---

# Technology Stack

Framework

- Next.js 15

Language

- TypeScript

Styling

- Tailwind CSS

Database

- PostgreSQL

ORM

- Prisma

Authentication

- Auth.js

Hosting

- Vercel

Blob Storage

- Vercel Blob

Use these technologies unless the Product Blueprint explicitly changes.

---

# Architecture Principles

Business logic belongs on the server.

React components should:

- Display information
- Handle user interactions
- Trigger actions

Do NOT place recommendation logic inside UI components.

---

# Folder Structure

```
app/
components/
lib/
prisma/
public/
docs/
```

Keep the project organized.

Do not create unnecessary folders.

---

# Code Style

Always prefer:

Small functions.

Small components.

Readable code.

Explicit names.

Strong typing.

Avoid:

Large files.

Nested logic.

Duplicated code.

Magic numbers.

Magic strings.

---

# Validation

Every API endpoint must validate requests.

Use:

- Zod

Never trust client input.

---

# Database Rules

Never bypass Prisma.

Do not write raw SQL unless absolutely necessary.

Use Prisma relationships.

Keep migrations clean.

---

# Recipe Rules

Recipes must always contain:

- Name
- Ingredients
- Instructions
- Estimated Cost
- Servings
- Prep Time
- Cook Time
- Meal Style
- Difficulty

Do not create partial recipes.

---

# Pantry Rules

Pantry recommendations should:

Prefer recipes using available ingredients.

If ingredients are missing:

Show the smallest number of missing ingredients first.

---

# Weekly Planner Rules

Generate:

7 Days

Lunch

Dinner

Stay within the user's budget whenever practical.

Avoid duplicate recipes.

Promote ingredient reuse to reduce grocery costs.

---

# Grocery List Rules

Merge duplicate ingredients.

Group ingredients by category.

Estimate total grocery cost.

Allow purchased items to be checked off.

---

# Favorites

Guests

Store locally.

Signed-in users

Store in the database.

Favorites should synchronize across devices.

---

# Authentication

Guests can use:

- Recipe Browser
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List

Accounts are only required for persistence across devices.

Do not block users from trying the application.

---

# Performance Goals

Recommendation

<500ms

Pantry

<700ms

Weekly Planner

<3 seconds

Optimize database queries before optimizing UI.

---

# Accessibility

Use semantic HTML.

Ensure keyboard navigation.

Maintain sufficient color contrast.

Label form controls.

Use accessible button labels.

---

# Error Handling

Every page should include:

Loading State

Empty State

Error State

Do not leave blank screens.

Display user-friendly messages.

Never expose stack traces.

---

# Testing Expectations

Every feature should be manually tested.

Critical logic should have unit tests.

Recommendation logic must produce consistent results.

---

# Documentation

Treat these documents as the source of truth:

- PRODUCT_BLUEPRINT.md
- DATABASE_SPEC.md
- API_SPEC.md
- UI_UX_SPEC.md
- TASKS.md

If code conflicts with documentation:

Update documentation first.

Then implement.

---

# Non-Negotiable Rules

Never add features outside the MVP.

Never redesign the application without approval.

Never duplicate business logic.

Never duplicate components.

Never hardcode recipe costs.

Never hardcode ingredient names.

Never bypass validation.

Never place recommendation logic inside React components.

Never expose internal errors to users.

---

# Development Workflow

Before starting any task:

1. Read this file.
2. Read the relevant section of PRODUCT_BLUEPRINT.md.
3. Read the corresponding milestone in TASKS.md.

Then implement only that milestone.

Do not work on unrelated features.

---

# Definition of Done

A feature is complete when:

- Requirements are implemented.
- TypeScript passes.
- ESLint passes.
- Manual testing succeeds.
- Loading states exist.
- Empty states exist.
- Error states exist.
- Mobile layout works.
- Documentation remains accurate.

---

# Final Reminder

This application exists to solve one simple problem:

Help Filipino families decide what to cook today.

Whenever you are uncertain about an implementation decision, ask yourself:

> "Does this make it easier for the user to decide what to cook?"

If the answer is no, it probably does not belong in the MVP.