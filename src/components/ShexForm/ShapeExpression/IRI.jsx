import React from 'react';
import FormInput from './FormInput';

// This regular expression is far from perfect. Some bad iri's will be tolerated.
// But it serves as a temporary check if a submitted value is an iri.
const iriRegExp = new RegExp(
    'https?://.+\\..+(/.+)?'
)

const validateValue = (schema) => {
    return (
        (value) => {
            if (schema.pattern) {
                const regularExpression = new RegExp(schema.pattern);
                if (! regularExpression.test(value)) {
                    return [value, 'Value should be a valid iri.'];
                }
            } else if (! iriRegExp.test(value)) {
                return [value, 'Value should be a valid iri.']
            }
            return [value, null];
        }
    )
}

const IRI = ({schema}) => {
    return (
        <FormInput
            type="text"
            validate={validateValue(schema)}
        />
    )
}

export default IRI;