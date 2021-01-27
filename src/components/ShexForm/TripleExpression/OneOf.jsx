import { ScheduleAction } from 'rdf-namespaces/dist/schema';
import React from 'react';

const OneOf = ({schema}) => {
    return (
        <div>
            <span>One Of</span>
            <div>
                {JSON.stringify(schema)}
            </div>
        </div>
    );
}

export default OneOf;