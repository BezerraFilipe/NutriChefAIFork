import { Ingredient } from "../src/interfaces/Ingredient";
import { transformIngredient } from "../src/controllers/spoonacular/transform-ingredient";
import { getIngredientId } from "../src/controllers/spoonacular/get-id";
import { getNutrition } from "../src/controllers/spoonacular/get-nutrients";
import { clearJson } from "../src/controllers/clear-Json";
import { GoogleGenerativeAI } from "@google/generative-ai";

describe("Transformação de Ingredientes", () => {
    it("Deve transformar os ingredientes corretamente", async () => {
        const input = [{ name: "Sugar", unit: "g", amount: 100 }];
        const expectedOutput = [{ name: "Sugar", id: "id-0", amount: 100, unit: "g" }];
        let result = await transformIngredient(input);
        expect(result).toEqual(expectedOutput);
    });
});

describe("Busca por ID do Ingrediente", () => {
    it("Deve retornar o id do ingrediente correto", async () => {
        const ingredient = [{ name: "Sugar", unit: "g", amount: 100 }];
        let newIngredients = await transformIngredient(ingredient);
        await Promise.all(newIngredients.map(
            async (ingredient : Ingredient) => await getIngredientId(ingredient)
        ));
        expect(newIngredients[0].id).toBe(19335);
    });

    it("Deve retornar uma mensagem de erro", async () =>{
        const ingredient = [{ name: 'dakdhajdaudnaudha', unit: "g", amount: 100 }];
        let newIngredients = await transformIngredient(ingredient);
        expect(await Promise.all(newIngredients.map(
            async (ingredient : Ingredient) => await getIngredientId(ingredient)
        ))).toThrow();
    });
});

describe("Obtenção de Informações Nutricionais", () => {
    it("Deve retornar as informações nutricionais corretamente", async () => {
        const ingredient = [{ name: "Sugar", unit: "g", amount: 100 }];
        const nutrition = await getNutrition(ingredient);
        expect(nutrition[0]).toHaveProperty("cal");
        expect(nutrition[0]).toHaveProperty("carb");
        expect(nutrition[0]).toHaveProperty("fat");
        expect(nutrition[0]).toHaveProperty("ptn");
    });

    it("Deve retornar uma mensagem de erro", async () => {
        const ingredient = [{ name: "dakdhajdaudnaudha", unit: "g", amount: 100 }];
        expect(await getNutrition(ingredient)).toThrow();
    });
});

describe("Testar JSON", () => {
    it("Deve limpar o Json corretamente", () => {
        const input = ' asdasdas {"nome": "João", "idade": 25}';
        const expectedOutput = { nome: "João", idade: 25 };
        expect(clearJson(input)).toEqual(expectedOutput);
    });

    it("Deve retornar uma mensagem de erro", () => {
        const invalidInput = '{"nome": "Maria", "idade":';
        try {
            clearJson(invalidInput);
        } catch (error) {
            expect(error).toBeInstanceOf(SyntaxError);
        }
    })
});
    
describe("Teste API - geminiAI", () => {
    it("Deve retornar a resposta esperada", async () => {
        const genAI = new GoogleGenerativeAI("AIzaSyACvNTNOeOaoZJQbvD13vKSP3re2UjKCK4");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent('Responda essa mensagem com um "API funcionando"');
        
        expect(result.response.text()).toContain("API funcionando");
    });
});