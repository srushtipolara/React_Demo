import { useState } from "react";

const Form = () => {
    const [forms, setForms] = useState({
        fname: '',
        lname: '',
    });

    const [validforms, setValidforms] = useState({
        fname: '',
        lname: '',
    });

    const validation = () => {
        const validforms = [];
        const isvalid = false;

        if (!forms.fname) {
            validforms['forms.fname'] = 'please enter the valid name';
        } else if (!forms.lname) {
            validforms['forms.lname'] = 'please enter the valid name';
        } else {
            isvalid = true;
        }
        setValidforms(validforms);
        return isvalid;
    }

    const hendleSubmit = (e) => {
        let valid = validation();
        console.log("valid", valid);
        e.preventDefault();
        if (valid) {
            setForms({ ...forms, "forms.fname": forms.fname, "forms.lname": forms.lname });
            setForms({
                fname: '',
                lname: '',
            });
        }
        console.log("forms", forms);
    }

    return (
        <div>
            <form>
                <label htmlFor="fname">First name:</label><br></br>
                <input type="text" name={forms.fname} value={forms.fname} onChange={(e) => setForms({ ...forms, fname: e.target.value })} /><br></br>
                <p className="text-danger">{validforms['forms.fname'] ? validforms['forms.fname'] : ''}</p>
                <label htmlFor="lname">Last name:</label><br></br>
                <input type="text" name={forms.lname} value={forms.lname} onChange={(e) => setForms({ ...forms, lname: e.target.value })} /><br></br>
                <p className="text-danger">{validforms['forms.lname'] ? validforms['forms.lname'] : ''}</p>
                <div>
                    <input type="submit" onClick={hendleSubmit} />
                </div>

            </form>
        </div>
    )
};

export default Form;