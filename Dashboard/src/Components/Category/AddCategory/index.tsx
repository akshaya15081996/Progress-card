import React, { FormEvent, useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Input, Label } from 'reactstrap';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';
import { AddCategoryTitle, CategoryTitle, Cancel, Submit } from '../../../Utils/Constants';
import axios from 'axios';
import { baseUrl, handleFileUpload } from '../../../Utils/FileUpload';
import { Btn } from '../../../AbstractElements';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
export default function AddCategory() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [data, setData] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ name?: string; image?: string }>({});

    const validateForm = () => {
        const newErrors: { name?: string; image?: string } = {};

        if (!name.trim()) {
            newErrors.name = 'Category name is required.';
        }

        // Only add image error if an image is not selected
        if (!image.trim()) {
            newErrors.image = 'Image is required.';
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
            image: image,
        };

        try {
            let response = await axios.post(`${baseUrl}category/savecategory`, params);
            console.log(response, 'aa');
            if (response.status === 200) {
                toast.success("category added successfully", {
                  onClose: () => navigate("/admiro/category/viewcategory"),  
                  autoClose: 1000  
                });
            } else {
                toast.error("Failed to add category");
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

    const fileHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const filename = await handleFileUpload(e);
        if (filename) {
            setImage(filename);
            setErrors(prevErrors => ({ ...prevErrors, image: undefined }));
        } else {
            console.error('File upload failed');
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}category/findAll`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Breadcrumbs pageTitle={AddCategoryTitle} parent={CategoryTitle} title={AddCategoryTitle} />
            <Col md={12}>
                <Card>
                    <CardBody className="basic-form">
                        <Form className="theme-form" onSubmit={handleSubmit}>
                            <Row className='g-3'>
                                <Col sm={3}>
                                    <Label>{CategoryTitle}</Label>
                                </Col>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        placeholder="Enter the category"
                                        value={name}
                                        onChange={handleNameChange}
                                        invalid={!!errors.name}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </Col>

                                <Col sm={3}>
                                    <Label>File</Label>
                                </Col>
                                <Col sm={9}>
                                    <Input
                                        type="file"
                                        onChange={fileHandle}
                                        invalid={!!errors.image}
                                    />
                                    {errors.image && <div className="invalid-feedback">{errors.image}</div>}
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
    );
}