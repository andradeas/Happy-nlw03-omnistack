import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import RestrictArea from './pages/RestrictArea';
import Register from './pages/Register'
import { AuthProvider } from './contexts/auth'

const Routes: React.FC = () => {
    return(
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Landing}/>
                    <Route path="/app" component={OrphanagesMap}/>

                    <Route path="/orphanages/create" component={CreateOrphanage}/>
                    <Route path="/orphanages/:id" component={Orphanage}/>
                    <Route path="/restrictArea" component={RestrictArea}/>
                    <Route exact path='/register' component={Register} />

                    <Route render={ ({ location }) => <Redirect to={{ pathname: '/', state: { from: location } }} />} />
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Routes;