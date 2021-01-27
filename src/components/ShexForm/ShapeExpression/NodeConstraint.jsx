import React, {useState} from 'react';
import IntegerLiteral from './IntegerLiteral';
import StringLiteral from './StringLiteral';
import IRI from './IRI';

const xsd = "http://www.w3.org/2001/XMLSchema#";

const getDataType = (iri) => {
    return iri.replace(xsd, "");
}

const NodeConstraint = ({schema}) => {

    if (schema.datatype) {
        if (getDataType(schema.datatype) == "string") {
            return (
                <StringLiteral schema={schema}/>
            )
        }
        if (getDataType(schema.datatype) == "integer") {
            return (
                <IntegerLiteral schema={schema}/>
            )
        }
        return (
            <div>
                Node Constraint: with datatype
            </div>
        )
    }
    else if (schema.nodeKind && schema.nodeKind == 'iri') {
        return (
            <IRI schema={schema}/>
        )
    }

    throw('Node Constraint not supported!');
}

export default NodeConstraint;