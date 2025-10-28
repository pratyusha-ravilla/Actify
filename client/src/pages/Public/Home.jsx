//client/src/pages/Public/Home.jsx


// import React from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Paper,
//   Button,
//   Stack,
//   Divider,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import SchoolIcon from "@mui/icons-material/School";
// import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import InsightsIcon from "@mui/icons-material/Insights";
// import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import Footer from "../../components/Footer"; // adjust path if needed

// export default function Home() {
//   const navigate = useNavigate();

//   const features = [
//     {
//       title: "FDP Attended",
//       desc: "Upload and track Faculty Development Programs you have attended.",
//       icon: <SchoolIcon sx={{ fontSize: 50, color: "#3f51b5" }} />,
//     },
//     {
//       title: "FDP Conducted",
//       desc: "Record and manage FDP sessions you’ve organized for your peers.",
//       icon: <EmojiEventsIcon sx={{ fontSize: 50, color: "#3f51b5" }} />,
//     },
//     {
//       title: "Expert Talk",
//       desc: "Document expert talks and guest lectures conducted or attended.",
//       icon: <RecordVoiceOverIcon sx={{ fontSize: 50, color: "#3f51b5" }} />,
//     },
//   ];

//   const benefits = [
//     {
//       icon: <VerifiedUserIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
//       title: "Secure & Reliable",
//       desc: "All your academic records are safely stored and easily accessible anytime.",
//     },
//     {
//       icon: <InsightsIcon sx={{ fontSize: 40, color: "#0288d1" }} />,
//       title: "Automated Reports",
//       desc: "Instantly generate formatted PDFs or Word reports for any submission.",
//     },
//     {
//       icon: <CloudDownloadIcon sx={{ fontSize: 40, color: "#6a1b9a" }} />,
//       title: "Cloud Access",
//       desc: "Access your activities and reports from anywhere on any device.",
//     },
//   ];

//   const stats = [
//     { number: "500+", label: "FDPs Recorded" },
//     { number: "120+", label: "Expert Talks" },
//     { number: "35+", label: "Institutions Connected" },
//   ];

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
//         pt: 10,
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* ---------------- HERO SECTION ---------------- */}
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <Box textAlign="center" mb={8}>
//             <Typography
//               variant="h3"
//               fontWeight="bold"
//               gutterBottom
//               sx={{ color: "#1a237e" }}
//             >
//               Welcome to Actify Faculty Portal
//             </Typography>
//             <Typography
//               variant="h6"
//               color="text.secondary"
//               sx={{ maxWidth: "750px", mx: "auto", mb: 4 }}
//             >
//               A smart way to record, manage, and generate reports for your
//               academic activities like FDPs and Expert Talks — all in one
//               place.
//             </Typography>

//             <Button
//               variant="contained"
//               color="primary"
//               size="large"
//               onClick={() => navigate("/login")}
//               sx={{
//                 borderRadius: 3,
//                 px: 5,
//                 py: 1.5,
//                 textTransform: "none",
//                 fontWeight: 600,
//                 boxShadow: 4,
//                 "&:hover": { boxShadow: 8 },
//               }}
//             >
//               Get Started
//             </Button>
//           </Box>
//         </motion.div>

//         {/* ---------------- FEATURES SECTION ---------------- */}
//         <Typography
//           variant="h4"
//           textAlign="center"
//           fontWeight="bold"
//           gutterBottom
//           sx={{ mt: 10 }}
//         >
//           Explore Features
//         </Typography>

