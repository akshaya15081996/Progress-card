import React from 'react'
import { Link } from 'react-router-dom'
import { FormGroup } from 'reactstrap';
import { LI, UL } from '../AbstractElements';

export default function SocialLink() {
    return (
        <>
            <FormGroup>
                <UL className="simple-list flex-row login-social">
                    <LI><Link to="https://www.linkedin.com" target='_blank'><i className='icon-linkedin' /></Link></LI>
                    <LI><Link to="https://twitter.com" target='_blank'><i className='icon-twitter' /></Link></LI>
                    <LI><Link to="https://www.facebook.com" target='_blank'><i className='icon-facebook' /></Link></LI>
                    <LI><Link to="https://www.instagram.com" target='_blank'><i className='icon-instagram' /></Link></LI>
                </UL>
            </FormGroup>
        </>
    )
}