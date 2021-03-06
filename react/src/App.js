// React Imports
import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

// Local Component Imports
import Home             from './containers/Home';
import BoardIndexHeader from './components/BoardIndexHeader';
import BoardForm     from './containers/BoardForm'
import BoardContainer   from './containers/BoardContainer';
import ArcIndex         from './containers/ArcIndex';
import ArcNew           from './containers/ArcNew';
import ArcEdit           from './containers/ArcEdit';
import ArcShow          from './containers/ArcShow';
import PostWithQuill    from './containers/PostWithQuill';
import CharacterForm    from './containers/CharacterForm';
import EditCharacter    from './containers/EditCharacter';

const App = (props) => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={Home} />
      <Route path='/boards' component={BoardIndexHeader} />
      <Route path='/boards/new' component={BoardForm} />
      <Route path='/boards/:board_id/edit' component={BoardForm} />
      <Route path='/boards/:board_id' component={BoardContainer}>
        <IndexRoute component={ArcIndex} />
        <Route path='arcs/new' component={ArcNew} />
        <Route path='arcs/:arc_id/edit' component={ArcEdit} />
        <Route path='arcs/:arc_id' component={ArcShow} />
        <Route path='arcs/:arc_id/posts/new' component={PostWithQuill} />
        <Route path='arcs/:arc_id/posts/:post_id/edit' component={PostWithQuill} />
        <Route path='characters/new' component={CharacterForm} />
        <Route path='characters/:id/edit' component={EditCharacter} />
      </Route>
    </Router>
  )
}

export default App;
