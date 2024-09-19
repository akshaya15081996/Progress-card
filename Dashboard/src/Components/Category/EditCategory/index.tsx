import React, { FormEvent, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Form, Input, Label } from 'reactstrap';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';
import { EditCategoryTitle, CategoryTitle, Cancel, Submit } from '../../../Utils/Constants';
import axios from 'axios';
import { baseUrl, handleFileUpload, mediaUrl } from '../../../Utils/FileUpload';
import { Btn } from '../../../AbstractElements';
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

export default function EditCategory() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [imageview, setImageview] = useState('');
    const [errors, setErrors] = useState<{ name?: string; image?: string }>({});
    const navigate = useNavigate();
    const location = useLocation();

    const validateForm = () => {
        const newErrors: { name?: string; image?: string } = {};

        // Trim and check if name is empty
        if (!name || !name.trim()) {
            newErrors.name = 'Category name is required.';
        }

        // Check if image is empty when both image and imageview are not set
        if (!image.trim() && !imageview) {
            newErrors.image = 'Image is required.';
        }

        setErrors(newErrors);
        // Return true only if no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleEditForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Run the validation function
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);

        // Add image only if a new one is uploaded
        if (image) {
            formData.append('image', image);
        } else {
            formData.append('image', imageview);
        }

        formData.append('id', location.state.id);

        try {
            const response = await axios.post(`${baseUrl}category/updatecategory`, formData);
            if (response.status === 200) {
                toast.success("Category edited successfully", {
                    onClose: () => navigate("/admiro/category/viewcategory"),
                    autoClose: 1000,
                });
            } else {
                toast.error("Failed to edit category");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.post(`${baseUrl}category/findbyid`, {
                id: location.state.id,
            });
            setName(response.data.name);
            setImageview(response.data.image);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fileHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const filename = await handleFileUpload(e);
        if (filename) {
            setImage(filename);
            setImageview(filename);
            if (errors.image) {
                validateForm(); // Revalidate form to clear the error
            }
        } else {
            console.error('File upload failed');
        }
    };

    return (
        <>
            <Breadcrumbs pageTitle={EditCategoryTitle} parent={CategoryTitle} title={EditCategoryTitle} />
            <Col md={12}>
                <Card>
                    <CardBody className="basic-form">
                        <Form className="theme-form" onSubmit={handleEditForm}>
                            <Row className="g-3">
                                <Col sm={3}>
                                    <Label>{CategoryTitle}</Label>
                                </Col>
                                <Col sm={9}>
                                    <Input
                                        type="text"
                                        placeholder="Enter the category"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            if (errors.name) {
                                                validateForm(); // Revalidate when value changes
                                            }
                                        }}
                                        invalid={!!errors.name}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </Col>

                                <Col sm={3}>
                                    <Label>File</Label>
                                </Col>
                                <Col sm={9}>
                                    <Input type="file" onChange={fileHandle} invalid={!!errors.image} />
                                    {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                                    {imageview && (
                                        <div>
                                            <img src={`${mediaUrl}/${imageview}`} alt="Category" width="100px" height="100px" />
                                        </div>
                                    )}
                                </Col>
                                <Col>
                                    <div className="text-end">
                                        <Btn color="primary" className="me-2 btn-square">
                                            {Submit}
                                        </Btn>
                                        <Btn color="danger" className="btn-square" onClick={() => navigate('/admiro/category/viewcategory')}>
                                            {Cancel}
                                        </Btn>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
            <ToastContainer />
        </>
    );
}
