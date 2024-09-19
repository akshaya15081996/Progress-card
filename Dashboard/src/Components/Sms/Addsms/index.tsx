import React, { FormEvent, useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Input, Label } from 'reactstrap';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';
import { AddSmsTitle, SmsTitle,SecretkeyTitle, ApikeyTitle,SmsNameTitle,Cancel, Submit } from '../../../Utils/Constants';
import axios from 'axios';
import { baseUrl, handleFileUpload } from '../../../Utils/FileUpload';
import { Btn } from '../../../AbstractElements';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';

export default function Addsms(){
    const [name, setName] = useState('');
    const [secretkey, setSecretkey] = useState('');
    const [apikey, setApikey] = useState('');

    const [data, setData] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ name?: string; secretkey?: string ;apikey?:string;}>({});

    const validateForm = () => {
        const newErrors: { name?: string;  secretkey?: string ;apikey?:string;} = {};

        if (!name.trim()) {
            newErrors.name = ' name is required.';
        }

        if (!secretkey.trim()) {
            newErrors.secretkey = 'secretkey is required.';
        }

        if (!apikey.trim()) {
            newErrors.apikey = 'apikey is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        let params = {
            name: name,
            secretkey: secretkey,
            apikey:apikey
        };

        try {
            let response = await axios.post(`${baseUrl}smssetting/savesms`, params);
            console.log(response, 'aa');
            if (response.status === 200) {
                toast.success("sms added successfully", {
                  onClose: () => navigate("/admiro/sms/viewsms"),  
                  autoClose: 1000  
                });
            } else {
                toast.error("Failed to add sms");
              }
        } catch (error) {
            console.log(error);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (errors.name) {
            validateForm();
        }
    };
    const handleSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecretkey(e.target.value);
        if (errors.secretkey) {
            validateForm();
        }
    };
    const handleApiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApikey(e.target.value);
        if (errors.apikey) {
            validateForm();
        }
    };


    return(
        <>
        <Breadcrumbs pageTitle={AddSmsTitle} parent={SmsTitle} title={AddSmsTitle} />
        <Col md={12}>
                <Card>
                    <CardBody className="basic-form">
                        
                        <Form className="theme-form" 
                        onSubmit={handleSubmit}>
                            <Row className='g-3'>
                                <Col sm={3}>
                                    <Label>{SmsNameTitle}</Label>
                                </Col>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        placeholder="Enter the name"
                                        value={name}
                                        onChange={handleNameChange}
                                        invalid={!!errors.name}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </Col>
                                <Col sm={3}>
                                    <Label>{SecretkeyTitle}</Label>
                                </Col>
                                <Col sm={9}>
                                    <Input
                                        type="textarea"
                                        placeholder="Enter the key"
                                        value={secretkey}
                                        onChange={handleSecretChange}
                                        invalid={!!errors.secretkey}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.secretkey}</div>}
                                </Col>

                                <Col sm={3}>
                                    <Label>{ApikeyTitle}</Label>
                                </Col>
                                <Col sm={9}>
                                    <Input
                                        type="textarea"
                                        placeholder="Enter the key"
                                        value={apikey}
                                        invalid={!!errors.apikey}
                                        onChange={handleApiChange}
                                    />
                                    {errors.apikey && <div className="invalid-feedback">{errors.apikey}</div>}
                                </Col>

                               
                                <Col>
                                    <div className="text-end">
                                        <Btn color='primary' className="me-2 btn-square">{Submit}</Btn>
                                        {/* <Btn color='danger' className='btn-square'>{Cancel}</Btn> */}
                                    </div>
                                </Col>
                            </Row>
                            
                        </Form>
                    </CardBody>
                </Card>
            </Col>
            <ToastContainer/>
        
        
        </>
    )

}