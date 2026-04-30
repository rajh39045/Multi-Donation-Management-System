import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import CreateDonation from "../pages/CreateDonation";
import MyDonations from "../pages/MyDonations";
import Certificates from "../pages/Certificates";
import Profile from "../pages/Profile";
import Donations from "../pages/Donations";
import Requests from "../pages/Requests";

import ProtectedRoute from "../routes/ProtectedRoute";
import RoleProtectedRoute from "../routes/RoleProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>

        <Route index element={<Dashboard />} />

        <Route path="create-donation" element={
          <RoleProtectedRoute allowedRoles={["DONOR"]}>
            <CreateDonation />
          </RoleProtectedRoute>
        } />

        <Route path="my-donations" element={
          <RoleProtectedRoute allowedRoles={["DONOR"]}>
            <MyDonations />
          </RoleProtectedRoute>
        } />

        <Route path="requests" element={
          <RoleProtectedRoute allowedRoles={["DONOR"]}>
            <Requests />
          </RoleProtectedRoute>
        } />

        <Route path="donations" element={
          <RoleProtectedRoute allowedRoles={["NGO", "VOLUNTEER"]}>
            <Donations />
          </RoleProtectedRoute>
        } />

        <Route path="certificates" element={<Certificates />} />
        <Route path="profile" element={<Profile />} />

      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;