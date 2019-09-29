import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/*
Screens
*/
import ProductsPage from '../pages/admin/products';
import ProductsCreatePage from '../pages/admin/productsCreate';
import EventsPage from '../pages/admin/events';

const adminRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/admin/products/" component={ProductsPage} />
                <Route exact path="/admin/products/create/" component={ProductsCreatePage} />
                <Route exact path="/admin/events/" component={EventsPage} /> 
            </Switch>
        </Router>
    )
}

export default adminRouter;