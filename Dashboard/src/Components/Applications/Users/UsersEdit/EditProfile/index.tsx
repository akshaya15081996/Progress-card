import React from 'react'
import { useForm } from 'react-hook-form';
import { Card, CardBody, CardFooter, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import CommonCardHeader from '../../../../../Utils/CommonComponents/CommonCardHeader';
import { AboutMe, Address, City, Company, Country, EditProfileTitle, EmailAddress, FirstName, LastName, PostalCode, UpdateProfile, UserName } from '../../../../../Utils/Constants';
import { Btn } from '../../../../../AbstractElements';
import { usersCountryList } from '../../../../../Data/Applications/Users';

export default function EditProfile() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onEditSubmit = () => {
        alert('Form is Submitted successfully');
    };
    return (
        <Col xl={8}>
            <Card>
                <Form onSubmit={handleSubmit(onEditSubmit)}>
                    <CommonCardHeader titleClass='card-title' title={EditProfileTitle} />
                    <CardBody>
                        <Row>
                            <Col md={5}>
                                <FormGroup>
                                    <Label>{Company}</Label>
                                    <input className="form-control" type="text" placeholder="Company name" {...register('company', { required: true })} />
                                    {errors.company && <span style={{ color: 'red' }}>{'Company is required'} </span>}
                                </FormGroup>
                            </Col>
                            <Col sm={6} md={3}>
                                <FormGroup>
                                    <Label>{UserName}</Label>
                                    <input className="form-control" type="text" placeholder="Username" {...register('username', { required: true })} />
                                    {errors.username && <span style={{ color: 'red' }}>{'Username is required'} </span>}
                                </FormGroup>
                            </Col>
                            <Col sm={6} md={4}>
                                <FormGroup>
                                    <Label>{EmailAddress}</Label>
                                    <input className="form-control" type="email" placeholder="Email" {...register('emailAddress', { required: true })} />
                                    {errors.emailAddress && <span style={{ color: 'red' }}>{'EmailAddress is required'} </span>}
                                </FormGroup>
                            </Col>
                            <Col sm={6} md={6}>
                                <FormGroup>
                                    <Label>{FirstName}</Label>
                                    <input className="form-control" type="text" placeholder="First name" {...register('firstName', { required: true })} />
                                    {errors.firstName && <span style={{ color: 'red' }}>{'FirstName is required'} </span>}
                                </FormGroup>
                            </Col>
                            <Col sm={6} md={6}>
                                <FormGroup>
                                    <Label>{LastName}</Label>
                                    <input className="form-control" type="text" placeholder="Last name" {...register('lastName', { required: true })} />
                                    {errors.lastName && <span style={{ color: 'red' }}>{'LastName is required'} </span>}
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup>
                                    <Label>{Address}</Label>
                                    <input className="form-control" type="text" placeholder="Home Address" {...register('address', { required: true })} />
                                    {errors.address && <span style={{ color: 'red' }}>{'Address is required'} </span>}
                                </FormGroup>
                            </Col>
                            <Col sm={6} md={4}>
                                <FormGroup>
                                    <Label>{City}</Label>
                                    <input className="form-control" type="text" placeholder="City" {...register('city', { required: true })} />
                                    {errors.city && <span style={{ color: 'red' }}>{'City is required'} </span>}
                                </FormGroup>
                            </Col>
                            <Col sm={6} md={3}>
                                <FormGroup>
                                    <Label>{PostalCode}</Label>
                                    <input className="form-control" type="number" placeholder="ZIP Code" {...register('postalCode', { required: true })} />
                                    {errors.postalCode && <span style={{ color: 'red' }}>{'Zip code is required'} </span>}
                                </FormGroup>
                            </Col>
                            <Col md={5}>
                                <FormGroup>
                                    <Label>{Country}</Label>
                                    <Input type="select" className="btn-square">
                                        {usersCountryList.map((items, i) => <option key={i} value={i}>{items}</option>)}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <div>
                                    <Label>{AboutMe}</Label>
                                    <Input type="textarea" rows="4" placeholder="Enter About your description" />
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className="text-end"> <Btn color='primary'>{UpdateProfile}</Btn></CardFooter>
                </Form>
            </Card>
        </Col>
    )
}