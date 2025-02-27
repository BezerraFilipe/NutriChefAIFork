export async function getRecipeImage(recipeTitle: string) {
    
    const response = await fetch(`/api/recipe-image?q=${recipeTitle}`);
    const data = await response.json();
    return [data.images_results[0].thumbnail,data.images_results[1].thumbnail, data.images_results[2].thumbnail ]
}

