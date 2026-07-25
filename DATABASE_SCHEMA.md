# DATABASE_SCHEMA.md

# 1. Introduction

## 1.1 Purpose

This document defines the database schema for **Ma, Anong Ulam? Version 1.0**.

It translates the logical data model defined in the Product Blueprint into an implementation-ready database specification.

This document defines:

- Database tables
- Columns
- Data types
- Primary keys
- Foreign keys
- Constraints
- Relationships

It does **not** define application logic or introduce new functionality.

---

# 1.2 Scope

This schema supports only the approved MVP features:

- Recipe Browser
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites
- User Accounts

No additional entities shall be added unless the Product Blueprint is formally revised.

---

# 1.3 Database Design Principles

The database shall be designed using the following principles:

- Normalize data to reduce duplication.
- Enforce referential integrity.
- Use UUIDs as primary keys.
- Store timestamps in UTC.
- Prevent orphaned records.
- Store only data required by the MVP.

---

# 1.4 Naming Conventions

## Tables

- Singular names.
- PascalCase.

Examples:

- User
- Recipe
- Ingredient
- Favorite

---

## Columns

Camel Case.

Examples:

- createdAt
- updatedAt
- recipeId
- ingredientId

---

## Primary Keys

Every table shall contain:

```
id UUID PRIMARY KEY
```

---

## Foreign Keys

Foreign keys shall use the format:

```
entityId
```

Examples:

```
userId

recipeId

ingredientId
```

---

# 1.5 Timestamp Fields

Unless otherwise specified, all tables include:

```
createdAt

updatedAt
```

Both fields store UTC timestamps.

---

# 1.6 Entity Relationship Overview

The database consists of the following entities.

```
User

Recipe

Ingredient

RecipeIngredient

Favorite

PantryItem

WeeklyMealPlan

WeeklyMeal

GroceryList

GroceryListItem
```

---

## Relationship Diagram

```
User
 ├── Favorite
 ├── PantryItem
 ├── WeeklyMealPlan
 │      ├── WeeklyMeal
 │      └── GroceryList
 │             └── GroceryListItem

Recipe
 ├── RecipeIngredient
 ├── Favorite
 └── WeeklyMeal

Ingredient
 ├── RecipeIngredient
 ├── PantryItem
 └── GroceryListItem
```

---

# 1.7 Database Rules

The schema shall satisfy the following rules.

- Every Recipe contains at least one ingredient.
- Every Favorite references one User and one Recipe.
- Every PantryItem references one Ingredient.
- Every WeeklyMeal belongs to one WeeklyMealPlan.
- Every GroceryList belongs to one WeeklyMealPlan.
- Every GroceryListItem belongs to one GroceryList.

---

# 1.8 Supported Database

The implementation targets:

PostgreSQL

No database-specific functionality beyond standard PostgreSQL features is required by Version 1.0.

---

# 1.9 UUID Strategy

Every primary key uses UUID.

Example:

```
id UUID PRIMARY KEY
```

UUID generation shall be handled by the application or the database, depending on the implementation.

---

# 1.10 Nullability Rules

Fields marked as required in the Product Blueprint shall be stored as NOT NULL.

Optional fields may allow NULL values where appropriate.

No additional nullable fields shall be introduced without updating the Product Blueprint.

---

# 1.11 Data Integrity

The schema shall enforce:

- Primary key uniqueness
- Foreign key integrity
- Required field validation
- Relationship consistency

Application logic may perform additional validation, but the database shall enforce structural integrity.

---

# End of Section 1

# DATABASE_SCHEMA.md

# 2. Table Definitions

---

# 2.1 User

## Purpose

Stores registered user accounts.

Guest users are **not** stored in the database.

---

## Columns

