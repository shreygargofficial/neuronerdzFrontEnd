import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Contact from './components/Contact'
import About from './components/About'
import Home from './components/Home'
import Blog from './components/Blog'
import Article from './components/Article'
import Search from './components/Search'
import Category from './components/Category'
import CategoryList from './components/CategoryList'
import RecentPost from './components/RecentPost'
import Page from './components/Page'
import Login from './components/Login'
import Team from './components/Team'
import NavbarTop from './components/NavbarTop'
import NavbarBottom from './components/NavbarBottom'
import { urlR } from './components/url'
import PostBlog from './components/PostBlog';
import Admin from './components/Admin';
import AdminPost from './components/AdminPost';
import AdminComment from './components/AdminComments';
import AdminUser from './components/AdminUsers';
import User from './components/User';



class App extends React.Component {
  state = {
    searchValue: "",
    searchSubmitStatus: false
  }
  searchChangeHandler = (e) => {
    this.setState({ searchValue: e.target.value, searchSubmitStatus: false })
  }
  searchSubmit = () => {
    this.setState({ searchSubmitStatus: true })
  }

  render() {

    return (
      <React.Fragment>
        <BrowserRouter>
          {window.location.pathname.match(/\/admin.*/) ?
            (
              <React.Fragment>
                <Switch>
                  <Route exact path={'/admin'} component={Admin} />
                  <Route exact path={'/admin/login'} component={Login} />
                  <Route exact path={'/admin/post'} component={AdminPost} />
                  <Route exact path={'/admin/comment'} component={AdminComment} />
                  <Route exact path={'/admin/user'} component={AdminUser} />
                  <Route exact path={'/admin/user/:username'} component={User} />
                  <Route exact path={'/'} render={() => this.setState({})} />
                </Switch>
              </React.Fragment>
            ) : window.location.pathname.match(/\/.+/) ?
              (
                <React.Fragment>
                  <NavbarTop />
                  <main className="container">
                    {/* Logo */}
                    <div className="neuronerdz-logo">
                      <img src={urlR + "images/logoMain.png"} alt="Neuronerdz" />
                      <h6>Neuronerdz</h6>
                    </div>
                    {/* Navbar bootom */}
                    <NavbarBottom />
                    <section className="row">
                      <article className="col-md-8 ">
                        <Switch>
                          <Route exact path={'/contact'} component={Contact} />
                          <Route exact path={'/admin/*'} render={() => this.setState({})} />
                          <Route exact path={'/about'} component={About} />
                          <Route exact path={'/home'} render={() => <Redirect to="/" push />} />
                          <Route exact path={'/team'} component={Team} />
                          <Route exact path={'/blog'} component={Blog} />
                          <Route exact path={'/page/:page'} component={Page} />
                          <Route exact path={'/search/:searchTag'} component={Search} />
                          <Route exact path={'/category/:category'} component={Category} />
                          <Route exact path={'/post'} component={PostBlog} />
                          <Route exact path={'/:titleUrl'} component={Article} />
                          <Route exact path={'/'} render={() => this.setState({})} />
                        </Switch>
                      </article>
                      {/* Search bar for non admin */}
                      <article className="col-md-4">
                        <div className="search-container">
                          <input type="text" placeholder="search..." value={this.state.searchValue} onChange={this.searchChangeHandler} id="search" />
                          <button className="bt bt-primary" onClick={this.searchSubmit}>search</button>
                          {this.state.searchSubmitStatus && <Redirect to={'/search/' + this.state.searchValue} push />}
                        </div>
                        <div className="recent-post mt-4">
                          <h2 className="">Recent Post</h2>
                          <RecentPost />
                        </div>
                        <div className="categories mt-4">
                          <h2 className="">Categories</h2>
                          <CategoryList />
                        </div>
                      </article>
                    </section>
                  </main>
                </React.Fragment>
              ) :
              (
                <React.Fragment>
                  <NavbarTop />
                  <main className="container">
                    {/* Logo */}
                    <div className="neuronerdz-logo">
                      <img src={urlR + "images/logoMain.png"} alt="Neuronerdz" />
                      <h6>Neuronerdz</h6>
                    </div>
                    {/* Navbar bootom */}
                    <NavbarBottom />
                    <section className="row">
                      Home
                    </section>
                    <Switch>
                      <Route exact path='/(.+)' render={() => this.setState({})} />
                    </Switch>
                  </main>
                </React.Fragment>
              )
          }
        </BrowserRouter>
      </React.Fragment >
    );
  }
}

export default App;
