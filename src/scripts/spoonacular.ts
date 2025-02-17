import { translate } from "./geminiAI";

export const API_KEY = "b42bbd255cbf4135a62e811ad72dc9b0"; // fazer variável de ambiente

export interface Ingredient {
    name: string;
    id: string;
    amount: number;
    unit: string;
}

// Função que recebe uma lista de objetos representando o ingrediente com nome, unidade de medida e quantidade 
export function transformIngredient(ingredients: {name : string, unit : string, amount : number}[]) {

    const newIngredients: Ingredient[] = ingredients.map((ingredient, index) => ({
        name: ingredient.name,
        id: `id-${index}`,  // ID fictício 
        amount: ingredient.amount,           
        unit: ingredient.unit,        
    }));

    return newIngredients;// retorna uma lista de objetos da interface Ingredient, agora possuem um ID
}

export async function getIngredientId(ingredient: Ingredient) {

    let ingridentInEnglish = await translate(ingredient.name);  
    
    const url = `https://api.spoonacular.com/food/ingredients/search?query=${ingridentInEnglish}&number=1&apiKey=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      
      const data = await response.json();
      if (data.results.length > 0) {
        ingredient.id = data.results[0].id;
        console.log(`ID de ${ingredient.name} : ${ingredient.id}`)
      } else {
        console.log(`Nenhum correspondente a ${ingredient.name}.`);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }
  
 
  