| Column | Data Type | Nullable | Description |
|---------|-----------|----------|-------------|
| id | UUID | No | Primary Key |
| email | VARCHAR(255) | No | User email address |
| passwordHash | TEXT | No | Secure password hash |
| createdAt | TIMESTAMP | No | Record creation timestamp (UTC) |
| updatedAt | TIMESTAMP | No | Last update timestamp (UTC) |

---

## Primary Key

```
id
```

---

## Constraints

- `email` must be unique.
- `email` cannot be empty.
- `passwordHash` cannot be empty.

---

# 2.2 Recipe

## Purpose

Stores all recipes available within the application.

Recipes are managed as application data.

---

## Columns

| Column | Data Type | Nullable | Description |
|---------|-----------|----------|-------------|
| id | UUID | No | Primary Key |
| name | VARCHAR(255) | No | Recipe name |
| description | TEXT | No | Recipe description |
| category | VARCHAR(100) | No | Recipe category |
| mealStyle | VARCHAR(50) | No | Meal style |
| estimatedCost | DECIMAL(10,2) | No | Estimated recipe cost |
| prepTime | INTEGER | No | Preparation time (minutes) |
| cookTime | INTEGER | No | Cooking time (minutes) |
| servings | INTEGER | No | Number of servings |
| difficulty | VARCHAR(20) | No | Difficulty level |
| imageUrl | TEXT | No | Recipe image location |
| instructions | TEXT | No | Cooking instructions |
| createdAt | TIMESTAMP | No | Record creation timestamp (UTC) |
| updatedAt | TIMESTAMP | No | Last update timestamp (UTC) |

---

## Primary Key

```
id
```

---

## Constraints

- `name` is required.
- `estimatedCost` must be greater than or equal to zero.
- `prepTime` must be zero or greater.
- `cookTime` must be zero or greater.
- `servings` must be greater than zero.

---

# 2.3 Ingredient

## Purpose

Stores ingredients used by recipes and pantry records.

---

## Columns

| Column | Data Type | Nullable | Description |
|---------|-----------|----------|-------------|
| id | UUID | No | Primary Key |
| name | VARCHAR(255) | No | Ingredient name |
| category | VARCHAR(100) | No | Ingredient category |
| estimatedCost | DECIMAL(10,2) | No | Estimated ingredient cost |
| createdAt | TIMESTAMP | No | Record creation timestamp (UTC) |
| updatedAt | TIMESTAMP | No | Last update timestamp (UTC) |

---

## Primary Key

```
id
```

---

## Constraints

- `name` is required.
- `estimatedCost` must be greater than or equal to zero.

---

# 2.4 RecipeIngredient

## Purpose

Defines the many-to-many relationship between recipes and ingredients.

---

## Columns

| Column | Data Type | Nullable | Description |
|---------|-----------|----------|-------------|
| id | UUID | No | Primary Key |
| recipeId | UUID | No | References Recipe |
| ingredientId | UUID | No | References Ingredient |
| quantity | DECIMAL(10,2) | No | Ingredient quantity |
| unit | VARCHAR(50) | No | Measurement unit |

---

## Primary Key

```
id
```

---

## Foreign Keys

```
recipeId → Recipe.id

ingredientId → Ingredient.id
```

---

## Constraints

- `quantity` must be greater than zero.
- `unit` is required.

---

# 2.5 Favorite

## Purpose

Stores recipes saved by registered users.

---

## Columns

| Column | Data Type | Nullable | Description |
|---------|-----------|----------|-------------|
| id | UUID | No | Primary Key |
| userId | UUID | No | References User |
| recipeId | UUID | No | References Recipe |
| createdAt | TIMESTAMP | No | Record creation timestamp (UTC) |

---

## Primary Key

```
id
```

---

## Foreign Keys

```
userId → User.id

recipeId → Recipe.id
```

---

## Constraints

- A user may save the same recipe only once.

Enforce with a unique constraint on:

```
(userId, recipeId)
```

---

# End of Section 2 (Part 1)

# DATABASE_SCHEMA.md

