import React from "react";
import InputAmount from '../components/form/inputAmount';
import Help from '../components/alert/help';
import { value } from "rdf-namespaces/dist/rdf";

const addSection = (form, data) => {
    const sectionData = {
        name: data.sectionName,
        warning: data.sectionWarning || "",
        info: data.sectionInfo || "",
        subSections: []
    };
    form.push(sectionData);
    return form;
};

const addSubsection = (form, data) => {
    const [lastSection] = form.slice(-1);
    const subSections = lastSection.subSections;
    const subSectionData = {
        name: data.subSectionName,
        info: data.subSectionInfo || "",
        inputs: []
    };
    subSections.push(subSectionData);
    return form;
};

const addInput = (form, data) => {
    const [lastSection] = form.slice(-1);
    const [lastSubsection] = lastSection.subSections.slice(-1);
    const inputs = lastSubsection.inputs;
    const inputData = {
        id: data.inputId,
        title: data.inputTitle || "",
        info: data.inputInfo || "",
        key: data.inputKey || "",
        description: data.inputDescription || ""
    }

    inputs.push(inputData);
    return form;
}

const generateInputDictionary = (form) => {
    const inputDictionary = {}
    form.map(section => {
        sectionToInputs(inputDictionary, section)
    });

    return inputDictionary;
}

const sectionToInputs = (dictionary, section) => {
    section.subSections.map(subSection => {
        subSectionToInputs(dictionary, subSection)
    });
    return dictionary;
}

const subSectionToInputs = (dictionary, subSection) => {
    subSection.inputs.map(input => {
        dictionary[input.id] = 0
    });
    return dictionary;
}

const buildForm = (form, handleChange, handleSubmit, stateValues, total) => {
    return (
        <div>
            TEST TEST TEST
            {form.map(section => {
                return buildSection(section, handleChange, stateValues);
            })}
        </div>
    );
}

const buildSection = (sectionData, handleChange, stateValues) => {
    return (
        <div>
            <h2 className="vl-title vl-title--h2 vl-title--has-border">
                {sectionData.name}
                <Help message={sectionData.info}/>
            </h2>
            <p className="text-bold">
                {sectionData.warning}
            </p>
            {sectionData.subSections.map(
                subSection => {
                    return buildSubSection(subSection, handleChange, stateValues);
                }
            )}
        </div>
    );
}

const buildSubSection = (subSectionData, handleChange, stateValues) => {
    return (
        <div>
            <h3 className="vl-title vl-title--h3 vl-title--has-border">
                {subSectionData.name}
                <Help message={subSectionData.info}/>
            </h3>
            <div className="vl-grid">
                {subSectionData.inputs.map(input => {
                    return buildInput(input, handleChange, stateValues);
                })}
            </div>
        </div>
    )
}

const buildInput = (inputData, handleChange, stateValues) => {
    return (
        <div className="form-group vl-form-col--6-12">
            <InputAmount
                var={inputData.id}
                label={inputData.title}
                handleChange={handleChange}
                val={stateValues[inputData.id] ? stateValues[inputData.id].value : 0}
                help={inputData.info}
            />
        </div>
    )
}

export {
    addSection,
    addSubsection,
    addInput,
    generateInputDictionary,
    buildForm
};