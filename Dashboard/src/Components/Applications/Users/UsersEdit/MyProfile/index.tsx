import React from 'react'
import { Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import CommonCardHeader from '../../../../../Utils/CommonComponents/CommonCardHeader'
import { Bio, EmailAddress, MyProfileTitle, Password, Save, Website } from '../../../../../Utils/Constants'
import { Btn, H3, H4, Image, P } from '../../../../../AbstractElements'
import { dynamicImage } from '../../../../../Utils'

export default function MyProfile() {
    return (
        <Col xl={4}>
            <Card>
                <CommonCardHeader titleClass='card-title' title={MyProfileTitle} />
                <CardBody>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Row className="mb-2">
                            <div className="profile-title">
                                <div className="d-flex gap-3">
                                    <Image className="img-70 rounded-circle" alt="" src={dynamicImage(`user/7.jpg`)} />
                                    <div className="flex-grow-1">
                                        <H3 className="mb-1">{'MARK JECNO'}</H3>
                                        <P>{'DESIGNER'}</P>
                                    </div>
                                </div>
                            </div>
                            <FormGroup>
                                <H4><Label>{Bio}</Label></H4>
                                <Input type="textarea" rows="5" defaultValue='On the other hand, we denounce with righteous indignation' />
                            </FormGroup>
                            <FormGroup>
                                <Label>{EmailAddress}</Label>
                                <Input type="email" placeholder="your-email@domain.com" />
                            </FormGroup>
                            <FormGroup>
                                <Label>{Password}</Label>
                                <Input type="password" defaultValue='password' autoComplete='' />
                            </FormGroup>
                            <FormGroup>
                                <Label>{Website}</Label>
                                <Input placeholder="http://Uplor.com" type="url" />
                            </FormGroup>
                            <div className="form-footer">
                                <Btn color='primary' block className='w-auto'>{Save}</Btn>
                            </div>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    )
}