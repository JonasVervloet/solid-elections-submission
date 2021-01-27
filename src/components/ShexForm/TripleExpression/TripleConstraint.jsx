import React from 'react';
import ShapeExpression from '../ShapeExpression/ShapeExpression';

const TripleConstraint = ({schema, context}) => {
    return (
        <div className="form-group vl-col--12-12">
            <span>
                {context[schema.predicate]? context[schema.predicate] : schema.predicate}
            </span>
            <ShapeExpression schema={schema.valueExpr} />
        </div>
    );
}

export default TripleConstraint;