# 2. Table Definitions (Continued)

---

# 2.6 PantryItem

## Purpose

Stores the pantry ingredients for registered users.

Guest user pantry data is stored locally in the browser and is not persisted in the database.

---

## Columns

| Column | Data Type | Nullable | Description |
|---------|-----------|----------|-------------|
| id | UUID | No | Primary Key |
| userId | UUID | No | References User |
| ingredientId | UUID | No | References Ingredient |
| createdAt | TIMESTAMP | No | Record creation timestamp (UTC) |

---

## Primary Key

```
id
```

---

## Foreign Keys

```
userId → User.id

ingredientId → Ingredient.id
```

---

## Constraints

A user may only have one pantry entry for the same ingredient.

Enforce with a unique constraint on:

```
(userId, ingredientId)
```

---

# 2.7 WeeklyMealPlan

## Purpose

Stores a saved weekly meal plan.

Each record represents one weekly plan generated by the application.

---

## Columns

| Column | Data Type | Nullable | Description |
|---------|-----------|----------|-------------|
| id | UUID | No | Primary Key |
| userId | UUID | No | References User |
| weeklyBudget | DECIMAL(10,2) | No | Budget used for generation |
| familySize | INTEGER | No | Number of people served |
| createdAt | TIMESTAMP | No | Record creation timestamp (UTC) |
| updatedAt | TIMESTAMP | No | Last update timestamp (UTC) |

---

## Primary Key

```
id
```

---

## Foreign Keys

```
userId → User.id
```

---

## Constraints

- `weeklyBudget` must be greater than or equal to zero.
- `familySize` must be greater than zero.

---

# 2.8 WeeklyMeal

## Purpose

Stores individual meals belonging to a weekly meal plan.

Each Weekly Meal represents one lunch or one dinner.

---

## Columns

| Column | Data Type | Nullable | Description |
|---------|-----------|----------|-------------|
| id | UUID | No | Primary Key |
| mealPlanId | UUID | No | References WeeklyMealPlan |
| dayOfWeek | VARCHAR(20) | No | Day of the week |
| mealType | VARCHAR(20) | No | Lunch or Dinner |
| recipeId | UUID | No | References Recipe |

---

## Primary Key

```
id
```

---

## Foreign Keys

```
mealPlanId → WeeklyMealPlan.id

recipeId → Recipe.id
```

---

## Constraints

Each meal plan may contain only one record for the same day and meal type.

Enforce with a unique constraint on:

```
(mealPlanId, dayOfWeek, mealType)
```

---

# 2.9 GroceryList

## Purpose

Stores a grocery list generated from a weekly meal plan.

---

## Columns

| Column | Data Type | Nullable | Description |
|---------|-----------|----------|-------------|
| id | UUID | No | Primary Key |
| userId | UUID | No | References User |
| mealPlanId | UUID | No | References WeeklyMealPlan |
| estimatedTotal | DECIMAL(10,2) | No | Estimated total grocery cost |
| createdAt | TIMESTAMP | No | Record creation timestamp (UTC) |
| updatedAt | TIMESTAMP | No | Last update timestamp (UTC) |

---

## Primary Key

```
id
```

---

## Foreign Keys

```
userId → User.id

mealPlanId → WeeklyMealPlan.id
```

---

## Constraints

- `estimatedTotal` must be greater than or equal to zero.

---

# 2.10 GroceryListItem

## Purpose

Stores individual grocery items within a grocery list.

---

## Columns

| Column | Data Type | Nullable | Description |
|---------|-----------|----------|-------------|
| id | UUID | No | Primary Key |
| groceryListId | UUID | No | References GroceryList |
| ingredientId | UUID | No | References Ingredient |
| quantity | DECIMAL(10,2) | No | Required quantity |
| unit | VARCHAR(50) | No | Measurement unit |
| estimatedCost | DECIMAL(10,2) | No | Estimated item cost |
| purchased | BOOLEAN | No | Purchase status |

