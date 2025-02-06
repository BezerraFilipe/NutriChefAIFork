import { translate } from "./geminiAI";

export const API_KEY = "b42bbd255cbf4135a62e811ad72dc9b0"; // fazer variável de ambiente

export interface Ingredient {
    name: string;
    id: string;
    amount: number;
    unit: string;
    carb?: number;
    fat?: number;
    ptn?: number;
    cal?: number;
    
}

// Recebe a lista de ingredientes gerada pela GeminiAI, retorna lista de objetos do tipo Ingredient com todas informações nutricionais
export async function getNutrition(ingredients: {name : string, unit : string, amount : number}[]) {
  
  let newingredients = await transformIngredient(ingredients);
  await Promise.all(newingredients.map( async (ingredient) => await getIngredientId(ingredient)));
  

  Promise.all(newingredients.map(async (ingredient) => {
    const url = `https://api.spoonacular.com/food/ingredients/${ingredient.id}/information?amount=${ingredient.amount}&unit=${ingredient.unit}&apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {// caso não tenha sido possível encontrar o ingrediente na API
          ingredient.cal = -1;
          ingredient.carb = -1;
          ingredient.fat = -1;
          ingredient.ptn = -1;
        }else{// qualquer outro erro
          throw new Error(`Erro na requisição: ${response.status}`);
        }
      }

      const data = response.json();
      console.log(`${ingredient.name} informations: `,data);
      
      /*
      ingredient.cal = -1;
      ingredient.carb = -1;
      ingredient.fat = -1;
      ingredient.ptn = -1;
      */

    } catch (error) {
      console.error("Erro:", error);
    }

  }))


  return newingredients;
}

// Função que recebe uma lista de objetos representando o ingrediente com nome, unidade de medida e quantidade; retorna este mesmo objeto porém como pertencente à interface Ingredient 
export async function transformIngredient(ingredients: {name : string, unit : string, amount : number}[]) {

    const newIngredients: Ingredient[] = ingredients.map((ingredient, index) => ({
        name: ingredient.name,
        id: `id-${index}`,  // ID fictício 
        amount: ingredient.amount,           
        unit: ingredient.unit,        
    }));

    return newIngredients;// retorna uma lista de objetos da interface Ingredient, agora possuem um ID
}
// Recebe um objeto do tipo Ingredient e adiciona à sua propriedade "id" seu respectivo id na API spoonancular
export async function getIngredientId(ingredient: Ingredient) {

    let ingridentInEnglish = await translate(ingredient.name);
    
    const url = `https://api.spoonacular.com/food/ingredients/search?query=${ingridentInEnglish.translated}&number=1&apiKey=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      
      const data = await response.json();

      if (data.results.length > 0) {
        ingredient.id = data.results[0].id;
        console.log(`ID de ${ingredient.name} : ${ingredient.id}`)

      } else {
        console.log(`${ingredient.name} não encontrado na API`);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }
  

  
