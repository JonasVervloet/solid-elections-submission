import React from 'react';
import TripleExpression from './TripleExpression';

const EachOf = ({schema, context}) => {
    return (
        <div className="vl-grid">
            {schema.expressions.map(
                (expression, index) => 
                <TripleExpression schema={expression} key={index} context={context}/>
            )}
        </div>
    );
}

export default EachOf;