//         <Grid container spacing={4} sx={{ mt: 2 }}>
//           {features.map((item, index) => (
//             <Grid item xs={12} md={4} key={index}>
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 viewport={{ once: true }}
//               >
//                 <Paper
//                   elevation={6}
//                   sx={{
//                     p: 4,
//                     textAlign: "center",
//                     borderRadius: 4,
//                     backgroundColor: "white",
//                     transition: "transform 0.3s, box-shadow 0.3s",
//                     "&:hover": {
//                       transform: "translateY(-10px)",
//                       boxShadow: 10,
//                     },
//                   }}
//                 >
//                   <Box mb={2}>{item.icon}</Box>
//                   <Typography variant="h6" gutterBottom fontWeight="bold">
//                     {item.title}
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary">
//                     {item.desc}
//                   </Typography>
//                 </Paper>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* ---------------- HOW IT WORKS ---------------- */}
//         <Box sx={{ textAlign: "center", mt: 12 }}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             How It Works
//           </Typography>
//           <Typography
//             variant="body1"
//             color="text.secondary"
//             sx={{ maxWidth: 700, mx: "auto", mb: 6 }}
//           >
//             Actify simplifies faculty documentation in just three simple steps.
//           </Typography>

//           <Grid container spacing={4}>
//             {["Upload", "Generate", "Download"].map((step, i) => (
//               <Grid item xs={12} md={4} key={i}>
//                 <Paper
//                   elevation={5}
//                   sx={{
//                     p: 4,
//                     borderRadius: 4,
//                     backgroundColor: "white",
//                     height: "100%",
//                   }}
//                 >
//                   <Typography
//                     variant="h3"
//                     fontWeight="bold"
//                     color="primary"
//                     gutterBottom
//                   >
//                     {i + 1}
//                   </Typography>
//                   <Typography variant="h6" fontWeight="bold" gutterBottom>
//                     {step}
//                   </Typography>
//                   <Typography color="text.secondary">
//                     {step === "Upload" &&
//                       "Easily submit FDP or Expert Talk details with attachments."}
//                     {step === "Generate" &&
//                       "System automatically creates well-formatted report templates."}
//                     {step === "Download" &&
//                       "Export reports in PDF or Word for records and approvals."}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         {/* ---------------- BENEFITS SECTION ---------------- */}
//         <Box sx={{ textAlign: "center", mt: 12 }}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Why Choose Actify?
//           </Typography>
//           <Grid container spacing={4} sx={{ mt: 3 }}>
//             {benefits.map((item, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <Paper
//                   elevation={5}
//                   sx={{
//                     p: 4,
//                     borderRadius: 4,
//                     backgroundColor: "white",
//                     textAlign: "center",
//                     height: "100%",
//                   }}
//                 >
//                   <Box mb={2}>{item.icon}</Box>
//                   <Typography variant="h6" fontWeight="bold" gutterBottom>
//                     {item.title}
//                   </Typography>
//                   <Typography color="text.secondary">{item.desc}</Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         {/* ---------------- STATS SECTION ---------------- */}
//         <Box
//           sx={{
//             mt: 12,
//             mb: 8,
//             py: 6,
//             borderRadius: 4,
//             background: "linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)",
//             color: "white",
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Our Impact
//           </Typography>
//           <Grid container spacing={4} justifyContent="center">
//             {stats.map((item, i) => (
//               <Grid item xs={12} md={4} key={i}>
//                 <Typography variant="h3" fontWeight="bold">
//                   {item.number}
//                 </Typography>
//                 <Typography variant="h6">{item.label}</Typography>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         <Divider sx={{ my: 6 }} />
//       </Container>

//       <Footer />
//     </Box>
//   );
// }



