import React from 'react';
import ShexForm from '../ShexForm';
import NodeConstraint from './NodeConstraint';

const ShapeExpression = ({schema}) => {
    if (schema.type == "Shape") {
        return (
            <ShexForm name="unknown name" schema={schema}/>
        )
    } else if (schema.type == "NodeConstraint") {
        return (
            <NodeConstraint schema={schema}/>
        )
    } else {
        throw 'unknown type';
    }
}

export default ShapeExpression;