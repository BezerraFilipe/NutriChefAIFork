import React from "react";

interface RecipeProps {
    title: string;
    ingredients: string[];
    preparation: string[];
    harmonizations: { tip: string; justification: string }[];
}

export default function Recipe(props: RecipeProps){

    return (
        <>
             <h1>{props.title}</h1>

             <h2>Ingredientes:</h2>

             <ul> {props.ingredients.map((ingredient, index) => (<li key={index}>{ingredient}</li> ))} </ul>

             <h2>Modo de Preparo:</h2>
             <ol> {props.preparation.map((step, index) => (<li key={index}>{step}</li>))} </ol>

             <h2>Harmonizations:</h2>
             <ul> {props.harmonizations.map((harmonization, index) => (
                <li key={index}>
                <strong>Dica: </strong> {harmonization.tip} <br />
                <strong>Justificativa: </strong> {harmonization.justification}
                </li>
                ))}
            </ul>


        </>
    )
}