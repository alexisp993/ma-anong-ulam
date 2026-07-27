# PRODUCT_BLUEPRINT.md

> **Project:** Ma, Anong Ulam?
>
> **Version:** MVP 1.0
>
> **Status:** Approved for Development
>
> **Document Owner:** Product Team
>
> **Purpose:** This document is the single source of truth for the MVP product requirements. It defines what will be built, how it should behave, and the functional expectations for the application. Implementation-specific details (frameworks, libraries, coding standards) belong in `CLAUDE.md`.

---

# Part 1 — Executive Summary

## 1.1 Introduction

**Ma, Anong Ulam?** is a web application designed to help Filipino households answer one of the most common daily questions:

> **"Ma, anong ulam?"**

Choosing what to cook can become a repetitive and frustrating decision, especially when balancing a limited budget, available ingredients, family preferences, and time.

Rather than presenting hundreds of recipes, **Ma, Anong Ulam?** focuses on helping users make a practical decision quickly.

The application recommends a small number of suitable Filipino viands based on the user's current situation.

---

## 1.2 Problem Statement

Many households experience "decision fatigue" when planning meals.

Common questions include:

- What can we cook today?
- What can we afford?
- What can we cook using the ingredients we already have?
- How can we stay within this week's food budget?
- What groceries do we need?

Existing recipe websites generally solve a different problem:

> They teach users **how** to cook.

They do not effectively help users decide **what** to cook.

This leaves users scrolling through dozens or hundreds of recipes without making a decision.

---

## 1.3 Solution

Ma, Anong Ulam? is a **meal decision assistant**.

Instead of functioning as a traditional recipe website, it guides users toward a small set of practical recommendations based on simple inputs such as:

- Available budget
- Family size
- Pantry ingredients
- Preferred meal style

The application then recommends several viands that best match those conditions and explains why they were selected.

Once a meal has been chosen, the user can:

- View the recipe
- Save it as a favorite
- Add it to a weekly meal plan
- Generate a grocery list if needed

---

## 1.4 Product Vision

To become the simplest and most practical meal decision companion for Filipino households.

The application should reduce the stress of deciding what to cook by providing quick, relevant, and budget-conscious recommendations.

The long-term vision is not to become the largest recipe database, but to become the most trusted daily meal-planning companion for Filipino families.

---

## 1.5 Product Mission

Help users confidently decide what to cook in less than one minute.

Every feature included in the application should directly contribute to this mission.

If a feature does not help users make a meal decision, it should not be included in the MVP.

---

## 1.6 Primary Goals

The MVP has six primary goals:

### Goal 1 — Simplify Meal Decisions

Reduce the time and effort required to decide what to cook.

---

### Goal 2 — Support Budget-Conscious Cooking

Recommend meals that align with the user's available food budget.

---

### Goal 3 — Maximize Pantry Usage

Help users cook meals using ingredients they already have, minimizing unnecessary grocery purchases.

---

### Goal 4 — Simplify Weekly Meal Planning

Generate practical weekly meal plans that balance variety, affordability, and ingredient reuse.

---

### Goal 5 — Reduce Grocery Planning Effort

Automatically generate organized grocery lists based on selected meal plans.

---

### Goal 6 — Enable Cross-Device Convenience

Allow registered users to access their saved data, favorites, pantry, and meal plans across multiple devices.

---

## 1.7 Success Criteria

The MVP is considered successful if a typical user can:

1. Open the application.
2. Answer a few simple questions.
3. Receive useful meal recommendations.
4. Select a recipe.
5. Generate a grocery list if needed.

This entire process should take only a few minutes.

---

## 1.8 Target Audience

The initial MVP is designed primarily for Filipino users, including:

- Parents planning daily family meals.
- Individuals living independently.
- Students managing limited food budgets.
- Couples planning weekly meals.
- Anyone who regularly cooks Filipino dishes.

The application assumes familiarity with common Filipino ingredients and viands.

---

## 1.9 Core Value Proposition

Unlike recipe websites that present overwhelming numbers of choices, **Ma, Anong Ulam?** narrows those choices into a handful of practical recommendations.

The application's value lies in helping users answer:

> **"What should we cook today?"**

instead of simply asking:

> **"How do I cook this recipe?"**

---

## 1.10 Guiding Principles

The product should consistently follow these principles:

### Simplicity

The application should be easy to understand and require minimal effort to use.

---

### Practicality

Recommendations should prioritize meals that users can realistically prepare.

---

### Speed

Users should receive recommendations quickly without unnecessary steps.

---

### Transparency

Recommendations should include a clear explanation of why they were suggested.

---

### Familiarity

The application should focus on dishes commonly prepared in Filipino households.

---

### Maintainability

The MVP should favor simple, maintainable solutions over unnecessary complexity.

---

## 1.11 Out of Scope (MVP)

The following features are intentionally excluded from the MVP:

- AI-generated recommendations
- Community recipe submissions
- Recipe ratings
- Comments and discussions
- Nutrition tracking
- Calorie counting
- Food delivery integration
- Social sharing features
- Seasonal recommendations
- Voice assistant support
- Regional cuisine personalization
- Machine learning personalization

These ideas may be explored in future releases but are not part of the MVP.

---

## 1.12 MVP Feature Summary

The MVP consists of the following features:

### Recipe Browser

Browse and search curated Filipino recipes.

---

### Kahit Ano

Receive meal recommendations based on a few simple questions.

---

### Pantry

Maintain a list of available ingredients and receive pantry-aware recommendations.

---

### Weekly Planner

Generate a practical weekly meal plan within a specified budget.

---

### Grocery List

Generate an organized grocery list from the weekly meal plan.

---

### Favorites

Save preferred recipes for quick access.

---

### User Accounts

Allow registered users to synchronize their data across multiple devices while still supporting anonymous guest usage.

---

## 1.13 Product Definition

For the purpose of this project, **Ma, Anong Ulam?** is defined as:

> A web-based meal decision assistant that recommends practical Filipino meals based on a user's budget, pantry, and preferences.

This definition should guide all future product decisions.

---

## End of Part 1

# Part 2 — Product Vision & Product Principles

---

# 2.1 Product Vision

The vision of **Ma, Anong Ulam?** is to become the simplest and most practical meal decision companion for Filipino households.

Every day, millions of Filipinos ask the same question:

> **"Ma, anong ulam?"**

This question is rarely about finding a recipe.

Instead, it is about making a practical decision based on real-life constraints such as:

- Limited budget
- Available ingredients
- Family size
- Cooking time
- Personal preference

The application exists to reduce the effort required to make that decision.

Rather than presenting endless choices, the application should guide users toward a small number of recommendations they can confidently choose from.

---

# 2.2 Product Philosophy

The application should prioritize **decision support** rather than **recipe discovery**.

Most recipe websites answer:

> "How do I cook this?"

Ma, Anong Ulam? answers:

> "What should I cook today?"

This distinction influences every aspect of the product.

Whenever uncertainty exists during development, prioritize helping the user make a decision.

---

# 2.3 Product Principles

The following principles govern every feature included in the MVP.

---

## Principle 1 — Simplicity First

The application should feel approachable for users of all technical backgrounds.

Interfaces should avoid unnecessary complexity.

Users should never need to learn how to use the application.

Instead, the application should feel immediately familiar.

Examples:

- Clear navigation
- Minimal user input
- Straightforward language
- Obvious primary actions

---

## Principle 2 — Recommendations Over Search

Searching should be available, but it is not the primary experience.

The application's primary responsibility is recommending meals.

Search exists only as a secondary method for users who already know what they are looking for.

---

## Principle 3 — Respect the User's Budget

Budget is one of the most important decision factors for many Filipino households.

Recommendations should always consider affordability whenever budget information is provided.

The application should avoid recommending meals that significantly exceed the user's specified budget.

---

## Principle 4 — Reduce Food Waste

Whenever pantry information is available, recommendations should prioritize recipes that maximize the use of existing ingredients.

This reduces unnecessary grocery purchases and minimizes food waste.

---

## Principle 5 — Keep Choices Manageable

More choices do not necessarily create a better experience.

Instead of showing dozens of recipes, the application should recommend a small number of high-quality matches.

Recommended default:

- 3 to 5 recipes

This encourages faster decision-making.

---

## Principle 6 — Explain Recommendations

Users should understand why a recipe was recommended.

Every recommendation should include a short explanation.

Examples:

- Fits your budget.
- Uses most of your pantry ingredients.
- Ready in about 30 minutes.
- Great for a family of four.

Transparency builds trust.

---

## Principle 7 — Mobile-First Experience

The application is expected to be used primarily on mobile devices.

All screens should be designed for small screens first.

Desktop layouts should enhance—not replace—the mobile experience.

---

## Principle 8 — Fast Interactions

Users should receive recommendations quickly.

Avoid unnecessary steps.

The application should feel responsive even on average internet connections.

Waiting should be minimized whenever possible.

---

## Principle 9 — Familiar Filipino Experience

Recipes should reflect meals commonly prepared in Filipino households.

Ingredient names, terminology, and categories should use familiar Filipino conventions.

The application should feel local rather than generic.

---

## Principle 10 — Consistency

The same action should produce the same result under the same conditions.

Recommendations should be deterministic.

Users should be able to trust that the application behaves predictably.

---

# 2.4 Product Goals

The MVP focuses on achieving the following goals.

## Goal 1

Help users decide what to cook quickly.

---

## Goal 2

Reduce decision fatigue.

---

## Goal 3

Help families stay within their food budget.

---

## Goal 4

Encourage the use of ingredients already available at home.

---

## Goal 5

Simplify weekly meal planning.

---

## Goal 6

Reduce grocery planning effort.

---

## Goal 7

Provide a pleasant, frustration-free user experience.

---

# 2.5 Product Non-Goals

The MVP intentionally does **not** attempt to become:

- A social platform
- A recipe marketplace
- A nutrition tracker
- A calorie counter
- A food blog
- A cooking school
- A food delivery platform
- An AI chatbot

These are outside the scope of the MVP.

---

# 2.6 User Experience Principles

Every interaction should feel:

### Fast

Avoid unnecessary waiting.

---

### Clear

Users should always understand what the application is asking.

---

### Friendly

Use conversational language.

Avoid technical terminology whenever possible.

---

### Helpful

Recommendations should feel useful rather than random.

---

### Forgiving

Users should be able to change their minds easily.

Examples:

- Change budget
- Replace a planned meal
- Remove pantry items
- Edit grocery lists

---

# 2.7 Product Personality

If Ma, Anong Ulam? were a person, it would be:

- Helpful
- Practical
- Friendly
- Encouraging
- Organized
- Reliable

It should never feel:

- Complicated
- Pushy
- Overly technical
- Judgmental

The tone should resemble a trusted family member offering meal suggestions.

---

# 2.8 Design Philosophy

The visual design should support the application's purpose rather than distract from it.

Design priorities:

1. Readability
2. Simplicity
3. Speed
4. Accessibility
5. Consistency

Decorative elements should never interfere with usability.

---

# 2.9 Decision Framework

When evaluating whether a feature belongs in the MVP, apply the following question:

> **Does this feature make it easier for users to decide what to cook?**

If the answer is:

**Yes**

The feature may belong in the MVP.

**No**

The feature should be deferred to a future version.

This framework should guide future product discussions and prevent unnecessary scope expansion.

---

# 2.10 Long-Term Vision

Although the MVP intentionally remains simple, the product should be built on a foundation that allows future growth.

Potential future enhancements include:

- AI-assisted recommendations
- Seasonal recipe suggestions
- Regional Filipino cuisine support
- Nutrition information
- Recipe submissions
- Personalized recommendations

These features are **future considerations only** and must not influence the design or implementation of the MVP.

---

# 2.11 Summary

The success of **Ma, Anong Ulam?** will not be measured by the number of recipes it contains.

Instead, success will be measured by how quickly and confidently users can decide what to cook.

Every design decision, feature, and implementation should reinforce this objective.

The application exists to remove uncertainty—not to create more choices.

---

## End of Part 2

# Part 3 — Target Users & User Personas

---

# 3.1 Purpose

This section defines the intended users of **Ma, Anong Ulam?**

Understanding who the application is built for helps ensure that every feature solves a real problem instead of adding unnecessary complexity.

The MVP is designed for users who cook regularly and need help deciding **what** to cook, not necessarily **how** to cook.

---

# 3.2 Primary Audience

The primary audience is Filipino households that prepare home-cooked meals.

These users typically:

- Cook several times per week.
- Have a limited food budget.
- Purchase groceries weekly.
- Keep common pantry ingredients at home.
- Want practical meal ideas instead of browsing hundreds of recipes.

The MVP assumes users are familiar with common Filipino ingredients and dishes.

---

# 3.3 Secondary Audience

The application also serves:

- Students living independently.
- Young professionals.
- Newly married couples.
- Individuals learning to cook Filipino meals.
- Small households.

Although their situations differ, they all share the same core need:

> Help me decide what to cook.

---

# 3.4 User Personas

The following personas represent the primary users of the MVP.

These personas are intended to guide product decisions rather than represent every possible user.

---

# Persona 1 — The Parent

## Profile

- Usually prepares meals for the family.
- Plans meals every day.
- Manages a household food budget.
- Often shops once or twice a week.

## Goals

- Prepare affordable meals.
- Reduce time spent deciding what to cook.
- Avoid repeating the same meals too often.
- Make the most of available ingredients.

## Pain Points

- Constantly being asked what to cook.
- Running out of meal ideas.
- Staying within budget.
- Avoiding unnecessary grocery trips.

## Features Used

- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites

---

# Persona 2 — The Budget-Conscious Individual

## Profile

- Lives alone or with roommates.
- Has a fixed food allowance.
- Shops with a limited budget.
- Prefers simple meals.

## Goals

- Stretch the food budget.
- Minimize food waste.
- Buy only what is needed.

## Pain Points

- Expensive grocery trips.
- Wasted ingredients.
- Difficulty planning meals.

## Features Used

- Kahit Ano
- Budget-based recommendations
- Pantry
- Grocery List

---

