# API_REFERENCE.md

# 1. Introduction

---

## 1.1 Purpose

This document provides the implementation reference for the REST API used by **Ma, Anong Ulam? Version 1.0**.

It expands upon the API Specification defined in the Product Blueprint by documenting the request and response contracts required for implementation.

This document defines:

- Endpoint URLs
- HTTP methods
- Request formats
- Response formats
- Validation requirements
- Authentication requirements
- Standard error responses

This document does **not** define application functionality.

---

## 1.2 Scope

The API supports only the approved MVP features:

- User Accounts
- Recipe Browser
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites

No additional endpoints shall be added unless the Product Blueprint is formally revised.

---

## 1.3 API Style

The API shall follow REST principles.

Characteristics:

- HTTPS only
- JSON request bodies
- JSON responses
- Stateless requests
- Resource-oriented endpoints
- Standard HTTP status codes

---

## 1.4 Base URL

The production base URL is deployment-specific.

Examples:

```
https://example.com/api
```

or

```
http://localhost:3000/api
```

The base URL is determined by the deployment environment.

---

## 1.5 Content Type

All requests containing a body shall use:

```
Content-Type: application/json
```

Responses shall also use JSON.

---

## 1.6 Authentication

Endpoints that access registered-user data require authentication.

Guest functionality does not require authentication.

Authentication behavior shall follow the implementation defined by the application.

---

## 1.7 Standard Response Format

### Success

```json
{
  "success": true,
  "data": {}
}
```

---

### Error

```json
{
  "success": false,
  "message": "Unable to complete the request."
}
```

The `message` field shall contain a user-friendly description of the error.

---

## 1.8 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 1.9 Error Handling Principles

The API shall:

- Return appropriate HTTP status codes.
- Return responses using the standard error format.
- Avoid exposing internal implementation details.
- Provide consistent error structures across all endpoints.

---

## 1.10 Validation Principles

Incoming requests shall be validated before processing.

Validation includes:

- Required fields
- Data types
- Missing values
- Invalid identifiers

Invalid requests shall return:

```
400 Bad Request
```

---

## 1.11 Endpoint Groups

The API consists of the following endpoint groups.

- Authentication
- Recipes
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites

No additional endpoint groups are included in Version 1.0.

---

## 1.12 Acceptance Criteria

This section is complete when:

- API purpose is documented.
- API standards are defined.
- Response formats are standardized.
- Authentication expectations are documented.
- Validation principles are specified.
- Endpoint groups are identified.

---

# End of Section 1

# API_REFERENCE.md

# 2. Authentication Endpoints

---

## 2.1 Overview

The Authentication API allows users to:

- Create an account
- Sign in
- Sign out

Authentication is optional.

Users may continue using the application as a Guest without creating an account.

Guest users do not require authenticated API access for locally stored data.

---

# 2.2 Register

## Endpoint

```
POST /api/auth/register
```

---

## Purpose

Creates a new registered user account.

---

## Authentication Required

No

---

## Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## Request Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| email | String | Yes | User email address |
| password | String | Yes | User password |

---

## Success Response

### HTTP Status

```
201 Created
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

---

## Validation Rules

The request shall be rejected if:

- `email` is missing.
- `password` is missing.
- An account already exists with the same email address.

Invalid requests return:

```
400 Bad Request
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 201 | Account created |
| 400 | Validation failed |
| 500 | Internal server error |

---

# 2.3 Sign In

## Endpoint

```
POST /api/auth/login
```

---

## Purpose

Authenticates an existing registered user.

---

## Authentication Required

No

---

## Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## Request Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| email | String | Yes | User email |
| password | String | Yes | User password |

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

---

## Validation Rules

The request shall be rejected if:

- The account does not exist.
- The password is incorrect.
- Required fields are missing.

Authentication failures return:

```
401 Unauthorized
```

Validation failures return:

```
400 Bad Request
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Sign in successful |
| 400 | Validation failed |
| 401 | Invalid credentials |
| 500 | Internal server error |

---

# 2.4 Sign Out

## Endpoint

```
POST /api/auth/logout
```

---

## Purpose

Ends the current authenticated session.

---

## Authentication Required

Yes

---

## Request Body

None

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Sign out successful |
| 401 | Unauthorized |
| 500 | Internal server error |

---

# 2.5 Authentication Summary

| Endpoint | Method | Authentication Required |
|----------|--------|-------------------------|
| `/api/auth/register` | POST | No |
| `/api/auth/login` | POST | No |
| `/api/auth/logout` | POST | Yes |

---

# 2.6 Acceptance Criteria

This section is complete when:

- Users can create an account.
- Users can sign in.
- Users can sign out.
- Request and response formats are defined.
- Validation rules are documented.
- HTTP status codes are specified.
- No authentication features exist outside the approved MVP scope.

---

# End of Section 2

# API_REFERENCE.md

# 3. Recipe Endpoints

---

## 3.1 Overview

The Recipe API provides read-only access to the application's curated recipe catalog.

Recipes are application-managed data.

Version 1.0 does not allow users to create, edit, or delete recipes.

---

# 3.2 List Recipes

## Endpoint

```
GET /api/recipes
```

---

## Purpose

Returns the list of available recipes.

---

## Authentication Required

No

---

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| search | String | No | Recipe name search |
| category | String | No | Recipe category filter |

Both query parameters are optional.

If omitted, all recipes are returned.

---

## Example Request

```
GET /api/recipes
```

Example with filters

```
GET /api/recipes?search=adobo&category=Chicken
```

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Chicken Adobo",
      "category": "Chicken",
      "estimatedCost": 220,
      "prepTime": 15,
      "cookTime": 40,
      "difficulty": "Easy",
      "imageUrl": "/images/chicken-adobo.jpg"
    }
  ]
}
```