---

## Primary Key

```
id
```

---

## Foreign Keys

```
groceryListId → GroceryList.id

ingredientId → Ingredient.id
```

---

## Constraints

- `quantity` must be greater than zero.
- `estimatedCost` must be greater than or equal to zero.
- `purchased` defaults to `FALSE`.

---

# 2.11 Table Summary

The MVP database contains the following tables:

| Table | Purpose |
|--------|---------|
| User | Registered user accounts |
| Recipe | Recipe catalog |
| Ingredient | Ingredient catalog |
| RecipeIngredient | Recipe-to-ingredient mapping |
| Favorite | Saved recipes |
| PantryItem | User pantry |
| WeeklyMealPlan | Saved meal plans |
| WeeklyMeal | Meals within a plan |
| GroceryList | Generated grocery lists |
| GroceryListItem | Items within a grocery list |

---

## End of Section 2

# DATABASE_SCHEMA.md

# 3. Relationships and Referential Integrity

---

# 3.1 Purpose

This section defines the relationships between database tables.

These relationships enforce data integrity and ensure that the approved MVP data model remains consistent.

No additional relationships beyond those required by the Product Blueprint are defined.

---

# 3.2 Relationship Overview

The database contains the following relationships.

```
User
 ├── Favorite
 ├── PantryItem
 ├── WeeklyMealPlan
 │      ├── WeeklyMeal
 │      └── GroceryList
 │             └── GroceryListItem

Recipe
 ├── RecipeIngredient
 ├── Favorite
 └── WeeklyMeal

Ingredient
 ├── RecipeIngredient
 ├── PantryItem
 └── GroceryListItem
```

---

# 3.3 User Relationships

## User → Favorite

Relationship:

```
One User

↓

Many Favorites
```

Foreign Key

```
Favorite.userId

→ User.id
```

Purpose

Stores the recipes saved by a registered user.

---

## User → PantryItem

Relationship

```
One User

↓

Many Pantry Items
```

Foreign Key

```
PantryItem.userId

→ User.id
```

Purpose

Stores the ingredients belonging to a registered user's pantry.

---

## User → WeeklyMealPlan

Relationship

```
One User

↓

Many Weekly Meal Plans
```

Foreign Key

```
WeeklyMealPlan.userId

→ User.id
```

Purpose

Allows a registered user to save multiple weekly meal plans.

---

## User → GroceryList

Relationship

```
One User

↓

Many Grocery Lists
```

Foreign Key

```
GroceryList.userId

→ User.id
```

Purpose

Stores grocery lists generated by the user.

---

# 3.4 Recipe Relationships

## Recipe → RecipeIngredient

Relationship

```
One Recipe

↓

Many Recipe Ingredients
```

Foreign Key

```
RecipeIngredient.recipeId

→ Recipe.id
```

Purpose

Defines the ingredients required for a recipe.

---

## Recipe → Favorite

Relationship

```
One Recipe

↓

Many Favorites
```

Foreign Key

```
Favorite.recipeId

→ Recipe.id
```

Purpose

Allows multiple users to save the same recipe.

---

## Recipe → WeeklyMeal

Relationship

```
One Recipe

↓

Many Weekly Meals
```

Foreign Key

```
WeeklyMeal.recipeId

→ Recipe.id
```

Purpose

Allows a recipe to be used in one or more meal plans.

---

# 3.5 Ingredient Relationships

## Ingredient → RecipeIngredient

Relationship

```
One Ingredient

↓

Many Recipe Ingredients
```

Foreign Key

```
RecipeIngredient.ingredientId

→ Ingredient.id
```

Purpose

Allows ingredients to be reused across recipes.

---

## Ingredient → PantryItem

Relationship

```
One Ingredient

↓

Many Pantry Items
```

Foreign Key

```
PantryItem.ingredientId

→ Ingredient.id
```

Purpose

