//import { error } from "console";
import {clearJson} from "./convertJson"

const { GoogleGenerativeAI } = require("@google/generative-ai");

  // Configura a API do Google Generative AI
  const genAI = new GoogleGenerativeAI("AIzaSyAy-e2iqgTSiaiLjpYki3nSMbLt4OxSLJY");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getRecipe(ingredients) { //recebe uma lista de ingredientes

    // Define o prompt com base nos ingredientes
   
   let prompt = `Crie uma receita culinária usando os seguintes ingredientes:`;
    for (let i = 0; i < ingredients.length; i++) {
      prompt += ` ${ingredients[i]}`
    }
    
    prompt += `;\n A resposta deve ser formatada como num arquivo JSON, no seguinte modelo:
      {
        "title": "um nome criativo para o prato",
        "ingredientes": [
          "ingrediente 1",
          "ingrediente 2",
          "ingrediente 3", ...
          "1ingrediente n-2",
          "ingrediente n-1",
          "ingrediente n"
        ],
        "modoDePreparo": [
            "Passo 1",
            "Passo 2",
            "Passo 3", ...
            "Passo i-2",
            "Passo i-1",
            "Passo i"
          ],
        "harmonizacoes": [
          {
            "dica": "dica 1 de harmonização para o prato criado",
            "justificativa": "justificativa para dica 1"
          },
          {
            "dica": "dica 2 de harmonização para o prato criado",
            "justificativa": "justificativa para dica 2."
          },
        ]
    }

    Onde i<=8
    `;
    
 
    // Aguarda a resposta da API
    const result = await model.generateContent(prompt)
    const cleanText = clearJson(result.response.text())
   // console.log(cleanText);
    //console.log(typeof(cleanText));
    // Exibe o resultado no console

   

    return cleanText; 
}