---

## Validation Rules

- Unknown query parameters shall be ignored.
- Empty search values shall return all recipes.
- Empty category values shall return all recipes.

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Recipes returned successfully |
| 500 | Internal server error |

---

# 3.3 Get Recipe Details

## Endpoint

```
GET /api/recipes/{recipeId}
```

---

## Purpose

Returns the complete details for a single recipe.

---

## Authentication Required

No

---

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| recipeId | UUID | Yes | Recipe identifier |

---

## Example Request

```
GET /api/recipes/550e8400-e29b-41d4-a716-446655440000
```

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Chicken Adobo",
    "description": "Classic Filipino chicken dish.",
    "category": "Chicken",
    "mealStyle": "Everyday",
    "estimatedCost": 220,
    "prepTime": 15,
    "cookTime": 40,
    "servings": 4,
    "difficulty": "Easy",
    "imageUrl": "/images/chicken-adobo.jpg",
    "instructions": "...",
    "ingredients": [
      {
        "name": "Chicken",
        "quantity": 1,
        "unit": "kg"
      }
    ]
  }
}
```

---

## Validation Rules

The request shall be rejected if:

- `recipeId` is missing.
- `recipeId` does not exist.

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Recipe returned successfully |
| 404 | Recipe not found |
| 500 | Internal server error |

---

# 3.4 Recipe Response Fields

## Recipe Summary

Used by:

- Recipe Browser
- Search Results
- Category Results
- Recommendation Results
- Favorites

| Field | Type |
|--------|------|
| id | UUID |
| name | String |
| category | String |
| estimatedCost | Number |
| prepTime | Integer |
| cookTime | Integer |
| difficulty | String |
| imageUrl | String |

---

## Recipe Detail

Used by:

- Recipe Detail Page

| Field | Type |
|--------|------|
| id | UUID |
| name | String |
| description | String |
| category | String |
| mealStyle | String |
| estimatedCost | Number |
| prepTime | Integer |
| cookTime | Integer |
| servings | Integer |
| difficulty | String |
| imageUrl | String |
| instructions | String |
| ingredients | Array |

---

# 3.5 Endpoint Summary

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/recipes` | GET | No |
| `/api/recipes/{recipeId}` | GET | No |

---

# 3.6 Acceptance Criteria

This section is complete when:

- Recipes can be listed.
- Recipes can be searched by name.
- Recipes can be filtered by category.
- Recipe details can be retrieved.
- Request and response formats are documented.
- Validation rules are specified.
- No recipe management endpoints exist beyond the approved MVP.

---

# End of Section 3

# API_REFERENCE.md

# 4. Kahit Ano Endpoints

---

## 4.1 Overview

The Kahit Ano API generates recipe recommendations using the rule-based recommendation engine defined in the Product Blueprint.

Recommendations are generated based only on the user inputs specified by the MVP.

No artificial intelligence or machine learning is used.

---

# 4.2 Generate Recommendations

## Endpoint

```
POST /api/kahit-ano
```

---

## Purpose

Returns recipe recommendations based on the user's selected preferences.

---

## Authentication Required

No

---

## Request Body

```json
{
  "budget": 500,
  "familySize": 4,
  "mealStyle": "Everyday"
}
```

---

## Request Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| budget | Number | Yes | Maximum available budget |
| familySize | Integer | Yes | Number of people to serve |
| mealStyle | String | Yes | Selected meal style |

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Chicken Adobo",
      "category": "Chicken",
      "estimatedCost": 220,
      "prepTime": 15,
      "cookTime": 40,
      "difficulty": "Easy",
      "imageUrl": "/images/chicken-adobo.jpg"
    },
    {
      "id": "uuid",
      "name": "Ginisang Monggo",
      "category": "Vegetable",
      "estimatedCost": 180,
      "prepTime": 10,
      "cookTime": 30,
      "difficulty": "Easy",
      "imageUrl": "/images/ginisang-monggo.jpg"
    },
    {
      "id": "uuid",
      "name": "Pork Menudo",
      "category": "Pork",
      "estimatedCost": 300,
      "prepTime": 20,
      "cookTime": 45,
      "difficulty": "Medium",
      "imageUrl": "/images/pork-menudo.jpg"
    }
  ]
}
```

---

## Response Rules

The endpoint shall return:

- A minimum of three recipes.
- A maximum of five recipes.
- Only recipes that satisfy the approved recommendation rules.

The order of results is determined by the application's recommendation logic.

---

## Validation Rules

The request shall be rejected if:

- `budget` is missing.
- `familySize` is missing.
- `mealStyle` is missing.
- `budget` is less than zero.
- `familySize` is less than one.

Invalid requests return:

```
400 Bad Request
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Recommendations generated successfully |
| 400 | Validation failed |
| 500 | Internal server error |

