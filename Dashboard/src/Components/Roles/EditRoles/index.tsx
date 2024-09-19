import React, { FormEvent, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Form, Input, Label } from 'reactstrap';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';
import { EditRoletitle, RoleTitle, Cancel, Submit } from '../../../Utils/Constants';
import axios from 'axios';
import { baseUrl, handleFileUpload, mediaUrl } from '../../../Utils/FileUpload';
import { Btn } from '../../../AbstractElements';
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';





export default function EditRoles(){
    const [role, setRole] = useState('');
    const [imageview, setImageview] = useState('');
    const [errors, setErrors] = useState<{ role?: string; }>({});
    const navigate = useNavigate();
    const location = useLocation();

    const validateForm = () => {
        const newErrors: { role?: string;  } = {};
        if (!role || !role.trim()) {
            newErrors.role = ' role is required.';
        }

        
        

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEditForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        let params = {
            rolename: role,
             id: location.state.id
          };
        console.log(params,'params')
    
        try { 
            let response = await axios.post(`${baseUrl}roles/updateroles`, params);
            console.log(response,'res1')
            if (response.status === 200) {
                toast.success("Role edited successfully", {
                    onClose: () => navigate("/admiro/roles/viewroles"),
                    autoClose: 1000
                });
            } else {
                toast.error("Failed to edit role");
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    const fetchData = async () => {
        try {
            const response = await axios.post(`${baseUrl}roles/findrolesbyid`, {
                id: location.state.id
            });
            console.log(response.data,'res2')
            setRole(response.data.rolename);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return(
        <>
         <Breadcrumbs pageTitle={EditRoletitle} parent={RoleTitle} title={EditRoletitle} />
            <Col md={12}>
                <Card>
                    <CardBody className="basic-form">
                        <Form className="theme-form" onSubmit={handleEditForm}>
                            <Row className='g-3'>
                                <Col sm={3}>
                                    <Label>{RoleTitle}</Label>
                                </Col>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        placeholder="Enter the rolename"
                                        value={role}
                                        onChange={(e) =>{
                                            setRole(e.target.value)
                                            if (errors.role) {
                                                validateForm(); 
                                            }  }
                                        } 
                                        invalid={!!errors.role}
                                    />
                                    {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                                </Col>

                             
                                <Col>
                                    <div className="text-end">
                                        <Btn color='primary' className="me-2 btn-square">{Submit}</Btn>
                                        <Btn color='danger' className='btn-square' onClick={() => navigate('/admiro/roles/viewroles')}>{Cancel}</Btn>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
            <ToastContainer />
        </>
    )
}