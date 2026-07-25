# FRONTEND_SPEC.md

# 1. Introduction

---

## 1.1 Purpose

This document defines the frontend implementation specification for **Ma, Anong Ulam? Version 1.0**.

It translates the approved Product Blueprint into an implementation-ready user interface specification.

This document defines:

- Application layout
- Navigation
- Screen structure
- Shared UI components
- Responsive behavior
- User interaction behavior
- Loading states
- Empty states
- Error states

This document does **not** define new product functionality.

---

## 1.2 Scope

This specification covers only the approved MVP features:

- User Authentication
- Recipe Browser
- Recipe Detail
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites

No additional screens or workflows shall be introduced unless the Product Blueprint is formally revised.

---

## 1.3 Frontend Technology

The frontend shall be implemented using the approved technology stack.

- Next.js
- React
- TypeScript
- Tailwind CSS

The implementation shall follow the architecture defined in `CLAUDE.md`.

---

## 1.4 Design Principles

The user interface shall follow these principles.

### Simple

The interface should require minimal learning.

---

### Familiar

Navigation and interaction patterns should be consistent throughout the application.

---

### Responsive

The interface shall function correctly on:

- Mobile
- Tablet
- Desktop

---

### Accessible

Interactive elements shall be readable and usable using standard accessibility practices.

---

### Consistent

Spacing, typography, colors, buttons, cards, and forms shall follow a consistent design system across all screens.

---

## 1.5 Design Philosophy

Version 1.0 emphasizes usability over visual complexity.

The interface should feel:

- Clean
- Modern
- Friendly
- Fast
- Easy to understand

Decorative elements should not interfere with usability.

---

## 1.6 Navigation Model

The application uses a straightforward navigation structure.

Primary navigation provides access to:

- Home
- Recipes
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites

Authentication pages are accessed only when required.

---

## 1.7 Screen Organization

Each screen described in this document shall include:

- Purpose
- Layout
- Components
- User interactions
- Loading state
- Empty state
- Error state

This ensures consistent implementation across the application.

---

## 1.8 Responsive Design

All screens shall support:

### Mobile

Primary target device.

---

### Tablet

Layout adapts for medium-width displays.

---

### Desktop

Content expands appropriately while maintaining readability.

No functionality shall differ between device sizes.

---

## 1.9 Out of Scope

The following are outside the scope of Version 1.0:

- Additional screens
- Experimental layouts
- Alternate workflows
- Feature flags
- Theme customization
- UI personalization

---

## 1.10 Acceptance Criteria

This section is complete when:

- The purpose of the frontend specification is defined.
- The supported screens are identified.
- Design principles are documented.
- Navigation approach is defined.
- Responsive expectations are documented.
- The document remains aligned with the approved Product Blueprint.

---

# End of Section 1

# FRONTEND_SPEC.md

# 2. Design Principles

---

## 2.1 Purpose

This section defines the design principles that shall be applied consistently across the entire application.

These principles ensure that every approved screen follows the same visual language and interaction patterns.

---

# 2.2 Simplicity

The interface shall prioritize simplicity over visual complexity.

The user should be able to complete common tasks with minimal effort.

Screens shall avoid unnecessary visual elements that distract from the primary task.

---

# 2.3 Consistency

All screens shall follow a consistent design system.

This includes:

- Typography
- Colors
- Buttons
- Form controls
- Cards
- Icons
- Spacing
- Border radius
- Shadows

The same component should always appear and behave consistently throughout the application.

---

# 2.4 Readability

Content shall be easy to read on all supported devices.

Guidelines:

- Clear visual hierarchy
- Consistent spacing
- Adequate contrast
- Readable font sizes
- Logical grouping of related content

---

# 2.5 Predictability

User interactions shall behave consistently.

Examples:

- Buttons perform a single clear action.
- Navigation behaves the same on every screen.
- Forms validate input consistently.
- Loading indicators appear in the same manner throughout the application.

Users should not need to learn different interaction patterns for different screens.

---

# 2.6 Responsive Design

The application shall support:

- Mobile
- Tablet
- Desktop

Responsive behavior shall adjust layout only.

Application functionality shall remain identical across all device sizes.

---

# 2.7 Performance

The interface should feel responsive during normal use.

Implementation should minimize unnecessary loading delays and avoid blocking the user interface during routine interactions.

---

# 2.8 Accessibility

The frontend shall follow standard accessibility practices.

This includes:

- Clearly labeled form controls
- Keyboard-accessible interactive elements
- Sufficient color contrast
- Visible focus indicators
- Meaningful alternative text for images where applicable

---

# 2.9 Feedback

The application shall provide clear feedback for user actions.

Examples include:

- Loading indicators while requests are in progress
- Confirmation after successful actions
- Clear error messages when requests fail
- Empty state messaging when no data is available

Feedback shall be consistent across all screens.

---

# 2.10 Error Prevention

Where practical, the interface should help prevent invalid user input.

Examples include:

- Required field indicators
- Appropriate input types
- Disabled actions when required information is missing

Validation rules shall match those defined in the API Reference.

---

# 2.11 Visual Hierarchy

Each screen shall present information in a logical order.

Priority should generally be:

1. Page title
2. Primary action
3. Primary content
4. Secondary content
5. Supporting information

This hierarchy shall remain consistent across the application.

---

# 2.12 Acceptance Criteria

This section is complete when:

- Core design principles are documented.
- Interaction principles are defined.
- Responsive expectations are established.
- Accessibility expectations are documented.
- Feedback behavior is standardized.
- The design principles support the approved MVP without introducing new functionality.

---

# End of Section 2

# FRONTEND_SPEC.md

# 3. Application Layout

---

## 3.1 Purpose

This section defines the global application layout used throughout Version 1.0.

The layout provides a consistent structure for every screen while allowing each feature to display its own content.

---

# 3.2 Layout Structure

Every authenticated screen shall follow the same overall structure.

```
+------------------------------------------------------+
| Header                                               |
+------------------------------------------------------+
| Navigation                                            |
+------------------------------------------------------+
|                                                      |
| Main Content Area                                    |
|                                                      |
|                                                      |
+------------------------------------------------------+
```

The Main Content Area changes depending on the active screen.

The Header and Navigation remain consistent throughout the application.

---

# 3.3 Header

The Header is displayed on all application screens.

Its purpose is to:

- Display the application name or logo.
- Provide access to authentication actions when applicable.

The Header shall remain visually consistent across all screens.

---

# 3.4 Navigation

Primary navigation provides access to the approved application sections.

Navigation items are:

- Home
- Recipes
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites

Only these navigation destinations shall exist in Version 1.0.

---

# 3.5 Main Content Area

The Main Content Area displays the active screen.

Each approved feature occupies this area without altering the surrounding layout.

The content area shall:

- Expand to fill available space.
- Support scrolling when required.
- Maintain consistent spacing around page content.

---

# 3.6 Page Container

Each screen shall use a consistent content container.

The container shall:

- Center content on large displays.
- Maintain comfortable margins.
- Prevent excessively wide content.
- Preserve readability across device sizes.

---

# 3.7 Page Header

Each primary screen shall begin with a page header.

The page header includes:

- Page title
- Optional short description (when applicable)
- Primary page action, if one exists within the approved MVP

The page header layout shall remain consistent across all screens.

---

# 3.8 Content Spacing

Spacing shall remain consistent throughout the application.

Guidelines include:

- Consistent spacing between sections.
- Consistent spacing between cards.
- Consistent spacing between form controls.
- Consistent internal padding within components.

Spacing values shall follow the shared design system.

---

# 3.9 Cards

