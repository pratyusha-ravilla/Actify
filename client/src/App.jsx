

// // src/App.jsx
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import FDPAttendedForm from "./pages/FDPAttended/FDPAttendedForm";
// import FDPConductedForm from "./pages/FDPConducted/FDPConductedForm";
// import ExpertTalkForm from "./pages/ExpertTalk/ExpertTalkForm";
// import TemplatePreview from "./components/TemplatePreview";
// import DownloadPage from "./pages/Download/DownloadPage";
// import { FDPAttendedProvider } from "./context/FDPAttendedContext";
// import { AuthProvider, useAuth } from "./context/AuthContext";

// import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
// import FacultyDashboard from "./pages/FacultyDashboard/FacultyDashboard";

// import Sidebar from "./components/Sidebar";
// import { Box } from "@mui/material";

// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// // ---------------------------
// // ✅ Protected Route Component
// // ---------------------------
// function ProtectedRoute({ children, allowedRoles }) {
//   const { authData } = useAuth();
//   const location = useLocation();

//   if (!authData?.token) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(authData.role)) {
//     if (["admin", "hod", "principal"].includes(authData.role))
//       return <Navigate to="/admin-dashboard" replace />;
//     if (authData.role === "faculty") return <Navigate to="/faculty-dashboard" replace />;
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// // ---------------------------
// // ✅ Layout Wrapper for Sidebar
// // ---------------------------
// function AppLayout({ children }) {
//   const sidebarWidth = 260;
//   const location = useLocation();

//   const hideSidebar = location.pathname === "/login" || location.pathname === "/register";

//   return (
//     <>
//       {!hideSidebar && <Sidebar />}
//       <Box
//         component="main"
//         sx={{
//           ml: !hideSidebar ? `${sidebarWidth}px` : 0,
//           p: 3,
//           bgcolor: "#f5f5f5",
//           minHeight: "100vh",
//           transition: "margin-left 0.3s",
//         }}
//       >
//         {children}
//       </Box>
//     </>
//   );
// }

// // ---------------------------
// // ✅ Main App Component
// // ---------------------------
// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <FDPAttendedProvider>
//           <AppLayout>
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />

//               {/* Protected Routes */}
//               <Route
//                 path="/admin-dashboard"
//                 element={
//                   <ProtectedRoute allowedRoles={["admin", "hod", "principal"]}>
//                     <AdminDashboard />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/faculty-dashboard"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty"]}>
//                     <FacultyDashboard />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/"
//                 element={
//                   <ProtectedRoute allowedRoles={["admin", "hod", "principal", "faculty"]}>
//                     <Dashboard />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/fdp-attended/*"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty"]}>
//                     <FDPAttendedForm />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/fdp-conducted"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty"]}>
//                     <FDPConductedForm />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/expert-talks"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty"]}>
//                     <ExpertTalkForm />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/template-preview"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty"]}>
//                     <TemplatePreview />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/download"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty", "admin"]}>
//                     <DownloadPage />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Redirect unknown routes */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </AppLayout>
//         </FDPAttendedProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;









// // src/App.jsx
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { Box } from "@mui/material";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import FDPAttendedForm from "./pages/FDPAttended/FDPAttendedForm";
// import FDPConductedForm from "./pages/FDPConducted/FDPConductedForm";
// import ExpertTalkForm from "./pages/ExpertTalk/ExpertTalkForm";
// import TemplatePreview from "./components/TemplatePreview";
// import DownloadPage from "./pages/Download/DownloadPage";
// import { FDPAttendedProvider } from "./context/FDPAttendedContext";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
// import FacultyDashboard from "./pages/FacultyDashboard/FacultyDashboard";
// import Sidebar from "./components/Sidebar";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import Navbar from "./components/Navbar"; // ✅ New
// import Home from "./pages/Public/Home"; // ✅ New
// import AboutUs from "./pages/Public/AboutUs"; // ✅ New
// import Contact from "./pages/Public/Contact"; // ✅ New

// // ---------------------------
// // ✅ Protected Route Component
// // ---------------------------
// function ProtectedRoute({ children, allowedRoles }) {
//   const { authData } = useAuth();
//   const location = useLocation();

//   if (!authData?.token) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(authData.role)) {
//     if (["admin", "hod", "principal"].includes(authData.role))
//       return <Navigate to="/admin-dashboard" replace />;
//     if (authData.role === "faculty") return <Navigate to="/faculty-dashboard" replace />;
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// // ---------------------------
// // ✅ Layout Wrapper for Sidebar / Navbar
// // ---------------------------
// function AppLayout({ children }) {
//   const sidebarWidth = 260;
//   const location = useLocation();

