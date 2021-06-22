import React, {useEffect} from "react";
import Loading from '../alert/loading';
import ReactTooltip from "react-tooltip";
import { FaInfoCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {fetchDocument} from "tripledoc";
import {schema} from 'rdf-namespaces';

import useUserInfo from '../../utils/useUserInfo'
import LoadSaveHandler from '../loadSaveComponents/LoadSaveHandler'
import useLoadSaveHandler from '../../utils/useLoadSaveHandler'
import {validateLblodID, fetchLBLODInfo} from '../../utils/LblodInfo'
import {setUserInfo} from '../../actions/userInfo'

export default function CandidateDataForm(props) {

    const dispatch = useDispatch();

    const { t } = useTranslation(["form", "alert"]);
    const {register, handleSubmit, setValue, errors} = useForm();
    const {loaded, userInfo, saveData} = useUserInfo();
    const {loading, saving, uri, helperFunctions} = useLoadSaveHandler("userInfo");
    const {fetchLoadUri, loadData, fetchSaveUri, stopSaving} = helperFunctions;

    const userData = 
        useSelector(state => state.loadsave["userInfo"]);
    console.log(userData);

    useEffect(() => {
        if (loading && uri) {
            console.log("SHOULD LOAD THE DATA NOW...");
            console.log(loading);
            console.log(uri);
            fetchUserData(uri);
        }
    }, [loading, uri]);

    const fetchUserData = async (uri) => {
        const doc = await fetchDocument(uri);
        const subject = doc.getSubject(uri);

        
        const data =  {
            subject: subject.asRef(),
            lblodId: subject.getRef(schema.sameAs),
            municipality: subject.getString(schema.municipality),
            postalCode: subject.getInteger(schema.postalCode)
        };

        const [success1, lblodData] = await validateLblodID(data.lblodId);
        if (! success1) {
            // TODO: handle fail
            return
        }

        const [success2, extraData] = await fetchLBLODInfo(data.lblodId);
        if (! success2) {
            // TODO: handle fail
            return
        }

        const userInfo = {
            ...data,
            ...lblodData,
            ...extraData
        }
        dispatch(setUserInfo(userInfo));

        loadData(data);
    }

    useEffect(() => {
        if (saving && uri && userData['tempData']) {

            console.log("SHOULD SAVE THE DATA NOW ...");

            // TODO: adapt save function to save the data at the uri specified
            //          by the LoadSave module
            //          for the moment, it is always stored at the same place on the solid pod
            const success = saveData(userData['tempData']);

            if (success) {
                alert(t('alert:Your data has been saved') + "!");
                loadData(userData['tempData']);
            } else {
                alert(('Fatal error: something went wrong, please try again!'));
            }
        }
    }, [saving, uri])

    useEffect(() => {
        if (userData && userData['data']) {
            console.log("DATA CHANGED!");
            const {data} = userData;
            const {lblodId, municipality, postalCode} = data;

            setValue("lblodId", lblodId);
            setValue("municipality", municipality);
            setValue("postalCode", postalCode);
        }
    }, [userData]);

    const lblodIdPresent = () => {
        return (userInfo && userInfo.lblodId);
    }

    const handleFormSubmit = async function(newData) {
        fetchSaveUri(newData);
    };

    if (loaded) {
        return (
            <LoadSaveHandler id={"userInfo"}>
                <div id="userForm">
                    <h1 className="vl-title vl-title--h1 vl-title--has-border">
                        {t('Your information')}:
                    </h1>
                    <form>
                        <div className="vl-grid">
                            <div className="form-group vl-col--12-12">
                                <label className="vl-form__label" htmlFor="lblodid">
                                    LBLOD ID:
                                </label>
                                <input
                                type="text" 
                                id="lblodId" 
                                placeholder="http://data.lblod.info/id/personen/xxx" 
                                className="vl-input-field vl-input-field--block" 
                                name="lblodId"
                                ref={register({
                                    required: t('This field should be filled in') + "!",
                                    pattern: {
                                        value: /https?:\/\/data.lblod.info\/id\/personen\/.+/,
                                        message: t('This should be a valid LBLOD-ID')
                                    }
                                })} 
                                readOnly={lblodIdPresent()} />
                                <p className="vl-form__error" id="input-field-lblodId-error">
                                    {errors['lblodId'] ? errors['lblodId'].message : null}
                                </p>
                            </div>
                            <div className="form-group vl-form-col--6-12">
                                <label className="vl-form__label" htmlFor="firstname">
                                    {t('First name')}:  
                                    <FaInfoCircle 
                                    data-tip= {t('This field will be auto-completed when entering a valid LBLOD ID') + "."} />
                                    </label>
                                <input 
                                type="text" 
                                disabled={true} 
                                id="firstname" 
                                className="vl-input-field vl-input-field--block" 
                                data-type="auto" 
                                name="firstname"
                                value={userInfo ? userInfo.firstName : ''}>
                                </input>
                                <p className="vl-form__error" id="input-field-firstname-error"></p>
                            </div>

                            <div className="form-group vl-form-col--6-12">
                                <label className="vl-form__label" htmlFor="lastname">
                                    {t('Last name')}:
                                    <FaInfoCircle 
                                    data-tip= {t('This field will be auto-completed when entering a valid LBLOD ID') + "."} />
                                </label>
                                <input
                                type="text" 
                                disabled={true} 
                                id="lastname" 
                                className="vl-input-field vl-input-field--block" 
                                data-type="auto" 
                                name="lastname" 
                                value={userInfo ? userInfo.lastName : ''}/>
                                <p className="vl-form__error" id="input-field-lastname-error"></p>
                            </div>

                            <div className="form-group vl-col--12-12--m vl-col--10-12">
                                <label className="vl-form__label" htmlFor="locality">
                                    {t('Municipality')}:
                                </label>
                                <input  
                                type="text" 
                                id="municipality" 
                                className="vl-input-field vl-input-field--block" 
                                name="municipality" 
                                ref={register({
                                    required: t('This field should be filled in') + "!"
                                })}/>
                                <p className="vl-form__error" id="input-field-municipality-error">
                                    {errors["municipality"] ? errors["municipality"].message : null}
                                </p>
                            </div>

                            <div className="form-group vl-col--12-12--m vl-col--2-12">
                                <label className="vl-form__label" htmlFor="postalCode">
                                    {t('Postal code')}:
                                </label>
                                <input  
                                type="number" 
                                min="0" 
                                id="postalCode" 
                                className="vl-input-field vl-input-field--block" 
                                name="postalCode"
                                ref={register({
                                    required: t('This field should be filled in') + "!",
                                    valueAsNumber: true
                                })}/>
                                <p className="vl-form__error" id="input-field-postalCode-error">
                                    {errors["postalCode"] ? errors["postalCode"].message : null}
                                </p>
                            </div>
                            <div className="vl-form-col--2-12">
                                <button className="vl-button vl-button--block" onClick={fetchLoadUri}>
                                    <span className="vl-button__label">Load</span>
                                </button>
                            </div>
                            <div className="vl-form-col--2-12">
                                <button className="vl-button vl-button--block" onClick={handleSubmit(handleFormSubmit)}>
                                    <span className="vl-button__label">{t('Save')}</span>
                                </button>
                            </div>
                        </div>
                    </form>
                    <ReactTooltip />
                </div>
            </LoadSaveHandler>
        );
    } else {
        return (
            <Loading />
        );
    }  
};