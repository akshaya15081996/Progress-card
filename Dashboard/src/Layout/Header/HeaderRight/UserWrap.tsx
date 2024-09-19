import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { H6, Image, LI, P, UL } from '../../../AbstractElements'
import { dynamicImage } from '../../../Utils'
import { settingIconData } from '../../../Data/Layout/RightHeader'
import SvgIcon from '../../../Utils/CommonComponents/CommonSvgIcons'

export default function UserWrap() {
    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }
    const logout = () => {
        localStorage.clear();
    }
    return (
        <li className="profile-nav custom-dropdown">
            <div className="user-wrap" onClick={toggle}>
                {/* <div className="user-img">
                    <Image src={dynamicImage(`profile.png`)} alt="user" />
                </div> */}
                <div className="user-content">
                    <H6>{'Admin'}</H6>
                    <P className="mb-0">{'Admin'}<i className="fa-solid fa-chevron-down" /></P>
                </div>
            </div>
            <div className={`custom-menu overflow-hidden ${open ? 'show' : ''}`}>
                <UL className="profile-body simple-list">
                    {/* {settingIconData.map((item) => (
                        <LI className="d-flex" key={item.id}>
                            <SvgIcon className='svg-color' iconId={item.icon} />
                            <Link className="ms-2" to={`${process.env.PUBLIC_URL}/${item.link}`}>
                                {item.text}
                            </Link>
                        </LI>
                    ))} */}
                    <LI className="d-flex" onClick={logout}>
                        <SvgIcon className='svg-color' iconId='Login' />
                        <Link className="ms-2" to={`${process.env.PUBLIC_URL}/login`}>
                            {'Log Out'}
                        </Link>
                    </LI>
                </UL>
            </div>
        </li>
    )
}