import React from 'react'

import TripleExpression from './TripleExpression/TripleExpression'

const ShexForm = ({schema, context}) => {

    return (
        <div>
            <h1 className="vl-title vl-title--h1 vl-title--has-border">
                {context.title}
            </h1>
            <form>
                {schema ? <TripleExpression schema={schema.expression} context={context}/> : ""}
                <button className="vl-button mt-3">
                    <span className="vl-button__label">SAVE</span>
                </button>
            </form>
        </div>
    );
}

export default ShexForm;