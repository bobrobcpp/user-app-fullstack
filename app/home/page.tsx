'use client';

import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card"


const HomePage: React.FC = () => {

    return (
        <div className="container mx-auto mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, this is the home page</CardTitle>
                </CardHeader>
            </Card>
        </div>
    );
};

export default HomePage;