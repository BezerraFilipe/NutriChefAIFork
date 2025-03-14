import { transformIngredient } from "../src/controllers/spoonacular/transform-ingredient";
import { getIngredientId } from "../src/controllers/spoonacular/get-id";
import { getNutrition } from "../src/controllers/spoonacular/get-nutrients";
import { clearJson } from "../src/controllers/clear-Json.js";
import { GoogleGenerativeAI } from "@google/generative-ai"

function transformIngredientTest(){
    console.log('Teste de caso, entrada: "[{ name: "Sugar", unit: "g", amount: 100 }]" \nsaída esperada: [ { name: "Sugar", id: "id-0", amount: 100, unit: "g" } ]')
    console.log(transformIngredient([{ name: "Sugar", unit: "g", amount: 100 }]))
}

async function getIngredientIdTest(){
    console.log('Teste de caso normal, entrada: "Sugar" \nsaída esperada: 19335')
    const ingredient = [{ name: "Sugar", unit: "g", amount: 100 }];
    let newingredients = await transformIngredient(ingredient);
    await Promise.all(newingredients.map( 
        async (ingredient) => await getIngredientId(ingredient)
      ));
    console.log(newingredients)
}

async function getNutritionTest(){
    console.log('Teste de caso normal, entrada: "[{ name: "Sugar", unit: "g", amount: 100 }]" \nsaída esperada: "[{Proteinas: ..., Carboidratos: ...}]"')
    const ingredient = [{ name: "Sugar", unit: "g", amount: 100 }];
    const newIngredient = await getNutrition(ingredient);
    console.log(newIngredient);
}

function clearJsonTest(){
    console.log('Teste de caso normal, entrada: " asdasdas {"nome": "João", "idade": 25}" \nsaída esperada: { nome: "João", idade: 25 }')
    console.log(clearJson(' asdasdas {"nome": "João", "idade": 25}'))

    console.log('Teste de caso inválido, entrada: "{"nome": "Maria", "idade":" \nsaída esperada: Mensagem de erro no console ')
    console.log(clearJson('{"nome": "Maria", "idade":'))
}

async function geminiAITest(){
    console.log('Teste de caso normal, entrada: "Responda essa mensagem com um "API funcionando"" \nsaída esperada: "API funcionando"')
    const genAI = new GoogleGenerativeAI("AIzaSyACvNTNOeOaoZJQbvD13vKSP3re2UjKCK4");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent('Responda essa mensagem com um "API funcionando"')

    console.log(result.response.text())
}