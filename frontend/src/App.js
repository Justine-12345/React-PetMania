import './App.css';
import Header from './components/layout/Header'
import Landing from './components/Landing'
import Home from './components/Home'
import Searched from './components/Searched'
import NewUser from './components/NewUser'

import AnimalList from './components/admin/AnimalList'
import NewAnimal from './components/admin/NewAnimal'
import UpdateAnimal from './components/admin/UpdateAnimal'
import AnimalDetails from './components/animal/AnimalDetails'

import Dashboard from './components/admin/Dashboard'
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import UserDetails from './components/user/UserDetails'
import Register from './components/user/Register'
import Login from './components/user/Login'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'

import DiseaseList from './components/admin/DiseaseList'
import NewDisease from './components/admin/NewDisease'
import DiseaseDetails from './components/disease/DiseaseDetails'
import UpdateDisease from './components/admin/UpdateDisease'

import ProtectedRoute from './components/route/ProtectedRoute'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {

  return (
   <Router>
    <div>
  

      {/*<Header/>*/}

      <Routes>
            <Route path="/" element={<Home/>} exact="true" />
            <Route path="/landing" element={<Landing/>} exact="true" />
            <Route path="/newuser" element={<NewUser/>} exact="true" />
            <Route path="/search/:keyword" element={<Home/>} exact="true" />

     
            <Route path="/register" element={<Register/>} exact="true"/>
            <Route path="/login" element={<Login/>} exact="true"/>
            <Route path="/password/forgot" element={<ForgotPassword/>} exact="true" />
            <Route path="/password/reset/:token" element={<NewPassword/>} exact="true" />
           

            {/*<Route path="/me" element={
            <ProtectedRoute>
                 <Profile />
            </ProtectedRoute> } exact="true" />*/}

            <Route path="/me/update" element={
            <ProtectedRoute>
                 <UpdateProfile />
            </ProtectedRoute> } exact="true" />

            <Route path="/password/update" element={
            <ProtectedRoute>
                 <UpdatePassword />
            </ProtectedRoute> } exact="true" />

            <Route path="/user/:id" element={
            <ProtectedRoute>
                 <UserDetails />
            </ProtectedRoute> } exact="true" />
            

            {/*ANIMAL CRUD*/}
            {/*<Route path="/admin/animals" element={<AnimalList/>} exact="true" />*/}
            {/*<Route path="/admin/animals/:filterAdoption" element={<AnimalList/>} exact="true" />*/}
            {/*<Route path="/admin/animal" element={<NewAnimal/>} exact="true" />*/}
            {/*<Route path="/admin/animal/update/:id" element={<UpdateAnimal/>} exact="true" />*/}

            <Route path="/animal/:id" element={<AnimalDetails/>} exact="true" />


            <Route path="/admin/animals" isAdmin={true} element={
            <ProtectedRoute>
                 <AnimalList/>
            </ProtectedRoute> } exact="true" />

            <Route path="/admin/animals/:filterAdoption" isAdmin={true} element={
            <ProtectedRoute>
                 <AnimalList/>
            </ProtectedRoute> } exact="true" />

            <Route path="/admin/animal" isAdmin={true} element={
            <ProtectedRoute>
                 <NewAnimal/>
            </ProtectedRoute> } exact="true" />

            <Route path="/admin/animal/update/:id" isAdmin={true} element={
            <ProtectedRoute>
                 <UpdateAnimal/>
            </ProtectedRoute> } exact="true" />



            {/*USER CRUD*/}
            {/*<Route path="/user/:id" element={<UserDetails/>} exact="true" />    {/*<<<FOR ADMIN*/}*/}
            {/*<Route path="/admin/dashboard" element={<Dashboard/>} exact="true" />*/}
            {/*<Route path="/admin/users" element={<UsersList/>} exact="true" />*/}
            {/*<Route path="/admin/users/:filterRole" element={<UsersList/>} exact="true" />*/}
            {/*<Route path="/admin/user/:id" element={<UpdateUser/>} exact />*/}


            <Route path="/admin/dashboard" isAdmin={true} element={
            <ProtectedRoute>
                 <Dashboard/>
            </ProtectedRoute> } exact="true" />

            <Route path="/admin/users" isAdmin={true} element={
            <ProtectedRoute>
                 <UsersList/>
            </ProtectedRoute> } exact="true" />

            <Route path="/admin/users/:filterRole" isAdmin={true} element={
            <ProtectedRoute>
                 <UsersList/>
            </ProtectedRoute> } exact="true" />

            <Route path="/admin/user/:id" isAdmin={true} element={
            <ProtectedRoute>
                 <UpdateUser/>
            </ProtectedRoute> } exact="true" />


            {/*DISEASE CRUD*/}
            {/*<Route path="/admin/diseases" element={<DiseaseList/>} exact="true" />*/}
            {/*<Route path="/admin/disease" element={<NewDisease/>} exact="true" />*/}
            {/*<Route path="/disease/:id" element={<DiseaseDetails/>} exact="true" />*/}
            {/*<Route path="/admin/disease/update/:id" element={<UpdateDisease/>} exact="true" />*/}

            <Route path="/admin/diseases" isAdmin={true} element={
            <ProtectedRoute>
                 <DiseaseList/>
            </ProtectedRoute> } exact="true" />

            <Route path="/admin/disease" isAdmin={true} element={
            <ProtectedRoute>
                 <NewDisease/>
            </ProtectedRoute> } exact="true" />

            <Route path="/disease/:id" isAdmin={true} element={
            <ProtectedRoute>
                 <DiseaseDetails/>
            </ProtectedRoute> } exact="true" />

            <Route path="/admin/disease/update/:id" isAdmin={true} element={
            <ProtectedRoute>
                 <UpdateDisease/>
            </ProtectedRoute> } exact="true" />



      </Routes>

    </div>
     </Router>
  );
}

export default App;