---

# 4.3 Recommendation Result Object

Each recommendation shall include:

| Field | Type |
|--------|------|
| id | UUID |
| name | String |
| category | String |
| estimatedCost | Number |
| prepTime | Integer |
| cookTime | Integer |
| difficulty | String |
| imageUrl | String |

The recommendation object uses the same recipe summary structure defined in Section 3.

---

# 4.4 Endpoint Summary

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/kahit-ano` | POST | No |

---

# 4.5 Acceptance Criteria

This section is complete when:

- Recommendations can be generated from the approved input fields.
- Request and response formats are documented.
- Validation rules are defined.
- Recommendation results use the standard recipe summary structure.
- No AI, personalization, or additional recommendation capabilities exist beyond the approved MVP.

---

# End of Section 4

# API_REFERENCE.md

# 5. Pantry Endpoints

---

## 5.1 Overview

The Pantry API allows users to manage their pantry ingredients and generate recipe recommendations based on those ingredients.

For guest users, pantry data is stored locally in the browser.

For registered users, pantry data is stored in the application's database.

---

# 5.2 Get Pantry

## Endpoint

```
GET /api/pantry
```

---

## Purpose

Returns the authenticated user's pantry ingredients.

---

## Authentication Required

Yes

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "ingredientId": "uuid",
      "name": "Chicken"
    },
    {
      "id": "uuid",
      "ingredientId": "uuid",
      "name": "Soy Sauce"
    }
  ]
}
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Pantry returned successfully |
| 401 | Unauthorized |
| 500 | Internal server error |

---

# 5.3 Add Pantry Ingredient

## Endpoint

```
POST /api/pantry
```

---

## Purpose

Adds an ingredient to the authenticated user's pantry.

---

## Authentication Required

Yes

---

## Request Body

```json
{
  "ingredientId": "uuid"
}
```

---

## Request Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| ingredientId | UUID | Yes | Ingredient identifier |

---

## Success Response

### HTTP Status

```
201 Created
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "ingredientId": "uuid"
  }
}
```

---

## Validation Rules

The request shall be rejected if:

- `ingredientId` is missing.
- `ingredientId` does not exist.
- The ingredient already exists in the user's pantry.

Invalid requests return:

```
400 Bad Request
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 201 | Ingredient added |
| 400 | Validation failed |
| 401 | Unauthorized |
| 500 | Internal server error |

---

# 5.4 Remove Pantry Ingredient

## Endpoint

```
DELETE /api/pantry/{pantryItemId}
```

---

## Purpose

Removes an ingredient from the authenticated user's pantry.

---

## Authentication Required

Yes

---

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| pantryItemId | UUID | Yes | Pantry item identifier |

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Validation Rules

The request shall be rejected if:

- `pantryItemId` does not exist.
- The pantry item does not belong to the authenticated user.

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Ingredient removed |
| 401 | Unauthorized |
| 404 | Pantry item not found |
| 500 | Internal server error |

---

# 5.5 Generate Pantry Recommendations

## Endpoint

```
POST /api/pantry/recommendations
```

---

## Purpose

Returns recipe recommendations based on the ingredients currently stored in the authenticated user's pantry.

---

## Authentication Required

Yes

---

## Request Body

None

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Chicken Adobo",
      "category": "Chicken",
      "estimatedCost": 220,
      "prepTime": 15,
      "cookTime": 40,
      "difficulty": "Easy",
      "imageUrl": "/images/chicken-adobo.jpg"
    }
  ]
}
```

---

## Response Rules

The endpoint shall return only recipes that satisfy the pantry recommendation rules defined in the Product Blueprint.

The response uses the standard recipe summary structure.

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Recommendations generated successfully |
| 401 | Unauthorized |
| 500 | Internal server error |

---

# 5.6 Pantry Object

| Field | Type |
|--------|------|
| id | UUID |
| ingredientId | UUID |
| name | String |

---

# 5.7 Endpoint Summary

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/pantry` | GET | Yes |
| `/api/pantry` | POST | Yes |
| `/api/pantry/{pantryItemId}` | DELETE | Yes |
| `/api/pantry/recommendations` | POST | Yes |

---

# 5.8 Acceptance Criteria

This section is complete when:

