import { Slide } from "@/interfaces/slide";

export async function getRecipeImage(recipeTitle: string) {
    
    const response = await fetch(`/api/recipe-image?q=${recipeTitle}`);
    const data = await response.json();
    let imageList:Slide[] = [];
    for (let i = 0; i < 10; i++) {
        imageList.push({image : data.images_results[i].thumbnail, id : i})
    }
    return imageList;
}
