import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LayoutRoutes from './LayoutRoutes'
import PrivateRoutes from './PrivateRoutes';
import SignIn from '../Auth';

export default function Routers() {
    const login = localStorage.getItem("login");

    return (
        <BrowserRouter basename={'/'}>
            <Routes>
                {login ? (
                    <>
                        <Route path={`${process.env.PUBLIC_URL}`} element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default`} />} />
                        <Route path={`/`} element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default`} />} />
                    </>
                ) : (
                    ""
                )}
                <Route path={"/"} element={<PrivateRoutes />}>
                    <Route path={`/*`} element={<LayoutRoutes />} />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/login`} element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    )
}