Content is grouped using cards where appropriate.

Cards shall provide:

- Clear visual separation
- Consistent padding
- Consistent border radius
- Consistent elevation or border treatment

Card styling shall remain uniform throughout the application.

---

# 3.10 Forms

Forms shall follow a consistent layout.

Each form should present:

- Field label
- Input control
- Validation message (when necessary)

Action buttons shall appear in a predictable location.

---

# 3.11 Lists

Lists used throughout the application shall follow a consistent presentation.

Examples include:

- Recipe lists
- Pantry ingredients
- Grocery list items
- Favorites

Each list item shall maintain consistent spacing and alignment.

---

# 3.12 Responsive Layout

The application layout shall adapt to different screen sizes.

### Mobile

- Single-column layout.
- Navigation optimized for smaller screens.
- Content stacked vertically.

---

### Tablet

- Increased content width.
- Additional spacing where appropriate.

---

### Desktop

- Wider content container.
- Efficient use of horizontal space.
- Consistent alignment with the overall design system.

Application functionality remains identical across all layouts.

---

# 3.13 Acceptance Criteria

This section is complete when:

- A consistent application layout is defined.
- Global page structure is documented.
- Header behavior is defined.
- Navigation placement is defined.
- Main content behavior is documented.
- Responsive layout expectations are established.
- No additional screens or layout features are introduced beyond the approved MVP.

---

# End of Section 3

# FRONTEND_SPEC.md

# 4. Navigation

---

## 4.1 Purpose

This section defines the navigation structure for Version 1.0.

Navigation provides users with consistent access to the approved application features.

The navigation structure shall remain identical across all authenticated screens.

---

# 4.2 Navigation Items

The primary navigation shall contain only the following destinations:

| Navigation Item | Destination |
|-----------------|-------------|
| Home | Home Screen |
| Recipes | Recipe Browser |
| Kahit Ano | Kahit Ano |
| Pantry | Pantry |
| Weekly Planner | Weekly Planner |
| Grocery List | Grocery List |
| Favorites | Favorites |

No additional navigation items shall be included in Version 1.0.

---

# 4.3 Navigation Behavior

Selecting a navigation item shall:

- Open the corresponding screen.
- Visually indicate the active destination.
- Preserve the application's global layout.

Navigation shall not trigger unexpected behavior or modify application state beyond changing the active screen.

---

# 4.4 Authentication Navigation

Authentication pages are accessed only when required.

Unauthenticated users may access public screens as defined in the Product Blueprint.

Protected features shall require authentication before access is granted.

If authentication is required, the user shall be directed to the Sign In screen.

---

# 4.5 Navigation State

The currently active navigation item shall be visually distinguishable.

Only one primary navigation item shall appear active at any time.

The active state shall remain synchronized with the current page.

---

# 4.6 Back Navigation

Navigation between application sections shall use the primary navigation.

Where supported by the browser, standard browser back and forward controls shall function normally.

The application shall not override default browser navigation behavior.

---

# 4.7 Navigation Consistency

The navigation structure shall remain identical throughout the application.

Navigation order, labels, and destinations shall not vary between screens.

This ensures a predictable user experience.

---

# 4.8 Responsive Navigation

### Mobile

Navigation shall be optimized for smaller screens while preserving access to all approved destinations.

---

### Tablet

Navigation shall remain fully accessible and appropriately sized.

---

### Desktop

Navigation shall remain consistently visible and aligned with the overall application layout.

Functionality shall remain identical across all supported screen sizes.

---

# 4.9 Navigation Labels

Navigation labels shall use the following names consistently throughout the application:

- Home
- Recipes
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites

These labels shall not vary between screens.

---

# 4.10 Acceptance Criteria

This section is complete when:

- All approved navigation destinations are documented.
- Navigation behavior is defined.
- Authentication-related navigation is documented.
- Active navigation behavior is specified.
- Responsive navigation expectations are documented.
- No additional navigation destinations or workflows are introduced beyond the approved MVP.

---

# End of Section 4

# FRONTEND_SPEC.md

# 5. Shared UI Components

---

## 5.1 Purpose

This section defines the reusable user interface components used throughout Version 1.0.

These components establish a consistent visual language across the application.

This section standardizes existing UI elements only.

It does not introduce additional functionality.

---

# 5.2 Primary Button

## Purpose

Represents the primary action available on a screen.

Examples include:

- Sign In
- Register
- Generate Meal Plan
- Generate Grocery List
- Save Meal Plan

---

## Behavior

The Primary Button shall:

- Display a clear action label.
- Be visually prominent.
- Support enabled and disabled states.
- Display a loading state while processing requests.

---

# 5.3 Secondary Button

## Purpose

Represents secondary actions.

Examples include:

- Cancel
- Back
- Replace Meal
- Remove Favorite

---

## Behavior

Secondary buttons shall remain visually distinct from Primary Buttons while following the same interaction patterns.

---

# 5.4 Text Input

## Purpose

Collects free-form text input.

Examples include:

- Email
- Password
- Recipe Search

---

## Behavior

Text inputs shall include:

- Label
- Placeholder (when applicable)
- Validation message (when applicable)

---

# 5.5 Number Input

## Purpose

Collects numeric values.

Examples include:

- Budget
- Weekly Budget
- Family Size

---

## Behavior

Number inputs shall:

- Accept numeric values only.
- Display validation messages when input is invalid.

---

# 5.6 Select Input

## Purpose

Allows users to choose a value from a predefined list.

Examples include:

- Meal Style
- Recipe Category

---

## Behavior

Only documented values shall be selectable.

---

# 5.7 Card

## Purpose

Displays grouped information.

Cards are used throughout the application for:

- Recipe summaries
- Grocery lists
- Weekly meals
- Favorites

---

## Behavior

Cards shall provide:

- Consistent padding
- Consistent spacing
- Consistent border treatment
- Consistent visual hierarchy

---

# 5.8 Recipe Card

## Purpose

Displays a summarized recipe.

---

## Content

Each Recipe Card shall display:

- Recipe image
- Recipe name
- Category
- Estimated cost
- Preparation time
- Cooking time
- Difficulty

Selecting a Recipe Card opens the Recipe Detail screen.

---

# 5.9 Form

## Purpose

Collects user input.

Forms shall present fields in a logical order.

Each form shall provide:

- Labels
- Input controls
- Validation feedback
- Submission action

---

# 5.10 Loading Indicator

## Purpose

Indicates that a request is in progress.

Loading indicators shall be displayed while awaiting API responses.

They shall disappear automatically after the request completes.

---

# 5.11 Empty State

## Purpose

Communicates that no data is available.

Examples include:

- No favorite recipes
- Empty pantry
- No grocery list
- No meal plans

Empty states shall provide a clear message to the user.

---

# 5.12 Error Message

## Purpose

Communicates that an operation could not be completed.

Error messages shall:

- Be concise.
- Explain the issue in user-friendly language.
- Avoid technical implementation details.

---

# 5.13 Confirmation Message

## Purpose

Confirms successful completion of an operation.

Examples include:

- Favorite added
- Pantry updated
- Meal plan saved
- Grocery list generated

Confirmation messages shall be brief and clearly indicate success.

---

# 5.14 Page Title

## Purpose

Identifies the current screen.

Every primary screen shall begin with a clearly visible page title.

Titles shall remain consistent with the navigation labels defined in Section 4.

---

# 5.15 Component Consistency

All shared components shall:

- Follow the application's design system.
- Behave consistently across all screens.
- Maintain consistent spacing and typography.
- Support responsive layouts.

---

# 5.16 Acceptance Criteria