# Persona 3 — The Busy Professional

## Profile

- Works full-time.
- Has limited cooking time.
- Wants quick meal suggestions.

## Goals

- Spend less time deciding.
- Cook practical meals.
- Plan meals for the work week.

## Pain Points

- Decision fatigue after work.
- Limited cooking time.
- Forgetting grocery items.

## Features Used

- Kahit Ano
- Weekly Planner
- Favorites
- Grocery List

---

# Persona 4 — The Student

## Profile

- Lives away from home.
- Has a very limited budget.
- Has a small pantry.

## Goals

- Cook inexpensive meals.
- Use existing ingredients.
- Learn simple Filipino recipes.

## Pain Points

- Small grocery budget.
- Limited cooking experience.
- Few ingredients available.

## Features Used

- Pantry
- Kahit Ano
- Recipe Browser

---

# 3.5 Common User Goals

Regardless of persona, users generally want to:

- Decide what to cook quickly.
- Stay within budget.
- Use ingredients already available.
- Reduce grocery expenses.
- Avoid repeating meals too frequently.
- Save recipes they enjoy.

These goals should remain the focus of the MVP.

---

# 3.6 Common User Frustrations

The application aims to reduce the following frustrations:

- "I don't know what to cook."
- "We've already eaten that this week."
- "I don't have enough ingredients."
- "I don't want to overspend."
- "I forgot what to buy."

Each MVP feature should directly address at least one of these frustrations.

---

# 3.7 User Types

The MVP supports two user types.

---

## Guest User

Guest users can access the application immediately without creating an account.

Guest users can:

- Browse recipes.
- Use Kahit Ano.
- Maintain a pantry.
- Generate weekly meal plans.
- Generate grocery lists.
- Save favorites locally.

Guest data is stored only on the current device.

If the browser data is cleared, guest data is lost.

---

## Registered User

Registered users have access to the same functionality as guest users, with the additional benefit of cloud synchronization.

Registered users can:

- Access their data from multiple devices.
- Sync favorites.
- Sync pantry items.
- Sync weekly meal plans.
- Sync grocery lists.

Registration exists to preserve user data rather than unlock additional features.

The application should never force users to create an account before trying the core experience.

---

# 3.8 User Journey Overview

Most users are expected to follow one of these journeys.

---

## Journey A — Daily Recommendation

Open App

↓

Choose "Kahit Ano"

↓

Enter Budget

↓

Select Family Size

↓

(Optional) Choose Meal Style

↓

Receive Recommendations

↓

Open Recipe

↓

Cook

---

## Journey B — Pantry Recommendation

Open App

↓

Open Pantry

↓

Select Available Ingredients

↓

Generate Suggestions

↓

Review Recommendations

↓

Open Recipe

↓

Cook

---

## Journey C — Weekly Planning

Open Planner

↓

Enter Weekly Budget

↓

Enter Family Size

↓

Generate Weekly Plan

↓

Review Meals

↓

Generate Grocery List

↓

Go Shopping

---

## Journey D — Favorites

Browse Recipes

↓

Open Recipe

↓

Save to Favorites

↓

Access Favorite Recipes Later

---

# 3.9 User Expectations

Users should reasonably expect the application to:

- Provide practical meal suggestions.
- Respect their specified budget.
- Recommend familiar Filipino dishes.
- Save their data if signed in.
- Work well on mobile devices.
- Respond quickly.

The application should avoid surprising users with unexpected behavior.

---

# 3.10 Design Considerations

The application should accommodate users with varying levels of technical experience.

Therefore:

- Use clear labels.
- Avoid jargon.
- Keep forms short.
- Use large touch targets.
- Display concise explanations.
- Minimize required user input.

The goal is to make the application usable by anyone who regularly cooks at home.

---

# 3.11 MVP Success from the User's Perspective

A successful user experience means that a user can:

1. Open the application.
2. Understand what it does immediately.
3. Receive useful meal recommendations.
4. Decide what to cook without frustration.
5. Generate a grocery list if necessary.

If users consistently achieve these outcomes, the MVP has fulfilled its primary objective.

---

## End of Part 3

# Part 4 — MVP Scope

---

# 4.1 Purpose

This section defines the complete scope of the **Ma, Anong Ulam? MVP**.

It serves as the boundary for development and prevents unnecessary feature expansion.

Only the features described in this section are included in Version 1.0.

Any functionality not explicitly listed here should be considered out of scope for the MVP.

---

# 4.2 MVP Goal

The goal of the MVP is to allow users to:

- Decide what to cook today.
- Find meals that fit their budget.
- Cook using ingredients they already have.
- Plan meals for the week.
- Generate a grocery list.
- Save their favorite recipes.
- Continue using the app across devices if they create an account.

If these goals are achieved, the MVP is considered complete.

---

# 4.3 Core Features

The MVP consists of seven primary features.

| Feature | Included |
|----------|:---------:|
| Recipe Browser | ✅ |
| Kahit Ano | ✅ |
| Pantry | ✅ |
| Weekly Planner | ✅ |
| Grocery List | ✅ |
| Favorites | ✅ |
| User Accounts | ✅ |

These features make up the entire Version 1.0 product.

---

# 4.4 Recipe Browser

## Purpose

Allow users to browse the curated recipe collection.

The Recipe Browser also serves as the foundation for every recommendation generated by the application.

---

## Functional Requirements

Users can:

- Browse recipes.
- Search recipes by name.
- Filter recipes by category.
- Open recipe details.
- View ingredients.
- View cooking instructions.
- View estimated cost.
- View preparation time.
- View cooking time.
- View servings.
- View difficulty.

---

## Not Included

The Recipe Browser will NOT include:

- Ratings
- Reviews
- Comments
- Recipe uploads
- Recipe editing by users
- Recipe sharing

---

# 4.5 Kahit Ano

## Purpose

This is the primary feature of the application.

It provides quick meal recommendations based on a few simple questions.

---

## User Inputs

Required:

- Budget
- Family Size

Optional:

- Meal Style
  - Dry
  - With Sauce
  - Soup

---

## Output

The application returns:

- 3–5 recommended recipes.

Each recommendation includes:

- Recipe Name
- Image
- Estimated Cost
- Cooking Time
- Short Recommendation Reason

Example:

> Fits your ₱300 budget and can feed a family of four.

---

## User Actions

Users can:

- View Recipe
- Save to Favorites
- Regenerate Recommendations

---

# 4.6 Pantry

## Purpose

Allow users to receive recommendations based on ingredients they already have.

---

## Functional Requirements

Users can:

- Add pantry ingredients.
- Remove pantry ingredients.
- Search ingredients.
- View current pantry.
- Generate pantry-based recommendations.

---

## Recommendation Behavior

The application should prioritize recipes that:

- Use the highest number of pantry ingredients.
- Require the fewest additional ingredients.

---

## Pantry Storage

Guest Users

- Stored locally.

Registered Users

- Stored in the database.

---

# 4.7 Weekly Planner

## Purpose

Generate a practical weekly meal plan.

---

## User Inputs

Required

- Weekly Budget
- Family Size

---

## Planner Output

The planner generates:

Seven Days

Each day contains:

- Lunch
- Dinner

Total:

14 planned meals.

---

## Planner Rules

The planner should:

- Stay within budget whenever practical.
- Avoid duplicate recipes.
- Encourage ingredient reuse.
- Balance meal variety.

---

## User Actions

Users can:

- Regenerate the entire week.
- Replace a single meal.
- Save the meal plan.

---

# 4.8 Grocery List

## Purpose

Automatically generate a grocery list from the weekly meal plan.

---

## Functional Requirements

The grocery list should:

- Combine duplicate ingredients.
- Group ingredients by category.
- Display estimated costs.
- Display estimated total.
- Allow users to mark items as purchased.

---

## Ingredient Categories

Suggested categories:

- Meat
- Seafood
- Vegetables
- Fruits
- Dairy
- Pantry Items
- Seasonings
- Others

---

# 4.9 Favorites

## Purpose

Allow users to save recipes they enjoy.

---

## Functional Requirements

Users can:

- Save recipes.
- Remove recipes.
- View all favorites.

---

Guest Users

Favorites remain on the current device.

---

Registered Users

Favorites synchronize across devices.

---

# 4.10 User Accounts

## Purpose

Allow users to preserve their personal data.

---

## Registration

Users may create an account using supported authentication methods.

Registration is optional.

---

## Guest Mode

Guests have access to all core functionality except cloud synchronization.

---

## Registered Users

Registered users may synchronize:

- Favorites
- Pantry
- Weekly Plans
- Grocery Lists

---

# 4.11 Search

The MVP includes a basic recipe search.

Users can search by:

- Recipe Name

Future enhancements may include ingredient-based and category-based search, but these are outside the MVP.

---

# 4.12 Recommendation Engine

The MVP uses a deterministic rule-based recommendation engine.

Recommendation factors include:

- Budget
- Pantry Match
- Meal Style
- Family Size

Artificial Intelligence is NOT used in Version 1.0.

---

# 4.13 Recipe Dataset

The MVP will include a curated collection of approximately:

150–200 Filipino recipes.

Recipes should represent meals commonly prepared in Filipino households.

Quality is prioritized over quantity.

---

# 4.14 Platforms

Version 1.0 supports:

- Modern desktop browsers.
- Modern mobile browsers.

A dedicated mobile application is outside the MVP.

---

# 4.15 Languages

The MVP user interface is written in English.

Recipe names remain in their commonly used Filipino names.

Example:

- Chicken Adobo
- Sinigang
- Tinola
- Kare-Kare

Localization is outside the MVP.

---

# 4.16 Performance Expectations

The application should feel responsive.

Target response times:

| Feature | Target |
|----------|--------|
| Recipe Search | < 500 ms |
| Kahit Ano | < 500 ms |
| Pantry Recommendation | < 700 ms |
| Weekly Planner | < 3 seconds |
| Grocery List Generation | < 1 second |

These targets serve as implementation goals rather than strict guarantees.

---

# 4.17 MVP Exclusions

The following features are intentionally excluded from Version 1.0.

Community

- Recipe submissions
- Comments
- Ratings
- Reviews
- User profiles
- Followers

Artificial Intelligence

- AI meal recommendations
- AI grocery optimization
- AI ingredient substitutions
- AI recipe generation

Nutrition

- Calories
- Macronutrients
- Diet tracking
- Health goals

Commerce

- Food delivery
- Grocery ordering
- Affiliate links
- Shopping integrations

Social

- Sharing
- Activity feeds
- Messaging
- Recipe collections from other users

Administration

- Public moderation tools
- Community management features

These exclusions are intentional and help keep the MVP focused.

---

# 4.18 MVP Definition of Complete

The MVP is considered complete when a user can:

1. Open the application.
2. Browse recipes.
3. Receive recommendations using Kahit Ano.
4. Receive pantry-based recommendations.
5. Generate a weekly meal plan.
6. Generate a grocery list.
7. Save favorite recipes.
8. Create an account and access their data on another device.

No additional features are required before the initial public release.

---

# 4.19 Scope Control

To maintain a focused MVP:

- No new features should be added without updating this document.
- Improvements to existing features are allowed if they simplify the user experience or improve reliability.
- Any feature that does not directly help users decide what to cook should be evaluated carefully before inclusion.

This document defines the functional boundary of Version 1.0.

---

## End of Part 4

# Part 5 — User Journeys

---

# 5.1 Purpose

This section defines how users interact with **Ma, Anong Ulam?** from start to finish.

Rather than focusing on individual pages, these journeys describe the complete user experience for each major feature.

These journeys should guide the design of the UI, API, and application flow.

---

# 5.2 Design Principles

Every user journey should follow these principles:

- Require the fewest possible steps.
- Keep user input to a minimum.
- Always provide a clear next action.
- Never leave users at a dead end.
- Make it easy to go back or change decisions.
- Complete common tasks in less than one minute.

---

# 5.3 Primary User Journey — "Ma, Anong Ulam?"

This is the primary experience of the application.

### Goal

Help the user decide what to cook today.

### Flow

```
Open App

↓

Tap "Kahit Ano"

↓

Enter Budget

↓

Enter Family Size

↓

(Optional)
Select Meal Style

↓

Tap "Suggest Meals"

↓

View 3–5 Recommendations

↓

Open Recipe

↓

Start Cooking
```

### Success Criteria

The user receives relevant meal suggestions without browsing through dozens of recipes.

---

# 5.4 Alternate Journey — Pantry First

Some users already know what ingredients they have.

Instead of entering a budget first, they start from their pantry.

### Goal

Recommend meals using available ingredients.

### Flow

```
Open App

↓

Open Pantry

↓

Select Available Ingredients

↓

Tap "Find Recipes"

↓

View Matching Recipes

↓

Open Recipe

↓

Cook
```

### Recommendation Priority

Recipes should be ranked based on:

1. Uses all available ingredients.
2. Requires the fewest additional ingredients.
3. Fits the user's selected meal style (if provided).

---

# 5.5 Weekly Meal Planning Journey

Some users prefer planning several days at once.

### Goal

Create a complete weekly meal plan.

### Flow

```
Open Weekly Planner

↓

Enter Weekly Budget

↓

Enter Family Size

↓

Tap "Generate Plan"

↓

Review Weekly Meals

↓

Replace Any Meal (Optional)

↓

Save Weekly Plan

↓

Generate Grocery List
```

### Success Criteria

The generated plan:

- Stays within budget whenever practical.
- Includes lunch and dinner for seven days.
- Avoids unnecessary repetition.
- Encourages ingredient reuse.

---

# 5.6 Grocery List Journey

After planning meals, users should be able to generate a shopping list automatically.

### Flow

```
Weekly Plan

↓

Generate Grocery List

↓

Review Ingredients

↓

Mark Purchased Items

↓

Go Shopping
```

### Success Criteria

The grocery list:

- Combines duplicate ingredients.
- Groups ingredients by category.
- Displays an estimated total cost.

---

# 5.7 Recipe Browsing Journey

Some users simply want to browse recipes.

### Flow

```
Open App

↓

Browse Recipes

↓

Search or Filter

↓

Open Recipe

↓

Read Details

↓

(Optional)
Save to Favorites
```

