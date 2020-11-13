import React from "react";
import InputAmount from '../components/form/inputAmount';
import Help from '../components/alert/help';
import useForm from './useForm';

const useFormBuilder = () => {

    const {handleChange, handleSubmit, 
        stateValues, total} = useForm();
    const data = [];
    const inputData = {};

    const addSection = (sectionName, sectionWarning="", sectionInfo="") => {
        data.push({
            name: sectionName,
            warning: sectionWarning,
            info: sectionInfo,
            subSections: []
        })
    }

    const addSubSection = (subSectionName, subSectionInfo="") => {
        const [lastSection] = data.slice(-1);
        const subSections = lastSection.subSections;
        subSections.push({
            name: subSectionName,
            info: subSectionInfo,
            inputs: []
        });
    }

    const addInput = (inputId, inputTitle="", inputInfo="",
                        inputkey="", inputDescription="") => {
        const [lastSection] = data.slice(-1);
        const [lastSubSection] = lastSection.subSections.slice(-1);
        const inputs = lastSubSection.inputs;
        const inputData = {
            id: inputId,
            title: inputTitle,
            info: inputInfo,
            key: inputkey,
            description: inputDescription
        }
        inputs.push(inputData);
        inputData[inputId] = 0;
        console.log(inputData);
    }

    const getInputData = () => {
        return inputData;
    }

    const buildForm = () => {
        console.log(data);
        return (
            <div>
                {data.map(
                    (sectionData) => {
                        buildSection(sectionData)
                    }
                )}
            </div>
        );
    }

    const buildSection = (sectionData) => {
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
                    (subSectionData) => {
                        buildSubSection(subSectionData)
                    }
                )}
            </div>
        );
    }

    const buildSubSection = (subSectionData) => {
        return (
            <div>
                <h3 className="vl-title vl-title--h3 vl-title--has-border">
                    {subSectionData.name}
                    <Help message={subSectionData.info}/>
                </h3>
                {subSectionData.inputs.map(
                    (inputData) => {
                        buildInput(inputData)
                    }
                )}
            </div>
        );
    }

    const buildInput = (inputData) => {
        console.log(stateValues);
        return (
            <div className="vl-grid">
                <div className="form-group">
                    <InputAmount
                        var={inputData.id}
                        label={inputData.title}
                        handleChange={handleChange}
                        val={stateValues[inputData.id] ? stateValues[inputData.id].value : 0}
                        help={inputData.info}
                    />
                </div>
            </div>
        );
    }


    return ({
        addSection, addSubSection, addInput, buildForm, getInputData
    })
}

export default useFormBuilder;