This section is complete when:

- Shared components are documented.
- Component behavior is defined.
- Visual consistency expectations are established.
- Components remain reusable across all approved screens.
- No new functionality is introduced beyond the approved MVP.

---

# End of Section 5

# FRONTEND_SPEC.md

# 6. Authentication Screens

---

## 6.1 Purpose

The Authentication screens allow users to:

- Register a new account.
- Sign in to an existing account.
- Sign out of the application.

These screens provide access to the authenticated features defined in the Product Blueprint.

---

# 6.2 Screens

Version 1.0 includes the following authentication screens:

- Register
- Sign In

Sign Out is performed as an application action and does not require a dedicated screen.

---

# 6.3 Register Screen

## Purpose

Allows a new user to create an account.

---

## Layout

The Register screen shall contain:

- Page title
- Email field
- Password field
- Register button
- Link to Sign In

The layout shall present fields in a single vertical column.

---

## User Interaction

The user:

1. Enters an email address.
2. Enters a password.
3. Selects **Register**.

If registration succeeds, the application follows the authentication flow defined in the Product Blueprint.

If registration fails, an appropriate error message is displayed.

---

## Loading State

While the registration request is in progress:

- The Register button displays a loading state.
- Duplicate submissions are prevented.

---

## Validation

Validation follows the rules defined in the API Reference.

Validation feedback shall be displayed near the relevant input fields where appropriate.

---

## Error State

If registration cannot be completed:

- A user-friendly error message is displayed.
- Previously entered values remain available for correction.

---

# 6.4 Sign In Screen

## Purpose

Allows an existing user to authenticate.

---

## Layout

The Sign In screen shall contain:

- Page title
- Email field
- Password field
- Sign In button
- Link to Register

Fields shall be presented in a single vertical column.

---

## User Interaction

The user:

1. Enters an email address.
2. Enters a password.
3. Selects **Sign In**.

If authentication succeeds, the application follows the authentication flow defined in the Product Blueprint.

If authentication fails, an appropriate error message is displayed.

---

## Loading State

While authentication is in progress:

- The Sign In button displays a loading state.
- Duplicate submissions are prevented.

---

## Validation

Validation follows the rules defined in the API Reference.

---

## Error State

If authentication fails:

- A user-friendly error message is displayed.
- Previously entered values remain available.

---

# 6.5 Sign Out

## Purpose

Allows an authenticated user to end the current session.

---

## User Interaction

Selecting **Sign Out**:

- Ends the authenticated session.
- Follows the sign-out behavior defined in the Product Blueprint.
- Removes access to authenticated features.

No dedicated confirmation screen is required.

---

# 6.6 Responsive Behavior

### Mobile

- Single-column layout.
- Inputs occupy available width.
- Primary action button remains easily accessible.

---

### Tablet

- Increased spacing while maintaining the same layout.

---

### Desktop

- Authentication form remains centered.
- Form width is constrained for readability.

Functionality remains identical across all supported screen sizes.

---

# 6.7 Accessibility

Authentication screens shall provide:

- Clearly labeled input fields.
- Keyboard-accessible controls.
- Visible focus indicators.
- Readable validation messages.

---

# 6.8 Acceptance Criteria

This section is complete when:

- Register screen is defined.
- Sign In screen is defined.
- Sign Out behavior is documented.
- Loading, validation, and error states are documented.
- Responsive behavior is defined.
- No authentication functionality exists beyond the approved MVP.

---

# End of Section 6

# FRONTEND_SPEC.md

# 7. Home Screen

---

## 7.1 Purpose

The Home Screen serves as the primary landing page after the application is opened.

Its purpose is to provide quick access to the core features defined in the Product Blueprint.

The Home Screen does not contain functionality beyond navigation and basic entry points to approved features.

---

# 7.2 Layout

The Home Screen shall consist of:

- Page Header
- Primary Feature Section

The layout shall remain simple and uncluttered.

---

# 7.3 Page Header

The Page Header shall include:

- Page title

The page title shall be:

```
Home
```

---

# 7.4 Primary Feature Section

The Home Screen shall provide entry points to the approved application features.

These include:

- Recipe Browser
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites

Each entry point shall clearly indicate the destination.

Selecting an entry point navigates to the corresponding screen.

---

# 7.5 User Interaction

The Home Screen supports the following interactions:

- Select a feature to navigate to its screen.
- Return to the Home Screen using the application's primary navigation.

No additional interactions are defined for Version 1.0.

---

# 7.6 Loading State

If the Home Screen requires application data before rendering, a loading indicator shall be displayed until the screen is ready.

---

# 7.7 Empty State

The Home Screen has no empty state.

Navigation remains available regardless of application data.

---

# 7.8 Error State

If required application data cannot be loaded, a user-friendly error message shall be displayed.

The application's primary navigation shall remain available.

---

# 7.9 Responsive Behavior

### Mobile

- Feature entry points are displayed in a single-column layout.

---

### Tablet

- Feature entry points expand to use the available width while maintaining consistent spacing.

---

### Desktop

- Feature entry points make efficient use of horizontal space while preserving readability.

Functionality remains identical across all supported screen sizes.

---

# 7.10 Accessibility

The Home Screen shall provide:

- Clearly labeled navigation elements.
- Keyboard-accessible interactive controls.
- Visible focus indicators.
- Consistent navigation behavior.

---

# 7.11 Acceptance Criteria

This section is complete when:

- Home Screen purpose is documented.
- Layout is defined.
- Navigation entry points are documented.
- User interactions are defined.
- Loading, empty, and error states are documented.
- Responsive behavior is specified.
- No additional Home Screen functionality exists beyond the approved MVP.

---

# End of Section 7

# FRONTEND_SPEC.md

# 8. Recipe Browser

---

## 8.1 Purpose

The Recipe Browser allows users to browse the application's recipe collection.

Users can:

- Browse recipes
- Search recipes
- Filter recipes by category
- Open Recipe Details
- Add or remove recipes from Favorites (authenticated users)

The Recipe Browser is read-only.

Recipes cannot be created, edited, or deleted in Version 1.0.

---

# 8.2 Layout

The Recipe Browser consists of five sections.

```
--------------------------------------------------

Page Header

--------------------------------------------------

Search Bar

--------------------------------------------------

Category Filter

--------------------------------------------------

Recipe Grid

--------------------------------------------------

Pagination / End of List

--------------------------------------------------
```

The layout remains consistent across all supported devices.

---

# 8.3 Page Header

The page header contains:

- Page Title

Title:

```
Recipes
```

No additional dashboard widgets or statistics are displayed.

---

# 8.4 Search Bar

The search bar allows users to search recipes by name.

Typing into the search field filters recipes using the Recipe API.

The search field contains:

- Search input
- Search icon

No advanced search functionality exists in Version 1.0.

---

# 8.5 Category Filter

Users may filter recipes by category.

The categories available are those defined in the Recipe data.

Selecting a category updates the displayed recipes.

Only one category filter is active at a time.

---

# 8.6 Recipe Grid

Recipes are displayed using reusable Recipe Cards.

Each Recipe Card displays:

- Recipe image
- Recipe name
- Category
- Estimated Cost
- Preparation Time
- Cooking Time
- Difficulty

Selecting a Recipe Card opens the Recipe Detail screen.

---

# 8.7 Favorite Action

Authenticated users may add or remove recipes from Favorites.

The Favorite action is available directly on the Recipe Card.

The Favorite action updates only the user's Favorites.

The Recipe Browser itself remains unchanged.

---

# 8.8 User Interactions

Users may:

