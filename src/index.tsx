import React, {useState, useEffect} from 'react';
import {useWebId} from '@solid/react';
import {fetchDocument, TripleDocument} from 'tripledoc';
import {foaf} from 'rdf-namespaces';
import {initAppStorage, createAppDocument} from './utils/SolidWrapper';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoggedIn, LoggedOut, LoginButton } from '@solid/react';
import CandidateDataForm from "./components/solid/candidateDataForm";
import G103 from "./components/form/G103";
import Footer from "./components/footer";
import App from './App';

const Index: React.FC = () => {
    const webId = useWebId();
    const [appContainer, setAppContainer] = useState<TripleDocument>();
    const APP_NAME = "solidelections";

    //Update when "WebId" change
    useEffect(() => {
        const getAppStorage = async (webID: string) => {
            const appContainer = await initAppStorage(webID, APP_NAME);
            if (appContainer != null) {
                setAppContainer(appContainer);
            } else {
                console.error("PANIC: We couldn't acces the app folder on the Solid Pod.");
            }
        };
        if (typeof webId === 'string') {
            getAppStorage(webId);
        }
    }, [webId]);

    return (
        <Router>
            <App />
            <LoggedIn>
                <Switch>
                    <Route path="/profile">
                        <section className="vl-region">
                            <div className="vl-layout">
                                <CandidateDataForm appContainer={appContainer} webId={webId} />
                            </div>
                        </section>
                    </Route>
                    <Route path="/new-declaration">
                        <section className="vl-region">
                            <div className="vl-layout">
                                <div>
                                    <ul id="formSelection" className="nav nav-tabs nav-fill" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" href="#g103-form" role="tab" aria-controls="g103-form" aria-selected="true">G103</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#g104-form" role="tab" aria-controls="g104-form" aria-selected="false">G104</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#a105-form" role="tab" aria-controls="a105-form" aria-selected="false">A105</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#a106-form" role="tab" aria-controls="a106-form" aria-selected="false">A106</a>
                                        </li>
                                    </ul>

                                    <div className="tab-content" id="tabContent">
                                        <div className="tab-pane fade show active" id="g103-form" role="tabpanel" aria-labelledby="g103-form">
                                            <G103 appContainer={appContainer} webId={webId} />
                                        </div>
                                        <div className="tab-pane fade" id="g104-form" role="tabpanel" aria-labelledby="g104-form">
                                            <h1>Form G104</h1>
                                        </div>
                                        <div className="tab-pane fade" id="a105-form" role="tabpanel" aria-labelledby="a105-form">
                                            <h1>Form A105</h1>
                                        </div>
                                        <div className="tab-pane fade" id="a106-form" role="tabpanel" aria-labelledby="a106-form">
                                            <h1>Form A106</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Route>
                    <Route path="/">
                        <div className="container">
                            <h1>Welcome !</h1>
                        </div>
                    </Route>
                </Switch>
            </LoggedIn>
            <LoggedOut>
                <section className="vl-region">
                    <div className="vl-layout">
                        <div className="vl-alert vl-alert--error" role="alert">
                            <div className="vl-alert__icon">
                                <i className="vl-icon vl-vi vl-vi-alert-triangle-filled" aria-hidden="true"></i>
                            </div>
                            <div className="vl-alert__content">
                                <p className="vl-alert__title">Opgelet!</p>
                                <div className="vl-alert__message">
                                    <p>You are not connected! Please <LoginButton popup="/popup.html">login</LoginButton> !</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </LoggedOut>
            <Footer />
        </Router>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>,
    document.getElementById('root')
);

export default Index;