//   // Hide sidebar on auth + public pages
//   const hideSidebar =
//     ["/login", "/register", "/", "/about", "/contact"].includes(location.pathname);

//   return (
//     <>
//       {!hideSidebar && <Sidebar />}
//       {hideSidebar && <Navbar />} {/* ✅ Show Navbar for public routes */}
//       <Box
//         component="main"
//         sx={{
//           ml: !hideSidebar ? `${sidebarWidth}px` : 0,
//           p: 3,
//           bgcolor: "#f5f5f5",
//           minHeight: "100vh",
//           transition: "margin-left 0.3s",
//         }}
//       >
//         {children}
//       </Box>
//     </>
//   );
// }

// // ---------------------------
// // ✅ Main App Component
// // ---------------------------
// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <FDPAttendedProvider>
//           <AppLayout>
//             <Routes>
//               {/* 🌐 Public Routes */}
//               <Route path="/" element={<Home />} />
//               <Route path="/about" element={<AboutUs />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />

//               {/* 🔐 Protected Routes */}
//               <Route
//                 path="/admin-dashboard"
//                 element={
//                   <ProtectedRoute allowedRoles={["admin", "hod", "principal"]}>
//                     <AdminDashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/faculty-dashboard"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty"]}>
//                     <FacultyDashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/dashboard"
//                 element={
//                   <ProtectedRoute allowedRoles={["admin", "hod", "principal", "faculty"]}>
//                     <Dashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/fdp-attended/*"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty"]}>
//                     <FDPAttendedForm />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/fdp-conducted"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty"]}>
//                     <FDPConductedForm />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/expert-talks"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty"]}>
//                     <ExpertTalkForm />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/template-preview"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty"]}>
//                     <TemplatePreview />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/download"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty", "admin"]}>
//                     <DownloadPage />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Redirect unknown routes */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </AppLayout>
//         </FDPAttendedProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;




// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import FDPAttendedForm from "./pages/FDPAttended/FDPAttendedForm";
import FDPConductedForm from "./pages/FDPConducted/FDPConductedForm";
import ExpertTalkForm from "./pages/ExpertTalk/ExpertTalkForm";
import TemplatePreview from "./components/TemplatePreview";
import DownloadPage from "./pages/Download/DownloadPage";
import { FDPAttendedProvider } from "./context/FDPAttendedContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard/FacultyDashboard";
import Sidebar from "./components/Sidebar";
import { Box } from "@mui/material";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// ✅ New Pages
import Home from "./pages/Public/Home";
import About from "./pages/Public/AboutUs";
import Contact from "./pages/Public/Contact";
import Navbar from "./components/Navbar";

// ---------------------------
// ✅ Protected Route Component
// ---------------------------
function ProtectedRoute({ children, allowedRoles }) {
  const { authData } = useAuth();
  const location = useLocation();

  if (!authData?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authData.role)) {
    if (["admin", "hod", "principal"].includes(authData.role))
      return <Navigate to="/admin-dashboard" replace />;
    if (authData.role === "faculty") return <Navigate to="/faculty-dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}

// ---------------------------
// ✅ Layout Wrapper for Sidebar + Navbar
// ---------------------------
function AppLayout({ children }) {
  const sidebarWidth = 260;
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/" ||
    location.pathname === "/about" ||
    location.pathname === "/contact";

  return (
    <>
      {!hideSidebar && <Sidebar />}
      {hideSidebar && <Navbar />}
      <Box
        component="main"
        sx={{
          ml: !hideSidebar ? `${sidebarWidth}px` : 0,
          p: 3,
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
          transition: "margin-left 0.3s",
        }}
      >
        {children}
      </Box>
    </>
  );
}

// ---------------------------
// ✅ Main App Component
// ---------------------------
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FDPAttendedProvider>
          <AppLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute allowedRoles={["admin", "hod", "principal"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/faculty-dashboard"
                element={
                  <ProtectedRoute allowedRoles={["faculty"]}>
                    <FacultyDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["admin", "hod", "principal", "faculty"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/fdp-attended"
                element={
                  <ProtectedRoute allowedRoles={["faculty"]}>
                    <FDPAttendedForm />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/fdp-conducted"
                element={
                  <ProtectedRoute allowedRoles={["faculty"]}>
                    <FDPConductedForm />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/expert-talks"
                element={
                  <ProtectedRoute allowedRoles={["faculty"]}>
                    <ExpertTalkForm />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/template-preview"
                element={
                  <ProtectedRoute allowedRoles={["faculty"]}>
                    <TemplatePreview />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/download"
                element={
                  <ProtectedRoute allowedRoles={["faculty", "admin"]}>
                    <DownloadPage />
                  </ProtectedRoute>
                }
              />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </FDPAttendedProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