Allows the same ingredient to exist in multiple user pantries.

---

## Ingredient → GroceryListItem

Relationship

```
One Ingredient

↓

Many Grocery List Items
```

Foreign Key

```
GroceryListItem.ingredientId

→ Ingredient.id
```

Purpose

Allows grocery list items to reference the application's ingredient catalog.

---

# 3.6 Weekly Meal Plan Relationships

## WeeklyMealPlan → WeeklyMeal

Relationship

```
One Weekly Meal Plan

↓

Many Weekly Meals
```

Foreign Key

```
WeeklyMeal.mealPlanId

→ WeeklyMealPlan.id
```

Purpose

Each weekly meal plan contains its scheduled meals.

---

## WeeklyMealPlan → GroceryList

Relationship

```
One Weekly Meal Plan

↓

One Grocery List
```

Foreign Key

```
GroceryList.mealPlanId

→ WeeklyMealPlan.id
```

Purpose

Associates a generated grocery list with the meal plan from which it was created.

---

# 3.7 Grocery List Relationships

## GroceryList → GroceryListItem

Relationship

```
One Grocery List

↓

Many Grocery List Items
```

Foreign Key

```
GroceryListItem.groceryListId

→ GroceryList.id
```

Purpose

Stores the individual ingredients required for a grocery list.

---

# 3.8 Referential Integrity Rules

The database shall enforce the following rules:

- Every `Favorite.userId` must reference an existing `User`.
- Every `Favorite.recipeId` must reference an existing `Recipe`.
- Every `PantryItem.userId` must reference an existing `User`.
- Every `PantryItem.ingredientId` must reference an existing `Ingredient`.
- Every `RecipeIngredient.recipeId` must reference an existing `Recipe`.
- Every `RecipeIngredient.ingredientId` must reference an existing `Ingredient`.
- Every `WeeklyMealPlan.userId` must reference an existing `User`.
- Every `WeeklyMeal.mealPlanId` must reference an existing `WeeklyMealPlan`.
- Every `WeeklyMeal.recipeId` must reference an existing `Recipe`.
- Every `GroceryList.userId` must reference an existing `User`.
- Every `GroceryList.mealPlanId` must reference an existing `WeeklyMealPlan`.
- Every `GroceryListItem.groceryListId` must reference an existing `GroceryList`.
- Every `GroceryListItem.ingredientId` must reference an existing `Ingredient`.

No record shall reference a non-existent parent record.

---

# 3.9 Cascade Delete Rules

To preserve data integrity, the following delete behavior shall apply.

| Parent Table | Child Table | Delete Behavior |
|--------------|-------------|-----------------|
| User | Favorite | Cascade |
| User | PantryItem | Cascade |
| User | WeeklyMealPlan | Cascade |
| WeeklyMealPlan | WeeklyMeal | Cascade |
| WeeklyMealPlan | GroceryList | Cascade |
| GroceryList | GroceryListItem | Cascade |

The following tables are application reference data and shall not be automatically deleted through relationships:

- Recipe
- Ingredient

---

# 3.10 Acceptance Criteria

This section is complete when:

- All approved entity relationships are defined.
- All foreign key relationships are documented.
- Referential integrity rules are specified.
- Cascade delete behavior is defined.
- No relationships exist outside the approved MVP data model.

---

## End of Section 3

# DATABASE_SCHEMA.md

# 4. Constraints and Indexes

---

# 4.1 Purpose

This section defines the database constraints and indexes required to maintain data integrity and support efficient data retrieval.

These constraints are derived directly from the approved Product Blueprint and Data Model.

---

# 4.2 Primary Key Constraints

Every table shall have a primary key named:

```
id
```

Type:

```
UUID
```

Primary keys shall be unique and immutable.

---

# 4.3 Foreign Key Constraints

The database shall enforce the following foreign key relationships.