Browsing should remain available but should never become the primary focus of the application.

---

# 5.8 Favorites Journey

Users should be able to quickly save meals they enjoy.

### Flow

```
Open Recipe

↓

Tap Favorite

↓

Recipe Saved

↓

Open Favorites Later

↓

Open Recipe
```

### Guest Users

Favorites are stored locally.

### Registered Users

Favorites are synchronized across devices.

---

# 5.9 Guest User Journey

The application should be immediately usable without registration.

### Flow

```
Open App

↓

Use Features

↓

(Optional)
Create Account Later
```

Guest users can:

- Browse recipes.
- Use Kahit Ano.
- Use Pantry.
- Generate weekly plans.
- Generate grocery lists.
- Save local favorites.

Registration should never interrupt the first-time experience.

---

# 5.10 Registered User Journey

Users who create an account gain cloud synchronization.

### Flow

```
Register

↓

Login

↓

Continue Using App

↓

Favorites Sync

↓

Pantry Sync

↓

Weekly Plans Sync

↓

Grocery Lists Sync
```

The user experience should remain identical to Guest Mode, with the added benefit of persistence across devices.

---

# 5.11 First-Time User Experience

The application should require little to no explanation.

### Landing Experience

The Home page should immediately communicate:

- What the app does.
- The primary action.
- The quickest way to get meal suggestions.

The main call-to-action should be **Kahit Ano**.

---

### First-Time Flow

```
Open App

↓

See Welcome Screen

↓

Tap Kahit Ano

↓

Receive Recommendations
```

The first recommendation should be obtainable within one minute.

---

# 5.12 Returning User Experience

Returning users should continue where they left off.

Possible entry points include:

- Continue using Pantry.
- Open Weekly Planner.
- View Favorites.
- Browse Recipes.
- Start a new Kahit Ano recommendation.

The application should avoid forcing users back through onboarding.

---

# 5.13 Empty States

Every feature should have a helpful empty state.

### Pantry

"No ingredients added yet."

Action:

**Add Ingredients**

---

### Favorites

"You haven't saved any recipes yet."

Action:

**Browse Recipes**

---

### Weekly Planner

"No meal plan yet."

Action:

**Generate Weekly Plan**

---

### Grocery List

"No grocery list available."

Action:

**Generate from Weekly Plan**

---

# 5.14 Error States

The application should provide clear and actionable error messages.

Examples:

### No Matching Recipes

"We couldn't find a recipe matching your current filters."

Action:

- Adjust budget.
- Add more pantry ingredients.
- Change meal style.

---

### Network Error

"Something went wrong while loading data."

Action:

**Try Again**

---

### Server Error

Display a friendly message without exposing technical details.

---

# 5.15 Loading States

All major actions should display loading feedback.

Examples:

- Searching recipes.
- Generating recommendations.
- Creating weekly plans.
- Building grocery lists.

Loading indicators should reassure users that work is in progress.

---

# 5.16 Success States

After completing an action, the application should provide confirmation.

Examples:

- Recipe added to Favorites.
- Pantry updated.
- Weekly Plan saved.
- Grocery List generated.

Messages should be brief and non-intrusive.

---

# 5.17 Navigation Principles

Navigation should remain simple and predictable.

Primary navigation should provide quick access to:

- Home
- Recipes
- Pantry
- Weekly Planner
- Favorites
- Profile (for registered users)

The user should never be more than two or three taps away from the primary features.

---

# 5.18 User Journey Success Metrics

A successful user journey is one where the user can:

- Find a meal quickly.
- Understand why it was recommended.
- Open the recipe without confusion.
- Save it if desired.
- Plan future meals if needed.

The application succeeds when it reduces decision-making effort, not when it encourages users to spend more time browsing.

---

## End of Part 5

## 6.1 Recipe Browser

---

### 6.1.1 Purpose

The Recipe Browser is the foundation of the **Ma, Anong Ulam?** application.

It provides users with access to the curated Filipino recipe collection and serves as the data source for all recommendation features.

While the primary purpose of the application is to recommend meals rather than encourage browsing, users should always have the option to manually explore recipes.

The Recipe Browser should remain simple, fast, and easy to navigate.

---

## 6.1.2 Objectives

The Recipe Browser should allow users to:

- Browse all available recipes.
- Search recipes by name.
- Filter recipes by category.
- View complete recipe details.
- Save recipes as favorites.
- Access recipes recommended by other features.

---

## 6.1.3 Functional Requirements

### FR-RB-001

The application shall display a paginated list of recipes.

---

### FR-RB-002

Each recipe card shall display:

- Recipe image
- Recipe name
- Estimated cost
- Cooking time
- Servings
- Meal style
- Difficulty

---

### FR-RB-003

Users shall be able to search recipes using the recipe name.

Search results should update as the user types or after submitting the search.

---

### FR-RB-004

Users shall be able to filter recipes by category.

Initial categories include:

- Chicken
- Pork
- Beef
- Seafood
- Vegetables
- Egg
- Noodles
- Others

---

### FR-RB-005

Selecting a recipe shall open the Recipe Detail page.

---

### FR-RB-006

The Recipe Browser shall support pagination or infinite scrolling.

The implementation should prioritize performance on mobile devices.

---

### FR-RB-007

The application shall display an informative message when no recipes match the user's search or filters.

---

### FR-RB-008

Guest users and registered users shall have identical browsing capabilities.

---

## 6.1.4 Recipe Card Specification

Each recipe card shall contain:

### Required Information

- Cover Image
- Recipe Name
- Estimated Cost
- Prep Time
- Cook Time
- Total Time
- Servings
- Difficulty
- Meal Style

---

### Optional Indicators

Examples:

- Budget Friendly
- Quick Meal (≤30 minutes)
- Pantry Friendly

These indicators should be generated from recipe data rather than manually assigned.

---

## 6.1.5 Search

### Purpose

Allow users to quickly locate recipes they already know.

---

### Supported Search

The MVP supports:

- Recipe Name

Examples:

```
Adobo

Tinola

Sinigang

Caldereta
```

---

### Not Supported (MVP)

- Ingredient Search
- Cooking Time Search
- Cost Search
- Full-text Search
- Voice Search

These may be considered after the MVP.

---

## 6.1.6 Filters

The MVP supports basic category filtering.

### Categories

Chicken

Pork

Beef

Seafood

Vegetables

Egg

Noodles

Others

---

### Behavior

Selecting a category filters the visible recipes.

Users may clear filters at any time.

---

## 6.1.7 Sorting

The MVP keeps sorting intentionally simple.

Supported sorting:

- Alphabetical (A–Z)
- Estimated Cost (Lowest First)
- Cooking Time (Shortest First)

Default sorting:

Recommended / Featured

---

## 6.1.8 Recipe Detail Page

Selecting a recipe opens the Recipe Detail page.

The page contains:

### Header

Recipe Image

Recipe Name

Favorite Button

---

### Summary

Estimated Cost

Prep Time

Cook Time

Total Time

Servings

Difficulty

Meal Style

---

### Ingredients

Display:

Ingredient

Quantity

Unit

Example:

```
Chicken - 1 kg

Soy Sauce - ½ cup

Garlic - 6 cloves

Bay Leaf - 2 pcs
```

---

### Instructions

Display cooking steps in numerical order.

Example:

```
1.
Marinate chicken.

2.
Heat oil.

3.
Saute garlic.

4.
Add chicken.

5.
Simmer.

6.
Serve.
```

---

### Notes (Optional)

Recipe notes may include:

- Cooking Tips
- Serving Suggestions
- Storage Tips

---

## 6.1.9 Favorites

The Recipe Detail page includes a Favorite button.

Guest users

Store locally.

Registered users

Store in the database.

Tapping Favorite again removes the recipe from Favorites.

---

## 6.1.10 Data Requirements

Each recipe must contain:

| Field | Required |
|--------|----------|
| Name | Yes |
| Description | Yes |
| Category | Yes |
| Ingredients | Yes |
| Instructions | Yes |
| Estimated Cost | Yes |
| Prep Time | Yes |
| Cook Time | Yes |
| Servings | Yes |
| Difficulty | Yes |
| Meal Style | Yes |
| Image | Yes |

Recipes with missing required fields shall not be displayed.

---

## 6.1.11 Validation Rules

Recipe names must be unique.

Cooking times must be positive values.

Estimated cost must be greater than zero.

Ingredients cannot be empty.

Instructions cannot be empty.

Servings must be at least one.

---

## 6.1.12 Business Rules

### BR-RB-001

Recipes are read-only for end users.

---

### BR-RB-002

Users cannot modify recipes.

---

### BR-RB-003

Users cannot delete recipes.

---

### BR-RB-004

Recipe information is maintained by the application dataset.

---

### BR-RB-005

Recommendations generated elsewhere in the application always link back to the Recipe Detail page.

---

## 6.1.13 Empty States

### No Recipes

"No recipes available."

---

### No Search Results

"No recipes match your search."

Provide:

Clear Search

---

### No Filter Results

"No recipes found in this category."

Provide:

Clear Filters

---

## 6.1.14 Loading States

While loading recipes:

Display skeleton recipe cards.

Avoid blank pages.

---

## 6.1.15 Error States

If recipes cannot be loaded:

Display:

"Unable to load recipes."

Provide:

Retry Button

Do not expose technical errors.

---

## 6.1.16 Performance Requirements

Recipe list should load in:

Less than 500 milliseconds (excluding network latency).

Search results should appear almost instantly after the query is submitted.

Images should be lazy-loaded to improve performance.

---

## 6.1.17 Accessibility Requirements

Recipe cards shall:

- Be keyboard accessible.
- Include descriptive alt text for images.
- Maintain sufficient color contrast.
- Have clearly labeled interactive elements.

Search input shall include an accessible label.

---

## 6.1.18 Mobile Requirements

The Recipe Browser is designed mobile-first.

Requirements:

- Responsive grid or list layout.
- Large touch targets.
- Optimized images.
- Smooth scrolling.
- Fast loading on mobile networks.

---

## 6.1.19 Acceptance Criteria

The Recipe Browser is complete when:

- Users can browse recipes.
- Users can search by recipe name.
- Users can filter by category.
- Recipe cards display required information.
- Recipe Detail pages display complete recipe information.
- Favorites can be added and removed.
- Empty, loading, and error states are implemented.
- Mobile layout is fully responsive.
- Performance targets are met.

---

## 6.1.20 Future Considerations (Non-MVP)

The following enhancements are intentionally excluded from Version 1.0:

- Ingredient-based search
- Advanced filtering
- User-created recipes
- Ratings and reviews
- Comments
- Recipe collections
- Recently viewed recipes
- Personalized browsing
- AI-assisted recipe discovery

These features should not be implemented unless the product scope changes.

---

### End of Section 6.1 — Recipe Browser

## 6.2 Kahit Ano

---

### 6.2.1 Purpose

**Kahit Ano** is the primary feature of **Ma, Anong Ulam?**

It exists to answer one simple question:

> **"Anong ulam ngayon?"**

Rather than overwhelming users with hundreds of recipes, Kahit Ano asks a few simple questions and recommends a small set of practical Filipino meals.

This should be the fastest way for a user to decide what to cook.

---

# 6.2.2 Objectives

The feature should:

- Help users decide what to cook in less than one minute.
- Recommend meals based on practical conditions.
- Reduce decision fatigue.
- Prioritize affordable meals.
- Recommend familiar Filipino dishes.
- Require minimal user input.

---

# 6.2.3 User Flow

```
Home

↓

Tap
"Kahit Ano"

↓

Answer Questions

↓

Generate Recommendations

↓

View Suggested Meals

↓

Open Recipe

↓

Cook
```

---

# 6.2.4 User Inputs

The recommendation engine collects the following information.

## Required Inputs

### Budget

The estimated budget available for one meal.

Example:

```
₱150

₱300

₱500
```

Budget accepts any positive amount.

---

### Family Size

Number of people the meal should serve.

Minimum:

```
1
```

Maximum:

```
20
```

Default:

```
4
```

---

## Optional Inputs

### Meal Style

Users may choose:

- Dry
- With Sauce
- Soup

Users may also leave this blank.

If no meal style is selected, recommendations may include all meal styles.

---

# 6.2.5 Recommendation Generation

When the user taps:

**Suggest Meals**

the application generates recommendations using the rule-based Recommendation Engine.

The engine considers:

- Budget
- Family Size
- Meal Style (optional)

The MVP does **not** use Artificial Intelligence.

---

# 6.2.6 Recommendation Output

The application returns:

**Three to five recipes.**

The application should never return dozens of recipes.

A smaller list encourages faster decision-making.

---

Each recommendation displays:

- Recipe Image
- Recipe Name
- Estimated Cost
- Total Cooking Time
- Servings
- Meal Style
- Recommendation Reason

---

Example

```
Chicken Adobo

Estimated Cost

₱280

Ready in

45 minutes

Serves

4

Reason

Fits your budget and serves four people.
```

---

# 6.2.7 Recommendation Reason

Every recommendation should explain why it was selected.

Possible reasons include:

- Fits your budget.
- Matches your preferred meal style.
- Suitable for your family size.
- Budget-friendly meal.
- Great for everyday cooking.
- Quick to prepare.

The explanation should be concise and easy to understand.

---

# 6.2.8 Recommendation Ranking

Recommendations should be ranked using a deterministic scoring system.

Higher scores indicate better matches.

The recommendation engine should consider:

- Budget fit
- Serving size
- Meal style preference

The exact scoring formula is documented in the Recommendation Engine section of this blueprint.

---

# 6.2.9 Recommendation Quality

Recommendations should prioritize:

1. Recipes within budget.
2. Recipes matching the requested servings.
3. Recipes matching the selected meal style.
4. Popular everyday Filipino dishes.

---

# 6.2.10 Budget Handling

Budget is treated as an estimate rather than an exact limit.

Example

Budget:

```
₱300
```

Suitable recommendations might range from:

```
₱250

to

₱320
```

Minor variation is acceptable.

Large budget overruns should be avoided.

