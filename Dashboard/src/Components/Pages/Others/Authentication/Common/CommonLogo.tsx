import React from 'react'
import { Link } from 'react-router-dom'
import { LoginFormProp } from '../../../../../Types/Others.type'
import { Image } from '../../../../../AbstractElements'
import { dynamicImage } from '../../../../../Utils'

export default function CommonLogo({ logoClass }: LoginFormProp) {
    return (
        <Link className={`logo ${logoClass}`} to={`${process.env.PUBLIC_URL}/dashboard/default`}>
            <Image className="img-fluid for-light m-auto" src={dynamicImage(`logo/logo1.png`)} alt="looginpage" />
            <Image className="img-fluid for-dark" src={dynamicImage(`logo/logo-dark.png`)} alt="looginpage" />
        </Link>
    )
}