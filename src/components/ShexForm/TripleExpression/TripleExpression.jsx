import React from 'react';

import TripleConstraint from './TripleConstraint';
import EachOf from './EachOf';
import OneOf from './OneOf';

const TripleExpression = ({schema, context}) => {
    if (schema.type == "TripleConstraint") {
        return (
            <TripleConstraint schema={schema} context={context}/>
        );
    } else if (schema.type == "EachOf") {
        return (
            <EachOf schema={schema} context={context}/>
       );
    } else if (schema.type == "OneOf") {
        return (
            <OneOf schema={schema} context={context}/>
        );
    } else {
        throw 'unknown type';
    }
}

export default TripleExpression;