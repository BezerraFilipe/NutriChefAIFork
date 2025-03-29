import React, { useState } from "react";

import  '../styles/RecipeGenerate.css';

import {getRecipe} from '@/services/geminiAI/get-recipe';
import Recipe from "./Recipe";
import NutritionTable from "./nutritionTable";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { ScrollArea } from "@/components/scroll-area";
import { Send, Share2 } from "lucide-react";
import { getNutrition } from "@/services/spoonacular/get-nutrients";
import { getRecipeImage } from "@/services/serpAPI/get-image";
import IMGselector from "./Img-selector";

type Message = { role: string, text: string, geminiAI: any, nutrition: any , images: any }


export default function RecipeGenerate() {
  const [userIngredientes, setUserIngredientes] = useState(""); // Para capturar o valor do input
  
  
  // Função chamada ao clicar no botão
  const handleGenerate = async () => {

    setMessages((prev) => [...prev, { role: "user", text: userIngredientes, geminiAI: null, nutrition: null , images : null}]);

    console.log(messages)    
    setMessages((prev) => [...prev, { role: "bot", text: "Aguarde enquanto a receita é gerada!", geminiAI: null, nutrition: null, images : null}]);

    console.log(messages)


    const listUserIngredients = userIngredientes.split(';')
    try {
        const response = await getRecipe(listUserIngredients);
        const nutrition = await getNutrition(response.ingredients);
        const images = await getRecipeImage(response.title);
        console.log("Imagens retornadas pela API:", typeof(images), images);

        
        setMessages((prev) => [...prev, { role: "bot", text: userIngredientes, geminiAI: response, nutrition: nutrition, images : images}]);

        setUserIngredientes("");
        
    } catch (error) {
        console.error("Erro ao gerar a receita:", error);
        
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Olá! 👋 Eu sou o assistente de receitas. Para começar, envie os ingredientes que você tem disponíveis, separados por ponto e vírgula (;), e eu vou ajudar a encontrar uma receita para você! 😊 Exemplo: “farinha; açúcar; ovos; leite” Estou aguardando os seus ingredientes! 🍽️", geminiAI: null, nutrition: null, images: null }
  ]);


  return (
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-white shadow-md">
          <h1 className="text-xl font-bold">NutrichefAI</h1>
          <Button>
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 p-4 overflow-hidden">
            <ScrollArea className="h-full space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mt-6 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-2xl p-3 max-w-xlg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                  {msg.role === "bot" &&  msg.geminiAI != null && msg.nutrition != null && msg.images != null? (

                    <div>
                      
                      <h1>{msg.geminiAI.title}</h1>
                      <IMGselector imagesURLs = {msg.images}/>
                      <Recipe  ingredients={msg.geminiAI.ingredients} preparation={msg.geminiAI.preparation} harmonizations={msg.geminiAI.harmonizations}/>
                      
                      <NutritionTable nutritionData={msg.nutrition} />


                    </div>
                    
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t flex gap-2">
            <Input
              value={userIngredientes}
              onChange={(e) => setUserIngredientes(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button onClick={handleGenerate}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
  );
}