| Child Table | Foreign Key | Parent Table |
|--------------|-------------|--------------|
| Favorite | userId | User |
| Favorite | recipeId | Recipe |
| PantryItem | userId | User |
| PantryItem | ingredientId | Ingredient |
| RecipeIngredient | recipeId | Recipe |
| RecipeIngredient | ingredientId | Ingredient |
| WeeklyMealPlan | userId | User |
| WeeklyMeal | mealPlanId | WeeklyMealPlan |
| WeeklyMeal | recipeId | Recipe |
| GroceryList | userId | User |
| GroceryList | mealPlanId | WeeklyMealPlan |
| GroceryListItem | groceryListId | GroceryList |
| GroceryListItem | ingredientId | Ingredient |

---

# 4.4 Unique Constraints

The following combinations shall be unique.

## User

```
email
```

Purpose

Prevent duplicate user accounts.

---

## Favorite

```
(userId, recipeId)
```

Purpose

Prevent the same recipe from being favorited multiple times by the same user.

---

## PantryItem

```
(userId, ingredientId)
```

Purpose

Prevent duplicate pantry entries for the same ingredient.

---

## WeeklyMeal

```
(mealPlanId, dayOfWeek, mealType)
```

Purpose

Ensure only one meal exists for a given day and meal type within a meal plan.

---

# 4.5 NOT NULL Constraints

The following columns shall always contain values.

## User

- email
- passwordHash
- createdAt
- updatedAt

---

## Recipe

- name
- description
- category
- mealStyle
- estimatedCost
- prepTime
- cookTime
- servings
- difficulty
- imageUrl
- instructions
- createdAt
- updatedAt

---

## Ingredient

- name
- category
- estimatedCost
- createdAt
- updatedAt

---

## RecipeIngredient

- recipeId
- ingredientId
- quantity
- unit

---

## Favorite

- userId
- recipeId
- createdAt

---

## PantryItem

- userId
- ingredientId
- createdAt

---

## WeeklyMealPlan

- userId
- weeklyBudget
- familySize
- createdAt
- updatedAt

---

## WeeklyMeal

- mealPlanId
- dayOfWeek
- mealType
- recipeId

---

## GroceryList

- userId
- mealPlanId
- estimatedTotal
- createdAt
- updatedAt

---

## GroceryListItem

- groceryListId
- ingredientId
- quantity
- unit
- estimatedCost
- purchased

---

# 4.6 Check Constraints

The database shall enforce the following value constraints.

## Recipe

- estimatedCost ≥ 0
- prepTime ≥ 0
- cookTime ≥ 0
- servings > 0

---

## Ingredient

- estimatedCost ≥ 0

---

## RecipeIngredient

- quantity > 0

---

## WeeklyMealPlan

- weeklyBudget ≥ 0
- familySize > 0

---

## GroceryList

- estimatedTotal ≥ 0

---

## GroceryListItem

- quantity > 0
- estimatedCost ≥ 0

---

# 4.7 Default Values

The following default values shall be applied.

| Table | Column | Default Value |
|--------|--------|---------------|
| GroceryListItem | purchased | FALSE |
| All Tables (where applicable) | createdAt | Current UTC Timestamp |
| All Tables (where applicable) | updatedAt | Current UTC Timestamp |

---

# 4.8 Indexes

The following indexes should be created to support common application queries.

## User

```
email
```

---

## Recipe

```
name

category

mealStyle
```

---

## Ingredient

```
name

category
```

---

## Favorite

```
userId

recipeId
```

---

## PantryItem

```
userId

ingredientId
```

---

## WeeklyMealPlan

```
userId
```

---

## WeeklyMeal

```
mealPlanId

recipeId
```

---

## GroceryList

```
userId

mealPlanId
```

---

## GroceryListItem

```
groceryListId

ingredientId
```

---

# 4.9 Data Consistency Rules

The database shall ensure that:

