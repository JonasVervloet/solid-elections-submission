import React, { useState, useEffect } from "react";
import useForm from '../../utils/useForm';
import {addInput, addSection, addSubsection, 
    generateInputDictionary, buildForm} from '../../utils/formBuilder';

export default function TestConfigurableForm(props) {

    const form = [];

    addSection(form, {
        sectionName: "Aangiften van de verkiezingsuitgaven",
        sectionWarning: "Het maximumbedrag dat u als kandidaat mag uitgeven, bedraagt 8883.78€.",
        sectionInfo: "Vermeld hier alle uitgaven en financiële verbintenissen voor mondelinge, schriftelijke, auditieve en visuele boodschappen die verricht zijn tijdens de sperperiode en erop gericht zijn het resultaat van de lijst gunstig te beïnvloeden."
    });
    addSubsection(form, {
        subSectionName: "Auditieve en mondelinge boodschappen",
        subSectionInfo: "Bijvoorbeeld: niet-commerciële telefooncampagnes of een onuitwisbare politieke boodschap op een informatiedrager"
    });
    addInput(form, {
        inputId: "EAuditoryAndOral",
        inputKey: "1.1",
        inputDescription: "Auditory and oral messages"
    });
    addSubsection(form, {
        subSectionName: "Geschreven boodschappen"
    });
    addInput(form, {
        inputId: "EWrittenMessage1_1",
        inputTitle: "Ontwerp- en productiekosten van advertenties in de pers",
        inputInfo: "Written messages - Design and production costs in the press",
        inputKey: "2.1.1",
        inputDescription: "Written messages - Design and production costs in the press"
    });
    addInput(form, {
        inputId: "EWrittenMessage1_2",
        inputTitle: "Prijs voor advertentieruimte in de pers",
        inputKey: "2.1.2",
        inputDescription: "Written messages - Price for the advertising space in the press"
    });
    addInput(form, {
        inputId: "EWrittenMessage2",
        inputTitle: "Ontwerp- en productiekosten van verkiezingsfolders",
        inputKey: "2.2",
        inputDescription: "Written messages - Design and production costs of election brochures"
    });
    addInput(form, {
        inputId: "EWrittenMessage3",
        inputTitle: "Kostprijs van brieven en enveloppen",
        inputKey: "2.3",
        inputDescription: "Written messages - Cost of letters and envelopes"
    });
    addInput(form, {
        inputId: "EWrittenMessage4",
        inputTitle: "Kostprijs van ander drukwerk",
        inputKey: "2.4",
        inputDescription: "Written messages - Cost of other printed matter"
    });
    addInput(form, {
        inputId: "EWrittenMessage5",
        inputTitle: "Kosten voor e-mails en niet-commerciële sms-campages",
        inputKey: "2.5",
        inputDescription: "Written messages - Costs for e-mails and non-commercial SMS campaigns"
    });

    const inputs = generateInputDictionary(form);
    const {handleChange, handleSubmit, stateValues, total} = useForm(inputs);

    console.log("FORM");
    console.log(form);
    console.log("INPUTS");
    console.log(inputs);

    return (
        <section className="vl-region">
            <div className="vl-layout">
                <div>
                    <ul id="formSelection" className="nav nav-tabs nav-fill" role="tablist">
                        <li className="nav-item">
                            <a 
                            id="tab-a105" 
                            className="nav-link active" 
                            data-toggle="tab" 
                            href="#a105-form" 
                            role="tab" 
                            aria-controls="a105-form" 
                            aria-selected="false">
                                Uitgaven kandidaat
                            </a>
                        </li>
                        <li className={"nav-item " + "disabled"}>
                            <a 
                            id="tab-g103" 
                            className={"nav-link " + "disabled"} 
                            data-toggle="tab" 
                            href="#g103-form" 
                            role="tab" 
                            aria-controls="g103-form" 
                            aria-selected="true">
                                Uitgaven lijst
                            </a>
                        </li>
                        <li className="nav-item disabled">
                            <a 
                            id="tab-g104" 
                            className="nav-link disabled" 
                            data-toggle="tab" 
                            href="#g104-form" 
                            role="tab" 
                            aria-controls="g104-form" 
                            aria-selected="false">
                                Schenkers/sponsors kandidaat
                            </a>
                        </li>
                        <li className="nav-item disabled">
                            <a 
                            id="tab-a106" 
                            className="nav-link disabled" 
                            data-toggle="tab" 
                            href="#a106-form" 
                            role="tab" 
                            aria-controls="a106-form" 
                            aria-selected="false">
                                Schenkers/sponsors lijst
                            </a>
                        </li>
                        <li className={"nav-item " + "disabled"}>
                            <a 
                            id="tab-extra" 
                            className={"nav-link " + "disabled"} 
                            data-toggle="tab" 
                            href="#extra-form" 
                            role="tab" 
                            aria-controls="extra-form" 
                            aria-selected="false">
                                Uitgaven politieke partij
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content" id="tabContent">
                        <div className="tab-pane fade show active" id="a105-form" role="tabpanel" aria-labelledby="a105-form">
                            {buildForm(form, handleChange, handleSubmit, stateValues, total)}
                        </div>
                    </div>
                </div>
            </div>
    </section>
    );
}