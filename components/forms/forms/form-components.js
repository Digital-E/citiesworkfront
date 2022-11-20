import { useEffect, useState } from 'react'
import { useField, useFormikContext } from "formik";

import styled from "styled-components";



const Container = styled.div`
    padding: 0;

    form {
        display: flex;
        flex-direction: column;
    }

    @media(max-width: 989px) {
      form {
        flex-direction: column;
      }
    }

    form input {
        background-color: transparent;
        padding: 0;
        border-bottom: 2.5px dotted black;
        height: 25px;
        flex-grow: 1;
        padding: 0;
        margin: 0 5px -2px 5px;
    }

    form input::placeholder {
        color: black;
    }

    form input:focus {
        outline: none;
        border-bottom: 2.5px dotted #70706f;
    }

    .text-input.error {
      border-bottom: 2.5px dotted red;
    }

    .error-label {
      position: absolute;
      right: 10px;
      color: #70706f;
      pointer-events: none;
    }

    .error.caption {
      color: red;
      margin-bottom: 10px;
    }


    .checkbox {
        display: flex;
        margin-bottom: 15px;
    }

    .checkbox > input {
        height: 15px;
        width: 15px;
        min-height: 15px;
        min-width: 15px;
        border-radius: 999px;
        -webkit-appearance: none;
        border: 1px solid black !important;
        margin-left: 10px;
        flex-grow: initial;
        cursor: pointer;
    }

    .checkbox > input:checked {
        background: #b0b0b0;
    }

    .checkbox-error > label {
      color: red;
    }

    button {
        display: flex;
        align-items center;
        -webkit-appearance: none;
        border: none;
        background: none;
        width: fit-content;
    }

    @media(max-width: 989px) {
      button {
        margin: 20px 0 0 0;
      }
    }

    button:hover #circle {
      background-color: #70706f;
    }
`;

const Input = styled.div`
    position: relative;
    display: flex;
    flex-grow: 1;
    align-items: center;
    margin: 0 0 10px 0; 

    @media(max-width: 989px) {

    }
`

const Circle = styled.div`
    display: inline-block;
    height: 15px;
    width: 15px;
    min-height: 15px;
    min-width: 15px;
    border: 1px solid black;
    border-radius: 999px;
    margin: 2px 0 0 5px;
`

const TextArea = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    margin-bottom: 10px;
`

const SubmitMessageDesktop = styled.div`
    @media(max-width: 989px) {
      display: none;
    }
`

const SubmitMessageMobile = styled.div`
    @media(min-width: 990px) {
      display: none;
    }
`


const ButtonWrapper = styled.button``

const Title = styled.p`
    margin: 30px auto;
    width: fit-content;
`

const Radio = styled.div`
    display: flex;

    &&.error > label {
      color: red;
    }

    fieldset > div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    fieldset input {
      -webkit-appearance: none;
      width: 15px;
      height: 15px;
      min-width: 15px;
      min-height: 15px;
      border-radius: 999px;
      border: 1px solid black !important;
      flex-grow: initial;
      cursor: pointer;
      margin-left: 10px;
    }

    fieldset input.is-selected {
      background: gray;
    }
`

const UploadWrapper = styled.div`
    position: relative;
    margin-bottom: 25px;

    label {
      margin-bottom: 15px;
      display: block;
    }

    h5 {
      color: gray;
    }

  //   input[type='file']{
  //     opacity: 0;
  //     cursor: pointer;
  //     width: 24px;
  //     height: 24px;
  //     font-size: 0;
  //     position: absolute;
  // }
`


const UploadButton = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: fit-content;
    margin-bottom: 10px;
    cursor: pointer;

    :hover span {
      color: gray;
    }

    #file-upload {
      position: absolute;
      height: 100%;
      width: 100%;
      cursor: pointer;
      opacity: 0;
      font-size: 0;
    }
`

const UploadButtonText = styled.span`
    position: relative;

    // margin-left: 8px;
  //   ::after {
  //     content: "";
  //     position: absolute;
  //     left: 0;
  //     bottom: 0;
  //     width: 100%;
  //     height: 3px;
  //     background-color: ${props => props.colour};
  // }
`

const FileName = styled.div`
  margin-bottom: 10px;
  * {
    margin: 0;
  }
`


let initButton = false;

let removeError = false;


const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);

  useEffect(() => {
    initButton = false
  }, []);
  

  return (
    <Input height={props.height} className='my-text-input'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className={meta.touched && meta.error && ( meta.value || initButton ) ? "text-input error" : "text-input"} {...field} {...props} />
      {meta.touched && meta.error && ( meta.value || initButton ) ? (
        <div className="error-label">{meta.error}</div>
      ) : null}
    </Input>
  );
};

