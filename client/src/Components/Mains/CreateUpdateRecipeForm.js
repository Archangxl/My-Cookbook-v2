import React from 'react';

const CreateUpdateRecipeForm = ({
        handleIngredientAddition,
        handleIngredientSubtraction,
        handleInstructionAddition,
        handleInstructionSubstraction,
        recipeObject, setRecipeObject,
        handleSubmit,
        errorObject
    }) => {
        console.log(recipeObject);
    const mainStyle = {
        display: 'flex',
        justifyContent: 'center',
        minWidth: '320px',
        padding: '10px'
    }

    const formStyle = {
        color: 'black', 
        flex: '1',
        maxWidth: '800px',
        width: '80%',
        backgroundColor: '#F1C376',
        borderRadius: '5px',
        display: 'grid',
        padding: '10px',
        gap: '10px',
    }

    const labelStyleForMeasurements = {
        width: '50%',
        padding: '0px 5px 0px 0px'
    }

    const labelStyleForItems = {
        width: '95%',
        padding: '0px 5px 0px 5px'
    }

    const inputStyle = {
        borderRadius: '5px',
        border: '1px solid white',
        padding: '5px',
    }

    const itemInputStyle = {
        borderRadius: '5px',
        border: '1px solid white',
        padding: '5px',
        width: '95%'
    }

    const measurementInputStyle = {
        borderRadius: '5px',
        border: '1px solid white',
        padding: '5px',
        margin: '0px 5px 0px 0px',
        width: '50%'
    }

    const buttonSytle = {
        padding: '6px 10px 5px 10px',
        borderRadius: '5px',
        border: '2px solid #606C5D',
        backgroundColor: 'white',
        color: '#606C5D',
        cursor: 'pointer'
    }

    return (
        <>
            <main style={mainStyle}>

                <form style={formStyle} onSubmit={handleSubmit}>
                    <label htmlFor="recipeName">Recipe Name: {errorObject.recipeNameError}</label>
                    <input id="recipeName" style={inputStyle} onChange={(e) => {
                        let copyOfRecipeObject = recipeObject;
                        copyOfRecipeObject.recipeName = e.target.value;
                        setRecipeObject(copyOfRecipeObject);
                    }} value={recipeObject.recipeName}
                    ></input>

                    <p>Ingredients: {errorObject.ingredientError}</p>
                    <div style={{display: 'flex'}}>
                        <label style={labelStyleForMeasurements} htmlFor='measurement'>Measurement: </label>
                        <label style={labelStyleForItems} htmlFor='item'>Item: </label>
                    </div>

                    {
                        
                        recipeObject.ingredientList.map((ingredient, index) => {

                            return ( 
                                <div key={index}>

                                    <div style={{display: 'flex'}}>

                                            <input id='measurement' style={measurementInputStyle} onChange={(e) => {
                                                let copyOfRecipeObject = recipeObject;
                                                copyOfRecipeObject.ingredientList[index].measurement = e.target.value;
                                                setRecipeObject(copyOfRecipeObject);
                                            }} value={ingredient.measurement}></input>

                                            <input id='item' style={itemInputStyle} onChange={(e) => {
                                                let copyOfRecipeObject = recipeObject;
                                                copyOfRecipeObject.ingredientList[index].item = e.target.value;
                                                setRecipeObject(copyOfRecipeObject);
                                            }} value={ingredient.item}></input>

                                    </div>

                                </div>
                            );
                        })
                        
                    }

                    <div>
                        <button onClick={handleIngredientAddition} style={buttonSytle}>Add Ingredient</button>
                        <button onClick={handleIngredientSubtraction} style={buttonSytle}>Remove Ingredient</button>
                    </div>

                    <label htmlFor="instructions">Instructions {recipeObject.instructionError}</label>
                    {
                        
                        recipeObject.stepList.map((instruction, index) => {
                            return (
                                <input id="instructions" key={index + 50} style={inputStyle} onChange={(e) => {
                                    let copyOfRecipeObject = recipeObject;
                                    copyOfRecipeObject.stepList[index].description = e.target.value;
                                    setRecipeObject(copyOfRecipeObject);
                                }} value={recipeObject.stepList[index].description}></input>

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
export default CreateUpdateRecipeForm;