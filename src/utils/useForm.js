import { useState, useEffect } from "react";

const useForm = (inputDictionary) => {
    const [stateValues, setStateValues] = useState(inputDictionary);
    const [total, setTotal] = useState(0);

    const handleChange = (event) => {
        const {id, value} = event.target;

        const inputDictionary = stateValues[id];
        const oldValue = inputDictionary.value;
        const newValue = parseFloat(value);

        const updatedDictionary = {
            ...inputDictionary,
            value: newValue
        };
        setStateValues({
            ...stateValues,
            [id]: updatedDictionary
        });
        updateTotal(oldValue, newValue);
    }

    const updateTotal = (oldValue, newValue) => {
        if (isNaN(oldValue)) {
            oldValue = 0;
        }
        if (isNaN(newValue)) {
            newValue = 0;
        }
        setTotal(total - oldValue + newValue);
    }

    const handleSubmit = () => {
        console.log("SUBMITTING!!!")
    }

    return ({
        handleChange, handleSubmit, stateValues, total
    });
}

export default useForm;