import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import InsightsIcon from "@mui/icons-material/Insights";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DescriptionIcon from "@mui/icons-material/Description";
import Footer from "../../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "FDP Attended",
      desc: "Upload and track Faculty Development Programs you have attended.",
      icon: <SchoolIcon sx={{ fontSize: 50, color: "#3f51b5" }} />,
    },
    {
      title: "FDP Conducted",
      desc: "Record and manage FDP sessions you’ve organized for your peers.",
      icon: <EmojiEventsIcon sx={{ fontSize: 50, color: "#3f51b5" }} />,
    },
    {
      title: "Expert Talk",
      desc: "Document expert talks and guest lectures conducted or attended.",
      icon: <RecordVoiceOverIcon sx={{ fontSize: 50, color: "#3f51b5" }} />,
    },
  ];

  const benefits = [
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
      title: "Secure & Reliable",
      desc: "All your academic records are safely stored and easily accessible anytime.",
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 40, color: "#0288d1" }} />,
      title: "Automated Reports",
      desc: "Instantly generate formatted PDFs or Word reports for any submission.",
    },
    {
      icon: <CloudDownloadIcon sx={{ fontSize: 40, color: "#6a1b9a" }} />,
      title: "Cloud Access",
      desc: "Access your activities and reports from anywhere on any device.",
    },
  ];

  const stats = [
    { number: "500+", label: "FDPs Recorded" },
    { number: "120+", label: "Expert Talks" },
    { number: "35+", label: "Institutions Connected" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        pt: 10,
      }}
    >
      <Container maxWidth="lg">
        {/* ---------------- HERO SECTION ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#1a237e" }}
            >
              Welcome to Actify Faculty Portal
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: "750px", mx: "auto", mb: 4 }}
            >
              A smart way to record, manage, and generate reports for your
              academic activities like FDPs and Expert Talks — all in one
              place.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/register")}
              sx={{
                borderRadius: 3,
                px: 5,
                py: 1.5,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: 4,
                "&:hover": { boxShadow: 8, transform: "scale(1.05)" },
                transition: "all 0.3s ease",
              }}
            >
              Get Started
            </Button>
          </Box>
        </motion.div>

        {/* ---------------- FEATURES SECTION ---------------- */}
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: 10 }}
        >
          Explore Features
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    backgroundColor: "white",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: 10,
                    },
                  }}
                >
                  <Box mb={2}>{item.icon}</Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.desc}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* ---------------- FDP REPORTS SECTION ---------------- */}
        <Box
          sx={{
            mt: 12,
            py: 8,
            px: 4,
            borderRadius: 4,
            backgroundColor: "#f8f9ff",
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  FDP Report Management Made Effortless
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Actify revolutionizes how Faculty Development Program (FDP)
                  reports are handled. Say goodbye to manual templates,
                  formatting hassles, and missing data!
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Our intelligent report generator automatically captures
                  relevant details from your submissions, formats them according
                  to institutional guidelines, and lets you download polished
                  PDFs or Word files instantly.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.3,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                  onClick={() => navigate("/register")}
                >
                  Try FDP Reports
                </Button>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: 6,
                    borderRadius: 4,
                    background: "white",
                    textAlign: "center",
                  }}
                >
                  <DescriptionIcon
                    sx={{ fontSize: 70, color: "#3f51b5", mb: 2 }}
                  />
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Smart FDP Report Builder
                  </Typography>
                  <Typography color="text.secondary">
                    Auto-generate, review, and download professional FDP reports
                    with zero manual effort. Designed to meet your institution’s
                    formatting standards.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* ---------------- HOW IT WORKS ---------------- */}
        <Box sx={{ textAlign: "center", mt: 12 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            How It Works
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto", mb: 6 }}
          >
            Actify simplifies faculty documentation in just three simple steps.
          </Typography>

          <Grid container spacing={4}>
            {["Upload", "Generate", "Download"].map((step, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper
                  elevation={5}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    backgroundColor: "white",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                  >
                    {i + 1}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {step}
                  </Typography>
                  <Typography color="text.secondary">
                    {step === "Upload" &&
                      "Easily submit FDP or Expert Talk details with attachments."}
                    {step === "Generate" &&
                      "System automatically creates well-formatted report templates."}
                    {step === "Download" &&
                      "Export reports in PDF or Word for records and approvals."}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ---------------- BENEFITS SECTION ---------------- */}
        <Box sx={{ textAlign: "center", mt: 12 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Why Choose Actify?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 3 }}>
            {benefits.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={5}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    backgroundColor: "white",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <Box mb={2}>{item.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">{item.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ---------------- STATS SECTION ---------------- */}
        <Box
          sx={{
            mt: 12,
            mb: 8,
            py: 6,
            borderRadius: 4,
            background: "linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Our Impact
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {stats.map((item, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Typography variant="h3" fontWeight="bold">
                  {item.number}
                </Typography>
                <Typography variant="h6">{item.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />
      </Container>

      <Footer />
    </Box>
  );
}
