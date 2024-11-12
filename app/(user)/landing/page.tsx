'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    getUser
} from "@/lib/features/auth/authSlice";

const LandingPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);
    useEffect(() => {
        dispatch(getUser());
    }, []);

    return (
        <div>
            <h1>Welcome {user?.data.name}</h1>
            <p>Your email is {user?.data.email}</p>
        </div>
    );
};

export default LandingPage;