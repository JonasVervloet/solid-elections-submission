import React, {useState, useEffect, Suspense} from 'react';
import {useWebId, LoggedIn,LoggedOut} from '@solid/react';
import {TripleDocument, TripleSubject} from 'tripledoc';
import {initAppStorage} from './utils/SolidWrapper';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CandidateDataForm from "./components/form/candidateDataForm";
import FormSent from "./components/alert/formSent";
import NotConnected from "./components/alert/notConnected";
import A105 from "./components/form/A105";
import FormLayout from "./components/form/FormLayout"
import Footer from "./components/footer";
import App from './App';
import {fetchGetDb, fetchPostDb, fetchPostAbb} from './utils/RequestDatabase';
import {createAppDocument, listDocuments, createExpense, createDonation} from './utils/SolidWrapper';
import {fetchDocument} from 'tripledoc';
import {schema} from 'rdf-namespaces';
import { Provider } from 'react-redux';
import configureStore from './store';
import './i18n';

const store = configureStore();

const Index = () => {

    const webId = useWebId();
    const [appContainer, setAppContainer] = useState();
    const [userData, setUserData] = useState(); 
    const [userInfo, setUserInfo] = useState(null); //Contains all user info we can use
    const [profileUri, setProfileUri] = useState(null); //Contains WebID + me.ttl (user's profile info)
    const [loaded, setLoaded] = useState(false);
    const APP_NAME = "solidelections"; //This is the folder name on the solid pod

    //We refresh appContainer and webID when data changed
    useEffect(() => {
        updateAppContainer();
    }, [webId]);

    useEffect(()=> {
        profileExist();
    }, [appContainer]);

    useEffect(() => {
        updateUserInfo();
    }, [userData]);

    useEffect(() => {
        //console.log(userInfo);
        if (userInfo != null) {
            //The userInfo is now set, we tell to the component it can load
            setLoaded(true);
        }
    }, [userInfo]);

    //This method is use by candidateDataForm to refresh appContainer after saving profile because if the file me.ttl
    //doesn't exist before, form G103 will not refresh appContainer and so an error will append. That's why we have to refresh appContainer
    //to fetch the new file into it.
    async function updateAppContainer() {
        setLoaded(false);
        setUserInfo(null);
        const getAppStorage = async (webID) => {
            const container = await initAppStorage(webID, APP_NAME);
            if (container != null) {
                setAppContainer(container);
            } else {
                alert("PANIC: We couldn't acces the app folder on the Solid Pod.");
            }
        };
        if (typeof webId === 'string') {
            getAppStorage(webId);
        }
    }

    async function profileExist() {
        if (appContainer != null) {
            let documents = listDocuments(appContainer);
            let userDataLink = documents.find(link => {
                let indexFile = link.lastIndexOf('/');
                let file = link.substr(indexFile + 1);
    
                return file == "me.ttl";
            });
    
            if (userDataLink != null) {
                setProfileUri(userDataLink);

                let userDataDoc = await fetchDocument(userDataLink);
                if (userDataDoc != null) {
                    setUserData(userDataDoc.getSubject("#me"));
                }
            } else {
                //No file "me.ttl", the user profile doesn't exist tell the component it can load
                setLoaded(true);
            }
        }
    }

    async function updateUserInfo() {
        if (userData != null) {
            let personURI = userData.getString(schema.sameAs);
            if (personURI != null) {
                let uriUSerInfo = new URLSearchParams({
                    query: `
                    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                    PREFIX persoon: <http://data.vlaanderen.be/ns/persoon#>
                    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                    PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
                    PREFIX mandaat: <http://data.vlaanderen.be/ns/mandaat#>
                    PREFIX besluit: <http://data.vlaanderen.be/ns/besluit#>

                    SELECT ?list (MAX(?listName) AS ?listName) (MAX(?firstName) AS ?firstName) (MAX(?familyName) AS ?familyName) (MAX(?listNumber) AS ?listNumber) (MAX(?positionInResult) AS ?positionInResult) WHERE {
                        BIND( <${personURI}> as ?person )
                        ?list a mandaat:Kandidatenlijst;
                        mandaat:heeftKandidaat ?person.
                        ?person foaf:familyName ?familyName.
                        ?person persoon:gebruikteVoornaam ?firstName.
                
                        ?list skos:prefLabel ?listName;
                                mandaat:lijstnummer ?listNumber.
                
                        ?electionResult mandaat:isResultaatVan ?person.
                        ?electionResult mandaat:plaatsRangorde ?positionInResult.
                    } GROUP BY ?list LIMIT 10
                    `
                });

                let uriAmount = new URLSearchParams({
                    query: `
                    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                    PREFIX persoon: <http://data.vlaanderen.be/ns/persoon#>
                    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                    PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
                    PREFIX mandaat: <http://data.vlaanderen.be/ns/mandaat#>
                    PREFIX besluit: <http://data.vlaanderen.be/ns/besluit#>

                    SELECT DISTINCT ?unit ?spentList ?spentCandidate2 WHERE {
                        ?list a mandaat:Kandidatenlijst;
                                mandaat:heeftKandidaat <${personURI}>.
                
                        ?list mandaat:behoortTot/mandaat:steltSamen/mandaat:isTijdspecialisatieVan/besluit:bestuurt ?unit.
                        OPTIONAL { ?unit ext:maxSpentForList ?spentList. }
                        OPTIONAL { ?unit ext:maxSpentForCandidate2 ?spentCandidate2. }
                    } ORDER BY DESC(?spentList) DESC(?spentCandidate2)
                    `
                });

                let uriExtra = new URLSearchParams({
                    query: `
                    PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
                    SELECT (COUNT(*) AS ?mandated) WHERE {
                        <${personURI}> ext:gemandateerdVoorIndienenUitgavenVerkiezing ?list.
                    }
                    `
                });


                let responseUser = await fetchPostAbb(uriUSerInfo);
                let responseAmount = await fetchPostAbb(uriAmount);
                let responseExtra = await fetchPostAbb(uriExtra);

                if (responseUser.success && responseAmount.success && responseExtra.success) {
                    let dataUser = responseUser.result.results.bindings;
                    let dataAmount = responseAmount.result.results.bindings;
                    let dataExtra = responseExtra.result.results.bindings;

                    let lists = dataUser.map((list) => {
                        return {
                            "URI": list.list.value,
                            "name": list.listName.value,
                            "number": list.listNumber.value,
                            "position": list.positionInResult.value
                        }
                    });

                    var listAmout = null;
                    var userAmount = null;

                    dataAmount.forEach((binding) => {
                        if (binding.spentList != null) {
                            listAmout = binding.spentList;
                            userAmount = binding.spentCandidate2;
                        }
                    });

                    setUserInfo({
                        "webId": webId,
                        "appContainer": appContainer,
                        "profile": profileUri,
                        "personUri": personURI,
                        "name": dataUser[0].firstName.value,
                        "familyName": dataUser[0].familyName.value,
                        "lists": lists,
                        "userAmount": userAmount != null ? userAmount.value : null,
                        "listAmount": listAmout != null ? listAmout.value : null,
                        "mandated": (dataExtra.length > 0 ? dataExtra[0].mandated.value : null),
                        "address": {
                            "municipality": userData.getString(schema.addressLocality),
                            "street": userData.getString(schema.streetAddress),
                            "postalCode": userData.getInteger(schema.postalCode)
                        }
                    });

                    return true;
                }
            }

            //Error with the file, the user profile doesn't exist tell the component it can load
            setLoaded(true);
        }
        
        return false;
    }

    //we must send appContainer to the profile page because userInfo will be null if the profile doesn't exist (me.ttl)
    return (
        <Provider store={store}>
            <Suspense fallback="loading">
                <Router basename="/">
                    <App />
                    <LoggedIn>
                        <Switch>
                            <Route path="/profile">
                                <section className="vl-region">
                                    <div className="vl-layout">
                                        <CandidateDataForm 
                                            appContainer={appContainer} 
                                            userInfo={userInfo} 
                                            loaded={loaded} 
                                            webId={webId} 
                                            refresh={updateAppContainer} 
                                        />
                                    </div>
                                </section>
                            </Route>
                            <Route path="/formSent">
                                <section className="vl-region">
                                    <div className="vl-layout">
                                        <FormSent />
                                    </div>
                                </section>
                            </Route>
                            <Route path="/new-declaration">
                                <FormLayout
                                    userInfo={userInfo}
                                    loaded={loaded} 
                                />
                            </Route>
                        </Switch>
                    </LoggedIn>
                    <LoggedOut>
                        <section className="vl-region">
                            <div className="vl-layout">
                                <NotConnected />
                            </div>
                        </section>
                    </LoggedOut>
                    <Footer />
                </Router>
            </Suspense>
        </Provider>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>,
    document.getElementById('root')
);

export default Index;