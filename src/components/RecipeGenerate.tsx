import React, { useState } from "react";
import '../Styles/RecipeGenerate.css';
import { getRecipe } from '../controllers/geminiAI/getRecipe';
import { getNutrition } from '../controllers/spoonacular/getNutritients';
import Recipe from "./Recipe";
import NutritionTable from "./nutritionTable";
import { getRecipeImage } from "@/controllers/serpAPI/getImage";

export default function RecipeGenerate() {
  const [geminiAI, setGeminiAI] = useState<any | null>(null);
  const [nutritionData, setNutritionData] = useState<any[]>([]);
  const [userIngredientes, setUserIngredientes] = useState("");
  const [possibleImages, setImagesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const listUserIngredients = userIngredientes.split(';');
    
    try {
      const response = await getRecipe(listUserIngredients);
      const nutrition = await getNutrition(response.ingredients);
      const images = await getRecipeImage(response.title);
      
      setGeminiAI(response);
      setNutritionData(nutrition);
      setImagesList(images);
    } catch (error) {
      console.error("Erro ao gerar a receita:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="generateRecipe">
      {!loading && !geminiAI ? (
        <div className="inputGenerate">
          <input 
            className="input"
            value={userIngredientes}
            onChange={(e) => setUserIngredientes(e.target.value)}
            placeholder="Digite os ingredientes separados por ';'"
            type="text"
          />
          {userIngredientes && <button className="button" onClick={handleGenerate}>Gerar minha receita</button>}
        </div>
      ) : loading ? (
        <h2>LOADING...</h2>
      ) : (
        <div className="notebook">
          <div className="recipeContent">
            <div className="recipe-top">
              <h1>{geminiAI.title}</h1>
              <div className="img-content">
                {possibleImages.map((imgURL, index) => (
                  <img key={index} src={imgURL} alt={`Resultado ${index}`} />
                ))}
              </div>
            </div>
            <div className="text-content">
              <Recipe ingredients={geminiAI.ingredients} preparation={geminiAI.preparation} harmonizations={geminiAI.harmonizations} />
              <NutritionTable nutritionData={nutritionData} />
            </div>
            <button className="button" onClick={() => { setGeminiAI(null); setUserIngredientes(""); setImagesList([]); }}>Gerar outra receita</button>
          </div>
        </div>
      )}
    </div>
  );
}