- Pantry ingredients can be retrieved.
- Pantry ingredients can be added.
- Pantry ingredients can be removed.
- Pantry-based recommendations can be generated.
- Request and response formats are documented.
- Validation rules are specified.
- No pantry functionality exists beyond the approved MVP.

---

# End of Section 5

# API_REFERENCE.md

# 6. Weekly Planner Endpoints

---

## 6.1 Overview

The Weekly Planner API allows registered users to:

- Generate a weekly meal plan
- Retrieve a saved meal plan
- Replace an individual meal
- Save a generated meal plan

A weekly meal plan consists of:

- Lunch
- Dinner

for each day of the week.

---

# 6.2 Generate Weekly Meal Plan

## Endpoint

```
POST /api/weekly-planner/generate
```

---

## Purpose

Generates a weekly meal plan based on the user's selected inputs.

---

## Authentication Required

Yes

---

## Request Body

```json
{
  "weeklyBudget": 2500,
  "familySize": 4
}
```

---

## Request Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| weeklyBudget | Number | Yes | Weekly food budget |
| familySize | Integer | Yes | Number of people to serve |

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": {
    "mealPlanId": "uuid",
    "days": [
      {
        "day": "Monday",
        "lunch": {
          "recipeId": "uuid",
          "name": "Chicken Adobo"
        },
        "dinner": {
          "recipeId": "uuid",
          "name": "Ginisang Monggo"
        }
      }
    ]
  }
}
```

---

## Validation Rules

The request shall be rejected if:

- `weeklyBudget` is missing.
- `familySize` is missing.
- `weeklyBudget` is less than zero.
- `familySize` is less than one.

Invalid requests return:

```
400 Bad Request
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Meal plan generated |
| 400 | Validation failed |
| 401 | Unauthorized |
| 500 | Internal server error |

---

# 6.3 Get Weekly Meal Plan

## Endpoint

```
GET /api/weekly-planner/{mealPlanId}
```

---

## Purpose

Returns a previously saved weekly meal plan.

---

## Authentication Required

Yes

---

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| mealPlanId | UUID | Yes | Weekly meal plan identifier |

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": {
    "mealPlanId": "uuid",
    "weeklyBudget": 2500,
    "familySize": 4,
    "days": [
      {
        "day": "Monday",
        "lunch": {
          "recipeId": "uuid",
          "name": "Chicken Adobo"
        },
        "dinner": {
          "recipeId": "uuid",
          "name": "Ginisang Monggo"
        }
      }
    ]
  }
}
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Meal plan returned |
| 401 | Unauthorized |
| 404 | Meal plan not found |
| 500 | Internal server error |

---

# 6.4 Replace Meal

## Endpoint

```
PUT /api/weekly-planner/{mealPlanId}/meals
```

---

## Purpose

Replaces a single meal within an existing weekly meal plan.

---

## Authentication Required

Yes

---

## Request Body

```json
{
  "day": "Monday",
  "mealType": "Lunch",
  "recipeId": "uuid"
}
```

---

## Request Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| day | String | Yes | Day of the week |
| mealType | String | Yes | Lunch or Dinner |
| recipeId | UUID | Yes | Replacement recipe |

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Validation Rules

The request shall be rejected if:

- `day` is invalid.
- `mealType` is invalid.
- `recipeId` does not exist.
- `mealPlanId` does not exist.

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Meal replaced |
| 400 | Validation failed |
| 401 | Unauthorized |
| 404 | Meal plan not found |
| 500 | Internal server error |

---

# 6.5 Save Weekly Meal Plan

## Endpoint

```
POST /api/weekly-planner/{mealPlanId}/save
```

---

## Purpose

Persists a generated weekly meal plan.

---

## Authentication Required

Yes

---

## Request Body

None

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": {
    "mealPlanId": "uuid"
  }
}
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Meal plan saved |
| 401 | Unauthorized |
| 404 | Meal plan not found |
| 500 | Internal server error |

---

# 6.6 Weekly Meal Plan Object

| Field | Type |
|--------|------|
| mealPlanId | UUID |
| weeklyBudget | Number |
| familySize | Integer |
| days | Array |

Each day contains:

- Day
- Lunch recipe
- Dinner recipe

---