- Browse recipes
- Search recipes
- Filter recipes
- Open recipe details
- Add favorite
- Remove favorite

No additional interactions exist.

---

# 8.9 Loading State

While recipes are loading:

- Recipe Cards display loading placeholders.
- Search remains visible.
- Filters remain visible.

---

# 8.10 Empty State

If no recipes match the current search or filter:

Display a message similar to:

```
No recipes found.
```

The Search Bar and Category Filter remain available.

---

# 8.11 Error State

If recipes cannot be loaded:

Display a user-friendly error message.

The user may retry loading the page.

---

# 8.12 Responsive Behavior

### Mobile

Recipes display in a single-column layout.

---

### Tablet

Recipes display in multiple columns depending on available width.

---

### Desktop

Recipes display in a wider grid while maintaining consistent card sizes.

Only the layout changes.

Functionality remains identical.

---

# 8.13 Accessibility

Recipe Browser shall provide:

- Keyboard-accessible search
- Keyboard-accessible filters
- Keyboard-accessible Recipe Cards
- Keyboard-accessible Favorite action

---

# 8.14 Acceptance Criteria

This section is complete when:

- Users can browse recipes.
- Users can search recipes.
- Users can filter recipes.
- Users can open Recipe Details.
- Authenticated users can manage Favorites.
- Loading, Empty and Error states are defined.
- Responsive behavior is documented.
- No additional Recipe Browser functionality exists beyond the approved MVP.

---

# End of Section 8

# FRONTEND_SPEC.md

# 9. Recipe Detail Screen

---

## 9.1 Purpose

The Recipe Detail Screen displays the complete information for a single recipe.

Users can:

- View recipe information
- View ingredients
- View cooking instructions
- Add or remove the recipe from Favorites (authenticated users)

The Recipe Detail Screen is read-only.

Recipes cannot be modified in Version 1.0.

---

# 9.2 Navigation

The Recipe Detail Screen is opened when a user selects a Recipe Card from:

- Recipe Browser
- Kahit Ano results
- Pantry recommendations
- Weekly Planner
- Grocery List (when applicable)
- Favorites

The screen displays the selected recipe only.

---

# 9.3 Layout

The Recipe Detail Screen consists of the following sections in order:

```
--------------------------------------------------

Page Header

--------------------------------------------------

Recipe Hero Image

--------------------------------------------------

Recipe Information

--------------------------------------------------

Recipe Summary

--------------------------------------------------

Ingredients

--------------------------------------------------

Cooking Instructions

--------------------------------------------------

Favorite Action (Authenticated Users)

--------------------------------------------------
```

All sections are displayed on a single scrolling page.

---

# 9.4 Page Header

The page header shall include:

- Back navigation
- Recipe name

The recipe name serves as the page title.

---

# 9.5 Recipe Hero Image

The hero image displays the primary image associated with the recipe.

If an image is unavailable, the application's standard placeholder image shall be displayed.

---

# 9.6 Recipe Information

This section displays:

- Category
- Estimated Cost
- Preparation Time
- Cooking Time
- Servings
- Difficulty

Information shall be presented using a consistent layout across all recipes.

---

# 9.7 Ingredients

The Ingredients section lists every ingredient required for the recipe.

Each ingredient displays:

- Ingredient name
- Quantity
- Unit

Ingredients are displayed in the order defined by the recipe.

---

# 9.8 Cooking Instructions

This section displays the complete cooking instructions for the recipe.

Instructions are presented in the order defined by the recipe.

Formatting shall prioritize readability.

---

# 9.9 Favorite Action

Authenticated users may:

- Add the recipe to Favorites.
- Remove the recipe from Favorites.

The Favorite control reflects the current favorite status.

Guest users do not have access to this action.

---

# 9.10 User Interactions

Users may:

- View recipe information.
- Scroll through the recipe.
- Return to the previous screen.
- Add or remove the recipe from Favorites (authenticated users).

No additional interactions are available in Version 1.0.

---

# 9.11 Loading State

While recipe details are loading:

- The page structure remains visible.
- Content areas display loading placeholders until data is available.

---

# 9.12 Empty State

The Recipe Detail Screen has no empty state.

If the requested recipe cannot be found, the application shall display the standard error state.

---

# 9.13 Error State

If the recipe cannot be loaded:

- A user-friendly error message is displayed.
- The user is given the option to return to the previous screen.

---

# 9.14 Responsive Behavior

### Mobile

- Content displayed in a single column.
- Hero image spans the available width.
- Sections are stacked vertically.

---

### Tablet

- Increased spacing.
- Improved use of available width while maintaining a single reading flow.

---

### Desktop

- Wider content container.
- Larger hero image.
- Improved spacing for readability.

Functionality remains identical across all supported screen sizes.

---

# 9.15 Accessibility

The Recipe Detail Screen shall provide:

- Keyboard-accessible navigation.
- Keyboard-accessible Favorite control.
- Descriptive alternative text for the recipe image.
- Clear section headings.
- Visible focus indicators.

---

# 9.16 Acceptance Criteria

This section is complete when:

- Recipe details are displayed.
- Ingredients are displayed.
- Cooking instructions are displayed.
- Favorite functionality is available to authenticated users.
- Loading, error, and responsive behavior are documented.
- No additional Recipe Detail functionality exists beyond the approved MVP.

---

# End of Section 9

# FRONTEND_SPEC.md

# 10. Kahit Ano Screen

---

## 10.1 Purpose

The Kahit Ano Screen allows users to generate recipe recommendations based on simple meal planning criteria.

Users provide:

- Budget
- Family Size
- Meal Style

The application returns recipes that satisfy the supplied criteria.

The generated results are read-only.

---

# 10.2 Layout

The Kahit Ano Screen consists of the following sections.

```
--------------------------------------------------

Page Header

--------------------------------------------------

Recommendation Form

--------------------------------------------------

Generate Button

--------------------------------------------------

Recommendation Results

--------------------------------------------------
```

The page remains vertically scrollable.

---

# 10.3 Page Header

The page header contains:

- Page title

Title:

```
Kahit Ano
```

An optional short description may explain that users can generate recipe suggestions using a budget and household size.

No statistics or additional widgets are displayed.

---

# 10.4 Recommendation Form

The recommendation form contains exactly three inputs.

### Weekly Budget

Input Type:

Number

Purpose:

Maximum budget available for the generated meal recommendation.

---

### Family Size

Input Type:

Number

Purpose:

Number of people to be served.

---

### Meal Style

Input Type:

Select

Allowed values:

- Everyday

Only values defined in the Product Blueprint are available.

---

# 10.5 Generate Button

A single primary action button is displayed.

Label:

```
Generate Recipes
```

Selecting the button submits the form to the Kahit Ano API.

---

# 10.6 Recommendation Results

Generated recipes are displayed below the form.

Results use the standard Recipe Card component.

Each Recipe Card displays:

- Recipe image
- Recipe name
- Category
- Estimated Cost
- Preparation Time
- Cooking Time
- Difficulty

Selecting a Recipe Card opens the Recipe Detail Screen.

---

# 10.7 User Interactions

Users may:

- Enter a budget.
- Enter family size.
- Select a meal style.
- Generate recipe recommendations.
- Open Recipe Details.
- Add or remove recipes from Favorites (authenticated users).

No other interactions are available in Version 1.0.

---

# 10.8 Loading State

While recommendations are being generated:

- The Generate Recipes button displays a loading state.
- Duplicate submissions are prevented.
- Existing results remain visible until replaced by the new response.

---

# 10.9 Empty State

Before a recommendation is generated:

Display an instructional message indicating that users should complete the form and generate recipes.

