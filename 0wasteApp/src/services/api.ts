// Spoonacular API constants
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

// Data types
export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions: string;
  ingredients?: SpoonacularIngredient[]; // optional, added later
}

export interface SpoonacularIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  image: string;
}

// Search recipes by query
export const searchRecipes = async (query: string, number: number = 10): Promise<SpoonacularRecipe[]> => {
  try {
    const url = `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${encodeURIComponent(query)}&number=${number}&addRecipeInformation=true`;
    console.log('Fetching recipes from:', url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('API error response:', errorText);
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching recipes:', error);
    return getMockRecipes();
  }
};

// Fetch full recipe details (excluding ingredients)
export const getRecipeDetails = async (recipeId: number): Promise<SpoonacularRecipe | null> => {
  try {
    const url = `${BASE_URL}/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=false`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch recipe details for ID ${recipeId}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return null;
  }
};

// Fetch ingredients for a specific recipe
export const getRecipeIngredients = async (recipeId: number): Promise<SpoonacularIngredient[]> => {
  try {
    const url = `${BASE_URL}/recipes/${recipeId}/ingredientWidget.json?apiKey=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ingredients for recipe ID ${recipeId}`);
    }

    const data = await response.json();
    return data.ingredients;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return [];
  }
};

// Search recipes using a list of ingredients
export const searchRecipesByIngredients = async (ingredients: string[], number: number = 5): Promise<any[]> => {
  try {
    const ingredientsString = ingredients.join(',');
    const url = `${BASE_URL}/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${encodeURIComponent(ingredientsString)}&number=${number}&ranking=1&ignorePantry=false`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch recipes by ingredients');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching by ingredients:', error);
    return [];
  }
};

// Fetch full recipe with both details and ingredients
export const fetchFullRecipe = async (recipeId: number): Promise<SpoonacularRecipe | null> => {
  const details = await getRecipeDetails(recipeId);
  const ingredients = await getRecipeIngredients(recipeId);

  if (!details) return null;

  return {
    ...details,
    ingredients,
  };
};

// Mock recipes (used if API fails or during development)
export const getMockRecipes = (): SpoonacularRecipe[] => {
  return [
    {
      id: 1,
      title: "Vegetable Stir Fry",
      image: "https://spoonacular.com/recipeImages/1-556x370.jpg",
      imageType: "jpg",
      readyInMinutes: 30,
      servings: 4,
      summary: "A quick and healthy vegetable stir fry with a savory sauce.",
      instructions: "1. Chop all vegetables. 2. Heat oil in a pan. 3. Add vegetables and stir fry for 5-7 minutes. 4. Add sauce and cook for another 2 minutes.",
      ingredients: [
        { id: 1, name: "Bell Pepper", amount: 2, unit: "whole", image: "" },
        { id: 2, name: "Broccoli", amount: 1, unit: "cup", image: "" },
        { id: 3, name: "Carrots", amount: 2, unit: "whole", image: "" },
        { id: 4, name: "Soy Sauce", amount: 2, unit: "tbsp", image: "" }
      ]
    },
    {
      id: 2,
      title: "Creamy Tomato Pasta",
      image: "https://spoonacular.com/recipeImages/2-556x370.jpg",
      imageType: "jpg",
      readyInMinutes: 20,
      servings: 2,
      summary: "A simple and delicious creamy tomato pasta.",
      instructions: "1. Cook pasta according to package directions. 2. Heat olive oil and sauté garlic. 3. Add tomatoes and cream. 4. Mix with pasta.",
      ingredients: [
        { id: 5, name: "Pasta", amount: 200, unit: "g", image: "" },
        { id: 6, name: "Tomatoes", amount: 3, unit: "whole", image: "" },
        { id: 7, name: "Cream", amount: 100, unit: "ml", image: "" },
        { id: 8, name: "Garlic", amount: 2, unit: "cloves", image: "" }
      ]
    },
    {
      id: 3,
      title: "Banana Smoothie Bowl",
      image: "https://spoonacular.com/recipeImages/3-556x370.jpg",
      imageType: "jpg",
      readyInMinutes: 10,
      servings: 1,
      summary: "A refreshing and nutritious smoothie bowl with bananas and berries.",
      instructions: "1. Blend frozen bananas with milk. 2. Pour into a bowl. 3. Top with fresh fruits and nuts.",
      ingredients: [
        { id: 9, name: "Bananas", amount: 2, unit: "whole", image: "" },
        { id: 10, name: "Milk", amount: 150, unit: "ml", image: "" },
        { id: 11, name: "Berries", amount: 1, unit: "cup", image: "" },
        { id: 12, name: "Nuts", amount: 2, unit: "tbsp", image: "" }
      ]
    }
  ];
};