# 6.7 Endpoint Summary

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/weekly-planner/generate` | POST | Yes |
| `/api/weekly-planner/{mealPlanId}` | GET | Yes |
| `/api/weekly-planner/{mealPlanId}/meals` | PUT | Yes |
| `/api/weekly-planner/{mealPlanId}/save` | POST | Yes |

---

# 6.8 Acceptance Criteria

This section is complete when:

- Weekly meal plans can be generated.
- Saved meal plans can be retrieved.
- Individual meals can be replaced.
- Meal plans can be saved.
- Request and response formats are documented.
- Validation rules are specified.
- No planner functionality exists beyond the approved MVP.

---

# End of Section 6

# API_REFERENCE.md

# 7. Grocery List Endpoints

---

## 7.1 Overview

The Grocery List API allows registered users to:

- Generate a grocery list from a weekly meal plan
- Retrieve a saved grocery list
- Update the purchased status of grocery list items

A grocery list is generated from an existing weekly meal plan and contains the combined ingredients required for that plan.

---

# 7.2 Generate Grocery List

## Endpoint

```
POST /api/grocery-lists/generate
```

---

## Purpose

Generates a grocery list from an existing weekly meal plan.

---

## Authentication Required

Yes

---

## Request Body

```json
{
  "mealPlanId": "uuid"
}
```

---

## Request Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| mealPlanId | UUID | Yes | Weekly meal plan identifier |

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": {
    "groceryListId": "uuid",
    "estimatedTotal": 1450,
    "items": [
      {
        "id": "uuid",
        "ingredientId": "uuid",
        "name": "Chicken",
        "quantity": 2,
        "unit": "kg",
        "estimatedCost": 520,
        "purchased": false
      }
    ]
  }
}
```

---

## Validation Rules

The request shall be rejected if:

- `mealPlanId` is missing.
- `mealPlanId` does not exist.

Invalid requests return:

```
400 Bad Request
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Grocery list generated |
| 400 | Validation failed |
| 401 | Unauthorized |
| 404 | Meal plan not found |
| 500 | Internal server error |

---

# 7.3 Get Grocery List

## Endpoint

```
GET /api/grocery-lists/{groceryListId}
```

---

## Purpose

Returns a previously generated grocery list.

---

## Authentication Required

Yes

---

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| groceryListId | UUID | Yes | Grocery list identifier |

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": {
    "groceryListId": "uuid",
    "estimatedTotal": 1450,
    "items": [
      {
        "id": "uuid",
        "ingredientId": "uuid",
        "name": "Chicken",
        "quantity": 2,
        "unit": "kg",
        "estimatedCost": 520,
        "purchased": false
      }
    ]
  }
}
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Grocery list returned |
| 401 | Unauthorized |
| 404 | Grocery list not found |
| 500 | Internal server error |

---

# 7.4 Update Purchased Status

## Endpoint

```
PUT /api/grocery-lists/{groceryListId}/items/{itemId}
```

---

## Purpose

Updates the purchased status of a grocery list item.

---

## Authentication Required

Yes

---

## Request Body

```json
{
  "purchased": true
}
```

---

## Request Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| purchased | Boolean | Yes | Purchase status |

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Validation Rules

The request shall be rejected if:

- `groceryListId` does not exist.
- `itemId` does not exist.
- `purchased` is missing.

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Purchase status updated |
| 400 | Validation failed |
| 401 | Unauthorized |
| 404 | Grocery list or item not found |
| 500 | Internal server error |

---

# 7.5 Grocery List Object

| Field | Type |
|--------|------|
| groceryListId | UUID |
| estimatedTotal | Number |
| items | Array |

Each grocery list item contains:

| Field | Type |
|--------|------|
| id | UUID |
| ingredientId | UUID |
| name | String |
| quantity | Number |
| unit | String |
| estimatedCost | Number |
| purchased | Boolean |

---

# 7.6 Endpoint Summary

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/grocery-lists/generate` | POST | Yes |
| `/api/grocery-lists/{groceryListId}` | GET | Yes |
| `/api/grocery-lists/{groceryListId}/items/{itemId}` | PUT | Yes |

---

# 7.7 Acceptance Criteria

This section is complete when:

- Grocery lists can be generated from weekly meal plans.
- Saved grocery lists can be retrieved.
- Purchased status can be updated.
- Request and response formats are documented.
- Validation rules are specified.
- No grocery functionality exists beyond the approved MVP.

---

# End of Section 7

# API_REFERENCE.md

# 8. Favorites Endpoints

---

## 8.1 Overview

The Favorites API allows registered users to:

- View saved favorite recipes
- Add a recipe to favorites
- Remove a recipe from favorites

Favorites are private to the authenticated user.

---

# 8.2 Get Favorites

## Endpoint

```
GET /api/favorites
```

---

## Purpose

Returns all recipes saved by the authenticated user.

---

## Authentication Required

Yes

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "recipeId": "uuid",
      "name": "Chicken Adobo",
      "category": "Chicken",
      "estimatedCost": 220,
      "prepTime": 15,
      "cookTime": 40,
      "difficulty": "Easy",
      "imageUrl": "/images/chicken-adobo.jpg"
    }
  ]
}
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Favorites returned successfully |
| 401 | Unauthorized |
| 500 | Internal server error |

---

# 8.3 Add Favorite

## Endpoint

```
POST /api/favorites
```

---

## Purpose

Adds a recipe to the authenticated user's favorites.

---

## Authentication Required

Yes

---

## Request Body

```json
{
  "recipeId": "uuid"
}
```

---

## Request Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| recipeId | UUID | Yes | Recipe identifier |

---

## Success Response

### HTTP Status

```
201 Created
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "recipeId": "uuid"
  }
}
```

