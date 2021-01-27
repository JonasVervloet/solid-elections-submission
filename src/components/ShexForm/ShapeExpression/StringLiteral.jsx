import React from 'react'
import FormInput from './FormInput';

const getMinLength = (schema) => {
    if (schema.minlength) {
        return schema.minlength;
    } else if (schema.length) {
        return schema.length;
    } else {
        return 0;
    }
}

const getMaxLength = (schema) => {
    if (schema.maxlength) {
        return schema.maxlength;
    } else if (schema.length) {
        return schema.length;
    } else {
        return Number.MAX_SAFE_INTEGER;
    }
}

const validateValue = (schema) => {
    return (
        (value) => {
            if (! typeof(value) == 'string') {
                return [value, 'Value should be a string.'];
            }
            const minLength = getMinLength(schema);
            if (value.length < minLength) {
                return [value, 'String should be at least ' + minLength + ' long.'];
            }
            const maxLength = getMaxLength(schema);
            if (value.length > maxLength) {
                return [value, 'String should be at most ' + maxLength + ' long.']
            }

            return [value, null];
        }
    )
}

const StringLiteral = ({schema}) => {

    return (
        <FormInput
            type="text"
            validate={validateValue(schema)} 
        />
    )
}

export default StringLiteral;