import React, { useState } from "react";

import  '../Styles/RecipeGenerate.css';

import {getRecipe} from '../scripts/geminiAI';
import {transformIngredient, getIngredientId, API_KEY} from '../scripts/spoonacular'
import Recipe from "./Recipe";


export default function RecipeGenerate() {
  const [geminiAI, setGeminiAI] = useState <any | null>(null);
  const [userIngredientes, setUserIngredientes] = useState(""); // Para capturar o valor do input

  
  
  // Função chamada ao clicar no botão
  const handleGenerate = async () => {
    const listUserIngredients = userIngredientes.split(';')
    

    try {
        const response = await getRecipe(listUserIngredients);
        let newingredients = transformIngredient(response.ingredients)
        let ingredientsID = newingredients.map(async (ingredient) =>  await getIngredientId(ingredient));
        
        setGeminiAI(response);
        
    } catch (error) {
        console.error("Erro ao gerar a receita:", error);
    }
  };

  return (
    <div className="generateRecipe">
      <div className="inputGenerate">
        {/* Campo de input */}
            <input className="input"
            value={userIngredientes}
            onChange={(e) => setUserIngredientes(e.target.value)} // Atualiza o estado em tempo real
            placeholder="Digite os ingredientes separados por ';'"
            type="text"
            />
            {userIngredientes && (<button className="button" onClick={handleGenerate}>Gerar minha receita</button>)}
            
      </div>
      
      
      {/* Renderiza receita se geminiAI existir */}
      {geminiAI ? (
        <div className="notebook">  
          <div className="recipeContent">
            <div className="recipe-top">
              <h1>{geminiAI.title}</h1>
              <div className="img-content">IMAGEM GERADA</div>
            </div>
            <div className="text-content">
           
              <Recipe  ingredients={geminiAI.ingredients} preparation={geminiAI.preparation} harmonizations={geminiAI.harmonizations}/>
            </div>
                    
          </div>                  
        </div>
                ) : null}
    </div>
  );
}