---

## Validation Rules

The request shall be rejected if:

- `recipeId` is missing.
- `recipeId` does not exist.
- The recipe is already in the authenticated user's favorites.

Invalid requests return:

```
400 Bad Request
```

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 201 | Favorite added |
| 400 | Validation failed |
| 401 | Unauthorized |
| 404 | Recipe not found |
| 500 | Internal server error |

---

# 8.4 Remove Favorite

## Endpoint

```
DELETE /api/favorites/{favoriteId}
```

---

## Purpose

Removes a recipe from the authenticated user's favorites.

---

## Authentication Required

Yes

---

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| favoriteId | UUID | Yes | Favorite record identifier |

---

## Success Response

### HTTP Status

```
200 OK
```

### Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Validation Rules

The request shall be rejected if:

- `favoriteId` does not exist.
- The favorite does not belong to the authenticated user.

---

## Possible Responses

| Status | Description |
|---------|-------------|
| 200 | Favorite removed |
| 401 | Unauthorized |
| 404 | Favorite not found |
| 500 | Internal server error |

---

# 8.5 Favorite Object

| Field | Type |
|--------|------|
| id | UUID |
| recipeId | UUID |
| name | String |
| category | String |
| estimatedCost | Number |
| prepTime | Integer |
| cookTime | Integer |
| difficulty | String |
| imageUrl | String |

The Favorite object uses the standard Recipe Summary structure defined in Section 3.

---

