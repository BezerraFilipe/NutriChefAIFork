import React, { useState } from "react";

import  '../Styles/RecipeGenerate.css';

import {getRecipe} from '../controllers/geminiAI/getRecipe';
import {getNutrition} from '../controllers/spoonacular/getNutritients'
import Recipe from "./Recipe";
import NutritionTable from "./nutritionTable";


export default function RecipeGenerate() {
  const [geminiAI, setGeminiAI] = useState <any | null>(null);
  const [nutritionData, setNutritionData] = useState<any[]>([]);
  const [userIngredientes, setUserIngredientes] = useState(""); // Para capturar o valor do input
  
  
  // Função chamada ao clicar no botão
  const handleGenerate = async () => {
    const listUserIngredients = userIngredientes.split(';')
    

    try {
        const response = await getRecipe(listUserIngredients);
        let nutrition = await getNutrition(response.ingredients);
          console.log(nutrition)

        
        setGeminiAI(response);
        setNutritionData(nutrition);

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
              <NutritionTable nutritionData={nutritionData} />
            </div>
            

            </div>        
        </div>
                ) : null}
    </div>
  );
}