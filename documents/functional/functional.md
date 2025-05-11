<div align="center">

# Functional Specifications: Avoid Food Waste Application

**Author:** Alexandre Bopp

**Title:** 0waste  

**Last updated:** March 2025

**Team:** Alexandre Bopp only

<img src="../../images/logofunct.jpg" width="400" alt="Logo"/>

</div>

---

<details>
<summary>Table Of Contents</summary>

- [Functional Specifications: Avoid Food Waste Application](#functional-specifications-avoid-food-waste-application)
  - [Introduction](#introduction)
    - [1.1 Glossary // Important to adjust and modify it](#11-glossary--important-to-adjust-and-modify-it)
    - [1.2 Purpose](#12-purpose)
    - [1.3 Scope](#13-scope)
    - [1.4 Name Explanation](#14-name-explanation)
    - [1.5 Team \& Roles](#15-team--roles)
  - [Requirements](#requirements)
    - [2.1 Core Requirements](#21-core-requirements)
      - [a. Recipe Selection \& Meal Planning](#a-recipe-selection--meal-planning)
      - [b. Pantry Inventory Management](#b-pantry-inventory-management)
      - [c. Intelligent Recipe Suggestions via Chatbot](#c-intelligent-recipe-suggestions-via-chatbot)
      - [d. Recipe Access \& Cooking Guidance](#d-recipe-access--cooking-guidance)
    - [2.2 Deliverables](#22-deliverables)
    - [2.3 Functional Requirements](#23-functional-requirements)
    - [2.4 Non Functional Requirements](#24-non-functional-requirements)
  - [Context](#context)
    - [Personas](#personas)
      - [Persona 1: Eco-Conscious Emily](#persona-1-eco-conscious-emily)
      - [Persona 2: Budget-Conscious Bob](#persona-2-budget-conscious-bob)
    - [Use Cases](#use-cases)
  - [Risk](#risk)
    - [Data Security \& Integrity](#data-security--integrity)
    - [Risk Assessment](#risk-assessment)
    - [Market Competitors](#market-competitors)
    - [Risk Management Plan](#risk-management-plan)
  - [Future Improvements](#future-improvements)

</details>

---

## Introduction

### 1.1 Glossary // Important to adjust and modify it

| **Term**                        | **Definition**                                                                                                                                              |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Avoid Food Waste Application**| A mobile/web application designed to reduce household food waste by facilitating efficient meal planning, pantry management, and intelligent shopping.    |
| **Recipe Selection**            | The process by which users choose desired recipes from a curated database, with options to customize servings to fit their needs.                             |
| **Meal Planning**               | The practice of scheduling meals ahead of time, taking into account user preferences and existing pantry stock, to optimize food usage and reduce waste.    |
| **Automated Shopping List Generation** | A feature that calculates and compiles a shopping list with precise quantities of ingredients needed based on the selected recipes and serving sizes. |
| **Pantry Inventory Management** | A system that allows users to input and track food items already available at home, facilitating smarter shopping by preventing redundant purchases.       |
| **Intelligent Chatbot**         | An python conversational agent that assists users in finding recipes by analyzing available ingredients and preferences through interactive dialogue.  |
| **Expiration Tracking**         | The monitoring of expiration dates for perishable items in the pantry, with timely notifications to encourage usage before spoilage occurs.                  |

### 1.2 Purpose

The purpose of the **0waste** application is to minimize household food waste by helping users manage their meal planning, pantry inventory, and shopping intelligently. The app empowers individuals to make informed food choices, reduce over-purchasing, and ultimately save money while contributing to environmental sustainability.

### 1.3 Scope

The application is designed for everyday users such as families, students, and eco-conscious consumers. It will offer:

- **Recipe Selection with Customizable Servings:** Users can choose recipes and adjust servings to suit their needs.
- **Automated Shopping List Generation:** The system calculates and compiles the exact quantities of ingredients required.
- **Pantry Inventory Management:** Incorporates current pantry stock into meal planning to avoid unnecessary purchases.
- **Intelligent Chatbot for Recipe Suggestions:** Provides tailored recipe ideas based on available ingredients and user preferences.
- **Additional Enhancements:** Features such as expiration tracking and integration with loyalty programs to further optimize food management.

### 1.4 Name Explanation

The project is named **0watse** because the name offers multiple interpretations. It can be read as "zero waste," aligning with the goal of eliminating food waste, or as a suggestion to "use all you have," emphasizing resource optimization. Moreover, the name is concise and easy to communicate.

### 1.5 Team & Roles

All the roles will be handle by myself.

| **Role**             | **Description**                                                                                                                                           |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Project Manager**  | Oversees planning, organization, and budgeting. Ensures the team stays on track and motivated.                                                            |
| **Program Manager**  | Defines project goals and ensures alignment with expectations. Leads design efforts and authors the Functional Specifications document.                  |
| **Technical Leader** | Drives technical decisions, translates Functional Specifications into Technical Specifications, reviews code, and provides guidance throughout development. |
| **Technical Writer** | Develops and maintains documentation, including user manuals and technical guides. Collaborates with engineers to ensure clarity and accuracy.             |
| **Software Engineer**| Implements features through coding, participates in technical design discussions, and contributes to maintaining up-to-date documentation.                |
| **Quality Assurance**| Tests features to identify bugs and inconsistencies, documents issues, verifies fixes, and develops/executestest plans.                                     |

---

## Requirements

### 2.1 Core Requirements

#### a. Recipe Selection & Meal Planning

- **User Input:**  
  - Users can browse and select recipes from a curated database.
  - Option to specify the number of servings per recipe.
- **Automated Shopping List:**  
  - The app calculates the exact quantities of ingredients required based on the selected recipe and specified servings.
  - Automatically generates and updates the shopping cart with the required items.

*Example:*  
A user selects a lasagna recipe for four servings; the application computes the precise amounts of each ingredient and adds them to the shopping list.

```mermaid
sequenceDiagram
    participant User
    participant App
    User->>App: Selects Recipe and Servings (Lasagna, 4 servings)
    App->>App: Calculates ingredient quantities
    App->>User: Displays Shopping List
```

#### b. Pantry Inventory Management

- **Product Addition:**  
  - Users can manually add items they already have in their pantry, including quantity and (optionally) expiration dates. This helps in keeping track of the food they have and prevents over-purchasing.
  
- **Smart Shopping Cart:**  
  - The system cross-references pantry items with the recipe requirements. This ensures that ingredients that are already in stock are not added to the shopping list, saving time and money.
  - Omits ingredients already available, preventing duplicate purchases and optimizing shopping.

*Example:*  
If a recipe requires 200g of pasta and the user has 100g in stock, the shopping list is adjusted to add only the additional 100g required.

```mermaid
sequenceDiagram
    participant User
    participant App
    User->>App: Adds pasta to pantry (100g)
    User->>App: Selects recipe for lasagna
    App->>App: Compares ingredients with pantry
    App->>User: Updates shopping list (only 100g needed)
```

#### c. Intelligent Recipe Suggestions via Chatbot

- **User Interaction:**  
  - A chatbot interacts with users to help them find recipes based on available ingredients or specific preferences. It can understand natural language and suggest recipes accordingly.
  
- **Conversational Guidance:**  
  - The chatbot refines search criteria through dialogue. It can ask follow-up questions like "Do you prefer vegetarian recipes?" or "Do you have any dietary restrictions?" to suggest appropriate recipes.

*Example:*  
A user mentions they have salmon but isn’t sure how to prepare it. The chatbot will propose several salmon-based recipes and allow the user to choose one.

```mermaid
sequenceDiagram
    participant User
    participant Chatbot
    User->>Chatbot: "I have salmon, what can I make?"
    Chatbot->>Chatbot: Refines recipe options
    Chatbot->>User: Suggests salmon-based recipes
```

#### d. Recipe Access & Cooking Guidance

- **Digital Cookbook:**  
  - Provides detailed, step-by-step cooking instructions for chosen recipes, accessible at any time. Users can follow along as they cook and return to any step if needed.
  
- **Ingredient Tracking:**  
  - Highlights which ingredients are already available in the user's pantry versus those that need to be purchased, ensuring the user knows exactly what to buy.

*Example:*  
After selecting a recipe, the user can view comprehensive cooking instructions and clearly identify which ingredients to buy based on what they already have in their pantry.

```mermaid
sequenceDiagram
    participant User
    participant App
    User->>App: Selects recipe for lasagna
    App->>User: Displays step-by-step cooking instructions
    App->>User: Shows available ingredients vs required
```

### 2.2 Deliverables

| **Deliverable**             | **Description**                                                      | **Deadline**  |
|-----------------------------|----------------------------------------------------------------------|---------------|
| Functional Specifications   | Detailed document outlining the functional requirements              | --/--/----    |
| Technical Specifications    | Document detailing technical implementation plans                    | --/--/----    |
| Test Plan                   | Comprehensive plan for testing all application features                | --/--/----    |
| Test Cases                  | Specific test cases to validate functionality                          | --/--/----    |
| Code Repository             | Source code for the application                                        | --/--/----    |
| User Manual                 | Documentation for end-users including tutorials and guides             | --/--/----    |

---

### 2.3 Functional Requirements

- **User Interaction Flows:**  
  Detailed workflows for recipe selection, pantry management, and chatbot interactions. This section outlines the paths users will take when using the app, ensuring an intuitive flow.
  
- **Data Processing:**  
  Accurate calculation of ingredient quantities and automated shopping list generation based on user input and existing pantry inventory. The system processes data efficiently to give accurate results quickly.

- **System Integration:**  
  Seamless coordination between the recipe database, inventory management system, and chatbot module to deliver a cohesive user experience. All components should work together smoothly to avoid confusion or disruptions.

```mermaid
flowchart TD
    A[User selects recipe] --> B[App checks pantry]
    B --> C[App generates shopping list]
    C --> D[Shopping list displayed to user]
```

### 2.4 Non Functional Requirements

- **Performance:**  
  The application must generate shopping lists and update inventories in real time with minimal latency. Users should not experience delays when adding items or selecting recipes.

- **Scalability:**  
  The system should efficiently handle an increasing number of recipes and pantry entries without degradation in performance. As the app grows, it should be able to accommodate new features and additional users without issues.

- **Usability:**  
  The user interface must be intuitive and accessible to a wide range of users, ensuring a smooth and engaging experience. This includes support for accessibility features (e.g., text-to-speech, high-contrast mode).

- **Security:**  
  Although minimal sensitive data is handled, secure authentication (if implemented) and robust data integrity measures must be enforced to protect user data.

- **Compatibility:**  
  The application must work on modern web browsers and be responsive to different screen sizes, ensuring accessibility across various devices (e.g., smartphones, tablets, desktops).

- **Reliability:**  
  The system should maintain high availability and consistently process user inputs accurately, even under load. This ensures that users can rely on the application without disruptions.

```mermaid
graph TD
    A[User Input] --> B[Recipe Selection]
    B --> C[Shopping List Generation]
    C --> D[Pantry Inventory Management]
    D --> E[Recipe Access & Cooking Guidance]
```

---

## Context

### Personas

#### Persona 1: Eco-Conscious Emily

<img src="../../images/emily.jpg" width="300" alt="Logo"/>

- **Role:** Home Cook & Sustainability Advocate  
- **Age:** 30  
- **Background:** Emily is passionate about reducing her environmental impact and practices sustainable living. She is always looking for ways to minimize waste and optimize her food consumption.  
- **Needs:**  
  - A tool to plan meals based on her existing pantry items.  
  - Notifications for food nearing expiration.  
  - Suggestions for recipes that help reduce waste and promote sustainability.
- **Goals:**  
  - To save money by using what she already has.  
  - To reduce food waste and lower her carbon footprint.

#### Persona 2: Budget-Conscious Bob

<img src="../../images/bob.jpg" width="300" alt="Logo"/>

- **Role:** Student & Part-Time Worker  
- **Age:** 22  
- **Background:** Bob is on a tight budget and often struggles with food expenses. He wants to avoid overbuying and make the most out of his grocery shopping.  
- **Needs:**  
  - A smart shopping list that adjusts based on his pantry inventory.  
  - Recipe suggestions that are both affordable and efficient.
- **Goals:**  
  - To stick to a budget by preventing unnecessary purchases.  
  - To reduce waste by planning meals with the food he already owns.

### Use Cases

| **Use Case**                             | **Description**                                                                                          | **Actor**                     |
|------------------------------------------|----------------------------------------------------------------------------------------------------------|-------------------------------|
| **Meal Planning & Recipe Selection**     | The user selects a recipe and specifies the number of servings; the app generates an accurate shopping list. | Eco-Conscious Emily, Budget-Conscious Bob |
| **Inventory-Based Shopping List**        | The user adds their pantry items, and the system adjusts the shopping list by removing items already available. | Eco-Conscious Emily, Budget-Conscious Bob |
| **Chatbot Recipe Assistance**            | The user interacts with a chatbot to find recipes based on ingredients they have or specific cravings.      | Eco-Conscious Emily           |
| **Expiration Date Notifications**        | The system sends alerts when items in the pantry are nearing their expiration date, suggesting relevant recipes. | Eco-Conscious Emily, Budget-Conscious Bob |
| **Discount & Loyalty Integration**       | The app alerts the user about discounted ingredients at partnered stores and integrates loyalty rewards.    | Budget-Conscious Bob          |
| **Community Food Sharing**               | Users can offer surplus food to nearby app members, fostering community support and reducing waste.        | Eco-Conscious Emily           |

---

## Risk

### Data Security & Integrity

- **Authentication:**  
  - Minimal login authentication is implemented to control access, even though the application primarily manages non-sensitive food ingredient data.  
  - Should the scope expand to include sensitive information (e.g., card details), enhanced authentication and security protocols will be introduced.

- **Data Sensitivity:**  
  - The application primarily handles data related to food ingredients, recipes, and inventory, which are not inherently sensitive.
  - In the event that sensitive data is integrated, such as payment information, robust encryption and secure data storage practices will be enforced.

- **Precision & Relevance:**  
  - The system is engineered to prioritize accurate calculations and reliable data management.
  - Comprehensive validation measures and quality checks ensure that the application delivers precise results and effective management support.

- **Security Best Practices:**  
  - Despite its internal use, industry-standard security measures will be adopted to maintain data integrity and support potential future enhancements.

### Risk Assessment

| **Risk**                                          | **Likelihood** | **Impact** | **Mitigation Strategy**                                      |
|---------------------------------------------------|----------------|------------|--------------------------------------------------------------|
| Over-purchasing due to inaccurate calculations    | Medium         | High       | Implement robust unit tests and user feedback loops.         |
| Poor integration with external discount systems   | Medium         | Medium     | Regularly update API connections and monitor partner data.   |
| Inaccurate AI recognition in inventory management   | High           | High       | Continuously train the AI model and incorporate manual correction options. |
| User adoption challenges due to complex UI        | Medium         | Medium     | Focus on a minimalist, intuitive design and provide tutorials. |
| Data loss in inventory records                    | Low            | High       | Implement backup solutions and data validation checks.       |

### Market Competitors

Several applications currently address food waste reduction, including:

- **Too Good To Go:** Connects users with restaurants and shops selling surplus food at discounted prices.
- **Karma:** Enables retailers to sell surplus food to consumers at reduced prices.
- **Olio:** Facilitates sharing of surplus food among neighbors and local businesses.
- **Jow:** Provides personalized recipe recommendations and transforms them into shopping lists integrated with retail services.

*Note:* Unlike these competitors, the **Avoid Food Waste** application focuses on individual household management, personalized meal planning, and dynamic pantry integration.

### Risk Management Plan

- **Risk Identification:**  
  All potential risks, from technical issues (e.g., scalability and AI inaccuracies) to user-centric concerns (e.g., UI complexity and data security), are identified early in the development cycle.

- **Risk Analysis:**  
  Each risk is evaluated based on likelihood and impact, ensuring that high-risk items (like AI recognition errors and scalability issues) receive priority attention.

- **Risk Mitigation:**  
  - **Technical Risks:**  
    Implement comprehensive unit and integration tests, continuously update API integrations, and optimize system architecture to support scalability and reliability.
  - **User-Centric Risks:**  
    Simplify the UI with iterative user testing, provide tutorials, and maintain minimal personal data storage with robust encryption.
  - **Data Security:**  
    Regularly audit data handling practices, comply with data protection laws, and ensure secure data transmission and storage.
  
- **Monitoring & Review:**  
  Establish a schedule for regular risk assessments and adjust mitigation strategies based on real-world usage and feedback. Set up monitoring tools to track system performance and user engagement.

- **Contingency Planning:**  
  Develop contingency protocols for critical failures (e.g., data loss or system downtime) including immediate recovery plans and communication strategies with users.

This risk management plan will be continuously updated throughout the project lifecycle to ensure proactive handling of any issues that arise.

## Future Improvements

1. **Partnerships with Major Supermarkets**
   - Integrate direct ordering through the app (pickup/delivery options).
2. **Advanced AI Enhancements**
   - Personalize recipe and shopping suggestions based on user habits.
   - Incorporate voice command functionality for hands-free operation.
3. **Sustainability Metrics**
   - Add carbon footprint analysis for meals and shopping choices.
   - Provide eco-friendly recommendations for ingredient substitutions.
4. **Expanded Community Features**
   - Enhance food-sharing capabilities with user ratings and verification.
   - Create forums for recipe exchange and sustainable practices discussion.
5. **Enhanced Reporting & Analytics**
   - Develop dashboards to track food waste reduction and cost savings over time.
   - Export shopping and inventory data for further analysis.