- Every Recipe references valid ingredients through `RecipeIngredient`.
- Every Favorite references an existing Recipe and User.
- Every PantryItem references an existing Ingredient.
- Every WeeklyMeal references an existing WeeklyMealPlan and Recipe.
- Every GroceryList references an existing WeeklyMealPlan.
- Every GroceryListItem references an existing GroceryList and Ingredient.

Invalid references shall be rejected.

---

# 4.10 Acceptance Criteria

This section is complete when:

- Primary keys are defined.
- Foreign keys are documented.
- Unique constraints are specified.
- Required fields are identified.
- Check constraints are documented.
- Default values are defined.
- Indexes support the approved MVP queries.

---

## End of Section 4

# DATABASE_SCHEMA.md

# 5. Seed Data and Migration Guidelines

---

# 5.1 Purpose

This section defines the requirements for initializing and maintaining the database schema for Version 1.0.

It covers:

- Initial seed data
- Database migrations
- Versioning
- Data integrity during deployment

This section does not define application functionality.

---

# 5.2 Seed Data Overview

The database requires initial reference data before the application can function correctly.

Seed data consists only of application reference data.

User-generated data is **not** included in the seed process.

---

# 5.3 Recipe Seed Data

The Recipe table shall be populated with the application's curated recipe dataset.

Each seeded recipe shall contain all required fields defined in the schema.

Incomplete recipe records shall not be included.

---

# 5.4 Ingredient Seed Data

The Ingredient table shall be populated with the ingredients referenced by the recipe dataset.

Each ingredient shall exist only once within the database.

Recipes shall reference these ingredient records through the `RecipeIngredient` table.

---

# 5.5 RecipeIngredient Seed Data

The RecipeIngredient table shall define the relationship between recipes and ingredients.

Each record shall include:

- Recipe
- Ingredient
- Quantity
- Unit

Every seeded recipe shall have at least one associated RecipeIngredient record.

---

# 5.6 User Data

The following tables shall not receive seed data:

- User
- Favorite
- PantryItem
- WeeklyMealPlan
- WeeklyMeal
- GroceryList
- GroceryListItem

These tables are populated through normal application usage.

---

# 5.7 Migration Principles

Database schema changes shall be managed through version-controlled migrations.

Each migration shall:

- Be repeatable.
- Be deterministic.
- Be applied in sequence.
- Preserve existing data whenever possible.

---

# 5.8 Migration Order

The initial database creation should follow this order.

1. User
2. Recipe
3. Ingredient
4. RecipeIngredient
5. Favorite
6. PantryItem
7. WeeklyMealPlan
8. WeeklyMeal
9. GroceryList
10. GroceryListItem

This order ensures that foreign key dependencies are satisfied.

---

# 5.9 Migration Validation

After applying migrations, verify that:

- All tables exist.
- Primary keys are present.
- Foreign keys are valid.
- Unique constraints are enforced.
- Indexes have been created.
- Seed data has been successfully inserted into the reference tables.

---

# 5.10 Data Integrity Verification

Following migration and seeding, verify that:

- Every recipe references valid ingredients.
- Every ingredient referenced by a recipe exists.
- No orphaned records are present.
- All required fields contain valid values.

---

# 5.11 Schema Versioning

The database schema shall be maintained through sequential migration versions.

Each migration shall represent a single, traceable schema change.

The application and database schema versions should remain synchronized throughout development and deployment.

---

# 5.12 Rollback

If a migration fails during deployment:

- The migration shall not leave the database in a partially applied state.
- Previously applied migrations shall remain intact.
- Data integrity shall be preserved.

Rollback procedures shall restore the database to the last successfully applied migration.

---

# 5.13 Acceptance Criteria

This section is complete when:

- Seed data requirements are documented.
- Migration order is defined.
- Migration validation steps are specified.
- Data integrity verification steps are documented.
- Schema versioning expectations are established.

---

## End of Section 5

---

# End of DATABASE_SCHEMA.md

