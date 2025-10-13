
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import FDPAttendedForm from "./pages/FDPAttended/FDPAttendedForm";
// import FDPConductedForm from "./pages/FDPConducted/FDPConductedForm";
// import ExpertTalkForm from "./pages/ExpertTalk/ExpertTalkForm";
// import TemplatePreview from "./components/TemplatePreview";
// import DownloadPage from "./pages/Download/DownloadPage";
// import { FDPAttendedProvider } from "./context/FDPAttendedContext";


// // Import Navbar
// import Navbar from "./components/Navbar"; // Update path if different

// function App() {
//   return (
//     <BrowserRouter>
//       <FDPAttendedProvider>
//         {/* Navbar added here so it shows on all pages */}
//         <Navbar />
        

//         <Routes>
//           <Route path="/" element={<Dashboard />} 
//           />
//           <Route path="/fdp-attended/*" element={<FDPAttendedForm />} />
//           <Route path="/fdp-conducted" element={<FDPConductedForm />} />
//           <Route path="/expert-talks" element={<ExpertTalkForm />} />
//           <Route path="/template-preview" element={<TemplatePreview />} />
//           <Route path="/download" element={<DownloadPage />} />
//         </Routes>
//       </FDPAttendedProvider>
//     </BrowserRouter>
//   );
// }

// export default App;






// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import FDPAttendedForm from "./pages/FDPAttended/FDPAttendedForm";
// import FDPConductedForm from "./pages/FDPConducted/FDPConductedForm";
// import ExpertTalkForm from "./pages/ExpertTalk/ExpertTalkForm";
// import TemplatePreview from "./components/TemplatePreview";
// import DownloadPage from "./pages/Download/DownloadPage";
// import { FDPAttendedProvider } from "./context/FDPAttendedContext";

// import { AuthProvider } from "./context/AuthContext";

// import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
// import FacultyDashboard from "./pages/FacultyDashboard/FacultyDashboard";

// import Sidebar from "./components/Sidebar";
// import { Box } from "@mui/material";

// function App() {
//   const sidebarWidth = 260; // must match Sidebar width

//   return (
//     <BrowserRouter>
//       <AuthProvider>
//       <FDPAttendedProvider>
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main content */}
//         <Box
//           component="main"
//           sx={{
//             ml: `${sidebarWidth}px`, // leave space for fixed sidebar
//             p: 3,
//             bgcolor: "#f5f5f5",
//             minHeight: "100vh",
//             transition: "margin-left 0.3s",
//           }}
//         >
//           <Routes>
//             <Route path="/admin-dashboard" element={<AdminDashboard />} />
//               <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/fdp-attended/*" element={<FDPAttendedForm />} />
//             <Route path="/fdp-conducted" element={<FDPConductedForm />} />
//             <Route path="/expert-talks" element={<ExpertTalkForm />} />
//             <Route path="/template-preview" element={<TemplatePreview />} />
//             <Route path="/download" element={<DownloadPage />} />
//           </Routes>
//         </Box>
//       </FDPAttendedProvider>
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
// ✅ Layout Wrapper for Sidebar
// ---------------------------
function AppLayout({ children }) {
  const sidebarWidth = 260;
  const location = useLocation();

  const hideSidebar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideSidebar && <Sidebar />}
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
                path="/"
                element={
                  <ProtectedRoute allowedRoles={["admin", "hod", "principal", "faculty"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/fdp-attended/*"
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




// // src/App.jsx
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { Box } from "@mui/material";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { FDPAttendedProvider } from "./context/FDPAttendedContext";

// // Pages
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
// import FacultyDashboard from "./pages/FacultyDashboard/FacultyDashboard";
// import FDPAttendedForm from "./pages/FDPAttended/FDPAttendedForm";
// import FDPConductedForm from "./pages/FDPConducted/FDPConductedForm";
// import ExpertTalkForm from "./pages/ExpertTalk/ExpertTalkForm";
// import TemplatePreview from "./components/TemplatePreview";
// import DownloadPage from "./pages/Download/DownloadPage";
// import Sidebar from "./components/Sidebar";

// // ✅ Protected Route Wrapper
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
//   }

//   return children;
// }

// // ✅ Layout Wrapper with Sidebar
// function AppLayout({ children }) {
//   const sidebarWidth = 260;
//   const location = useLocation();
//   const hideSidebar =
//     location.pathname === "/login" || location.pathname === "/register";

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

// // ✅ Main App Component
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

//               {/* Faculty Routes */}
//               <Route
//                 path="/faculty-dashboard"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty"]}>
//                     <FacultyDashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/fdp-attended"
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

//               {/* Admin Routes */}
//               <Route
//                 path="/admin-dashboard"
//                 element={
//                   <ProtectedRoute allowedRoles={["admin", "hod", "principal"]}>
//                     <AdminDashboard />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/download"
//                 element={
//                   <ProtectedRoute allowedRoles={["faculty", "admin", "hod", "principal"]}>
//                     <DownloadPage />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Default Redirect based on Role */}
//               <Route
//                 path="/"
//                 element={
//                   <RoleRedirect />
//                 }
//               />

//               {/* Fallback */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </AppLayout>
//         </FDPAttendedProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// // ✅ Role-based redirect (on “/”)
// function RoleRedirect() {
//   const { authData } = useAuth();

//   if (!authData?.token) return <Navigate to="/login" replace />;
//   if (["admin", "hod", "principal"].includes(authData.role))
//     return <Navigate to="/admin-dashboard" replace />;
//   if (authData.role === "faculty")
//     return <Navigate to="/faculty-dashboard" replace />;

//   return <Navigate to="/login" replace />;
// }

// export default App;
