import React, { useContext } from 'react'
import RouteConstants from '../../RouteConstants';
import { ServiceContext } from '../../dependency-injection/service-context';
import Layout from '../../Layout/Layout';

export default function Budget() {
    const services = useContext(ServiceContext);
    const authService = services.authService;

    return (
        <Layout>
            <div>
                
            </div>
        </Layout>
    )
}
