import {Loader, Validator, Util} from 'shex'

const getShapeIdentifier = (shexLocation, shapeName) => {
    const index = shexLocation.lastIndexOf('/');
    return shexLocation.slice(0, index + 1) + shapeName;
}

const loadShape = async (shexLocation, shapeName) => {
    const result = await Loader.load([shexLocation], [], [], []);
    if (result) {
        const shapeIdentifier = getShapeIdentifier(shexLocation, shapeName);
        return result.schema.shapes[shapeIdentifier];
    } else {
        throw 'Shape cannot be loaded!';
    }
}

const validateData = async (shexLocation, dataLocation, node, shapeName) => {

    const loaded = await Loader.load([shexLocation], [], [dataLocation], []);
    console.log(loaded);
    console.log(loaded.data)

    const validator = Validator.construct(loaded.schema, loaded.data, {results: 'api'});
    console.log(validator);
    const result = await validator.validate(
        loaded.data,
        node,
        getShapeIdentifier(shexLocation, shapeName)
    );
}

export {
    loadShape,
    validateData
}