---

# 6.2.11 Family Size Handling

Recipes should scale logically.

Example

Recipe serves:

```
4
```

If user requests:

```
2
```

The application may recommend the recipe while indicating:

> Adjust ingredient quantities for two servings.

Recipe scaling calculations are outside the MVP.

---

# 6.2.12 Meal Style

Supported values:

Dry

Examples:

- Fried Chicken
- Pork Steak
- Tortang Talong

---

With Sauce

Examples:

- Adobo
- Caldereta
- Menudo

---

Soup

Examples:

- Tinola
- Sinigang
- Nilaga

---

If no meal style is selected, recommendations may include all categories.

---

# 6.2.13 No Matching Recipes

If no recipes satisfy the selected conditions, the application should gracefully relax recommendation constraints.

Example order:

1. Expand acceptable budget range.
2. Ignore meal style.
3. Recommend closest available matches.

The application should avoid displaying:

"No recipes found."

unless absolutely necessary.

---

# 6.2.14 Regenerate Recommendations

Users may request another set of recommendations.

The new recommendations should still satisfy the original conditions.

Previously displayed recipes should be deprioritized where practical.

---

# 6.2.15 Recommendation History

The MVP does not store recommendation history.

Each recommendation session is independent.

---

# 6.2.16 Validation Rules

Budget

Required

Must be greater than zero.

---

Family Size

Required

Must be:

```
1–20
```

---

Meal Style

Optional

Must match one of:

- Dry
- With Sauce
- Soup

---

# 6.2.17 Business Rules

### BR-KA-001

Every recommendation must link to a valid recipe.

---

### BR-KA-002

Recipes hidden from the Recipe Browser cannot be recommended.

---

### BR-KA-003

Recommendations should be deterministic.

The same inputs should produce the same ranked results unless the recipe dataset changes.

---

### BR-KA-004

Recommendations should favor practical everyday meals over special-occasion dishes.

---

### BR-KA-005

The engine should prioritize recommendation quality over recommendation quantity.

Three excellent recommendations are preferred over twenty average ones.

---

# 6.2.18 Empty State

Before the user generates recommendations, display:

> "Answer a few questions and we'll help you decide what to cook."

Primary action:

**Suggest Meals**

---

# 6.2.19 Loading State

While recommendations are being generated:

Display loading placeholders.

Loading should generally complete in less than one second.

---

# 6.2.20 Error State

If recommendations cannot be generated:

Display:

> "We couldn't generate meal suggestions right now."

Provide:

**Try Again**

Do not expose technical details.

---

# 6.2.21 Accessibility Requirements

The recommendation form shall:

- Support keyboard navigation.
- Clearly label all inputs.
- Display accessible validation messages.
- Use sufficient color contrast.

Recommendation cards shall:

- Include descriptive image alt text.
- Be fully keyboard accessible.

---

# 6.2.22 Mobile Requirements

The Kahit Ano experience should be optimized for mobile devices.

Requirements:

- Large touch-friendly controls.
- Simple vertical layout.
- Minimal scrolling.
- One-handed usability where practical.

The complete recommendation flow should be comfortable on a standard smartphone.

---

# 6.2.23 Performance Requirements

Target response time:

Less than **500 milliseconds** (excluding network latency).

Recommendation generation should feel nearly instantaneous.

---

# 6.2.24 Acceptance Criteria

The Kahit Ano feature is complete when users can:

- Enter a budget.
- Enter family size.
- Optionally select a meal style.
- Receive three to five recommendations.
- View recommendation reasons.
- Open the recommended recipe.
- Regenerate recommendations.
- Experience appropriate loading, empty, and error states.
- Use the feature effectively on mobile devices.

---

# 6.2.25 Future Considerations (Non-MVP)

The following enhancements are intentionally excluded from Version 1.0:

- AI-generated meal recommendations.
- Personalized recommendations based on history.
- Seasonal meal suggestions.
- Weather-based recommendations.
- Holiday meal recommendations.
- Learning user preferences over time.
- Voice-assisted recommendations.
- Nutritional recommendation scoring.

These ideas should not be implemented unless the product scope is expanded.

---

### End of Section 6.2 — Kahit Ano

## 6.3 Pantry

---

### 6.3.1 Purpose

The Pantry feature helps users discover meals they can prepare using ingredients they already have at home.

Instead of starting with a recipe, users start with their available ingredients. The application then recommends recipes that best match their pantry.

The Pantry feature supports the application's goal of reducing food waste and helping users make practical meal decisions.

---

## 6.3.2 Objectives

The Pantry feature should allow users to:

- Maintain a personal pantry.
- Add available ingredients.
- Remove ingredients.
- View all pantry ingredients.
- Receive recipe recommendations based on pantry contents.

---

## 6.3.3 User Flow

```
Home

↓

Open Pantry

↓

Add Available Ingredients

↓

Tap
"Find Recipes"

↓

View Recommended Recipes

↓

Open Recipe

↓

Cook
```

---

## 6.3.4 Functional Requirements

### FR-PN-001

Users shall be able to add ingredients to their pantry.

---

### FR-PN-002

Users shall be able to remove ingredients from their pantry.

---

### FR-PN-003

Users shall be able to view all ingredients currently stored in their pantry.

---

### FR-PN-004

Users shall be able to generate recipe recommendations using their pantry ingredients.

---

### FR-PN-005

Pantry recommendations shall use the application's rule-based recommendation engine.

---

## 6.3.5 Pantry Ingredients

The pantry is built using ingredients from the application's ingredient database.

Users select ingredients from a searchable list.

The MVP does not allow users to create custom ingredients.

---

## 6.3.6 Ingredient Selection

Users may:

- Search ingredients.
- Select ingredients.
- Remove selected ingredients.

Selected ingredients remain available until the user removes them.

---

## 6.3.7 Pantry Recommendations

When the user selects **Find Recipes**, the application compares the pantry against every recipe.

Recipes are ranked based on ingredient availability.

The recommendation engine should prioritize recipes that require the fewest additional ingredients.

---

## 6.3.8 Recommendation Output

The application returns a list of matching recipes.

Each recommendation displays:

- Recipe Image
- Recipe Name
- Pantry Match
- Missing Ingredients
- Estimated Cost
- Cooking Time

---

Example

```
Chicken Adobo

Pantry Match

8 / 10 Ingredients

Missing

Bay Leaves
Black Pepper

Estimated Cost

₱260
```

---

## 6.3.9 Pantry Match

Each recipe displays a pantry match score.

Example:

```
10 / 10 Ingredients

Ready to Cook
```

or

```
8 / 10 Ingredients

Only 2 ingredients needed
```

The Pantry Match is intended to help users quickly understand how close they are to preparing the recipe.

---

## 6.3.10 Missing Ingredients

If a recipe cannot be prepared immediately, the application lists only the missing ingredients.

Example

```
Missing Ingredients

• Onion
• Ginger
```

Users can then decide whether to purchase the remaining items.

---

## 6.3.11 Recommendation Priority

Recipes should be ranked in the following order:

1. Recipes with all required ingredients.
2. Recipes missing the fewest ingredients.
3. Recipes with lower estimated cost.
4. Recipes with shorter cooking times.

This ranking should be deterministic.

---

## 6.3.12 Pantry Storage

### Guest Users

Pantry data is stored locally in the browser.

---

### Registered Users

Pantry data is stored in the database and synchronized across devices.

---

## 6.3.13 Validation Rules

Users may only select ingredients that exist in the application's ingredient database.

Duplicate pantry ingredients are not allowed.

Removing an ingredient immediately updates the pantry.

---

## 6.3.14 Business Rules

### BR-PN-001

The pantry represents ingredients currently available to the user.

---

### BR-PN-002

Recommendations shall only consider ingredients stored in the pantry.

---

### BR-PN-003

Recipes with more matching ingredients shall rank higher than recipes with fewer matching ingredients.

---

### BR-PN-004

The Pantry feature does not automatically remove ingredients after a recipe is viewed or cooked.

Users are responsible for managing their pantry contents.

---

## 6.3.15 Empty State

If the pantry contains no ingredients:

Display:

> "Your pantry is empty."

Primary Action:

**Add Ingredients**

No recipe recommendations are shown until at least one ingredient has been added.

---

## 6.3.16 No Matching Recipes

If no suitable recipes are found:

Display:

> "No recipes match your current pantry."

Provide the option to continue browsing recipes manually.

---

## 6.3.17 Loading State

While generating recommendations:

Display loading placeholders.

The application should indicate that recipe matching is in progress.

---

## 6.3.18 Error State

If pantry recommendations cannot be generated:

Display:

> "Unable to generate pantry recommendations."

Provide:

**Try Again**

Do not expose technical error messages.

---

## 6.3.19 Accessibility Requirements

The Pantry feature shall:

- Support keyboard navigation.
- Provide accessible labels for search and selection controls.
- Maintain sufficient color contrast.
- Ensure all interactive elements are keyboard accessible.

---

## 6.3.20 Mobile Requirements

The Pantry feature should be optimized for mobile devices.

Requirements:

- Searchable ingredient list.
- Large touch targets.
- Responsive layout.
- Smooth scrolling.
- Fast ingredient selection.

---

## 6.3.21 Performance Requirements

Target response time:

- Pantry updates: less than 300 milliseconds.
- Recipe recommendations: less than 700 milliseconds (excluding network latency).

---

## 6.3.22 Acceptance Criteria

The Pantry feature is complete when users can:

- Add ingredients.
- Remove ingredients.
- View pantry contents.
- Generate pantry-based recommendations.
- View pantry match scores.
- View missing ingredients.
- Open recommended recipes.
- Experience appropriate loading, empty, and error states.
- Use the feature effectively on mobile devices.

---

## 6.3.23 Future Considerations (Non-MVP)

The following ideas are intentionally excluded from Version 1.0:

- Barcode scanning.
- OCR ingredient recognition.
- Inventory quantities.
- Expiration dates.
- Automatic pantry updates after cooking.
- Grocery synchronization.
- AI pantry suggestions.

These features are outside the MVP and should not be implemented unless the project scope changes.

---

### End of Section 6.3 — Pantry

## 6.4 Weekly Planner

---

### 6.4.1 Purpose

The Weekly Planner helps users prepare a practical meal plan for the week based on their available food budget and family size.

Instead of deciding what to cook every day, users can generate a complete weekly meal plan in one step.

The Weekly Planner should encourage meal variety while staying within the user's budget and reducing unnecessary grocery purchases.

---

## 6.4.2 Objectives

The Weekly Planner should allow users to:

- Generate a weekly meal plan.
- Stay within a specified weekly food budget.
- Plan meals for their household size.
- Replace individual meals.
- Save a meal plan.
- Generate a grocery list from the plan.

---

## 6.4.3 User Flow

```
Home

↓

Open Weekly Planner

↓

Enter Weekly Budget

↓

Enter Family Size

↓

Generate Meal Plan

↓

Review Weekly Plan

↓

(Optional)
Replace Meal

↓

Save Meal Plan

↓

Generate Grocery List
```

---

## 6.4.4 Functional Requirements

### FR-WP-001

Users shall be able to enter a weekly food budget.

---

### FR-WP-002

Users shall be able to specify the number of people the meal plan should serve.

---

### FR-WP-003

The application shall generate a complete seven-day meal plan.

---

### FR-WP-004

Each day shall include:

- Lunch
- Dinner

Total meals:

14

---

### FR-WP-005

Users shall be able to replace an individual meal without regenerating the entire week.

---

### FR-WP-006

Users shall be able to regenerate the entire weekly meal plan.

---

### FR-WP-007

Users shall be able to save a generated meal plan.

---

### FR-WP-008

Users shall be able to generate a grocery list from a saved or newly generated meal plan.

---

## 6.4.5 Planner Inputs

### Weekly Budget

Required

Represents the total amount available for meals during the week.

Example:

```
₱2,000
```

---

### Family Size

Required

Minimum:

```
1
```

Maximum:

```
20
```

Default:

```
4
```

---

## 6.4.6 Planner Output

The generated meal plan displays seven days.

Each day contains:

- Lunch
- Dinner

Example

| Day | Lunch | Dinner |
|------|--------|---------|
| Monday | Chicken Adobo | Ginisang Monggo |
| Tuesday | Tinola | Pork Steak |
| Wednesday | Sinigang | Tortang Talong |
| Thursday | Beef Caldereta | Ginisang Ampalaya |
| Friday | Fried Tilapia | Chicken Afritada |
| Saturday | Menudo | Pinakbet |
| Sunday | Kare-Kare | Tinolang Isda |

---

## 6.4.7 Planner Rules

The Weekly Planner should:

- Respect the user's weekly budget whenever practical.
- Avoid unnecessary meal repetition.
- Encourage ingredient reuse across multiple meals.
- Recommend familiar Filipino dishes.
- Produce a balanced weekly plan.

The planner should generate a practical plan rather than a perfectly optimized one.

---

## 6.4.8 Meal Replacement

Users may replace any individual meal.

Example:

```
Tuesday Dinner

↓

Replace
```

The replacement meal should:

- Continue to respect the remaining budget.
- Avoid creating unnecessary duplicates.
- Be different from the meal being replaced.

Only the selected meal should change.

The remainder of the weekly plan should remain unchanged.

---

## 6.4.9 Saving Meal Plans

### Guest Users

Meal plans are stored locally in the browser.

---

### Registered Users

Meal plans are stored in the database and synchronized across devices.

---

## 6.4.10 Budget Handling

The planner should attempt to remain within the user's specified weekly budget.

Minor variations are acceptable if no exact combination of meals exists.

The planner should avoid exceeding the budget by a significant amount.

---

## 6.4.11 Recommendation Behavior

The Weekly Planner uses the same rule-based recommendation engine as the Kahit Ano feature.

Planner recommendations consider:

- Weekly budget.
- Family size.
- Existing meals already selected for the week.

---

## 6.4.12 Validation Rules

Weekly Budget

Required

Must be greater than zero.

---

Family Size

Required

Must be between:

```
1–20
```

---

## 6.4.13 Business Rules

