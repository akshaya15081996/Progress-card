import React, { FormEvent, useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Input, Label } from 'reactstrap';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';
import { AddRoleTitle, RoleTitle, Cancel, Submit } from '../../../Utils/Constants';
import axios from 'axios';
import { baseUrl, handleFileUpload } from '../../../Utils/FileUpload';
import { Btn } from '../../../AbstractElements';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';

export default function AddRoles(){
 const [role,setRole]=useState('')
 const [data, setData] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ role?: string; }>({});

    const validateForm = () => {
        const newErrors: { role?: string;  } = {};

        if (!role.trim()) {
            newErrors.role = ' role is required.';
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
            rolename: role,
        };

        try {
            let response = await axios.post(`${baseUrl}roles/saveroles`, params);
            console.log(response, 'aa');
            if (response.status === 200) {
                toast.success("role added successfully", {
                  onClose: () => navigate("/admiro/roles/viewroles"),  
                  autoClose: 1000  
                });
            } else {
                toast.error("Failed to add role");
              }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRole(e.target.value);
        if (errors.role) {
            validateForm();
        }
    };


    return(
        <>
            <Breadcrumbs pageTitle={AddRoleTitle} parent={RoleTitle} title={AddRoleTitle} />
            <Col md={12}>
                <Card>
                    <CardBody className="basic-form">
                        <Form className="theme-form" onSubmit={handleSubmit}>
                            <Row className='g-3'>
                                <Col sm={3}>
                                    <Label>{RoleTitle}</Label>
                                </Col>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        placeholder="Enter the rolename"
                                        // value={RoleTitle}
                                        onChange={handleRoleChange}
                                        invalid={!!errors.role}
                                    />
                                    {errors.role && <div className="invalid-feedback">{errors.role}</div>}
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