# 8.6 Endpoint Summary

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/favorites` | GET | Yes |
| `/api/favorites` | POST | Yes |
| `/api/favorites/{favoriteId}` | DELETE | Yes |

---

# 8.7 Acceptance Criteria

This section is complete when:

- Favorites can be retrieved.
- Recipes can be added to favorites.
- Recipes can be removed from favorites.
- Request and response formats are documented.
- Validation rules are specified.
- No favorite functionality exists beyond the approved MVP.

---

# End of Section 8

# API_REFERENCE.md

# 9. Standard Error Responses

---

## 9.1 Purpose

This section defines the standard error response format used throughout the Version 1.0 API.

Every endpoint shall return errors using a consistent JSON structure.

This improves predictability for both frontend and backend implementations.

---

# 9.2 Standard Error Response

All API errors shall use the following format.

```json
{
  "success": false,
  "message": "A user-friendly error message."
}
```

---

## Response Fields

| Field | Type | Description |
|--------|------|-------------|
| success | Boolean | Always `false` for error responses |
| message | String | User-friendly description of the error |

---

# 9.3 Validation Error

Validation failures occur when a request does not satisfy the documented input requirements.

### HTTP Status

```
400 Bad Request
```

### Example

```json
{
  "success": false,
  "message": "Invalid request."
}
```

---

# 9.4 Authentication Error

Authentication failures occur when a protected endpoint is accessed without a valid authenticated session.

### HTTP Status

```
401 Unauthorized
```

### Example

```json
{
  "success": false,
  "message": "Authentication required."
}
```

---

# 9.5 Resource Not Found

Returned when the requested resource does not exist.

Examples include:

- Recipe
- Favorite
- Pantry Item
- Weekly Meal Plan
- Grocery List

### HTTP Status

```
404 Not Found
```

### Example

```json
{
  "success": false,
  "message": "Resource not found."
}
```

---

# 9.6 Internal Server Error

Returned when an unexpected server error occurs.

Internal implementation details shall not be exposed.

### HTTP Status

```
500 Internal Server Error
```

### Example

```json
{
  "success": false,
  "message": "Unable to complete the request."
}
```

---

# 9.7 Error Response Principles

All API endpoints shall:

- Return JSON responses.
- Use the standard error structure.
- Return the appropriate HTTP status code.
- Provide clear, user-friendly messages.
- Avoid exposing internal implementation details.

---

# 9.8 Error Message Guidelines

Error messages should:

- Be concise.
- Be understandable to end users.
- Avoid technical implementation details.
- Remain consistent across all endpoints.

Examples:

- "Invalid request."
- "Authentication required."
- "Resource not found."
- "Unable to complete the request."

---

# 9.9 Acceptance Criteria

This section is complete when:

- A single error response format is defined.
- Standard error responses are documented.
- Error handling principles are established.
- Error message guidelines are documented.
- All API endpoints can use the same error response structure.

---

# End of Section 9

# API_REFERENCE.md

# 10. HTTP Status Codes

---

## 10.1 Purpose

This section defines the HTTP status codes used by the Version 1.0 API.

All endpoints shall use these status codes consistently.

No additional HTTP status codes are required for the approved MVP.

---

# 10.2 Success Status Codes

## 200 OK

### Purpose

Returned when a request completes successfully.

### Used By

- Retrieve Recipes
- Retrieve Recipe Details
- Generate Kahit Ano Recommendations
- Retrieve Pantry
- Remove Pantry Ingredient
- Generate Pantry Recommendations
- Generate Weekly Meal Plan
- Retrieve Weekly Meal Plan
- Replace Weekly Meal
- Save Weekly Meal Plan
- Generate Grocery List
- Retrieve Grocery List
- Update Purchased Status
- Retrieve Favorites
- Remove Favorite
- Sign In
- Sign Out

---

## Example

```http
HTTP/1.1 200 OK
```

---

## 201 Created

### Purpose

Returned when a new resource is successfully created.

### Used By

- Register User
- Add Pantry Ingredient
- Add Favorite

---

## Example

```http
HTTP/1.1 201 Created
```

---

# 10.3 Client Error Status Codes

## 400 Bad Request

### Purpose

Returned when the request is invalid.

Examples include:

- Missing required fields
- Invalid field values
- Duplicate resource where uniqueness is required

---

## Example

```http
HTTP/1.1 400 Bad Request
```

---

## 401 Unauthorized

### Purpose

Returned when authentication is required or the authenticated session is not valid.

Protected endpoints shall return this status when access is denied.

---

## Example

```http
HTTP/1.1 401 Unauthorized
```

---

## 404 Not Found

### Purpose

Returned when the requested resource cannot be found.

Examples include:

- Recipe does not exist
- Favorite does not exist
- Pantry item does not exist
- Weekly meal plan does not exist
- Grocery list does not exist

---

## Example

```http
HTTP/1.1 404 Not Found
```

---

# 10.4 Server Error Status Codes

## 500 Internal Server Error

### Purpose

Returned when an unexpected server error prevents the request from being completed.

The response shall not expose implementation details.

---

## Example

```http
HTTP/1.1 500 Internal Server Error
```

---

# 10.5 Status Code Usage Summary

| Status Code | Meaning | Typical Usage |
|--------------|---------|---------------|
| 200 | OK | Successful request |
| 201 | Created | Resource successfully created |
| 400 | Bad Request | Validation or request error |
| 401 | Unauthorized | Authentication required or invalid |
| 404 | Not Found | Requested resource does not exist |
| 500 | Internal Server Error | Unexpected server error |

---

# 10.6 Consistency Rules

All API endpoints shall:

- Return the appropriate HTTP status code.
- Use the standard success response format for successful requests.
- Use the standard error response format for failed requests.
- Apply status codes consistently across all endpoint groups.

---

# 10.7 Acceptance Criteria

This section is complete when:

- All HTTP status codes used by the MVP are documented.
- Each status code has a defined purpose.
- Status code usage is consistent across all endpoints.
- No undocumented status codes are required by the approved MVP.

---

# End of Section 10

# API_REFERENCE.md

# 11. Validation Rules

---

## 11.1 Purpose

This section defines the common validation rules applied across all Version 1.0 API endpoints.

These rules ensure that incoming requests conform to the approved data model and API specification.

Validation shall occur before any business logic is executed.

---

# 11.2 General Validation Principles

All API endpoints shall validate:

- Required fields
- Data types
- Resource identifiers
- Numeric values
- Request body format

Requests that fail validation shall return:

```
400 Bad Request
```

using the standard error response format.

---

# 11.3 Required Field Validation

Fields marked as **Required** in this document must be present in the request.

If a required field is omitted, the request shall be rejected.

### Example

Invalid request:

```json
{
  "familySize": 4
}
```

Response:

```json
{
  "success": false,
  "message": "Invalid request."
}
```

---

# 11.4 Data Type Validation

Request fields shall match their documented data types.

Examples:

| Expected Type | Example |
|---------------|---------|
| String | `"Chicken"` |
| Number | `2500` |
| Integer | `4` |
| Boolean | `true` |
| UUID | `"550e8400-e29b-41d4-a716-446655440000"` |

Requests containing incorrect data types shall be rejected.

---

# 11.5 UUID Validation

All path parameters and request fields documented as UUIDs shall:

- Be present when required.
- Follow the UUID format.
- Refer to an existing resource when applicable.

Invalid or malformed UUID values shall result in:

```
400 Bad Request
```

If the UUID is valid but no matching resource exists, the API shall return:

```
404 Not Found
```

---

# 11.6 Numeric Value Validation

Numeric fields shall satisfy the constraints defined in the Product Blueprint and Database Schema.

Examples include:

| Field | Rule |
|-------|------|
| budget | Greater than or equal to 0 |
| weeklyBudget | Greater than or equal to 0 |
| familySize | Greater than 0 |

Requests containing values outside these ranges shall be rejected.

---

# 11.7 Enumeration Validation

Fields with predefined values shall accept only the documented values.

Examples include:

| Field | Allowed Values |
|-------|----------------|
| mealType | `Lunch`, `Dinner` |

Requests containing unsupported values shall be rejected.

---

# 11.8 JSON Format Validation

Endpoints expecting a request body shall receive valid JSON.

Malformed JSON requests shall be rejected before processing.

Example:

```http
400 Bad Request
```

---

# 11.9 Unknown Fields

Additional fields not defined for an endpoint shall be ignored.

They shall not alter application behavior.

---

# 11.10 Validation Response

Validation failures shall use the standard error response.

Example:

```json
{
  "success": false,
  "message": "Invalid request."
}
```

---

# 11.11 Validation Consistency

Validation behavior shall be consistent across all endpoint groups:

- Authentication
- Recipes
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites

---

# 11.12 Acceptance Criteria

This section is complete when:

- Common validation rules are documented.
- Required field validation is defined.
- Data type validation is specified.
- UUID validation is documented.
- Numeric validation is documented.
- Enumeration validation is documented.
- JSON validation is documented.
- Validation responses are standardized.
- No validation rules extend beyond the approved MVP.

---

# End of Section 11

# API_REFERENCE.md

# 12. API Examples

---

## 12.1 Purpose

This section provides example API requests and responses for the endpoints documented in this reference.

The examples are intended to assist implementation and testing.

They do not introduce additional functionality beyond the approved MVP.

---

# 12.2 Register User

## Request

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## Response

```http
HTTP/1.1 201 Created
```

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com"
  }
}
```

