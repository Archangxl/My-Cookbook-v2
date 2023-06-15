import React from 'react';

const CreateRecipeForm = ({
        mainStyle, 
        formStyle, 
        labelStyleForItems, 
        labelStyleForMeasurements, 
        itemInputStyle,
        measurementInputStyle,
        inputStyle, 
        buttonSytle,
        handleIngredientAddition,
        handleIngredientSubtraction,
        handleInstructionAddition,
        handleInstructionSubstraction,
        recipeName, setRecipeName,
        ingredients, setIngredients,
        instructions, setInstructions,
        handleSubmit,
        recipeNameError,
        ingredientError,
        instructionError
    }) => {

    return (
        <>
            <main style={mainStyle}>

                <form style={formStyle} onSubmit={handleSubmit}>
                    <label htmlFor="recipeName">Recipe Name: {recipeNameError}</label>
                    <input id="recipeName" style={inputStyle} onChange={(e) => {setRecipeName(e.target.value)}} value={recipeName}></input>

                    <p>Ingredients: {ingredientError}</p>
                    <div style={{display: 'flex'}}>
                        <label style={labelStyleForMeasurements} htmlFor='measurement'>Measurement: </label>
                        <label style={labelStyleForItems} htmlFor='item'>Item: </label>
                    </div>

                    {
                        
                        ingredients.map((ingredient, index) => {
                            return ( 
                                <div key={index}>

                                    <div style={{display: 'flex'}}>

                                            <input id='measurement' style={measurementInputStyle} onChange={(e) => {
                                            
                                                let copyOfIngredientsArraySoMeasurementCanBeUpdated = [...ingredients];
                                                copyOfIngredientsArraySoMeasurementCanBeUpdated[index].measurement = e.target.value;
                                                setIngredients(copyOfIngredientsArraySoMeasurementCanBeUpdated);;
                                            
                                            }} value={ingredients[index].measurement}></input>

                                            <input id='item' style={itemInputStyle} onChange={(e) => {

                                                let copyOfIngredientsArraySoItemCanBeUpdated = [...ingredients];
                                                copyOfIngredientsArraySoItemCanBeUpdated[index].item = e.target.value;
                                                setIngredients(copyOfIngredientsArraySoItemCanBeUpdated);
                                            
                                            }} value={ingredients[index].item}></input>

                                    </div>

                                </div>
                            );
                        })
                    }

                    <div>
                        <button onClick={handleIngredientAddition} style={buttonSytle}>Add Ingredient</button>
                        <button onClick={handleIngredientSubtraction} style={buttonSytle}>Remove Ingredient</button>
                    </div>

                    <label htmlFor="instructions">Instructions {instructionError}</label>
                    {
                        
                        instructions.map((instruction, index) => {
                            return (

                                <input id="instructions" key={index + 50} style={inputStyle} onChange={(e) => {
                                    let copyOfInstructionArraySoDescriptionCanBeUpdated = [...instructions];
                                    copyOfInstructionArraySoDescriptionCanBeUpdated[index].description = e.target.value;
                                    setInstructions(copyOfInstructionArraySoDescriptionCanBeUpdated);
                                }} value={instructions[index].description}></input>

                            );
                        })
                        
                    }

                    <div>
                        <button onClick={handleInstructionAddition} style={buttonSytle}>Add Instruction</button>
                        <button onClick={handleInstructionSubstraction} style={buttonSytle}>Remove Instruction</button>
                    </div>

                    <div>
                        <button style={buttonSytle}>Submit</button>
                    </div>

                </form>

            </main>
        </>
    );
}
export default CreateRecipeForm;