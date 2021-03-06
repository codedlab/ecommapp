import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null
  //   };
  // }

  unsubscribeFromAuth = null;
  componentDidMount() {
      const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
      // createUserProfileDocument(userAuth);
      // // // this.setState({ currentUser: user });
      // console.log(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
        });
        console.log(this.state);
        //using else statement on this.setSate was suggested in the video
      } else {
        setCurrentUser(userAuth);
        console.log(userAuth);
      }
    })
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header/>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/shop/*' element={<ShopPage />} />
          <Route exact path='/checkout' element={<CheckoutPage/>} />
          <Route exact path='/signin' element={this.props.currentUser ? (<Navigate to='/'/>) : (<SignInAndSignUpPage />)} />
        </Routes>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