---

# 12.3 Retrieve Recipes

## Request

```http
GET /api/recipes
```

---

## Response

```http
HTTP/1.1 200 OK
```

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "name": "Chicken Adobo",
      "category": "Chicken",
      "estimatedCost": 220,
      "prepTime": 15,
      "cookTime": 40,
      "difficulty": "Easy",
      "imageUrl": "/images/chicken-adobo.jpg"
    }
  ]
}
```

---

# 12.4 Generate Kahit Ano Recommendations

## Request

```http
POST /api/kahit-ano
Content-Type: application/json
```

```json
{
  "budget": 500,
  "familySize": 4,
  "mealStyle": "Everyday"
}
```

---

## Response

```http
HTTP/1.1 200 OK
```

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440011",
      "name": "Chicken Adobo",
      "category": "Chicken",
      "estimatedCost": 220,
      "prepTime": 15,
      "cookTime": 40,
      "difficulty": "Easy",
      "imageUrl": "/images/chicken-adobo.jpg"
    }
  ]
}
```

---

# 12.5 Add Pantry Ingredient

## Request

```http
POST /api/pantry
Content-Type: application/json
```

```json
{
  "ingredientId": "550e8400-e29b-41d4-a716-446655440020"
}
```

---

## Response

```http
HTTP/1.1 201 Created
```

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440021",
    "ingredientId": "550e8400-e29b-41d4-a716-446655440020"
  }
}
```

---

# 12.6 Generate Weekly Meal Plan

## Request

```http
POST /api/weekly-planner/generate
Content-Type: application/json
```

```json
{
  "weeklyBudget": 2500,
  "familySize": 4
}
```

---

## Response

```http
HTTP/1.1 200 OK
```

```json
{
  "success": true,
  "data": {
    "mealPlanId": "550e8400-e29b-41d4-a716-446655440030",
    "days": [
      {
        "day": "Monday",
        "lunch": {
          "recipeId": "550e8400-e29b-41d4-a716-446655440010",
          "name": "Chicken Adobo"
        },
        "dinner": {
          "recipeId": "550e8400-e29b-41d4-a716-446655440012",
          "name": "Ginisang Monggo"
        }
      }
    ]
  }
}
```

---

# 12.7 Generate Grocery List

## Request

```http
POST /api/grocery-lists/generate
Content-Type: application/json
```

```json
{
  "mealPlanId": "550e8400-e29b-41d4-a716-446655440030"
}
```

---

## Response

```http
HTTP/1.1 200 OK
```

```json
{
  "success": true,
  "data": {
    "groceryListId": "550e8400-e29b-41d4-a716-446655440040",
    "estimatedTotal": 1450,
    "items": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440041",
        "ingredientId": "550e8400-e29b-41d4-a716-446655440020",
        "name": "Chicken",
        "quantity": 2,
        "unit": "kg",
        "estimatedCost": 520,
        "purchased": false
      }
    ]
  }
}
```

---

# 12.8 Add Favorite

## Request

```http
POST /api/favorites
Content-Type: application/json
```

```json
{
  "recipeId": "550e8400-e29b-41d4-a716-446655440010"
}
```

---

## Response

```http
HTTP/1.1 201 Created
```

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440050",
    "recipeId": "550e8400-e29b-41d4-a716-446655440010"
  }
}
```

---

# 12.9 Example Error Response

## Response

```http
HTTP/1.1 400 Bad Request
```

```json
{
  "success": false,
  "message": "Invalid request."
}
```

---

# 12.10 Acceptance Criteria

This section is complete when:

- Example requests are provided for each endpoint group.
- Example responses follow the documented response formats.
- Success and error responses are demonstrated.
- No examples introduce additional endpoints or functionality beyond the approved MVP.

---

# End of Section 12

---

# End of API_REFERENCE.md