### BR-WP-001

Every generated meal must reference an existing recipe.

---

### BR-WP-002

Every day shall contain exactly two meals.

---

### BR-WP-003

The planner should minimize duplicate recipes.

---

### BR-WP-004

Replacing one meal shall not modify any other meal in the weekly plan.

---

### BR-WP-005

Saved meal plans remain editable.

Users may replace meals after saving.

---

## 6.4.14 Empty State

If no meal plan exists:

Display:

> "No weekly meal plan yet."

Primary Action:

**Generate Weekly Plan**

---

## 6.4.15 Loading State

While generating the meal plan:

Display loading placeholders for each meal slot.

The application should indicate that meal planning is in progress.

---

## 6.4.16 Error State

If the meal plan cannot be generated:

Display:

> "We couldn't generate your weekly meal plan."

Provide:

**Try Again**

Do not expose technical error messages.

---

## 6.4.17 Accessibility Requirements

The Weekly Planner shall:

- Support keyboard navigation.
- Clearly label all form fields.
- Provide accessible buttons for meal replacement.
- Maintain sufficient color contrast.
- Ensure all interactive elements are keyboard accessible.

---

## 6.4.18 Mobile Requirements

The Weekly Planner should be fully usable on mobile devices.

Requirements:

- Responsive weekly layout.
- Easy scrolling.
- Large touch targets.
- Clearly separated meal cards.
- Simple meal replacement workflow.

---

## 6.4.19 Performance Requirements

Target response time:

- Weekly plan generation: less than 3 seconds (excluding network latency).
- Meal replacement: less than 1 second.

---

## 6.4.20 Acceptance Criteria

The Weekly Planner is complete when users can:

- Enter a weekly budget.
- Enter family size.
- Generate a seven-day meal plan.
- View lunch and dinner for each day.
- Replace individual meals.
- Save meal plans.
- Generate a grocery list.
- Experience appropriate loading, empty, and error states.
- Use the feature effectively on mobile devices.

---

## 6.4.21 Future Considerations (Non-MVP)

The following ideas are intentionally excluded from Version 1.0:

- Breakfast planning.
- Snacks and desserts.
- Nutrition tracking.
- Calendar integrations.
- Meal reminders.
- AI meal planning.
- Multiple weekly plans.
- Automatic recurring plans.
- Shared family meal plans.

These features are outside the MVP and should not be implemented unless the project scope changes.

---

### End of Section 6.4 — Weekly Planner

## 6.5 Grocery List

---

### 6.5.1 Purpose

The Grocery List feature automatically generates a shopping list from the user's weekly meal plan.

Instead of manually writing down ingredients, the application consolidates all required ingredients into a single organized grocery list.

The Grocery List helps users prepare for the week while reducing duplicate purchases and simplifying grocery shopping.

---

## 6.5.2 Objectives

The Grocery List should allow users to:

- Generate a grocery list from a weekly meal plan.
- View all required ingredients.
- Combine duplicate ingredients.
- Organize ingredients into categories.
- View estimated ingredient costs.
- Mark items as purchased.
- Save the grocery list.

---

## 6.5.3 User Flow

```
Weekly Planner

↓

Generate Grocery List

↓

Review Grocery List

↓

Mark Purchased Items

↓

Save Grocery List

↓

Go Shopping
```

---

## 6.5.4 Functional Requirements

### FR-GL-001

Users shall be able to generate a grocery list from the current weekly meal plan.

---

### FR-GL-002

The application shall combine duplicate ingredients into a single grocery list entry.

---

### FR-GL-003

The application shall group ingredients by category.

---

### FR-GL-004

Each grocery item shall display an estimated cost.

---

### FR-GL-005

The grocery list shall display an estimated total cost.

---

### FR-GL-006

Users shall be able to mark grocery items as purchased.

---

### FR-GL-007

Users shall be able to save the grocery list.

---

## 6.5.5 Grocery List Generation

The grocery list is generated using all recipes in the weekly meal plan.

Only ingredients required by the selected recipes shall be included.

Each ingredient should appear only once in the final grocery list.

---

## 6.5.6 Grocery Item Information

Each grocery item shall display:

- Ingredient Name
- Quantity
- Unit
- Category
- Estimated Cost
- Purchased Status

Example:

```
Chicken

2 kg

Meat

₱420

☐ Purchased
```

---

## 6.5.7 Ingredient Categories

Ingredients shall be grouped using the following categories:

- Meat
- Seafood
- Vegetables
- Fruits
- Dairy
- Pantry Items
- Seasonings
- Others

The category order should remain consistent throughout the application.

---

## 6.5.8 Duplicate Ingredient Handling

If multiple recipes require the same ingredient, the application shall combine them into a single entry.

Example:

Recipe A

```
Chicken

1 kg
```

Recipe B

```
Chicken

1 kg
```

Generated Grocery List

```
Chicken

2 kg
```

---

## 6.5.9 Estimated Cost

Each grocery item displays an estimated cost based on the application's ingredient dataset.

The grocery list also displays an estimated total cost.

Estimated costs are intended to assist with budgeting and may not exactly match market prices.

---

## 6.5.10 Purchased Items

Users may mark any grocery item as purchased.

Purchased items remain visible but should be visually distinguished from unpurchased items.

Purchased status may be toggled on or off at any time.

---

## 6.5.11 Grocery List Storage

### Guest Users

Grocery lists are stored locally in the browser.

---

### Registered Users

Grocery lists are stored in the database and synchronized across devices.

---

## 6.5.12 Validation Rules

A grocery list can only be generated if a weekly meal plan exists.

Ingredient names must not be empty.

Quantities must be greater than zero.

Estimated costs must not be negative.

---

## 6.5.13 Business Rules

### BR-GL-001

The grocery list shall only include ingredients required by the weekly meal plan.

---

### BR-GL-002

Duplicate ingredients shall be merged into a single grocery list entry.

---

### BR-GL-003

Ingredients shall be grouped by category.

---

### BR-GL-004

Purchased status shall not affect ingredient quantities or estimated costs.

---

### BR-GL-005

Generating a new weekly meal plan replaces the previously generated grocery list.

---

## 6.5.14 Empty State

If no weekly meal plan exists:

Display:

> "Generate a weekly meal plan to create your grocery list."

Primary Action:

**Generate Weekly Plan**

---

## 6.5.15 Loading State

While generating the grocery list:

Display loading placeholders.

The application should indicate that the grocery list is being prepared.

---

## 6.5.16 Error State

If the grocery list cannot be generated:

Display:

> "We couldn't generate your grocery list."

Provide:

**Try Again**

Do not expose technical error messages.

---

## 6.5.17 Accessibility Requirements

The Grocery List shall:

- Support keyboard navigation.
- Clearly label all interactive controls.
- Allow purchased items to be toggled using the keyboard.
- Maintain sufficient color contrast.

---

## 6.5.18 Mobile Requirements

The Grocery List should be optimized for mobile devices.

Requirements:

- Responsive ingredient list.
- Large touch targets for purchased checkboxes.
- Clear category headings.
- Smooth scrolling.

---

## 6.5.19 Performance Requirements

Target response time:

- Grocery list generation: less than 1 second (excluding network latency).
- Purchased item updates: less than 200 milliseconds.

---

## 6.5.20 Acceptance Criteria

The Grocery List feature is complete when users can:

- Generate a grocery list from a weekly meal plan.
- View all required ingredients.
- View merged duplicate ingredients.
- View ingredient categories.
- View estimated costs.
- View an estimated total cost.
- Mark items as purchased.
- Save grocery lists.
- Experience appropriate loading, empty, and error states.
- Use the feature effectively on mobile devices.

---

## 6.5.21 Future Considerations (Non-MVP)

The following ideas are intentionally excluded from Version 1.0:

- Online grocery ordering.
- Supermarket integrations.
- Price comparison between stores.
- Barcode scanning.
- Coupon support.
- Shared grocery lists.
- Real-time market pricing.
- Shopping route optimization.
- AI grocery recommendations.

These features are outside the MVP and should not be implemented unless the project scope changes.

---

### End of Section 6.5 — Grocery List

## 6.6 Favorites

---

### 6.6.1 Purpose

The Favorites feature allows users to save recipes they want to cook again.

Instead of searching for the same recipe repeatedly, users can maintain a personal list of their preferred meals for quick access.

The Favorites feature is intended to provide convenience and improve the overall user experience without changing how recipes are recommended.

---

## 6.6.2 Objectives

The Favorites feature should allow users to:

- Save recipes.
- Remove saved recipes.
- View all saved recipes.
- Access favorite recipes quickly.
- Synchronize favorites across devices for registered users.

---

## 6.6.3 User Flow

```
Browse Recipes

↓

Open Recipe

↓

Tap "Favorite"

↓

Recipe Saved

↓

Open Favorites

↓

Select Recipe

↓

View Recipe Details
```

---

## 6.6.4 Functional Requirements

### FR-FV-001

Users shall be able to save any recipe as a favorite.

---

### FR-FV-002

Users shall be able to remove any saved recipe from Favorites.

---

### FR-FV-003

Users shall be able to view all saved recipes.

---

### FR-FV-004

Selecting a favorite recipe shall open the Recipe Detail page.

---

### FR-FV-005

The Favorite button shall indicate whether a recipe has already been saved.

---

## 6.6.5 Saving a Recipe

Users can save a recipe from:

- Recipe Browser
- Recipe Detail Page
- Kahit Ano Recommendations
- Pantry Recommendations
- Weekly Planner (via Recipe Detail)

Saving a recipe should require a single user action.

---

## 6.6.6 Removing a Recipe

Users may remove a recipe from Favorites by:

- Tapping the Favorite button again on the Recipe Detail page.
- Removing it directly from the Favorites page.

The removal should take effect immediately.

---

## 6.6.7 Favorites List

The Favorites page displays all saved recipes.

Each recipe card shall display:

- Recipe Image
- Recipe Name
- Estimated Cost
- Cooking Time
- Servings

Selecting a recipe opens its Recipe Detail page.

---

## 6.6.8 Favorite Status

Each recipe maintains one of two states:

- Favorited
- Not Favorited

The Favorite button should visually reflect the current state.

Example:

- Filled heart = Favorited
- Outline heart = Not Favorited

---

## 6.6.9 Storage

### Guest Users

Favorites are stored locally in the browser.

If browser data is cleared, locally stored favorites are lost.

---

### Registered Users

Favorites are stored in the application's database.

Favorites are synchronized across all devices where the user is signed in.

---

## 6.6.10 Validation Rules

Only existing recipes may be saved as favorites.

The same recipe cannot be saved more than once.

Removing a recipe that is not currently favorited shall have no effect.

---

## 6.6.11 Business Rules

### BR-FV-001

Favorites are unique per user.

---

### BR-FV-002

Saving a recipe as a favorite shall not modify the recipe.

---

### BR-FV-003

Removing a recipe from Favorites shall not affect any other user data.

---

### BR-FV-004

Guest and registered users have identical Favorites functionality, with the only difference being where data is stored.

---

## 6.6.12 Empty State

If the user has no favorite recipes:

Display:

> "You haven't saved any favorite recipes yet."

Primary Action:

**Browse Recipes**

---

## 6.6.13 Loading State

While loading favorites:

Display loading placeholders for recipe cards.

The application should indicate that favorites are being loaded.

---

## 6.6.14 Error State

If favorites cannot be loaded:

Display:

> "Unable to load your favorite recipes."

Provide:

**Try Again**

Do not expose technical error messages.

---

## 6.6.15 Accessibility Requirements

The Favorites feature shall:

- Support keyboard navigation.
- Clearly label the Favorite button.
- Provide descriptive alt text for recipe images.
- Maintain sufficient color contrast.
- Ensure all interactive elements are keyboard accessible.

---

## 6.6.16 Mobile Requirements

The Favorites feature should be optimized for mobile devices.

Requirements:

- Responsive recipe list.
- Large touch targets.
- Smooth scrolling.
- Consistent layout with the Recipe Browser.

---

## 6.6.17 Performance Requirements

Target response time:

- Saving a favorite: less than 200 milliseconds.
- Removing a favorite: less than 200 milliseconds.
- Loading the Favorites page: less than 500 milliseconds (excluding network latency).

---

## 6.6.18 Acceptance Criteria

The Favorites feature is complete when users can:

- Save recipes as favorites.
- Remove recipes from Favorites.
- View all saved recipes.
- Open recipes from the Favorites page.
- See the current favorite status of each recipe.
- Experience appropriate loading, empty, and error states.
- Use the feature effectively on mobile devices.

---

## 6.6.19 Future Considerations (Non-MVP)

The following ideas are intentionally excluded from Version 1.0:

- Favorite folders or collections.
- Tags or labels.
- Shared favorites.
- Public favorite lists.
- Favorite notes.
- Favorite sorting and filtering.
- Favorite recommendations.
- Social sharing.

These features are outside the MVP and should not be implemented unless the project scope changes.

---

### End of Section 6.6 — Favorites

## 6.7 User Accounts

---

### 6.7.1 Purpose

User Accounts allow users to securely save and synchronize their personal application data across multiple devices.

Creating an account is optional.

Users who prefer not to register may continue using the application as a Guest with locally stored data.

The purpose of User Accounts is data persistence, not feature unlocking.

---

## 6.7.2 Objectives

The User Account feature should allow users to:

- Create an account.
- Sign in.
- Sign out.
- Access their data across multiple devices.
- Continue using the application without creating an account.

---

## 6.7.3 User Types

The application supports two user types.

### Guest User

Guest users can immediately use the application without registration.

Guest users have access to all MVP features.

Guest data is stored locally on the current device.

If browser storage is cleared, guest data is permanently removed.

---

### Registered User

Registered users have the same functionality as Guest users.

The difference is that their data is stored in the application's database and synchronized across devices after signing in.

---

## 6.7.4 Functional Requirements

### FR-UA-001

Users shall be able to create an account.

---

### FR-UA-002

Users shall be able to sign in using an existing account.

---

### FR-UA-003

Users shall be able to sign out.

---

### FR-UA-004

The application shall synchronize user data after successful sign in.

