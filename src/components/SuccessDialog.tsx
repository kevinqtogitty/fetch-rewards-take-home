import React from 'react';
import { a, useTransition } from 'react-spring';
import { FormSubmitObject } from '../ts/interfaces';

const SuccessDialog: React.FC<{
  submissionSuccess: boolean;
  dataSubmitted: FormSubmitObject;
}> = ({ submissionSuccess, dataSubmitted }) => {
  const successTransition = useTransition(submissionSuccess, {
    from: { transform: 'translateY(100%)', opacity: 0 },
    enter: { transform: 'translateY(0%)', opacity: 1 },
    leave: { transform: 'translateY(-100%)', opacity: 0 },
    delay: 1000
  });

  return (
    <>
      {successTransition(
        (spring, item) =>
          item && (
            <a.div className="form" style={spring}>
              <h2 className="success-h2">Account successfully created!</h2>
              <div className="success-dialog-container">
                <div>
                  <>
                    <span>Name:</span>
                    <p> - {dataSubmitted.name}</p>
                  </>
                  <>
                    <span>Email:</span>
                    <p> - {dataSubmitted.email}</p>
                  </>
                </div>
                <div>
                  <>
                    <span>Occupation:</span>
                    <p> - {dataSubmitted.occupation}</p>
                  </>
                  <>
                    <span>State:</span>
                    <p> - {dataSubmitted.state}</p>
                  </>
                </div>
              </div>
            </a.div>
          )
      )}
    </>
  );
};

export default SuccessDialog;
