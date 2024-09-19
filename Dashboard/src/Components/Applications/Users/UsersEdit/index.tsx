import React from 'react'
import Breadcrumbs from '../../../../CommonElements/Breadcrumbs'
import { Container, Row } from 'reactstrap'
import { EditProfileTitle, UsersTitle } from '../../../../Utils/Constants'
import MyProfile from './MyProfile'
import EditProfile from './EditProfile'
import AddProjectsAndUpload from './AddProjectsAndUpload'

export default function EditProfileContainer() {
    return (
        <>
            <Breadcrumbs pageTitle={EditProfileTitle} parent={UsersTitle} title={EditProfileTitle} />
            <Container fluid>
                <div className="edit-profile">
                    <Row>
                        <MyProfile />
                        <EditProfile />
                        <AddProjectsAndUpload />
                    </Row>
                </div>
            </Container>
        </>
    )
}