const MyTextArea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <TextArea>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className={meta.touched && meta.error ? "text-input error" : "text-input"} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error-label">{meta.error}</div>
      ) : null}
    </TextArea>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  
  return (
    <>
      <div className={meta.touched && meta.error ? "checkbox checkbox-error" : "checkbox"}>
        <label className="small-text" htmlFor={props.id || props.name}>{children}</label>
        <input {...field} {...props} type="checkbox" />
      </div>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

const MyRadio = ({ label, list, ...props }) => {
  const [field, meta] = useField({ ...props, type: "radio" });

  
  return (
    <>
      <Radio className={meta.touched && meta.error ? "error" : ""}>
        <label className="small-text" htmlFor={props.id || props.name}>{label}</label>
        <fieldset>
          {
            list.map((item) => 
              <div>
                <input  {...field} {...props} value={item} className={meta.value === item ? "is-selected radio" : "radio"} />
                <label className="small-text" htmlFor={item}>{item}</label>
              </div>              
              )
          }
        </fieldset>
      </Radio>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

const MyUpload = ({ label, attachmentName, attachmentBlob, ...props}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta, helpers] = useField(props);

  const [attachmentNameInner, setAttachmentNameInner] = useState(null);

  const uploadToServer = async (event) => {

    attachmentName(event.target.files[0])

    setAttachmentNameInner(event.target.files[0].name)

    helpers.setValue({size: event.target.files[0].size});

    var file = event.target.files[0];
    var fileReader = new FileReader();

    fileReader.readAsDataURL(file); 
    fileReader.onloadend = function() {
      var base64data = fileReader.result;  
      
      attachmentBlob(base64data.split(",")[1]);
    }      

    // const response = await fetch("/api/file", {
    //   "method": "POST",
    //   body
    // });

  }


  return (
    <>
      {/* <label className="caption" htmlFor={props.id || props.name}>{label}{props.isRequired && "*"}</label> */}
      <UploadWrapper id="file-upload-wrapper">
      <label htmlFor={props.id || props.name}>{label}</label>
      <UploadButton>
        {/* <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0V40H40V0H0ZM29.9312 26.25C29.9624 27.4142 29.7601 28.5728 29.3361 29.6575C28.9121 30.7422 28.2751 31.731 27.4627 32.5654C26.6503 33.3999 25.6789 34.0631 24.606 34.516C23.533 34.9688 22.3802 35.2022 21.2156 35.2022C20.051 35.2022 18.8982 34.9688 17.8253 34.516C16.7523 34.0631 15.781 33.3999 14.9686 32.5654C14.1562 31.731 13.5192 30.7422 13.0952 29.6575C12.6712 28.5728 12.4688 27.4142 12.5 26.25V11.25C12.5 9.5924 13.1585 8.00268 14.3306 6.83058C15.5027 5.65848 17.0924 5 18.75 5C20.4076 5 21.9973 5.65848 23.1694 6.83058C24.3415 8.00268 25 9.5924 25 11.25V26.25C25 27.2446 24.6049 28.1984 23.9017 28.9016C23.1984 29.6049 22.2446 30 21.25 30C20.2554 30 19.3016 29.6049 18.5983 28.9016C17.8951 28.1984 17.5 27.2446 17.5 26.25V15H20V26.25C20 26.5815 20.1317 26.8995 20.3661 27.1339C20.6005 27.3683 20.9185 27.5 21.25 27.5C21.5815 27.5 21.8995 27.3683 22.1339 27.1339C22.3683 26.8995 22.5 26.5815 22.5 26.25V11.25C22.5 10.2554 22.1049 9.30161 21.4017 8.59835C20.6984 7.89509 19.7446 7.5 18.75 7.5C17.7554 7.5 16.8016 7.89509 16.0983 8.59835C15.3951 9.30161 15 10.2554 15 11.25V26.25C14.9736 27.0828 15.1148 27.9125 15.4153 28.6897C15.7158 29.4669 16.1694 30.1757 16.7492 30.7742C17.3289 31.3727 18.0231 31.8485 18.7904 32.1735C19.5576 32.4984 20.3824 32.6659 21.2156 32.6659C22.0489 32.6659 22.8736 32.4984 23.6409 32.1735C24.4082 31.8485 25.1023 31.3727 25.6821 30.7742C26.2619 30.1757 26.7155 29.4669 27.016 28.6897C27.3164 27.9125 27.4577 27.0828 27.4312 26.25V15H29.9312V26.25Z" fill="#6CE6BB"/>
        </svg>           */}
        <UploadButtonText className="button" colour={"#6CE6BB"}>Upload file</UploadButtonText>
        <input {...field} {...props} 
          onChange={uploadToServer} 
          id="file-upload" 
          accept="application/pdf"
          value={undefined}
          />
      </UploadButton>
      {meta.touched && meta.error ? (
        <div className="error caption">{meta.error}</div>
      ) : null}
      <FileName><h5>{attachmentNameInner}</h5></FileName>
      <h5>PDF only. Max size 8mb</h5>
      </UploadWrapper>
    </>
  );
};

// const Submit = ({ children, ...props}) => {
//     const {isValid, touched } = useFormikContext();
//     let isActive = false
//     let [refresh, setRefresh] = useState(false)

//     let checkIfDisabled = (e) => {
//       initButton = true
//       removeError = true
//     }

//     return (
//       <ButtonWrapper type="submit" id="submit-button" 
//       // className={isActive ? null : "disabled"}
//       onClick={(e) => checkIfDisabled(e)}
//       >
//         <Button>
//             <SubmitMessageDesktop>{children}</SubmitMessageDesktop>
//         </Button>
//       </ButtonWrapper>
//     )
// }

const Submit = ({ children, ...props}) => {
  const {isValid, touched } = useFormikContext();
  let isActive = false

  if(isValid === true && Object.entries(touched).length !== 0) {
      isActive = true
  } else {
      isActive = false
  }


  return (
      <button type="submit" id="submit-button" onClick={() => initButton = true}>
          {children}
      </button>
  )
}

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};


export {Container, Input, TextArea, ButtonWrapper, MyTextInput, MyTextArea, MyCheckbox, MyRadio, MyUpload, Submit, Circle, StyledSelect, StyledErrorMessage, StyledLabel, MySelect, Title}