---

### FR-UA-005

Guest users shall be able to use the application without registration.

---

## 6.7.5 Registration

Registration is optional.

Users may continue using the application without creating an account.

The registration process should collect only the information required to create an account.

---

## 6.7.6 Sign In

Registered users may sign in to access their synchronized data.

After successful authentication, the application shall retrieve the user's saved data.

---

## 6.7.7 Sign Out

Users may sign out at any time.

Signing out shall:

- End the current authenticated session.
- Return the application to Guest mode.

Previously synchronized data shall remain associated with the user's account and be available again after signing back in.

---

## 6.7.8 Data Synchronization

Registered users shall have the following data synchronized:

- Favorites
- Pantry
- Weekly Meal Plans
- Grocery Lists

Synchronization occurs after successful sign in and when changes are saved.

---

## 6.7.9 Guest Storage

Guest users store data locally within the browser.

The following data may be stored locally:

- Favorites
- Pantry
- Weekly Meal Plans
- Grocery Lists

Guest data is only available on the device where it was created.

---

## 6.7.10 Registered User Storage

Registered user data is stored in the application's database.

Users may access the same data after signing in from another supported device.

---

## 6.7.11 Validation Rules

Registration requires all mandatory fields to be completed.

Sign in requires valid account credentials.

Users may not create duplicate accounts using the same email address.

---

## 6.7.12 Business Rules

### BR-UA-001

Creating an account shall not be required to use the application's core features.

---

### BR-UA-002

Guest users and registered users shall have access to the same MVP functionality.

---

### BR-UA-003

The only functional difference between Guest and Registered users is where personal data is stored.

---

### BR-UA-004

Signing out shall not delete data associated with a registered account.

---

### BR-UA-005

Guest data and registered user data shall be managed independently.

---

## 6.7.13 Empty State

If a user is not signed in:

Display:

> "Create an account to sync your data across devices."

Provide:

- Sign In
- Create Account
- Continue as Guest

The user should always be able to continue without creating an account.

---

## 6.7.14 Loading State

During registration, sign in, or synchronization:

Display an appropriate loading indicator.

The application should clearly communicate that the requested action is in progress.

---

## 6.7.15 Error State

If authentication fails:

Display:

> "Unable to sign in. Please check your credentials and try again."

Provide:

**Try Again**

Do not expose technical error messages.

---

## 6.7.16 Accessibility Requirements

The User Account feature shall:

- Support keyboard navigation.
- Clearly label all form fields.
- Clearly identify validation errors.
- Maintain sufficient color contrast.
- Ensure all interactive elements are keyboard accessible.

---

## 6.7.17 Mobile Requirements

The User Account feature should be optimized for mobile devices.

Requirements:

- Responsive forms.
- Large touch targets.
- Clear input fields.
- Simple sign in and registration experience.

---

## 6.7.18 Performance Requirements

Target response time:

- Sign in: less than 2 seconds (excluding network latency).
- Registration: less than 2 seconds (excluding network latency).
- Data synchronization: initiated immediately after successful authentication.

---

## 6.7.19 Acceptance Criteria

The User Account feature is complete when users can:

- Create an account.
- Sign in.
- Sign out.
- Continue using the application as a Guest.
- Access synchronized Favorites across devices.
- Access synchronized Pantry across devices.
- Access synchronized Weekly Meal Plans across devices.
- Access synchronized Grocery Lists across devices.
- Experience appropriate loading, empty, and error states.
- Use the feature effectively on mobile devices.

---

## 6.7.20 Future Considerations (Non-MVP)

The following ideas are intentionally excluded from Version 1.0:

- User profiles.
- Profile pictures.
- Social features.
- Roles and permissions.
- Team or family accounts.
- Achievement badges.
- Activity history.
- Public user pages.
- User-to-user interactions.

These features are outside the MVP and should not be implemented unless the project scope changes.

---

### End of Section 6.7 — User Accounts

# Part 7 — Recommendation Engine

---

# 7.1 Purpose

This section defines how recipes are selected and ranked throughout the application.

The Recommendation Engine is responsible for generating meal suggestions for:

- Kahit Ano
- Pantry
- Weekly Planner

The Recommendation Engine uses a deterministic, rule-based approach.

Artificial Intelligence is not used in Version 1.0.

---

# 7.2 Design Goals

The Recommendation Engine should:

- Produce consistent recommendations.
- Prioritize practical Filipino meals.
- Respect the user's budget.
- Respect family size.
- Use pantry ingredients when available.
- Generate recommendations quickly.

The same inputs should produce the same results unless the recipe dataset changes.

---

# 7.3 Recommendation Sources

All recommendations originate from the Recipe Database.

Only active recipes may be recommended.

Recipes with incomplete data shall not be considered.

---

# 7.4 Recommendation Modes

The application supports three recommendation modes.

## Kahit Ano

Uses:

- Budget
- Family Size
- Meal Style (optional)

---

## Pantry

Uses:

- Pantry Ingredients

---

## Weekly Planner

Uses:

- Weekly Budget
- Family Size

---

# 7.5 Recipe Eligibility

Before ranking begins, recipes are filtered.

A recipe is eligible if:

- It exists in the recipe database.
- It contains complete recipe information.
- It contains valid ingredient data.
- It contains valid cost information.

Recipes failing validation shall not be recommended.

---

# 7.6 Ranking Factors

Recommendations are ranked using the following factors.

## Budget Match

Recipes closer to the user's budget receive higher priority.

Recipes significantly above the user's budget receive lower priority.

---

## Family Size

Recipes that match the requested serving size receive higher priority.

---

## Meal Style

When specified, recipes matching the selected meal style receive higher priority.

If no meal style is selected, this factor is ignored.

---

## Pantry Match

For Pantry recommendations, recipes using more available ingredients rank higher.

Recipes requiring fewer additional ingredients receive higher priority.

---

## Variety

For Weekly Planner generation, duplicate recipes should be minimized.

---

# 7.7 Recommendation Limits

Kahit Ano

Return:

3–5 recipes.

---

Pantry

Return:

Recipes ordered from best pantry match to lowest pantry match.

---

Weekly Planner

Generate:

14 meals.

- Lunch
- Dinner

for seven days.

---

# 7.8 Recommendation Rules

The Recommendation Engine shall:

- Prefer recipes that satisfy the user's conditions.
- Prefer practical everyday meals.
- Avoid unnecessary duplicates in weekly plans.
- Produce deterministic results.

---

# 7.9 No Match Handling

If no recipes fully satisfy the user's conditions:

The engine shall return the closest valid matches.

The application should avoid displaying an empty recommendation list whenever practical.

---

# 7.10 Performance Requirements

Target recommendation times:

| Feature | Target |
|----------|--------|
| Kahit Ano | < 500 ms |
| Pantry | < 700 ms |
| Weekly Planner | < 3 seconds |

These targets exclude network latency.

---

# 7.11 Business Rules

### BR-RE-001

Only recipes from the application's database may be recommended.

---

### BR-RE-002

Recommendation logic shall be deterministic.

---

### BR-RE-003

The Recommendation Engine shall not modify recipe data.

---

### BR-RE-004

The Recommendation Engine shall not modify pantry data.

---

### BR-RE-005

The Recommendation Engine shall not modify favorites.

---

### BR-RE-006

Recommendation generation shall not require user authentication.

Guest users and registered users receive recommendations using identical logic.

---

# 7.12 Acceptance Criteria

The Recommendation Engine is complete when:

- Kahit Ano returns valid recommendations.
- Pantry returns ingredient-based recommendations.
- Weekly Planner generates a valid weekly plan.
- Recommendation performance targets are met.
- Recommendation results are deterministic.
- Invalid recipes are never recommended.

---

## End of Part 7

# Part 8 — Data Model

---

# 8.1 Purpose

This section defines the logical data model for the MVP.

The data model supports the agreed functionality of:

- Recipe Browser
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites
- User Accounts

The data model is implementation-agnostic and describes the entities and relationships required for Version 1.0.

---

# 8.2 Core Entities

The MVP consists of the following primary entities:

- User
- Recipe
- Ingredient
- Recipe Ingredient
- Favorite
- Pantry Item
- Weekly Meal Plan
- Weekly Meal
- Grocery List
- Grocery List Item

---

# 8.3 Entity: User

Represents a registered user.

Guest users are not stored in the database.

### Fields

| Field | Type | Required |
|--------|------|----------|
| id | UUID | Yes |
| email | String | Yes |
| passwordHash | String | Yes |
| createdAt | DateTime | Yes |
| updatedAt | DateTime | Yes |

---

# 8.4 Entity: Recipe

Represents a single recipe.

### Fields

| Field | Type | Required |
|--------|------|----------|
| id | UUID | Yes |
| name | String | Yes |
| description | Text | Yes |
| category | String | Yes |
| mealStyle | Enum | Yes |
| estimatedCost | Decimal | Yes |
| prepTime | Integer | Yes |
| cookTime | Integer | Yes |
| servings | Integer | Yes |
| difficulty | Enum | Yes |
| imageUrl | String | Yes |
| instructions | Text | Yes |
| createdAt | DateTime | Yes |
| updatedAt | DateTime | Yes |

---

# 8.5 Entity: Ingredient

Represents an ingredient used by recipes.

### Fields

| Field | Type | Required |
|--------|------|----------|
| id | UUID | Yes |
| name | String | Yes |
| category | String | Yes |
| estimatedCost | Decimal | Yes |
| createdAt | DateTime | Yes |
| updatedAt | DateTime | Yes |

---

# 8.6 Entity: Recipe Ingredient

Defines the relationship between recipes and ingredients.

A recipe may contain many ingredients.

An ingredient may belong to many recipes.

### Fields

| Field | Type | Required |
|--------|------|----------|
| id | UUID | Yes |
| recipeId | UUID | Yes |
| ingredientId | UUID | Yes |
| quantity | Decimal | Yes |
| unit | String | Yes |

---

# 8.7 Entity: Favorite

Stores a user's saved recipes.

### Fields

| Field | Type | Required |
|--------|------|----------|
| id | UUID | Yes |
| userId | UUID | Yes |
| recipeId | UUID | Yes |
| createdAt | DateTime | Yes |

One user may save many recipes.

A recipe may be favorited by many users.

---

# 8.8 Entity: Pantry Item

Represents an ingredient in a user's pantry.

### Fields

| Field | Type | Required |
|--------|------|----------|
| id | UUID | Yes |
| userId | UUID | Yes |
| ingredientId | UUID | Yes |
| createdAt | DateTime | Yes |

A pantry item references one ingredient.

---

# 8.9 Entity: Weekly Meal Plan

Represents one saved weekly meal plan.

### Fields

| Field | Type | Required |
|--------|------|----------|
| id | UUID | Yes |
| userId | UUID | Yes |
| weeklyBudget | Decimal | Yes |
| familySize | Integer | Yes |
| createdAt | DateTime | Yes |
| updatedAt | DateTime | Yes |

One user may save multiple meal plans.

---

# 8.10 Entity: Weekly Meal

Represents one meal within a weekly plan.

### Fields

| Field | Type | Required |
|--------|------|----------|
| id | UUID | Yes |
| mealPlanId | UUID | Yes |
| dayOfWeek | Enum | Yes |
| mealType | Enum | Yes |
| recipeId | UUID | Yes |

Meal Type values:

- Lunch
- Dinner

Day of Week values:

- Monday
- Tuesday
- Wednesday
- Thursday
- Friday
- Saturday
- Sunday

Each meal plan contains fourteen meal records.

---

# 8.11 Entity: Grocery List

Represents a grocery list generated from a weekly meal plan.

### Fields

| Field | Type | Required |
|--------|------|----------|
| id | UUID | Yes |
| userId | UUID | Yes |
| mealPlanId | UUID | Yes |
| estimatedTotal | Decimal | Yes |
| createdAt | DateTime | Yes |
| updatedAt | DateTime | Yes |

---

# 8.12 Entity: Grocery List Item

Represents a single ingredient within a grocery list.

### Fields

| Field | Type | Required |
|--------|------|----------|
| id | UUID | Yes |
| groceryListId | UUID | Yes |
| ingredientId | UUID | Yes |
| quantity | Decimal | Yes |
| unit | String | Yes |
| estimatedCost | Decimal | Yes |
| purchased | Boolean | Yes |

---

# 8.13 Entity Relationships

The following relationships exist within the MVP.

```
User

├── Favorites

├── Pantry Items

├── Weekly Meal Plans

│      ├── Weekly Meals

│      └── Grocery List

│              └── Grocery List Items

Recipe

├── Recipe Ingredients

├── Favorites

└── Weekly Meals

Ingredient

├── Recipe Ingredients

├── Pantry Items

└── Grocery List Items
```

---

# 8.14 Enumerations

### Meal Style

- Dry
- With Sauce
- Soup

---

### Difficulty

- Easy
- Medium
- Hard

---

### Meal Type

- Lunch
- Dinner

---

### Day of Week

- Monday
- Tuesday
- Wednesday
- Thursday
- Friday
- Saturday
- Sunday

---

# 8.15 Data Integrity Rules

The following rules apply:

- Every Recipe must contain at least one Recipe Ingredient.
- Every Favorite must reference an existing User and Recipe.
- Every Pantry Item must reference an existing Ingredient.
- Every Weekly Meal must reference an existing Weekly Meal Plan and Recipe.
- Every Grocery List Item must reference an existing Grocery List and Ingredient.

Orphaned records shall not exist.

---

# 8.16 Deletion Rules

When a registered user deletes their account:

- Favorites are deleted.
- Pantry Items are deleted.
- Weekly Meal Plans are deleted.
- Weekly Meals are deleted.
- Grocery Lists are deleted.
- Grocery List Items are deleted.

Recipe and Ingredient data remain unchanged.

---

# 8.17 Acceptance Criteria

The data model is complete when:

- All required entities exist.
- Relationships support every MVP feature.
- Required fields are defined.
- Entity relationships maintain referential integrity.
- The model supports both guest and registered user workflows.

---

## End of Part 8

# Part 9 — API Specification

---

