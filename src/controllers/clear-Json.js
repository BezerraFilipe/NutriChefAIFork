export function clearJson(stringJson) { // Refactoring: Renaming method

    let imcompleteBracket = 0; // Refactoring: Renaming variable
    let cleanText = ``;
    
    for (let i = 0; i < stringJson.length; i++) {
    if (stringJson[i] == '{'){imcompleteBracket += 1}
    if (imcompleteBracket > 0) {
        cleanText += `${stringJson[i]}`
        if (stringJson[i] == `}`) {
            imcompleteBracket -= 1;
            if (imcompleteBracket == 0) {
                break;    
            }
        }
    }
}

  try {
      const jsonObject = JSON.parse(cleanText);
      return jsonObject;
    } catch (error) {
      console.error("Erro ao analisar o JSON:", error);
    }


}