If no recipes satisfy the criteria:

Display a message such as:

```
No recipes match your criteria.
```

---

# 10.10 Error State

If recommendations cannot be generated:

- Display a user-friendly error message.
- Preserve the entered form values.
- Allow the user to submit the request again.

---

# 10.11 Responsive Behavior

### Mobile

- Form fields are displayed in a single column.
- Recipe Cards appear in a single-column list.

---

### Tablet

- Form fields remain vertically aligned.
- Recipe Cards expand into a multi-column layout.

---

### Desktop

- Form remains centered for readability.
- Recipe Cards use a wider grid layout.

Only the layout changes.

Functionality remains identical across all supported devices.

---

# 10.12 Accessibility

The Kahit Ano Screen shall provide:

- Clearly labeled form controls.
- Keyboard-accessible inputs.
- Keyboard-accessible Generate button.
- Keyboard-accessible Recipe Cards.
- Visible focus indicators.
- Readable validation messages.

---

# 10.13 Acceptance Criteria

This section is complete when:

- Users can enter Budget.
- Users can enter Family Size.
- Users can select Meal Style.
- Users can generate recipe recommendations.
- Recommendation results use the standard Recipe Card.
- Loading, empty, and error states are documented.
- Responsive behavior is documented.
- No functionality exists beyond the approved Kahit Ano workflow.

---

# End of Section 10

# FRONTEND_SPEC.md

# 11. Pantry Screen

---

## 11.1 Purpose

The Pantry Screen allows authenticated users to maintain a list of ingredients they currently have available.

The pantry is used to generate recipe recommendations based on available ingredients.

Users can:

- View pantry ingredients
- Add pantry ingredients
- Remove pantry ingredients
- Generate pantry-based recipe recommendations

Version 1.0 does not track inventory quantities or expiration dates.

---

# 11.2 Layout

The Pantry Screen consists of the following sections.

```
--------------------------------------------------

Page Header

--------------------------------------------------

Add Ingredient

--------------------------------------------------

Current Pantry

--------------------------------------------------

Generate Recommendations

--------------------------------------------------

Recommendation Results

--------------------------------------------------
```

The page remains vertically scrollable.

---

# 11.3 Page Header

The page header contains:

- Page title

Title:

```
Pantry
```

No additional statistics or inventory summaries are displayed.

---

# 11.4 Add Ingredient

Users can add ingredients to their pantry.

The section contains:

- Ingredient selector
- Add Ingredient button

Selecting **Add Ingredient** adds the selected ingredient to the pantry.

The pantry list updates after a successful request.

---

# 11.5 Current Pantry

The Current Pantry section displays all ingredients currently saved by the authenticated user.

Each pantry item displays:

- Ingredient name
- Remove action

Ingredients are displayed using a consistent list layout.

---

# 11.6 Remove Ingredient

Each pantry item includes a Remove action.

Selecting Remove deletes the ingredient from the user's pantry.

The pantry list updates after a successful request.

---

# 11.7 Generate Recommendations

A primary action button is displayed below the pantry list.

Label:

```
Find Recipes
```

Selecting the button requests recipe recommendations using the current pantry ingredients.

---

# 11.8 Recommendation Results

Generated recipes are displayed below the Generate Recommendations section.

Results use the standard Recipe Card component.

Each Recipe Card displays:

- Recipe image
- Recipe name
- Category
- Estimated Cost
- Preparation Time
- Cooking Time
- Difficulty

Selecting a Recipe Card opens the Recipe Detail Screen.

Authenticated users may add or remove recipes from Favorites directly from the Recipe Card.

---

# 11.9 User Interactions

Users may:

- Add pantry ingredients.
- Remove pantry ingredients.
- View current pantry ingredients.
- Generate pantry-based recipe recommendations.
- Open Recipe Details.
- Add or remove Favorites.

No additional interactions are available in Version 1.0.

---

# 11.10 Loading State

While pantry data is loading:

- The pantry list displays loading placeholders.

While generating recommendations:

- The Find Recipes button displays a loading state.
- Duplicate requests are prevented.

---

# 11.11 Empty State

If the pantry contains no ingredients:

Display a message such as:

```
Your pantry is empty.
Add ingredients to receive recipe recommendations.
```

If no recipes match the pantry ingredients:

Display:

```
No matching recipes found.
```

---

# 11.12 Error State

If a pantry request fails:

- Display a user-friendly error message.
- Preserve the current pantry where possible.
- Allow the user to retry the failed action.

---

# 11.13 Responsive Behavior

### Mobile

- Single-column layout.
- Pantry displayed as a vertical list.
- Recipe Cards displayed in a single-column list.

---

### Tablet

- Increased spacing.
- Recipe Cards displayed in multiple columns.

---

### Desktop

- Wider content container.
- Recipe Cards displayed in a responsive grid.

Only the layout changes.

Functionality remains identical across all supported devices.

---

# 11.14 Accessibility

The Pantry Screen shall provide:

- Keyboard-accessible ingredient selector.
- Keyboard-accessible Add Ingredient button.
- Keyboard-accessible Remove actions.
- Keyboard-accessible Find Recipes button.
- Keyboard-accessible Recipe Cards.
- Visible focus indicators.

---

# 11.15 Acceptance Criteria

This section is complete when:

- Users can add pantry ingredients.
- Users can remove pantry ingredients.
- Pantry contents are displayed.
- Pantry-based recipe recommendations can be generated.
- Recipe results use the standard Recipe Card.
- Loading, empty, and error states are documented.
- Responsive behavior is documented.
- No pantry functionality exists beyond the approved MVP.

---

# End of Section 11

# FRONTEND_SPEC.md

# 12. Weekly Planner Screen

---

## 12.1 Purpose

The Weekly Planner Screen allows authenticated users to generate, review, modify, and save a weekly meal plan.

The planner uses the approved Weekly Planner workflow defined in the Product Blueprint.

Version 1.0 supports planning for:

- Lunch
- Dinner

only.

No breakfast, snacks, recurring schedules, calendars, reminders, or nutrition planning are included.

---

# 12.2 Screen Layout

The screen is composed of five vertical sections.

```
--------------------------------------------------
Page Header
--------------------------------------------------

Planner Configuration Card

--------------------------------------------------

Generate Meal Plan Button

--------------------------------------------------

Weekly Meal Plan Grid

--------------------------------------------------

Save Meal Plan Button

--------------------------------------------------
```

The page scrolls vertically.

Each section is visually separated using the standard Card component.

---

# 12.3 Page Header

The page header contains:

- Page title

Title:

```
Weekly Planner
```

No charts, statistics, or dashboard widgets are displayed.

---

# 12.4 Planner Configuration Card

The first card contains the planner inputs.

Fields are displayed vertically in the following order:

1. Weekly Budget
2. Family Size

Both fields are required.

The card ends with the primary action button.

---

## Generate Button

Label:

```
Generate Meal Plan
```

Selecting the button requests a new weekly meal plan from the Weekly Planner API.

---

# 12.5 Weekly Meal Plan Grid

Once generated, the meal plan is displayed as a weekly grid.

Each day contains exactly two meal slots.

| Day | Lunch | Dinner |
|-----|--------|---------|
| Monday | ✓ | ✓ |
| Tuesday | ✓ | ✓ |
| Wednesday | ✓ | ✓ |
| Thursday | ✓ | ✓ |
| Friday | ✓ | ✓ |
| Saturday | ✓ | ✓ |
| Sunday | ✓ | ✓ |

No additional meal types exist.

---

# 12.6 Meal Card

Each meal is displayed using a compact Recipe Card.

Each Meal Card displays:

- Recipe name
- Estimated Cost
- Replace button

Selecting the recipe name opens the Recipe Detail Screen.

---

# 12.7 Replace Meal

Each Meal Card includes one secondary action.

Label:

```
Replace
```

Selecting Replace requests another recipe for that meal slot using the Weekly Planner API.

Only the selected meal is updated.

All other meals remain unchanged.

---

# 12.8 Save Meal Plan

Below the weekly grid is one primary button.

Label:

```
Save Meal Plan
```

Selecting the button saves the currently displayed meal plan.

---

# 12.9 User Interaction Flow

The intended interaction sequence is:

1. Enter Weekly Budget.
2. Enter Family Size.
3. Select Generate Meal Plan.
4. Review generated meals.
5. Optionally replace individual meals.
6. Save Meal Plan.

No additional workflow exists.

---

# 12.10 Loading State

During meal generation:

- Configuration inputs remain visible.
- Generate Meal Plan displays a loading state.
- Previous meal plan remains visible until replaced.

During meal replacement:

- Only the selected Meal Card displays a loading indicator.

During save:

- Save Meal Plan displays a loading state.

---

# 12.11 Empty State

Before generation:

Display instructional text such as:

```
Generate a weekly meal plan to begin.
```

---

# 12.12 Error State

If generation fails:

- Display a user-friendly error message.
- Preserve the planner inputs.
- Allow the user to retry.

If replacing a meal fails:

- Only the affected Meal Card reports the error.

---

# 12.13 Responsive Behavior

### Mobile

- Days displayed vertically.
- Each day shown as an individual card containing Lunch and Dinner.

### Tablet

- Wider cards with improved spacing.

### Desktop

- Seven-day grid displayed in table form.
- Lunch and Dinner remain grouped beneath each day.

Only the layout changes.

The planning workflow remains identical.

---

# 12.14 Accessibility

The Weekly Planner Screen shall provide:

- Keyboard-accessible inputs.
- Keyboard-accessible Generate button.
- Keyboard-accessible Replace buttons.
- Keyboard-accessible Save button.
- Keyboard-accessible Meal Cards.
- Visible focus indicators.

---

# 12.15 Acceptance Criteria

This section is complete when:

- Users can generate a weekly meal plan.
- Users can view all seven days.
- Users can replace individual meals.
- Users can save a meal plan.
- Loading, empty, and error states are documented.
- Responsive behavior is defined.
- No functionality exists beyond the approved Weekly Planner MVP.

---

# End of Section 12

# FRONTEND_SPEC.md

# 13. Grocery List Screen

---

## 13.1 Purpose

The Grocery List Screen allows authenticated users to view and manage a grocery list generated from a Weekly Meal Plan.

The grocery list is generated automatically from the selected meal plan.

Users can:

- View the grocery list
- Mark grocery items as purchased
- View the estimated total cost

Version 1.0 does not support manual grocery list creation or editing.

---

# 13.2 Screen Layout

The Grocery List Screen consists of five vertical sections.

```
--------------------------------------------------
Page Header
--------------------------------------------------

Generate Grocery List Card

--------------------------------------------------

Estimated Total Card

--------------------------------------------------

Grocery Items List

--------------------------------------------------

End of List

--------------------------------------------------
```

The page scrolls vertically.

All content sections use the standard Card component.

---

# 13.3 Page Header

The page header contains:

- Page title

Title:

```
Grocery List
```

No shopping statistics, purchase history, or additional dashboard elements are displayed.

---

# 13.4 Generate Grocery List Card

This card allows the user to generate a grocery list from an existing Weekly Meal Plan.

Contents:

- Meal Plan selector
- Generate Grocery List button

The Meal Plan selector lists only the authenticated user's saved weekly meal plans.

---

## Generate Button

Label:

```
Generate Grocery List
```

Selecting the button requests a grocery list from the Grocery List API.

If generation succeeds, the Grocery Items List replaces any previously displayed list.

---

# 13.5 Estimated Total Card

When a grocery list is available, an Estimated Total Card is displayed above the grocery items.

The card contains:

- Label: Estimated Total
- Estimated total grocery cost

This value is read-only.

---

# 13.6 Grocery Items List

The Grocery Items List displays every ingredient returned by the Grocery List API.

Each grocery item is displayed using a consistent list row.

Each row contains:

- Purchased checkbox
- Ingredient name
- Quantity
- Unit
- Estimated cost

Rows are displayed in the order returned by the API.

---

# 13.7 Purchased Status

Each grocery item includes a checkbox.

Selecting the checkbox updates the purchased status of that item.

The update is sent immediately to the Grocery List API.

No additional confirmation is required.

---

# 13.8 User Interaction Flow

The intended interaction sequence is:

1. Select a saved Weekly Meal Plan.
2. Select Generate Grocery List.
3. Review generated grocery items.
4. Mark purchased items as shopping progresses.

No additional workflow exists.

---

# 13.9 Loading State

While generating a grocery list:

- The Generate Grocery List button displays a loading state.
- Previous grocery list remains visible until the new list is returned.

While updating a purchased status:

- Only the affected grocery item displays a loading indicator.

---

# 13.10 Empty State

Before a grocery list has been generated:

Display instructional text such as:

```
Generate a grocery list from a saved weekly meal plan.
```

If the generated grocery list contains no items:

Display:

```
No grocery items available.
```

---

# 13.11 Error State

If grocery list generation fails:

- Display a user-friendly error message.
- Preserve the selected meal plan.
- Allow the user to retry.

If updating a purchased status fails:

- Only the affected grocery item reports the error.
- The remaining list remains usable.

---

# 13.12 Responsive Behavior

### Mobile

- Grocery items displayed as stacked rows.
- Each row uses a single-column layout.

---

### Tablet

- Additional spacing between list rows.
- Improved alignment of quantity and estimated cost.

---

### Desktop

- Grocery items displayed using a table-like layout.
- Columns remain aligned for readability.

Only the layout changes.

Functionality remains identical across all supported devices.

---

# 13.13 Accessibility

The Grocery List Screen shall provide:

- Keyboard-accessible Meal Plan selector.
- Keyboard-accessible Generate Grocery List button.
- Keyboard-accessible purchased checkboxes.
- Visible focus indicators.
- Clearly associated labels for all interactive controls.

---

# 13.14 Acceptance Criteria

This section is complete when:

- Users can generate a grocery list from a saved Weekly Meal Plan.
- Estimated total cost is displayed.
- Grocery items are displayed.
- Purchased status can be updated.
- Loading, empty, and error states are documented.
- Responsive behavior is defined.
- No functionality exists beyond the approved Grocery List MVP.

---

# End of Section 13

# FRONTEND_SPEC.md

# 14. Favorites Screen

---

## 14.1 Purpose

The Favorites Screen allows authenticated users to view and manage their saved favorite recipes.

Users can:

- View favorite recipes
- Open Recipe Details
- Remove recipes from Favorites

Recipes are added to Favorites from:

- Recipe Browser
- Recipe Detail
- Kahit Ano
- Pantry Recommendations

The Favorites Screen itself is read-only except for removing favorites.

---

# 14.2 Screen Layout

The Favorites Screen consists of four vertical sections.

```
--------------------------------------------------
Page Header
--------------------------------------------------

Favorites Grid

--------------------------------------------------

End of List

--------------------------------------------------
```

The page scrolls vertically.

Recipe Cards use the standard Recipe Card component defined in Section 5.

---

# 14.3 Page Header

The page header contains:

- Page title

Title:

```
Favorites
```

No statistics or counters are displayed.

---

# 14.4 Favorites Grid