# 9.1 Purpose

This section defines the API required to support the MVP.

The API enables communication between the web application and the backend services.

All endpoints are intended for authenticated or guest usage as defined by the application's business rules.

This specification defines the required endpoints and their responsibilities. It does not prescribe a specific implementation framework.

---

# 9.2 API Design Principles

The API shall:

- Use HTTPS.
- Accept and return JSON.
- Use RESTful conventions.
- Return appropriate HTTP status codes.
- Validate all incoming requests.
- Return consistent error responses.

---

# 9.3 Authentication Endpoints

## Register

**POST**

```
/api/auth/register
```

### Purpose

Create a new user account.

### Request

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

### Success Response

```
201 Created
```

Returns the created user.

---

## Sign In

**POST**

```
/api/auth/login
```

### Purpose

Authenticate an existing user.

### Request

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

### Success Response

```
200 OK
```

Returns the authenticated session.

---

## Sign Out

**POST**

```
/api/auth/logout
```

### Purpose

End the current authenticated session.

### Success Response

```
200 OK
```

---

# 9.4 Recipe Endpoints

## List Recipes

**GET**

```
/api/recipes
```

### Purpose

Return all recipes.

Supports optional query parameters for:

- Search
- Category
- Sort

---

## Get Recipe

**GET**

```
/api/recipes/{id}
```

### Purpose

Return a single recipe.

---

# 9.5 Kahit Ano Endpoints

## Generate Recommendations

**POST**

```
/api/recommendations/kahit-ano
```

### Purpose

Generate recipe recommendations.

### Request

```json
{
  "budget": 300,
  "familySize": 4,
  "mealStyle": "Soup"
}
```

### Success Response

Returns a list of recommended recipes.

---

# 9.6 Pantry Endpoints

## Get Pantry

**GET**

```
/api/pantry
```

Returns the user's pantry.

---

## Add Pantry Item

**POST**

```
/api/pantry
```

### Request

```json
{
  "ingredientId": "uuid"
}
```

---

## Remove Pantry Item

**DELETE**

```
/api/pantry/{ingredientId}
```

Removes the selected pantry ingredient.

---

## Pantry Recommendations

**POST**

```
/api/pantry/recommendations
```

Returns recipe recommendations based on pantry contents.

---

# 9.7 Weekly Planner Endpoints

## Generate Weekly Plan

**POST**

```
/api/weekly-planner/generate
```

### Request

```json
{
  "weeklyBudget": 2500,
  "familySize": 4
}
```

Returns a generated weekly meal plan.

---

## Save Weekly Plan

**POST**

```
/api/weekly-planner
```

Stores the meal plan.

---

## Get Weekly Plans

**GET**

```
/api/weekly-planner
```

Returns the user's saved meal plans.

---

## Replace Meal

**PUT**

```
/api/weekly-planner/{mealId}
```

Replaces a single meal within the weekly plan.

---

# 9.8 Grocery List Endpoints

## Generate Grocery List

**POST**

```
/api/grocery-list/generate
```

Generates a grocery list from a weekly meal plan.

---

## Get Grocery List

**GET**

```
/api/grocery-list/{id}
```

Returns a grocery list.

---

## Update Purchased Status

**PUT**

```
/api/grocery-list/items/{id}
```

### Request

```json
{
  "purchased": true
}
```

Updates the purchased status of a grocery list item.

---

# 9.9 Favorites Endpoints

## List Favorites

**GET**

```
/api/favorites
```

Returns all favorite recipes.

---

## Add Favorite

**POST**

```
/api/favorites
```

### Request

```json
{
  "recipeId": "uuid"
}
```

Adds a recipe to Favorites.

---

## Remove Favorite

**DELETE**

```
/api/favorites/{recipeId}
```

Removes a recipe from Favorites.

---

# 9.10 Standard Response Format

Successful responses should return JSON.

Example:

```json
{
  "success": true,
  "data": {}
}
```

---

Error responses should follow the same structure.

Example:

```json
{
  "success": false,
  "message": "Unable to complete the request."
}
```

---

# 9.11 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# 9.12 Validation Rules

The API shall validate:

- Required fields.
- Data types.
- Missing values.
- Invalid identifiers.

Invalid requests shall return:

```
400 Bad Request
```

---

# 9.13 Security Requirements

The API shall:

- Require authentication for registered-user data.
- Validate user access to protected resources.
- Never expose password hashes.
- Return generic authentication error messages.

Guest users shall only access locally stored data and shall not require authenticated API requests for personal data.

---

# 9.14 Performance Requirements

Target response times (excluding network latency):

| Endpoint | Target |
|----------|--------|
| Recipe List | < 500 ms |
| Recipe Detail | < 500 ms |
| Kahit Ano Recommendations | < 500 ms |
| Pantry Recommendations | < 700 ms |
| Weekly Plan Generation | < 3 seconds |
| Grocery List Generation | < 1 second |

---

# 9.15 Acceptance Criteria

The API specification is complete when:

- All MVP features are supported.
- Endpoints are clearly defined.
- Request and response formats are specified.
- Validation requirements are documented.
- Standard response formats are consistent.
- Security requirements are documented.
- Performance targets align with previous sections.

---

## End of Part 9

# Part 10 — User Interface Specification

---

# 10.1 Purpose

This section defines the user interface requirements for the MVP.

The objective is to ensure a consistent, responsive, and intuitive user experience across all supported devices.

This specification describes the interface for the approved MVP features only.

---

# 10.2 Design Principles

The user interface shall:

- Be simple and easy to understand.
- Prioritize mobile usability.
- Minimize the number of steps required to complete common tasks.
- Maintain consistent navigation and layout.
- Use clear labels and familiar terminology.

---

# 10.3 Application Navigation

The application shall provide access to the following primary pages:

- Home
- Recipe Browser
- Pantry
- Weekly Planner
- Grocery List
- Favorites
- Sign In / Create Account

Navigation should remain consistent throughout the application.

---

# 10.4 Home Page

## Purpose

The Home page serves as the application's starting point.

It provides quick access to the primary features.

### Required Elements

- Application logo or name
- "Kahit Ano" primary action
- Recipe Browser shortcut
- Pantry shortcut
- Weekly Planner shortcut
- Grocery List shortcut
- Favorites shortcut
- Sign In / Account shortcut

---

# 10.5 Recipe Browser

## Purpose

Allow users to browse and search recipes.

### Required Elements

- Search field
- Category filter
- Sort option
- Recipe list
- Recipe cards

Each recipe card shall display:

- Image
- Recipe name
- Estimated cost
- Cooking time
- Servings
- Favorite indicator

---

# 10.6 Recipe Detail

## Purpose

Display complete recipe information.

### Required Elements

- Recipe image
- Recipe name
- Estimated cost
- Prep time
- Cook time
- Total time
- Servings
- Difficulty
- Meal style
- Ingredients
- Cooking instructions
- Favorite button

---

# 10.7 Kahit Ano

## Purpose

Generate meal recommendations.

### Required Elements

Input Form:

- Weekly or meal budget input
- Family size input
- Optional meal style selection
- "Suggest Meals" button

Recommendation Results:

- Recipe cards
- Recommendation reason
- Button to open recipe

---

# 10.8 Pantry

## Purpose

Manage pantry ingredients and generate recipe recommendations.

### Required Elements

- Ingredient search
- Selected ingredient list
- Remove ingredient action
- "Find Recipes" button
- Recommended recipe list

Each recommendation shall display:

- Recipe image
- Recipe name
- Pantry match
- Missing ingredients

---

# 10.9 Weekly Planner

## Purpose

Generate and manage weekly meal plans.

### Required Elements

Input Form:

- Weekly budget
- Family size
- Generate button

Meal Plan View:

- Seven days
- Lunch
- Dinner
- Replace meal action
- Save meal plan action
- Generate grocery list action

---

# 10.10 Grocery List

## Purpose

Display ingredients required for the weekly meal plan.

### Required Elements

- Ingredient categories
- Grocery items
- Quantity
- Unit
- Estimated cost
- Purchased checkbox
- Estimated total cost

---

# 10.11 Favorites

## Purpose

Display saved recipes.

### Required Elements

- Recipe list
- Recipe cards
- Remove favorite action

Each recipe card shall display:

- Image
- Recipe name
- Estimated cost
- Cooking time
- Servings

---

# 10.12 User Accounts

## Purpose

Allow users to create an account or sign in.

### Required Elements

Registration Page:

- Email
- Password
- Create Account button

Sign In Page:

- Email
- Password
- Sign In button

Account Menu:

- User email
- Sign Out button

---

# 10.13 Forms

All forms shall:

- Clearly identify required fields.
- Display validation errors adjacent to the relevant field.
- Prevent duplicate submissions while processing.
- Provide clear success or error feedback.

---

# 10.14 Loading States

The interface shall display loading indicators when:

- Recipes are loading.
- Recommendations are being generated.
- Weekly meal plans are being generated.
- Grocery lists are being generated.
- User authentication is in progress.

Loading indicators shall clearly communicate that the requested action is being processed.

---

# 10.15 Empty States

The interface shall provide clear empty states for:

- No recipes found.
- Empty pantry.
- No weekly meal plan.
- No grocery list.
- No favorite recipes.

Each empty state shall direct the user toward the next appropriate action.

---

# 10.16 Error States

The interface shall display user-friendly error messages.

Error messages shall:

- Explain that the requested action could not be completed.
- Avoid technical terminology.
- Offer a retry action when appropriate.

---

# 10.17 Responsive Design

The application shall support:

- Mobile phones
- Tablets
- Desktop browsers

Layouts shall adapt to different screen sizes without loss of functionality.

---

# 10.18 Accessibility Requirements

The interface shall:

- Support keyboard navigation.
- Provide descriptive labels for all form controls.
- Maintain sufficient color contrast.
- Include alternative text for images.
- Ensure interactive elements are accessible using assistive technologies.

---

# 10.19 Consistency Requirements

All pages shall maintain consistent:

- Navigation
- Typography
- Button styles
- Form controls
- Card layouts
- Spacing
- Color usage

The interface should present a unified experience throughout the application.

---

# 10.20 Acceptance Criteria

The User Interface Specification is complete when:

- All approved MVP pages are defined.
- Required interface elements are documented.
- Form behavior is specified.
- Loading, empty, and error states are documented.
- Responsive behavior is defined.
- Accessibility requirements are documented.
- Interface consistency requirements are documented.

---

## End of Part 10

# Part 11 — Non-Functional Requirements

---

# 11.1 Purpose

This section defines the non-functional requirements for the MVP.

These requirements describe the expected quality attributes of the application, including performance, reliability, security, usability, maintainability, and compatibility.

These requirements apply to all approved MVP features.

---

# 11.2 Performance Requirements

The application shall provide a responsive user experience.

### Target Response Times

| Function | Target Response Time* |
|----------|-----------------------|
| Home Page | Less than 1 second |
| Recipe Browser | Less than 500 milliseconds |
| Recipe Detail | Less than 500 milliseconds |
| Kahit Ano Recommendations | Less than 500 milliseconds |
| Pantry Recommendations | Less than 700 milliseconds |
| Weekly Planner Generation | Less than 3 seconds |
| Grocery List Generation | Less than 1 second |
| Favorites Loading | Less than 500 milliseconds |
| User Sign In | Less than 2 seconds |

\*Excludes network latency.

---

# 11.3 Availability

The application should be available whenever the hosting platform is operational.

Planned maintenance should not compromise data integrity.

Unexpected failures should not result in permanent data loss for registered users.

---

# 11.4 Reliability

The application shall:

- Produce consistent results for identical inputs.
- Preserve stored user data.
- Recover gracefully from recoverable errors.
- Prevent data corruption during normal operation.

---

# 11.5 Scalability

The application shall support the expected MVP usage without requiring changes to application functionality.

The implementation should accommodate growth through normal infrastructure scaling without affecting user behavior.

---

# 11.6 Security

The application shall:

- Use HTTPS for all network communication.
- Store user passwords as secure password hashes.
- Protect authenticated endpoints from unauthorized access.
- Never expose password hashes or other sensitive authentication data.
- Validate all user input before processing.

---

# 11.7 Data Integrity

The application shall ensure that:

- Required data is not stored with missing mandatory fields.
- Entity relationships remain valid.
- Invalid references are rejected.
- Stored data remains internally consistent.

---

# 11.8 Usability

The application shall:

- Be easy for first-time users to understand.
- Require minimal steps to complete common tasks.
- Use clear and consistent terminology.
- Provide meaningful validation and error messages.

---

# 11.9 Accessibility

The application shall:

- Support keyboard navigation.
- Provide descriptive labels for form controls.
- Maintain sufficient color contrast.
- Include alternative text for images.
- Ensure interactive controls are accessible.

---

# 11.10 Responsive Design

The user interface shall adapt to:

- Mobile phones
- Tablets
- Desktop browsers

Core functionality shall remain available across supported screen sizes.

---

# 11.11 Browser Compatibility

The application shall support current versions of major modern browsers, including:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Apple Safari

---

# 11.12 Data Storage

### Guest Users

Guest data shall be stored locally within the browser.

Guest data includes:

- Favorites
- Pantry
- Weekly Meal Plans
- Grocery Lists

---

### Registered Users

Registered user data shall be stored in the application's database.

Stored data includes:

- Favorites
- Pantry
- Weekly Meal Plans
- Grocery Lists

---

# 11.13 Error Handling

The application shall:

- Display user-friendly error messages.
- Prevent application crashes caused by invalid user input.
- Return consistent API error responses.
- Avoid exposing internal implementation details.

---

# 11.14 Logging

The application shall record operational errors necessary for troubleshooting.

Logs shall not contain sensitive authentication information.

---

# 11.15 Maintainability

The codebase shall:

- Follow a consistent project structure.
- Use descriptive naming conventions.
- Separate business logic from presentation logic.
- Be organized to support ongoing maintenance.

---

# 11.16 Backup and Recovery

Registered user data should be recoverable using the application's database backup strategy.

Guest data remains the responsibility of the user's local browser storage.

---

# 11.17 Internationalization

