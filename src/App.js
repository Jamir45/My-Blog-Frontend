import React, { useState } from 'react'
import './Style/App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Header from './Components/Header/Header';
import Profile from './Components/Profile/Profile';
import Home from './Components/Home/Home';
import { ContextDataProvider, useContextData } from './Components/ContextProvider/ContextProvider';
import Signup from './Components/SignupAndSignin/Signup/Signup';
import Signin from './Components/SignupAndSignin/Signin/Signin';
import ActivateAccount from './Components/ActivateAccount/ActivateAccount';
import CreateProfile from './Components/CreateProfile/CreateProfile';
import CreateArticle from './Components/CreateArticle/CreateArticle';
import ArticleDetails from './Components/ArticleDetails/ArticleDetails';
import EditArticle from './Components/EditArticle/EditArticle';
import Bookmark from './Components/Bookmarks/Bookmarks';
import PopularArticlePage from './Components/Home/PopularArticle/PopularArticlePage';


function App() {
  const [header, setHeader] = useState(true)

  return (
    <ContextDataProvider>
      <Router>
        {header && <Header />}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/user/profile">
            <Profile />
          </Route>
          <Route path="/create/profile">
            <CreateProfile />
          </Route>
          <Route path="/create/article">
            <CreateArticle />
          </Route>
          <Route path="/bookmarks">
            <Bookmark />
          </Route>
          <Route path="/popular-article">
            <PopularArticlePage />
          </Route>
          <Route path="/article/edit/:editArticleId">
            <EditArticle />
          </Route>
          <Route path="/article/details/:articleId">
            <ArticleDetails />
          </Route>
          <Route path="/account/activate/:userToken">
            <ActivateAccount setHeader={setHeader} />
          </Route>
          
        </Switch>
      </Router>
    </ContextDataProvider>
  );
}

export default App;
