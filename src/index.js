
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PartnerGuard from './components/PartnerGuard';
import OwnerGuard from './components/OwnerGuard';


import Layout from './components/Layout';

import SplashPage from './pages/SplashPage';
import WelcomePage from './pages/WelcomePage';
import SignUpPage from './pages/SignUpPage';
import VerifyPage from './pages/VerifyPage';
import NamePage from './pages/NamePage';
import TogetherPage from './pages/TogetherPage';
import SignInPage from './pages/SignInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import InvitePage from './pages/InvitePage';
import TopicsPage from './pages/TopicsPage';
import ChatMoneyPage from './pages/ChatMoneyPage';
import ChatFidelityPage from './pages/ChatFidelityPage';
import ChatHomePage from './pages/ChatHomePage';
import ReviewPactPage from './pages/ReviewPactPage';
import AgreePage from './pages/AgreePage';
import WaitingPage from './pages/WaitingPage';
import CompletePage from './pages/CompletePage';
import DashboardPage from './pages/DashboardPage';
import CheckInPage from './pages/CheckInPage';
import RepairChatPage from './pages/RepairChatPage';
import AccountPage from './pages/AccountPage';
import NotificationsPage from './pages/NotificationsPage';
import PartnerJoinPage from './pages/PartnerJoinPage';
import PartnerReviewPage from './pages/PartnerReviewPage';
import ChatFuturePage from './pages/ChatFuturePage';
import ChatConflictPage from './pages/ChatConflictPage';
import ChatSeparationPage from './pages/ChatSeperationPage';
import PartnerPactReviewPage from './pages/PartnerPactReviewPage';

import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TOS from './pages/TosPage';
import Privacy from './pages/PrivacyPolicy';
import Cookies from './pages/CookiePolicyPage';


const GOOGLE_CLIENT_ID = '90321078061-0170dr3h7mknf595o674b7ctu70av45u.apps.googleusercontent.com';


const stripePromise = loadStripe("pk_test_51OwuO4LcfLzcwwOYdssgGfUSfOgWT1LwO6ewi3CEPewY7WEL9ATqH6WJm3oAcLDA3IgUvVYLVEBMIEu0d8fUwhlw009JwzEYmV");


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      
      { path: '/', element: <SplashPage /> },
      { path: '/welcome', element: <WelcomePage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/verify', element: <VerifyPage /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/join', element: <PartnerJoinPage /> },
      { path: '/complete', element: <CompletePage /> },
      { path:"/reset-password", element:<ResetPasswordPage/>},
      {path:'/terms-of-service',element:<TOS/>},
      {path:'/privacy-policy',element:<Privacy/>},
      {path:'/cookie-policy',element:<Cookies/>},
     

      {
        path: '/name',
        element: <PartnerGuard><NamePage /></PartnerGuard>,
      },
      {
        path: '/together',
        element: <PartnerGuard><TogetherPage /></PartnerGuard>,
      },
      {
        path: '/invite',
        element: <PartnerGuard><InvitePage /></PartnerGuard>,
      },
      {
        path: '/topics',
        element: <PartnerGuard><TopicsPage /></PartnerGuard>,
      },
      {
        path: '/chat/money',
        element: <PartnerGuard><ChatMoneyPage /></PartnerGuard>,
      },
      {
        path: '/chat/fidelity',
        element: <PartnerGuard><ChatFidelityPage /></PartnerGuard>,
      },
      {
        path: '/chat/home',
        element: <PartnerGuard><ChatHomePage /></PartnerGuard>,
      },
      { path: '/chat/future', element: <PartnerGuard><ChatFuturePage /></PartnerGuard> },
{ path: '/chat/conflict', element: <PartnerGuard><ChatConflictPage /></PartnerGuard> },
{ path: '/chat/separation', element: <PartnerGuard><ChatSeparationPage /></PartnerGuard> },
      {
        path: '/review',
        element: <PartnerGuard><ReviewPactPage /></PartnerGuard>,
      },
      {
        path: '/agree',
        element: <AgreePage />,
      },
      {
        path: '/partner-pact',
        element: <PartnerPactReviewPage />,
      },
      {
        path: '/waiting',
        element: <PartnerGuard><WaitingPage /></PartnerGuard>,
      },
      {
        path: '/dashboard',
        element: <PartnerGuard><DashboardPage /></PartnerGuard>,
      },
      {
        path: '/checkin',
        element: <PartnerGuard><CheckInPage /></PartnerGuard>,
      },
      {
        path: '/repair',
        element: <PartnerGuard><RepairChatPage /></PartnerGuard>,
      },
      {
        path: '/account',
        element: <PartnerGuard><AccountPage /></PartnerGuard>,
      },

      {
        path: '/notifications',
        element: <PartnerGuard><NotificationsPage /></PartnerGuard>,
      },

      {
        path: '/partner-review',
        element: <OwnerGuard><PartnerReviewPage /></OwnerGuard>,
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

    <Elements stripe={stripePromise}>
    <RouterProvider router={router} />
    </Elements>

    </GoogleOAuthProvider>
  
);