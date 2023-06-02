const mongoose = require('mongoose');

const StepSchema = mongoose.Schema({

    recipeId: {
        type: String,
        required: [true, 'If this error is popping up the backend is having an issue getting the recipeId']
    }, 

    stepNumber: {
        type: Number,
        required: [true, 'Please provide the step number']
    },

    description: {
        type: String,
        required: [true, 'Please provide your step description']
    }

})

const Step = mongoose.model('Step', StepSchema);
module.exports = Step;