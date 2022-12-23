import React, { useState } from 'react';
import { Formik, Form as FForm, ErrorMessage, Field } from 'formik';
import { FormProps, FormSubmitObject } from '../ts/interfaces';
import * as Yup from 'yup';
import { postData } from '../requests/requests';
import { a, useTransition } from '@react-spring/web';
import SuccessDialog from './SuccessDialog';

const Form: React.FC<FormProps> = ({ occupationOptions, stateOptions }) => {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState<FormSubmitObject>({
    name: '',
    password: '',
    email: '',
    occupation: '',
    state: ''
  });

  /**
   * Can't spread an array of state objects so it's passed in as a nested array
   * and simply flatmapped to get our desired data. Abbreviations need to be extracted
   * to be used for yup validation schema on line 23
   *  */
  const flattenedStates = stateOptions.flatMap((option) => option);
  const stateValidationOptions = flattenedStates.map(
    (state) => state.abbreviation
  );

  const handleSubmit = async (submissionData: FormSubmitObject) => {
    // Delete the password confirmation field to conform to correct JSON format before posting
    delete submissionData.passwordConfirmation;
    try {
      const postedData = await postData(submissionData);
      setSubmissionSuccess(true);
      setDataSubmitted(postedData!);
    } catch (error) {
      console.log(error);
    }
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('*required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('*required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords don't match")
      .required('*required'),
    email: Yup.string().email('Invalid email').required('*required'),
    occupation: Yup.string()
      .oneOf([...occupationOptions], '')
      .required('*required'),
    state: Yup.string()
      .oneOf([...stateValidationOptions], '')
      .required('*required')
  });

  const formTransition = useTransition(!submissionSuccess, {
    from: { transform: 'translateY(100%)', opacity: 0 },
    enter: { transform: 'translateY(0%)', opacity: 1 },
    leave: { transform: 'translateY(-100%)', opacity: 0 }
  });

  return (
    <>
      {formTransition(
        (spring, item) =>
          item && (
            <a.div style={spring}>
              <Formik
                initialValues={{
                  name: '',
                  password: '',
                  passwordConfirmation: '',
                  email: '',
                  occupation: '',
                  state: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                <FForm className="form" action="submit">
                  <h2 className="form-h2">Sign Up</h2>
                  <fieldset className="fieldset">
                    <legend>Account Information</legend>
                    <div className="input-groups">
                      <div className="input-container">
                        <label>Name & surname</label>
                        <Field
                          className="input-field"
                          name="name"
                          type="text"
                          placeholder="John"
                          autoFocus
                        />
                        <ErrorMessage className="error" name="name">
                          {(msg) => <div className="error">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      <div className="input-container">
                        <label>Email</label>
                        <Field
                          className="input-field"
                          name="email"
                          type="email"
                          placeholder="johnDoe@gmail.com"
                        />
                        <ErrorMessage className="error" name="email">
                          {(msg) => <div className="error">{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="input-groups">
                      <div className="input-container">
                        <label>Password</label>
                        <Field
                          className="input-field"
                          name="password"
                          type="password"
                          placeholder="***************"
                        />
                        <ErrorMessage className="error" name="password">
                          {(msg) => <div className="error">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      <div className="input-container">
                        <label>Confirm Password</label>
                        <Field
                          className="input-field"
                          name="passwordConfirmation"
                          type="password"
                          placeholder="***************"
                        />
                        <ErrorMessage name="passwordConfirmation">
                          {(msg) => <div className="error">{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="fieldset occ-loc">
                    <legend>Occupation & Location</legend>
                    <div className="input-container">
                      <label>Occupation</label>
                      <Field
                        as="select"
                        className="input-field"
                        name="occupation"
                        type="occupation"
                        defaultValue="none"
                      >
                        <option hidden>Select an Option</option>
                        {occupationOptions.map((occupation, key) => (
                          <option value={occupation} key={key}>
                            {occupation}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="occupation">
                        {(msg) => <div className="error">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="input-container ">
                      <label>State</label>
                      <Field
                        as="select"
                        className="input-field"
                        name="state"
                        type="state"
                        placeholder="Choose a state"
                        defaultValue="none"
                      >
                        <option hidden>Select an Option</option>
                        {flattenedStates.map((state, key) => (
                          <option value={state.abbreviation} key={key}>
                            {state.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="state">
                        {(msg) => <div className="error">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </fieldset>
                  <button type="submit"> Submit </button>
                </FForm>
              </Formik>
            </a.div>
          )
      )}
      <SuccessDialog
        submissionSuccess={submissionSuccess}
        dataSubmitted={dataSubmitted}
      />
    </>
  );
};

export default Form;
