import React, {useState} from 'react'

import {loadShape} from './ShexLoader'
import ShexForm from '../components/ShexForm/ShexForm'

const useShexFormBuilder = (shexLocation, context) => {
    
    if (! context.name) {
        context.name = shexLocation
    }

    const [schema, setSchema] = useState();
    const [shapeComplete, setShapeComplete] = useState(false);
    const [shape, setShape] = useState();

    const loadSchema = () => {
        loadShape(shexLocation, context.name).then(
            result => {
                console.log(result);
                setSchema(result);
            }
        );
    }

    const renderForm = () => {
        return (
            <ShexForm
                schema={schema}
                context={context}
            />
        );
    }

    return ({
        schema,
        shape,
        shapeComplete,
        loadSchema,
        renderForm
    });
}

export default useShexFormBuilder;