import React from 'react'
import FormInput from './FormInput';

const getLength = (schema) => {
    if (schema.length) {
        return schema.length;
    } else {
        return Number.MAX_SAFE_INTEGER;
    }
}

const validateValue = (schema) => {
    return (
        (value) => {
            const newNumber = processValue(value);
            if (isNaN(newNumber)) {
                return [undefined, 'Value should be an integer.']
            }

            const length = getLength(schema);
            console.log(length);
            if (! (newNumber.toString().length == length)) {
                return [value, 'Value should have length ' + length + '.'];
            }

            return [value, null]
        }
    )
}

const processValue = (value) => {
    return parseInt(value);
}

const IntegerLiteral = ({schema}) => {
    
    return (
        <FormInput
            type="number"
            validate={validateValue(schema)}
            processValue={processValue} 
        />
    )
}

export default IntegerLiteral;