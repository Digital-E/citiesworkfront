import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";

// import { store } from "../../../../store";

import {Container, Input, TextArea, ButtonWrapper, MyTextInput, MyTextArea, MyCheckbox, MyRadio, MyUpload, Submit, Circle, StyledSelect, StyledErrorMessage, StyledLabel, MySelect, Title} from './form-components'

const Loading = styled.img`
    width: 20px;
    margin: 40px 0 0 0;
`

function Component({ data, hasSubmitted }) {
    let [isSubmitting, setIsSubmitting] = useState(false)
    let [attachmentNameOne, setAttachmentNameOne] = useState(null)
    let [attachmentBlobOne, setAttachmentBlobOne] = useState(null)

    let [attachmentNameTwo, setAttachmentNameTwo] = useState(null)
    let [attachmentBlobTwo, setAttachmentBlobTwo] = useState(null)

    let [attachmentNameThree, setAttachmentNameThree] = useState(null)
    let [attachmentBlobThree, setAttachmentBlobThree] = useState(null)

    const SUPPORTED_FORMATS = ['application/pdf'];
    const FILE_SIZE = 8 * 1024 * 1024;

    // //Context
    // const context = useContext(store);
    // const { state, dispatch } = context;

    // const addtextToList = async (values) => {
    //     let fieldsObj = {
    //       text: values.text,
    //     }
    
    //   try {
    //       const res = await fetch("/api/subscribe", {
    //         "method": "POST",
    //         "headers": { "Content-Type": "application/json" },
    //         "body": JSON.stringify(fieldsObj)
    //       })
    //       .then((response) => response.json())
    //       .then(fields => {
    //         if(fields.result !== "error") {
    //           document.querySelectorAll(".text-input").forEach(item => {
    //             item="";
    //             document.querySelector("#submit-button").innerText = "✓"
    //             // item.placeholder="Thanks for subscribing!";
    //           })
    //         } else {
    //           document.querySelectorAll(".text-input").forEach(item => {
    //             item="";
    //             document.querySelector("#submit-button").innerText = fields.error
    //             // item.placeholder = fields.message;
    //           })
    //         }
    //       })
    //     } catch (error) {
    //           alert(error);
    //     }
    //   }

    const sendMail = async (data) => {

        let html = `
        <p>
            Name: ${data.name} <br/>
            First name: ${data.firstName} <br/>
            Date of birth: ${data.dob} <br/>
            Nationality: ${data.nationality} <br/>
            Resident of Switzerland since: ${data.residentOfSwitzerlandSince} <br/>
            Street / Number: ${data.streetNumber} <br/>
            Postal code / Town: ${data.postalCodeTown} <br/>
            Phone number: ${data.phoneNumber} <br/>
            Email: ${data.email} <br/>
            Bank account (IBAN number): ${data.bankAccount} <br/>
            I will be showing a: ${data.showing} <br/>
            The authorship of this performance lies with: ${data.authorship} <br/>
            Other participants (names, roles): ${data.otherParticipants} <br/>
            Websites / Videolinks: ${data.websitesAndLinks} <br/>
            I confirm that I am not enrolled in a BA curriculum at an art school or art academy in the current year.: ${data.confirmation} <br/>
        </p>
        `


        let dataObj = {
        email: data.email,
        subject: `New Submission: ${data.firstName} ${data.name} - ${data.email}`,
        html: html,
        name: `${data.firstName} ${data.name}`,
        attachmentNameOne: attachmentNameOne ? attachmentNameOne.name : null,
        attachmentBlobOne: attachmentBlobOne,
        attachmentNameTwo: attachmentNameTwo ? attachmentNameTwo.name : null,
        attachmentBlobTwo: attachmentBlobTwo,
        attachmentNameThree: attachmentNameThree ? attachmentNameThree.name : null,
        attachmentBlobThree: attachmentBlobThree
        }

        try {
        await fetch("/api/email", {
            "method": "POST",
            "headers": { "content-type": "application/json" },
            "body": JSON.stringify(dataObj)
        })

        // setFormHasValidated(true);
        hasSubmitted()

        window.scrollTo(0,0);


        } catch (error) {

        }

    }    

    let fields = data.fields;

    if(fields === null) return null;

    return (
        <Container>
            <Formik
            initialValues={{
            name: "",
            firstName: "",
            dob: "",
            nationality: "",
            residentOfSwitzerlandSince: "",
            streetNumber: "",
            postalCodeTown: "",
            phoneNumber: "",
            email: "",
            bankAccount: "",
            showing: "",
            authorship: "",
            otherParticipants: "",
            websitesAndLinks: "",
            confirmation: false,
            uploadOne: "",
            uploadTwo: "",
            uploadThree: "",
            // checkboxOne: true,
            // checkboxTwo: false
            }}
            validationSchema={Yup.object({
            name: Yup.string()
            .required("Required"),
            firstName:  Yup.string()
            .required("Required"),
            dob:  Yup.string()
            .required("Required"),
            nationality: Yup.string()
            .required("Required"),
            residentOfSwitzerlandSince: Yup.string()
            .required("Required"),
            streetNumber: Yup.string()
            .required("Required"),
            postalCodeTown: Yup.string()
            .required("Required"),
            phoneNumber: Yup.string()
            .required("Required"),
            email: Yup.string()
            .required("Required")
            .email("Invalid"),
            bankAccount: Yup.string()
            .required("Required"),
            showing: Yup.string()
            .required("Required"),
            // .oneOf([fields[11].label , fields[12].label]),
            authorship: Yup.string()
            .required("Required"),
            otherParticipants: Yup.string()
            .required("Required"),
            websitesAndLinks: Yup.string()
            .required("Required"),
            confirmation: Yup.boolean()
            .required("Required")
            .oneOf([true], "Must fill in."),
            uploadOne: Yup.mixed().test('fileSize', "File Size is too large",
            value => value !== undefined ? value.size <= FILE_SIZE : true),
            uploadTwo: Yup.mixed().test('fileSize', "File Size is too large",
            value => value !== undefined ? value.size <= FILE_SIZE : true),
            uploadThree: Yup.mixed().test('fileSize', "File Size is too large",
            value => value !== undefined ? value.size <= FILE_SIZE : true)
            // checkboxOne: Yup.boolean()
            // .required("Required")
            // .oneOf([true], "You must accept the terms and conditions."),
            // checkboxTwo: Yup.boolean()
            })}
            onSubmit={async (values, { setSubmitting }) => {
            // console.log(values)
            sendMail(values)
            setIsSubmitting(true)
            // await new Promise(r => setTimeout(r, 500));
            // setSubmitting(false);
            // addtextToList(values);
            // dispatch({type: "update notification message", value: fields.signUpConfirmationText})
            }}
            >
            <Form>  
                <MyTextInput
                label={`${fields[0]?.label}*:`}
                name="name"
                type="text"
                placeholder={''}
                />              
                <MyTextInput
                label={`${fields[1]?.label}*:`}
                name="firstName"
                type="text"
                placeholder={''}
                />                                    
                <MyTextInput
                label={`${fields[2]?.label}*:`}
                name="dob"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[3]?.label}*:`}
                name="nationality"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[4]?.label}*:`}
                name="residentOfSwitzerlandSince"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[5]?.label}*:`}
                name="streetNumber"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[6]?.label}*:`}
                name="postalCodeTown"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[7]?.label}*:`}
                name="phoneNumber"
                type="text"
                placeholder={''}
                /> 
                <MyTextInput
                label={`${fields[8]?.label}*:`}
                name="email"
                type="email"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[9]?.label}*:`}
                name="bankAccount"
                type="text"
                placeholder={''}
                /> 
                <MyRadio
                label={`${fields[10]?.label}*:`}
                name="showing"
                type="radio"
                list={[fields[11]?.label, fields[12]?.label]}
                />
                <MyTextInput
                label={`${fields[13]?.label}*:`}
                name="authorship"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[14]?.label}*:`}
                name="otherParticipants"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[15]?.label}*:`}
                name="websitesAndLinks"
                type="text"
                placeholder={''}
                />
                {/* <MyTextInput
                label={`${fields[16]?.label}*:`}
                name="confirmation"
                type="text"
                placeholder={''}
                /> */}
                <MyCheckbox
                name="confirmation"
                >
                {`${fields[16]?.label}*:`}
                </MyCheckbox>                 
                <Title>{data.subtitleTwo}</Title>
                {/* <MyTextInput
                label={`${fields[18]?.label}:`}
                name="uploadOne"
                type="text"
                placeholder={''}
                /> 
                <MyTextInput
                label={`${fields[19]?.label}:`}
                name="uploadTwo"
                type="text"
                placeholder={''}
                />
                <MyTextInput
                label={`${fields[20]?.label}:`}
                name="uploadThree"
                type="text"
                placeholder={''}
                /> */}
                <MyUpload
                    label={fields[18]?.label}
                    type="file"
                    name="uploadOne"
                    attachmentName={(attachmentName) => setAttachmentNameOne(attachmentName)}
                    attachmentBlob={(attachmentBlob) => setAttachmentBlobOne(attachmentBlob)}
                />
                <MyUpload
                    label={fields[19]?.label}
                    type="file"
                    name="uploadTwo"
                    attachmentName={(attachmentName) => setAttachmentNameTwo(attachmentName)}
                    attachmentBlob={(attachmentBlob) => setAttachmentBlobTwo(attachmentBlob)}
                />  
                <MyUpload
                    label={fields[20]?.label}
                    type="file"
                    name="uploadThree"
                    attachmentName={(attachmentName) => setAttachmentNameThree(attachmentName)}
                    attachmentBlob={(attachmentBlob) => setAttachmentBlobThree(attachmentBlob)}
                />                                                                                                                                                                                                                                                                                                                                    
                {/* <MyTextArea
                label={''}
                name="information"
                placeholder={'Why are you declaring? In a sentence or two, tell us why you’re joining Design Declares'}
                /> */}
                {/* <MyCheckbox
                name="checkboxOne"
                >
                I consent for my fields to be used for the purpose of the Declaration
                </MyCheckbox>  */}
                {/* <MyCheckbox
                name="checkboxTwo"
                >
                I consent for my name and reason for joining to be used in the promotion of the Declaration on this site, and across our social channels
                </MyCheckbox>                               */}
                {
                !isSubmitting ?
                <Submit>{data.submitButton}<Circle id="circle" /></Submit>
                :
                <Loading src="/images/loading.gif" />
                }
            </Form>
            </Formik>
        </Container>
    )
}

export default Component