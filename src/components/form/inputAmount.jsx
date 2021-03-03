import { None } from 'rdf-namespaces/dist/vcard';
import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import Popup from "reactjs-popup";

class InputAmount extends React.Component {

    constructor(props) {
        super(props);
    }

    getShorterMessage() {
        let message = this.props.help;

        if (message.length > 100) {
            message = message.substring(0, 100) + "...";
        }

        return message;
    }

    render() {
        return (
            <>
                {this.props.label == null || this.props.label == "" ? "" :
                    <>
                        <label className="vl-form__label" htmlFor={this.props.var}>{this.props.label}</label> 
                        <span className="clickable">{this.props.help == "" || this.props.help == null ? "" : <Popup
                            trigger={<FaInfoCircle data-tip={this.getShorterMessage()} />}
                            modal
                            closeOnDocumentClick
                        >
                            <div className="modal-tooltip">
                                <div className="header"> Help </div>
                                <div className="content">
                                    {this.props.help}
                                </div>
                            </div>
                            </Popup>}
                        </span>
                    </>
                }
                <div className="vl-input-group">
                <button className="vl-button vl-button--icon">
                    <span style={{"margin": "0px auto"}}>€</span>
                </button>
                <input type="number" value={this.props.val ? this.props.val : 0} data-min={this.props.min} data-max={this.props.max} data-message={this.props.message} step="0.01" id={this.props.var} className="vl-input-field vl-input-field--block" name={this.props.var} onChange={this.props.handleChange}></input>
                </div>
                <p className="vl-form__error" id={"input-field-" + this.props.var + "-error"}></p>
            </>
        );
    }
}

export default InputAmount;