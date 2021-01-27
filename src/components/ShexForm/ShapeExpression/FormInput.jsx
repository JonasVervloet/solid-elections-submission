import React, {useState} from 'react';

const FormInput = ({type, validate, className}) => {
    const [value, setValue] = useState();
    const [error, setError] = useState();

    const handleInputChange = (event) => {

        const [newValue, error] = validate(event.target.value);

        setValue(newValue);
        setError(error);
    }

    const getInputClass = () => {
        let className = "vl-input-field vl-input-field--block"
        if (error) {
            className += " vl-input-field--error"
        }

        return className;
    }

    return (
        <div>
            <input
                type={type}
                className={getInputClass()}
                value={value ? value : ''}
                onChange={handleInputChange}
            />
            <p 
                className="vl-form__error" 
                id="input-field-lblodId-error"
            >
                {error}
            </p>
        </div>
    )
}

export default FormInput;