Version 1.0 targets English-language user interface text.

Recipe names and commonly recognized Filipino dish names may remain in their original form.

---

# 11.18 Privacy

The application shall:

- Collect only the information required for the approved MVP.
- Store user data only for application functionality.
- Restrict access to authenticated user data.

---

# 11.19 Acceptance Criteria

The non-functional requirements are complete when:

- Performance targets are documented.
- Reliability expectations are defined.
- Security requirements are specified.
- Accessibility requirements are documented.
- Browser compatibility is defined.
- Data storage behavior is documented.
- Error handling expectations are defined.
- Maintainability expectations are documented.

---

## End of Part 11

# Part 12 — Acceptance Testing

---

# 12.1 Purpose

This section defines the acceptance tests for Version 1.0.

The purpose of acceptance testing is to verify that every approved MVP feature functions according to the Product Blueprint.

No additional functionality shall be tested beyond the approved MVP scope.

---

# 12.2 Acceptance Testing Objectives

Acceptance testing shall verify that:

- All approved MVP features are implemented.
- User workflows function correctly.
- Business rules are enforced.
- Validation rules operate correctly.
- Data is stored correctly.
- The application is stable on supported devices.

---

# 12.3 Test Environment

Acceptance testing shall be performed using:

- Current version of Google Chrome
- Current version of Microsoft Edge
- Current version of Mozilla Firefox
- Current version of Apple Safari

Testing shall include:

- Desktop browsers
- Mobile browsers
- Tablet browsers

---

# 12.4 Recipe Browser Tests

### AT-RB-001

Browse recipes.

**Expected Result**

The recipe list loads successfully.

---

### AT-RB-002

Search by recipe name.

**Expected Result**

Matching recipes are displayed.

---

### AT-RB-003

Filter by category.

**Expected Result**

Only recipes in the selected category are displayed.

---

### AT-RB-004

Open a recipe.

**Expected Result**

The Recipe Detail page displays complete recipe information.

---

### AT-RB-005

Add and remove a favorite.

**Expected Result**

The recipe's favorite status updates correctly.

---

# 12.5 Kahit Ano Tests

### AT-KA-001

Generate recommendations using valid inputs.

**Expected Result**

Three to five recommended recipes are returned.

---

### AT-KA-002

Open a recommended recipe.

**Expected Result**

The Recipe Detail page opens successfully.

---

### AT-KA-003

Regenerate recommendations.

**Expected Result**

A valid set of recommendations is generated.

---

# 12.6 Pantry Tests

### AT-PN-001

Add ingredients to the pantry.

**Expected Result**

Selected ingredients appear in the pantry.

---

### AT-PN-002

Remove an ingredient.

**Expected Result**

The ingredient is removed immediately.

---

### AT-PN-003

Generate pantry recommendations.

**Expected Result**

Recipes are returned based on pantry contents.

---

### AT-PN-004

Open a recommended recipe.

**Expected Result**

The Recipe Detail page opens successfully.

---

# 12.7 Weekly Planner Tests

### AT-WP-001

Generate a weekly meal plan.

**Expected Result**

A seven-day meal plan containing lunch and dinner is generated.

---

### AT-WP-002

Replace a meal.

**Expected Result**

Only the selected meal changes.

---

### AT-WP-003

Save a meal plan.

**Expected Result**

The meal plan is stored successfully.

---

### AT-WP-004

Generate a grocery list.

**Expected Result**

A grocery list is created from the meal plan.

---

# 12.8 Grocery List Tests

### AT-GL-001

Generate a grocery list.

**Expected Result**

All required ingredients are included.

---

### AT-GL-002

Verify duplicate ingredient merging.

**Expected Result**

Duplicate ingredients appear only once with combined quantities.

---

### AT-GL-003

Mark an item as purchased.

**Expected Result**

The purchased status updates correctly.

---

# 12.9 Favorites Tests

### AT-FV-001

Save a recipe.

**Expected Result**

The recipe appears in Favorites.

---

### AT-FV-002

Remove a recipe.

**Expected Result**

The recipe is removed from Favorites.

---

### AT-FV-003

Open a favorite recipe.

**Expected Result**

The Recipe Detail page opens successfully.

---

# 12.10 User Account Tests

### AT-UA-001

Create an account.

**Expected Result**

The account is created successfully.

---

### AT-UA-002

Sign in.

**Expected Result**

The user is authenticated successfully.

---

### AT-UA-003

Sign out.

**Expected Result**

The authenticated session ends successfully.

---

### AT-UA-004

Verify synchronized data.

**Expected Result**

Favorites, Pantry, Weekly Meal Plans, and Grocery Lists are available after signing in on another supported device.

---

# 12.11 Validation Tests

Verify that:

- Required fields cannot be submitted empty.
- Invalid values are rejected.
- Appropriate validation messages are displayed.

---

# 12.12 Error Handling Tests

Verify that:

- User-friendly error messages are displayed.
- Invalid requests do not crash the application.
- Retry actions function correctly where provided.

---

# 12.13 Responsive Design Tests

Verify that all approved MVP pages function correctly on:

- Mobile phones
- Tablets
- Desktop browsers

Layouts shall remain usable and readable at supported screen sizes.

---

# 12.14 Accessibility Tests

Verify that:

- Keyboard navigation functions correctly.
- Form controls have descriptive labels.
- Images include alternative text.
- Interactive controls are accessible.
- Color contrast supports readability.

---

# 12.15 Performance Tests

Verify that application performance meets the targets defined in Part 11.

This includes:

- Recipe loading
- Recommendation generation
- Weekly planner generation
- Grocery list generation
- User authentication

---

# 12.16 Regression Testing

After any defect correction, verify that previously approved MVP functionality continues to operate correctly.

Regression testing shall include all major user workflows.

---

# 12.17 Acceptance Criteria

Version 1.0 is accepted when:

- All acceptance tests pass.
- All approved MVP features function according to the Product Blueprint.
- Business rules are enforced.
- Validation behaves correctly.
- Performance targets are achieved.
- No critical or high-severity defects remain open.

---

## End of Part 12

# Part 13 — Project Constraints and Out of Scope

---

# 13.1 Purpose

This section defines the boundaries of Version 1.0.

Its purpose is to ensure that development remains focused on the approved MVP and that no additional functionality is introduced during implementation without an explicit scope change.

This section is binding for the implementation of Version 1.0.

---

# 13.2 Approved MVP Features

Version 1.0 includes only the following features:

- Recipe Browser
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites
- User Accounts

No other product features are included in the MVP.

---

# 13.3 Supported Platforms

Version 1.0 supports:

- Web browsers on desktop computers
- Web browsers on tablets
- Web browsers on mobile devices

No native mobile applications are included in Version 1.0.

---

# 13.4 Recommendation Engine

Version 1.0 uses the rule-based recommendation engine defined in Part 7.

Artificial Intelligence is not part of the MVP.

All recommendations shall be generated using the documented business rules.

---

# 13.5 Recipe Data

Recipes are provided by the application's curated recipe database.

End users cannot create, edit, or delete recipes.

Recipe management is outside the scope of Version 1.0.

---

# 13.6 Guest Users

Guest users may access the application's core features without creating an account.

Guest data is stored locally in the browser.

Guest data is not synchronized across devices.

---

# 13.7 Registered Users

Registered users may create an account and sign in.

Registered user data is stored in the application's database.

Registered user data is synchronized across supported devices.

---

# 13.8 Data Ownership

The application stores only the data required to support the approved MVP features.

Recipe data remains part of the application dataset.

User-generated data includes:

- Favorites
- Pantry
- Weekly Meal Plans
- Grocery Lists

---

# 13.9 Out of Scope

The following functionality is explicitly excluded from Version 1.0.

## Artificial Intelligence

- AI-generated recommendations
- AI meal planning
- AI recipe generation
- AI chat assistance

---

## Community Features

- User-created recipes
- Ratings
- Reviews
- Comments
- Community recipe sharing

---

## Social Features

- User profiles
- Following other users
- Shared favorites
- Public collections
- Activity feeds

---

## Pantry Enhancements

- Barcode scanning
- OCR ingredient recognition
- Inventory quantities
- Expiration tracking
- Automatic pantry updates

---

## Grocery Enhancements

- Online grocery ordering
- Supermarket integrations
- Price comparison
- Coupon support
- Shared grocery lists

---

## Planner Enhancements

- Breakfast planning
- Snack planning
- Nutrition tracking
- Calendar synchronization
- Meal reminders

---

## Recipe Enhancements

- Ingredient-based search
- Advanced filtering
- Recipe editing
- Recipe creation
- Recipe import

---

## Account Enhancements

- Profile customization
- Profile pictures
- Family accounts
- Roles and permissions
- Achievements

---

# 13.10 Change Control

Any functionality not documented within this Product Blueprint shall be considered outside the scope of Version 1.0.

Changes to the approved MVP require an explicit revision to the Product Blueprint before implementation.

Developers shall not introduce additional features based on assumptions or personal preference.

---

# 13.11 Definition of Complete

Version 1.0 is considered complete when:

- All approved MVP features are implemented.
- All acceptance tests defined in Part 12 pass.
- The implementation conforms to the functional specifications in Part 6.
- The recommendation engine conforms to Part 7.
- The data model conforms to Part 8.
- The API conforms to Part 9.
- The user interface conforms to Part 10.
- The non-functional requirements in Part 11 are satisfied.

No additional functionality is required for Version 1.0.

---

# 13.12 Final Scope Statement

This Product Blueprint defines the complete scope of **Version 1.0**.

The implementation shall follow this document as the authoritative specification.

Any feature, workflow, screen, integration, or behavior not explicitly documented within this blueprint shall be considered outside the scope of the MVP and shall not be implemented unless the project scope is formally revised.

---

## End of Part 13

# Part 14 — Implementation Roadmap

---

# 14.1 Purpose

This section defines the recommended implementation sequence for Version 1.0.

The roadmap exists to organize development work into logical phases while preserving the approved MVP scope.

It does not introduce additional functionality or alter any requirements defined in previous sections.

---

# 14.2 Development Principles

Development shall follow these principles:

- Implement only the approved MVP features.
- Complete each phase before proceeding to the next.
- Verify functionality through testing before continuing.
- Maintain consistency with this Product Blueprint throughout implementation.

---

# 14.3 Implementation Phases

Development should proceed through the following phases.

### Phase 1 — Project Foundation

Objectives:

- Set up the project structure.
- Configure the development environment.
- Configure the database.
- Configure authentication.
- Establish the application layout.

Deliverables:

- Running application
- Database connection
- Authentication
- Base layout and navigation

---

### Phase 2 — Recipe Browser

Objectives:

Implement the Recipe Browser.

Deliverables:

- Recipe list
- Recipe search
- Category filtering
- Recipe Detail page

Verification:

- Recipes can be viewed.
- Recipes can be searched.
- Recipe details display correctly.

---

### Phase 3 — Favorites

Objectives:

Implement Favorites.

Deliverables:

- Save recipe
- Remove recipe
- Favorites page

Verification:

- Favorites save correctly.
- Favorites display correctly.
- Favorites can be removed.

---

### Phase 4 — Kahit Ano

Objectives:

Implement the rule-based recommendation engine for Kahit Ano.

Deliverables:

- Recommendation form
- Recommendation results
- Recipe navigation

Verification:

- Valid recommendations are generated.
- Recommendations open Recipe Detail pages.

---

### Phase 5 — Pantry

Objectives:

Implement Pantry management.

Deliverables:

- Pantry management
- Pantry recommendations

Verification:

- Ingredients can be managed.
- Pantry recommendations function correctly.

---

### Phase 6 — Weekly Planner

Objectives:

Implement weekly meal planning.

Deliverables:

- Weekly planner
- Meal replacement
- Save meal plan

Verification:

- Weekly plans generate successfully.
- Individual meals can be replaced.
- Meal plans save correctly.

---

### Phase 7 — Grocery List

Objectives:

Implement grocery list generation.

Deliverables:

- Grocery list generation
- Purchased item tracking

Verification:

- Grocery lists generate correctly.
- Duplicate ingredients are merged.
- Purchased status updates correctly.

---

### Phase 8 — User Accounts

Objectives:

Complete account functionality.

Deliverables:

- Registration
- Sign in
- Sign out
- Data synchronization

Verification:

- User authentication functions correctly.
- User data synchronizes correctly.

---

### Phase 9 — Testing and Stabilization

Objectives:

Complete testing and resolve defects.

Deliverables:

- Acceptance testing
- Bug fixes
- Performance verification

Verification:

- Acceptance tests pass.
- Critical defects are resolved.
- Performance targets are achieved.

---

# 14.4 Phase Completion Criteria

A development phase is complete only when:

- All planned deliverables are implemented.
- Related acceptance tests pass.
- No unresolved critical defects remain within that phase.
- The implementation conforms to this Product Blueprint.

Development should not proceed to the next phase until the current phase satisfies these conditions.

---

# 14.5 Definition of MVP Complete

Version 1.0 is complete when:

- All implementation phases have been completed.
- All acceptance tests defined in Part 12 have passed.
- All approved MVP features are fully functional.
- The application conforms to all functional and non-functional requirements defined in this Product Blueprint.

---

# 14.6 Scope Protection

During implementation:

- No additional pages shall be created beyond those defined in this Product Blueprint.
- No additional features shall be implemented beyond those approved for Version 1.0.
- No existing workflows shall be modified unless required to correct implementation defects.
- Any requested enhancement shall be deferred until after Version 1.0 is completed and formally approved.

---

# 14.7 Deliverables

The completed MVP shall include:

- Working web application
- Configured database
- Implemented REST API
- Responsive user interface
- Authentication
- Rule-based recommendation engine
- Acceptance-tested functionality

No additional deliverables are required for Version 1.0.

---

# 14.8 Final Acceptance

Version 1.0 shall be considered ready for release when:

- The Product Blueprint has been fully implemented.
- The Acceptance Tessting defined in Part 12 has been successfully completed.
- The application operates according to all documented requirements.
- No unresolved critical defects remain.

---

## End of Part 14

