import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/*
Screens
*/
import ProductsPage from '../pages/admin/products/products';
import ProductsCreatePage from '../pages/admin/products/productsCreate';
import EventsPage from '../pages/admin/events/events';
import EventsCreatePage from '../pages/admin/events/eventsCreate';

const adminRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/admin/products/" component={ProductsPage} />
                <Route exact path="/admin/products/create/" component={ProductsCreatePage} />
                <Route exact path="/admin/events/" component={EventsPage} /> 
                <Route exact path="/admin/events/create/" component={EventsCreatePage} />
            </Switch>
        </Router>
    )
}

export default adminRouter;