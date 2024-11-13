'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    getUser,
    selectUser
} from "@/lib/features/auth/authSlice";

const LandingPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    useEffect(() => {
        dispatch(getUser());
    }, []);

    return (
        <div className="container mx-auto mt-10">
            {user && user.data &&
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome, {user?.data.name}!</CardTitle>
                        <CardDescription>Here are your account details:</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <p><strong>Name:</strong> {user?.data.name}</p>
                            <p><strong>Email:</strong> {user?.data.email}</p>
                        </div>
                    </CardContent>
                </Card>
            }
        </div>
    );
};

export default LandingPage;