Favorite recipes are displayed using the standard Recipe Card.

Each Recipe Card displays:

- Recipe image
- Recipe name
- Category
- Estimated Cost
- Preparation Time
- Cooking Time
- Difficulty

Cards maintain the same appearance used throughout the application.

---

# 14.5 Remove Favorite

Each Recipe Card includes a Favorite control.

Selecting the control removes the recipe from the authenticated user's Favorites.

The card is removed from the grid after a successful response.

---

# 14.6 Open Recipe

Selecting any area of the Recipe Card (excluding the Favorite control) opens the Recipe Detail Screen.

Navigation follows the standard application navigation behavior.

---

# 14.7 User Interaction Flow

The intended interaction sequence is:

1. Open Favorites.
2. Browse saved recipes.
3. Select a recipe to view details.

or

1. Open Favorites.
2. Remove a recipe from Favorites.

No additional workflows exist.

---

# 14.8 Loading State

While favorites are loading:

- Recipe Cards display loading placeholders.
- Page layout remains visible.

While removing a favorite:

- Only the affected Recipe Card displays a loading indicator.

---

# 14.9 Empty State

If the authenticated user has no favorite recipes:

Display a message such as:

```
You haven't added any favorite recipes yet.
```

The page remains fully functional.

---

# 14.10 Error State

If favorites cannot be loaded:

- Display a user-friendly error message.
- Allow the user to retry.

If removing a favorite fails:

- Only the affected Recipe Card reports the error.
- Remaining recipes remain accessible.

---

# 14.11 Responsive Behavior

### Mobile

- Recipe Cards displayed in a single-column layout.

---

### Tablet

- Recipe Cards displayed in multiple columns with consistent spacing.

---

### Desktop

- Recipe Cards displayed using a responsive grid.
- Card size remains consistent with the Recipe Browser.

Only the layout changes.

Functionality remains identical across all supported devices.

---

# 14.12 Accessibility

The Favorites Screen shall provide:

- Keyboard-accessible Recipe Cards.
- Keyboard-accessible Favorite controls.
- Visible focus indicators.
- Descriptive alternative text for recipe images.

---

# 14.13 Acceptance Criteria

This section is complete when:

- Favorite recipes are displayed.
- Users can open Recipe Details.
- Users can remove recipes from Favorites.
- Loading, empty, and error states are documented.
- Responsive behavior is documented.
- No functionality exists beyond the approved Favorites MVP.

---

# End of Section 14

# FRONTEND_SPEC.md

# 15. Responsive Design

---

## 15.1 Purpose

This section defines the responsive design standards for Version 1.0.

Responsive design affects presentation only.

No screen shall gain or lose functionality based on device size.

---

# 15.2 Supported Devices

The application shall support:

- Mobile
- Tablet
- Desktop

All approved screens shall function correctly on each supported device.

---

# 15.3 Responsive Principle

Responsive behavior shall modify:

- Layout
- Spacing
- Alignment
- Component sizing

Responsive behavior shall not modify:

- Business logic
- Navigation structure
- User permissions
- Application workflow
- Available functionality

---

# 15.4 Mobile Layout

Mobile is the primary target platform.

General rules:

- Single-column layouts.
- Full-width form controls.
- Full-width primary action buttons where appropriate.
- Vertically stacked cards.
- Comfortable touch targets for interactive elements.
- Vertical scrolling for page content.

Navigation remains fully accessible.

---

# 15.5 Tablet Layout

Tablet layouts provide additional horizontal space while preserving the same interaction model.

General rules:

- Increased spacing between components.
- Multi-column layouts where appropriate.
- Wider content containers.
- Improved readability.

No additional controls or features appear on tablet devices.

---

# 15.6 Desktop Layout

Desktop layouts make efficient use of available screen width.

General rules:

- Centered content container.
- Wider grids for Recipe Cards.
- Table-style presentation where appropriate (e.g., Weekly Planner and Grocery List).
- Increased whitespace to improve readability.

Application behavior remains identical to mobile and tablet.

---

# 15.7 Responsive Components

The following components shall adapt to available screen width:

- Recipe Grid
- Favorites Grid
- Pantry Recommendation Grid
- Kahit Ano Recommendation Grid
- Weekly Planner Layout
- Grocery List Layout
- Forms
- Cards

Adaptation affects layout only.

---

# 15.8 Images

Recipe images shall:

- Scale proportionally.
- Maintain aspect ratio.
- Avoid distortion.
- Remain fully visible within their containers.

Placeholder images shall follow the same sizing behavior.

---

# 15.9 Forms

Forms shall remain easy to complete across all devices.

Requirements:

- Labels remain visible.
- Inputs remain readable.
- Buttons remain accessible.
- Validation messages remain associated with the appropriate input.

---

# 15.10 Tables and Lists

Where information is presented using table-like layouts:

### Mobile

Content may stack vertically.

### Tablet

Content may use wider spacing.

### Desktop

Content may use aligned columns.

Underlying data and functionality remain unchanged.

---

# 15.11 Consistency

Every screen shall follow the same responsive behavior.

Users should not encounter different interaction patterns solely because they change devices.

---

# 15.12 Acceptance Criteria

This section is complete when:

- Supported device types are documented.
- Responsive behavior is defined.
- Layout adaptation rules are documented.
- Component adaptation is specified.
- Responsive behavior affects presentation only.
- No additional functionality is introduced beyond the approved MVP.

---

# End of Section 15

# FRONTEND_SPEC.md

# 16. Loading, Empty & Error States

---

## 16.1 Purpose

This section defines the standard behavior for loading, empty, and error states used throughout Version 1.0.

Every approved screen shall follow these standards to provide a consistent user experience.

These states affect presentation only and do not alter application functionality.

---

# 16.2 Design Principles

All user feedback shall be:

- Consistent
- Clear
- Immediate
- Non-disruptive
- Easy to understand

Messages shall avoid technical terminology and internal implementation details.

---

# 16.3 Loading States

Loading indicators inform users that an operation is currently in progress.

The interface should remain as responsive as possible while data is loading.

---

## Page Loading

When an entire page is loading:

- Preserve the page structure.
- Display loading placeholders where content will appear.
- Prevent layout shifting when data loads.

Navigation remains available whenever possible.

---

## Section Loading

When only part of a page is loading:

Only the affected section shall display a loading indicator.

Examples include:

- Recipe recommendations
- Pantry recommendations
- Weekly meal generation
- Grocery list generation

The remainder of the page remains interactive where appropriate.

---

## Button Loading

Buttons that initiate API requests shall display a loading state while the request is in progress.

During loading:

- The initiating button is temporarily disabled.
- Duplicate submissions are prevented.
- Button label remains recognizable.

Examples include:

- Register
- Sign In
- Generate Recipes
- Generate Meal Plan
- Generate Grocery List
- Save Meal Plan
- Add Ingredient

---

# 16.4 Empty States

Empty states communicate that no data is currently available.

Each empty state shall:

- Clearly explain the situation.
- Suggest the next appropriate action where applicable.

---

## Standard Empty States

### Recipes

```
No recipes found.
```

---

### Pantry

```
Your pantry is empty.
Add ingredients to receive recipe recommendations.
```

---

### Weekly Planner

```
Generate a weekly meal plan to begin.
```

---

### Grocery List

```
Generate a grocery list from a saved weekly meal plan.
```

---

### Favorites

```
You haven't added any favorite recipes yet.
```

---

### Kahit Ano

```
Generate recipe recommendations to begin.
```

---

# 16.5 Error States

Error states inform users that an operation could not be completed.

Error messages shall:

- Be concise.
- Use user-friendly language.
- Avoid exposing implementation details.

---

## Standard Error Message

When a generic error occurs:

```
Unable to complete the request.
Please try again.
```

---

## Validation Errors

Validation errors shall appear near the relevant input field whenever practical.

Examples include:

- Required fields
- Invalid values
- Incorrect input format

Validation behavior follows the API Reference.

---

## Network Errors

If communication with the server fails:

Display a user-friendly error message and allow the user to retry the operation.

Previously entered form values should be preserved whenever possible.

---

# 16.6 Success Feedback

Successful operations should provide brief confirmation.

Examples include:

- Favorite added.
- Favorite removed.
- Pantry updated.
- Meal plan saved.
- Grocery list generated.

Confirmation messages shall:

- Be brief.
- Confirm completion.
- Not interrupt the user's workflow.

---

# 16.7 State Consistency

Loading, empty, error, and success states shall behave consistently across all approved screens.

Users should encounter the same interaction patterns regardless of feature.

---

# 16.8 Acceptance Criteria

This section is complete when:

- Loading behavior is standardized.
- Empty states are documented.
- Error states are documented.
- Success feedback is documented.
- User feedback remains consistent across all approved screens.
- No additional functionality is introduced beyond the approved MVP.

---

# End of Section 16

# FRONTEND_SPEC.md

# 17. Accessibility

---

## 17.1 Purpose

This section defines the accessibility requirements for Version 1.0.

The goal is to ensure that all approved screens are usable by as many users as reasonably possible through consistent implementation practices.

Accessibility requirements apply to every screen and shared component defined in this specification.

---

# 17.2 General Principles

The application shall be:

- Perceivable
- Operable
- Understandable
- Consistent

Accessibility shall be considered during implementation rather than added afterward.

---

# 17.3 Keyboard Navigation

All interactive elements shall be operable using a keyboard.

This includes:

- Navigation links
- Buttons
- Form inputs
- Select controls
- Checkboxes
- Recipe Cards
- Favorite controls

Users shall be able to navigate the application without requiring a mouse.

---

# 17.4 Focus Management

Interactive elements shall display a visible focus indicator.

Focus order shall follow the visual layout of the page.

When navigating forms, focus shall move logically from one field to the next.

---

# 17.5 Form Accessibility

All form controls shall include:

- A visible label
- Programmatic association between the label and input
- Clearly presented validation messages
- Indication of required fields where applicable

Validation messages shall be understandable and positioned near the relevant input.

---

# 17.6 Images

All meaningful images shall include descriptive alternative text.

Recipe images shall describe the recipe they represent.

Decorative images may use empty alternative text where appropriate.

---

# 17.7 Color and Contrast

Text and interactive elements shall provide sufficient visual contrast against their backgrounds.

Color shall not be the sole method used to communicate important information.

Where status is indicated by color, an accompanying label or icon shall also be provided.

---

# 17.8 Touch Targets

Interactive controls shall provide sufficient size and spacing for touch interaction on mobile devices.

Buttons, checkboxes, and navigation elements shall be easy to select without accidental activation of adjacent controls.

---

# 17.9 Error Messages

Error messages shall:

- Clearly explain the issue.
- Avoid technical terminology.
- Be associated with the relevant input or action.
- Remain visible until corrected or dismissed through the normal application flow.

---

# 17.10 Responsive Accessibility

Accessibility behavior shall remain consistent across:

- Mobile
- Tablet
- Desktop

Changing device size shall not reduce accessibility or remove functionality.

---

# 17.11 Consistency

Accessibility implementation shall be consistent throughout the application.

Shared components shall maintain the same accessibility behavior regardless of where they are used.

Examples include:

- Buttons
- Recipe Cards
- Form controls
- Navigation elements
- Loading indicators

---

# 17.12 Acceptance Criteria

This section is complete when:

- Keyboard accessibility is documented.
- Focus behavior is defined.
- Form accessibility requirements are documented.
- Image accessibility is documented.
- Color and contrast expectations are defined.
- Touch target requirements are documented.
- Accessibility remains consistent across all approved screens.
- No functionality is introduced beyond the approved MVP.

---

# End of Section 17

# FRONTEND_SPEC.md

# 18. Frontend Acceptance Criteria

---

## 18.1 Purpose

This section defines the completion criteria for the Version 1.0 frontend implementation.

The frontend is considered complete only when every approved screen, interaction, and shared component has been implemented according to this specification.

No functionality beyond the approved Product Blueprint is required.

---

# 18.2 Screen Completion

The following screens shall be fully implemented:

- Register
- Sign In
- Home
- Recipe Browser
- Recipe Detail
- Kahit Ano
- Pantry
- Weekly Planner
- Grocery List
- Favorites

No additional screens are required for Version 1.0.

---

# 18.3 Navigation

The application shall provide navigation to all approved screens.

Navigation shall:

- Remain consistent across the application.
- Correctly identify the active screen.
- Function on all supported device sizes.

---

# 18.4 Shared Components

The following shared components shall be implemented and reused throughout the application:

- Primary Button
- Secondary Button
- Text Input
- Number Input
- Select Input
- Recipe Card
- Standard Card
- Forms
- Loading Indicator
- Empty State
- Error Message
- Confirmation Message

Components shall follow the shared behavior defined in this specification.

---

# 18.5 API Integration

All frontend functionality shall communicate with the backend exclusively through the endpoints defined in `API_REFERENCE.md`.

The frontend shall not depend on undocumented endpoints or undocumented response fields.

---

# 18.6 Responsive Design

All approved screens shall function correctly on:

- Mobile
- Tablet
- Desktop

Responsive behavior shall modify layout only.

Business logic and available functionality shall remain identical across supported devices.

---

# 18.7 Loading, Empty & Error States

Every approved screen shall implement:

- Loading state
- Empty state (where applicable)
- Error state
- Success feedback (where applicable)

Behavior shall remain consistent throughout the application.

---

# 18.8 Accessibility

All approved screens shall implement the accessibility requirements defined in Section 17.

This includes:

- Keyboard navigation
- Focus indicators
- Accessible forms
- Alternative text for meaningful images
- Sufficient color contrast
- Touch-friendly interactive controls

---

# 18.9 Visual Consistency

The frontend shall consistently apply:

- Typography
- Colors
- Spacing
- Border radius
- Cards
- Buttons
- Forms
- Icons

Shared components shall maintain the same appearance and behavior wherever they are used.

---

# 18.10 Scope Verification

The completed frontend shall implement only the functionality defined in:

- README.md
- CLAUDE.md
- PRODUCT_BLUEPRINT.md
- DATABASE_SCHEMA.md
- API_REFERENCE.md
- FRONTEND_SPEC.md

Implementation shall not introduce:

- Additional screens
- Additional workflows
- Additional navigation items
- Additional user roles
- Additional business rules
- Additional features

Any enhancement beyond these documents shall require a future version of the Product Blueprint.

---

# 18.11 Definition of Done

The frontend implementation is complete when:

- All approved screens are implemented.
- Navigation is complete.
- Shared components are reusable.
- API integration is complete.
- Responsive behavior is implemented.
- Loading, empty, error, and success states are implemented.
- Accessibility requirements are met.
- Visual consistency is maintained.
- No functionality exists beyond the approved MVP.

---

# 18.12 End of Document

This concludes the frontend implementation specification for **Ma, Anong Ulam? Version 1.0**.

This document, together with the Product Blueprint, Database Schema, API Reference, README, and CLAUDE guide, forms the complete implementation specification for the approved MVP.

---

# End of FRONTEND_SPEC.md