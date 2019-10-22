import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/*
Screens
*/
import ProductsPage from '../pages/admin/products/products';
import ProductsCreatePage from '../pages/admin/products/productsCreate';
import EventsPage from '../pages/admin/events/events';
import EventsCreatePage from '../pages/admin/events/eventsCreate';
import LocationsPage from '../pages/admin/locations/locations';
import LocationsCreatePage from '../pages/admin/locations/locationsCreate';
import PostsPage from '../pages/admin/posts/posts';
import PostsCreatePage from '../pages/admin/posts/postsCreate';


const adminRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/admin/products/" component={ProductsPage} />
                <Route exact path="/admin/products/create/" component={ProductsCreatePage} />
                <Route exact path="/admin/events/" component={EventsPage} /> 
                <Route exact path="/admin/events/create/" component={EventsCreatePage} />
                <Route exact path="/admin/locations/" component={LocationsPage} /> 
                <Route exact path="/admin/locations/create/" component={LocationsCreatePage} />
                <Route exact path="/admin/posts/" component={PostsPage} /> 
                <Route exact path="/admin/posts/create/" component={PostsCreatePage} />
            </Switch>
        </Router>
    )
}

export default adminRouter;