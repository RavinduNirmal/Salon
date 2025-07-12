import React, { useState, useEffect } from "react";
import { 
  AppBar, Toolbar, Typography, Container, Grid, Button, Box, Card, CardContent, 
  CardMedia, IconButton, Drawer, List, ListItem, ListItemText, TextField, 
  TextareaAutosize, Divider, Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import emailjs from "@emailjs/browser";
import { message } from "antd";
import { Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon  from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';


// Placeholder images (replace with actual beauty salon-related images)
import salonImage from "../assets/images/stylish-closeup-portrait-gorgeous-young-woman-with-beautiful-coiffure-smiling-hairdresser-salon.jpg";
import storyImage from "../assets/images/beautician-with-brush-applies-white-moisturizing-mask-face-young-girl-client-spa-beauty-salon.jpg";
import backgroundImage from "../assets/images/stylist-curling-hair-brown-haired-woman-saloon.jpg";
import serviceImage1 from "../assets/images/doctor-checking-medical-condition-patient.jpg";
import serviceImage2 from "../assets/images/doctor-checking-medical-condition-patient.jpg";
import serviceImage3 from "../assets/images/doctor-checking-medical-condition-patient.jpg";

const theme = createTheme({
  palette: {
    primary: { main: "#d81b60" }, // Rose pink
    secondary: { main: "#fbc02d" }, // Gold accent
    background: { default: "#fff8f8" }, // Soft blush background
  },
  typography: {
    fontFamily: "'Playfair Display', serif",
    h1: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    body1: { fontFamily: "'Lora', serif" },
  },
});

const BeautySalon = () => {
  const [sticky, setSticky] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [appointmentData, setAppointmentData] = useState({
    client_name: "",
    client_email: "",
    appointment_date: "",
    appointment_time: "",
    service: "",
  });
  const [formError, setFormError] = useState("");
  const [openAppointmentDialog, setOpenAppointmentDialog] = useState(false);

  const menuLinks = [
    { name: "HOME", link: "#home" },
    { name: "ABOUT", link: "#about" },
    { name: "SERVICES", link: "#services" },
    { name: "APPOINTMENTS", link: "#appointments" },
    { name: "CONTACT", link: "#contact" },
  ];

  const services = [
    { img: serviceImage1, name: "Hair Styling", description: "Custom cuts, coloring, and styling" },
    { img: serviceImage2, name: "Manicure & Pedicure", description: "Nail care with a touch of elegance" },
    { img: serviceImage3, name: "Facial Treatments", description: "Glow with our rejuvenating facials" },
  ];

  const contactInfo = [
    { logo: <EmailIcon />, text: "info@elegancesalon.com" },
    { logo: <PhoneIcon />, text: "+94 71 123 4567" },
    { logo: <LocationOnIcon />, text: "456 Glamour Ave, Beauty City, Colombo" },
  ];

  const info = [
    { text: "Years in Business", count: "10" },
    { text: "Happy Clients", count: "3000+" },
    { text: "Expert Stylists", count: "5" },
  ];

  const testimonials = [
    { 
      name: "Laura Bennett", 
      text: "Elegance Salon transformed my look! The stylists are so talented and the atmosphere is pure luxury.",
      role: "Client",
      photo: serviceImage1
    },
    { 
      name: "Priya Sharma", 
      text: "The facial treatments here are amazing. My skin has never felt so refreshed and radiant!",
      role: "Client",
      photo: serviceImage2
    },
    { 
      name: "Emma Wilson", 
      text: "I love the personalized service at Elegance Salon. They make every visit feel special.",
      role: "Client",
      photo: serviceImage3
    },
  ];

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setSticky(window.scrollY > 0);
    });
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!formData.user_name || !formData.user_email || !formData.message) {
      setFormError("Please fill in all fields.");
      return;
    }

    emailjs
      .send("service_ld1zli4", "template_tcy63cd", {
        to_name: "Elegance Salon",
        from_name: formData.user_name,
        message: formData.message,
        user_email: formData.user_email,
      }, "6A8AXjF5y3avwWTKN")
      .then(
        () => {
          message.success("Your message has been sent successfully!");
          setFormData({ user_name: "", user_email: "", message: "" });
          setFormError("");
        },
        () => {
          message.error("An error occurred. Please try again later.");
        }
      );
  };

  const bookAppointment = (e) => {
    e.preventDefault();
    if (
      !appointmentData.client_name ||
      !appointmentData.client_email ||
      !appointmentData.appointment_date ||
      !appointmentData.appointment_time ||
      !appointmentData.service
    ) {
      setFormError("Please fill in all appointment fields.");
      return;
    }

    emailjs
      .send("service_ld1zli4", "template_tcy63cd", {
        to_name: "Elegance Salon",
        from_name: appointmentData.client_name,
        message: `Appointment Request: ${appointmentData.service}\nDate: ${appointmentData.appointment_date}\nTime: ${appointmentData.appointment_time}`,
        user_email: appointmentData.client_email,
      }, "6A8AXjF5y3avwWTKN")
      .then(
        () => {
          message.success("Appointment booked successfully!");
          setAppointmentData({
            client_name: "",
            client_email: "",
            appointment_date: "",
            appointment_time: "",
            service: "",
          });
          setFormError("");
          setOpenAppointmentDialog(false);
        },
        () => {
          message.error("An error occurred. Please try again later.");
        }
      );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        {/* Navbar */}
      <AppBar
  position={sticky ? "fixed" : "static"}
  elevation={0}
  sx={{
    bgcolor: sticky ? "rgba(255, 255, 255, 0.95)" : "transparent",
    backdropFilter: sticky ? "blur(10px)" : "none",
    transition: "all 0.3s ease",
    borderBottom: sticky ? "1px solid rgba(0, 0, 0, 0.05)" : "none",
    py: 1
  }}
>
  <Toolbar sx={{ justifyContent: "space-between" }}>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          background: "linear-gradient(90deg, #d4af37 0%, #d4af37 50%, #000 50%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mr: 4
        }}
      >
        Éclat
      </Typography>
    </Box>
    
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
      {menuLinks.map((menu, i) => (
        <Button
          key={i}
          href={menu.link}
          sx={{
            color: "text.primary",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "0%",
              height: "2px",
              bgcolor: "#d4af37",
              transition: "width 0.3s ease"
            },
            "&:hover:after": {
              width: "100%"
            }
          }}
        >
          {menu.name}
        </Button>
      ))}
    </Box>
    
    <Button
      variant="contained"
      sx={{
        display: { xs: "none", md: "flex" },
        bgcolor: "#d4af37",
        color: "white",
        borderRadius: "8px",
        px: 3,
        py: 1,
        "&:hover": {
          bgcolor: "#c19b2e",
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)"
        },
        transition: "all 0.3s ease"
      }}
    >
      Book Now
    </Button>
    
    <IconButton
      sx={{ display: { xs: "flex", md: "none" } }}
      onClick={() => setOpenMenu(true)}
    >
      <MenuIcon />
    </IconButton>
  </Toolbar>
</AppBar>

<Drawer
  anchor="right"
  open={openMenu}
  onClose={() => setOpenMenu(false)}
  PaperProps={{
    sx: {
      width: "280px",
      bgcolor: "background.paper",
      p: 2
    }
  }}
>
  <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
    <IconButton onClick={() => setOpenMenu(false)}>
      <CloseIcon />
    </IconButton>
  </Box>
  <List sx={{ p: 0 }}>
    {menuLinks.map((menu, i) => (
      <ListItem key={i} sx={{ p: 0 }}>
        <Button
          fullWidth
          href={menu.link}
          sx={{
            py: 1.5,
            justifyContent: "flex-start",
            color: "text.primary",
            "&:hover": {
              bgcolor: "rgba(212, 175, 55, 0.1)"
            }
          }}
          onClick={() => setOpenMenu(false)}
        >
          {menu.name}
        </Button>
      </ListItem>
    ))}
    <ListItem sx={{ p: 0, mt: 1 }}>
      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: "#d4af37",
          color: "white",
          py: 1.5,
          "&:hover": {
            bgcolor: "#c19b2e"
          }
        }}
      >
        Book Now
      </Button>
    </ListItem>
  </List>
</Drawer>
    
        {/* Hero Section */}
       <Box
  id="home"
  sx={{
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    bgcolor: "background.default"
  }}
>
  {/* Background video/image */}
  <Box
    component="img"
    src={backgroundImage}
    alt="Salon interior"
    sx={{
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 1.5,
      filter: "grayscale(100%)"
    }}
  />
  
  {/* Gradient overlay */}
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)"
    }}
  />
  
  <Container>
    <Grid container spacing={6} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
            lineHeight: 1.2,
            color:"black",
            mb: 3,
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -16,
              left: 0,
              width: "80px",
              height: "4px",
              bgcolor: "#d4af37",
            }
          }}
        >
          Reveal Your <Box component="span" sx={{ color: "#d4af37" }}>Radiance</Box>
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.1rem",
            mb: 4,
            maxWidth: "500px",
            color: "text.secondary"
          }}
        >
          Where luxury meets transformation. Experience bespoke beauty services tailored to your unique style.
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#d4af37",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#c19b2e",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)"
              },
              transition: "all 0.3s ease"
            }}
          >
            Book Appointment
          </Button>
          
          <Button
            variant="outlined"
            sx={{
              borderColor: "#d4af37",
              color: "#d4af37",
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "rgba(212, 175, 55, 0.1)",
                borderColor: "#c19b2e"
              },
              transition: "all 0.3s ease"
            }}
          >
            Our Services
          </Button>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={6} sx={{ position: "relative" }}>
        <Box
          component="img"
          src={salonImage}
          alt="Salon service"
          sx={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            transform: "rotate(3deg)",
            position: "relative",
            zIndex: 1
          }}
        />
        
        <Box
          sx={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "200px",
            height: "200px",
            bgcolor: "rgba(212, 175, 55, 0.1)",
            borderRadius: "50%",
            zIndex: 0
          }}
        />
        
        <Box
          sx={{
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "150px",
            height: "150px",
            bgcolor: "rgba(212, 175, 55, 0.05)",
            borderRadius: "50%",
            zIndex: 0
          }}
        />
      </Grid>
    </Grid>
  </Container>
</Box>

        {/* About Section */}
        <Box id="about" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
  <Container>
    <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
      <Typography
        variant="overline"
        sx={{
          color: "#d4af37",
          letterSpacing: "2px",
          fontSize: "0.8rem",
          mb: 1,
          display: "block"
        }}
      >
        OUR STORY
      </Typography>
      
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "2.5rem" },
          mb: 2,
          color:"black"
        }}
      >
        Crafting Beauty Since 2010
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          maxWidth: "700px",
          mx: "auto",
          color: "text.secondary",
          fontSize: { xs: "1rem", md: "1.1rem" }
        }}
      >
        Éclat Salon is a sanctuary where artistry meets individuality. Our master stylists create personalized experiences that enhance your natural beauty.
      </Typography>
    </Box>
    
    <Grid container spacing={4} sx={{ mt: 4 }}>
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src={storyImage}
          alt="Salon interior"
          sx={{
            width: "100%",
            borderRadius: "16px",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
          }}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: "text.primary",
              lineHeight: 1.8,
              fontSize: { xs: "1rem", md: "1.1rem" }
            }}
          >
            Founded by celebrity stylist Marie Dubois, Éclat has been redefining beauty standards for over a decade. Our philosophy centers on enhancing your unique features rather than masking them.
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              {info.map((item, i) => (
                <Grid item xs={6} sm={4} key={i}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 3,
                      bgcolor: "background.default",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
                      }
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#d4af37",
                        mb: 1
                      }}
                    >
                      {item.count}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.9rem"
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Container>
</Box>

        {/* Services Section */}
      <Box id="services" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
  <Container>
    <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
      <Typography
        variant="overline"
        sx={{
          color: "#d4af37",
          letterSpacing: "2px",
          fontSize: "0.8rem",
          mb: 1,
          display: "block"
        }}
      >
        WHAT WE OFFER
      </Typography>
      
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "2.5rem" },
          mb: 2
        }}
      >
        Signature Services
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          maxWidth: "600px",
          mx: "auto",
          color: "text.secondary",
          fontSize: { xs: "1rem", md: "1.1rem" }
        }}
      >
        Each service is meticulously crafted to deliver exceptional results and unparalleled pampering.
      </Typography>
    </Box>
    
    <Grid container spacing={4} sx={{ mt: 2 }}>
      {services.map((service, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Card
            sx={{
              height: "100%",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
              }
            }}
          >
            <Box
              sx={{
                height: "200px",
                overflow: "hidden",
                position: "relative"
              }}
            >
              <Box
                component="img"
                src={service.img}
                alt={service.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  "&:hover": {
                    transform: "scale(1.1)"
                  }
                }}
              />
              
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "50%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                  display: "flex",
                  alignItems: "flex-end",
                  p: 3
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontWeight: 600
                  }}
                >
                  {service.name}
                </Typography>
              </Box>
            </Box>
            
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 3,
                  minHeight: "60px"
                }}
              >
                {service.description}
              </Typography>
              
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#d4af37",
                  color: "#d4af37",
                  borderRadius: "8px",
                  "&:hover": {
                    bgcolor: "rgba(212, 175, 55, 0.1)",
                    borderColor: "#c19b2e"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#d4af37",
          color: "white",
          px: 5,
          py: 1.5,
          borderRadius: "8px",
          "&:hover": {
            bgcolor: "#c19b2e",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)"
          },
          transition: "all 0.3s ease"
        }}
      >
        View All Services
      </Button>
    </Box>
  </Container>
</Box>

        {/* Appointment Booking Section */}
       <Box id="appointments" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
  <Container>
    <Grid container spacing={6} alignItems="center">
      <Grid item xs={12} md={6}>
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            src={salonImage}
            alt="Salon appointment"
            sx={{
              width: "100%",
              borderRadius: "16px",
              boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
            }}
          />
          
          <Box
            sx={{
              position: "absolute",
              top: "-20px",
              left: "-20px",
              width: "100px",
              height: "100px",
              bgcolor: "rgba(212, 175, 55, 0.1)",
              borderRadius: "50%",
              zIndex: -1
            }}
          />
          
          <Box
            sx={{
              position: "absolute",
              bottom: "-30px",
              right: "-30px",
              width: "150px",
              height: "150px",
              bgcolor: "rgba(212, 175, 55, 0.05)",
              borderRadius: "50%",
              zIndex: -1
            }}
          />
        </Box>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Box sx={{ maxWidth: "500px", mx: "auto" }}>
          <Typography
            variant="overline"
            sx={{
              color: "#d4af37",
              letterSpacing: "2px",
              fontSize: "0.8rem",
              mb: 1,
              display: "block"
            }}
          >
            BOOK YOUR VISIT
          </Typography>
          
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem" },
              mb: 2
            }}
          >
            Reserve Your Moment of Bliss
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 4,
              fontSize: { xs: "1rem", md: "1.1rem" }
            }}
          >
            Our concierge will confirm your appointment within 24 hours. For immediate assistance, please call us directly.
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            {[
              "✓ Personalized consultation",
              "✓ Luxury product selection",
              "✓ Complimentary refreshments",
              "✓ Relaxing ambiance"
            ].map((item, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                <CheckCircleIcon sx={{ color: "#d4af37", mr: 1.5, fontSize: "1.2rem" }} />
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
          
          <Button
            variant="contained"
            startIcon={<CalendarTodayIcon />}
            onClick={() => setOpenAppointmentDialog(true)}
            sx={{
              bgcolor: "#d4af37",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#c19b2e",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)"
              },
              transition: "all 0.3s ease"
            }}
          >
            Schedule Now
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Container>
  
  <Dialog
    open={openAppointmentDialog}
    onClose={() => setOpenAppointmentDialog(false)}
    PaperProps={{
      sx: {
        borderRadius: "16px",
        maxWidth: "500px",
        width: "100%"
      }
    }}
  >
    <DialogTitle
      sx={{
        bgcolor: "#d4af37",
        color: "white",
        py: 2,
        px: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Typography variant="h6">Book Your Appointment</Typography>
      <IconButton
        onClick={() => setOpenAppointmentDialog(false)}
        sx={{ color: "white" }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    
    <DialogContent sx={{ p: 3 }}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Full Name"
          name="client_name"
          value={appointmentData.client_name}
          onChange={handleAppointmentChange}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px"
            }
          }}
        />
        
        <TextField
          label="Email Address"
          name="client_email"
          type="email"
          value={appointmentData.client_email}
          onChange={handleAppointmentChange}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px"
            }
          }}
        />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              name="appointment_date"
              type="date"
              value={appointmentData.appointment_date}
              onChange={handleAppointmentChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px"
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Time</InputLabel>
              <Select
                name="appointment_time"
                value={appointmentData.appointment_time}
                onChange={handleAppointmentChange}
                label="Time"
                sx={{
                  borderRadius: "8px"
                }}
              >
                {["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"].map(time => (
                  <MenuItem key={time} value={time}>{time}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <FormControl fullWidth>
          <InputLabel>Service</InputLabel>
          <Select
            name="service"
            value={appointmentData.service}
            onChange={handleAppointmentChange}
            label="Service"
            sx={{
              borderRadius: "8px"
            }}
          >
            {services.map(service => (
              <MenuItem key={service.name} value={service.name}>{service.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {formError && (
          <Typography color="error" sx={{ mt: 1 }}>
            {formError}
          </Typography>
        )}
      </Box>
    </DialogContent>
    
    <DialogActions sx={{ p: 3 }}>
      <Button
        onClick={() => setOpenAppointmentDialog(false)}
        sx={{
          color: "text.secondary",
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.05)"
          }
        }}
      >
        Cancel
      </Button>
      
      <Button
        onClick={bookAppointment}
        variant="contained"
        sx={{
          bgcolor: "#d4af37",
          color: "white",
          px: 3,
          py: 1,
          borderRadius: "8px",
          "&:hover": {
            bgcolor: "#c19b2e"
          }
        }}
      >
        Confirm Booking
      </Button>
    </DialogActions>
  </Dialog>
</Box>
        {/* Contact Section */}
        {/* <Box
          id="contact"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: "gray" }}
            >
              Contact{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Us
              </Box>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 6 }}
            >
              Let’s Connect
            </Typography>
            <Grid
              container
              spacing={6}
              justifyContent="center"
              sx={{
                borderRadius: { xs: 3, sm: 0 },
                bgcolor: { xs: "none", sm: "background.paper" },
                boxShadow: { xs: 0, sm: "none" },
              }}
            >
              <Grid item xs={12} md={6}>
                <Box
                  component="form"
                  onSubmit={sendEmail}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    p: { xs: 2, sm: 3 },
                    borderRadius: { xs: 3, sm: 0 },
                    bgcolor: { xs: "background.paper", sm: "transparent" },
                    boxShadow: { xs: 3, sm: "none" },
                  }}
                >
                  <TextField
                    label="Your Name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleFormChange}
                    fullWidth
                    required
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                  />
                  <TextField
                    label="Your Email"
                    name="user_email"
                    type="email"
                    value={formData.user_email}
                    onChange={handleFormChange}
                    fullWidth
                    required
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                  />
                  <TextField
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    multiline
                    rows={5}
                    fullWidth
                    required
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                  />
                  {formError && (
                    <Typography color="error">{formError}</Typography>
                  )}
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ px: 4, py: 1.5, fontWeight: 500, borderRadius: 20 }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    justifyContent: "center",
                    height: "100%",
                    px: { xs: 2, sm: 3 },
                  }}
                >
                  {contactInfo.map((contact, i) => (
                    <Box
                      key={i}
                      sx={{ display: "flex", alignItems: "center", gap: 3 }}
                    >
                      <Box
                        sx={{
                          bgcolor: "primary.main",
                          p: 1.5,
                          borderRadius: "50%",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {contact.logo}
                      </Box>
                      <Typography variant="body1" color="text.primary">
                        {contact.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box> */}

        {/* Testimonial Section */}
       <Box id="testimonials" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
  <Container>
    <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
      <Typography
        variant="overline"
        sx={{
          color: "#d4af37",
          letterSpacing: "2px",
          fontSize: "0.8rem",
          mb: 1,
          display: "block"
        }}
      >
        CLIENT LOVE
      </Typography>
      
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "2.5rem" },
          mb: 2
        }}
      >
        Voices of Satisfaction
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          maxWidth: "600px",
          mx: "auto",
          color: "text.secondary",
          fontSize: { xs: "1rem", md: "1.1rem" }
        }}
      >
        Don't just take our word for it. Here's what our clients say about their experiences.
      </Typography>
    </Box>
    
    <Box sx={{ position: "relative", mt: 6 }}>
      <Box
        sx={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          bgcolor: "rgba(212, 175, 55, 0.05)",
          borderRadius: "50%",
          zIndex: 0
        }}
      />
      
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        style={{
          padding: "20px 0",
          position: "relative",
          zIndex: 1
        }}
      >
        {testimonials.map((testimonial, i) => (
          <SwiperSlide key={i}>
            <Card
              sx={{
                height: "100%",
                p: 3,
                borderRadius: "16px",
                bgcolor: "background.paper",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.1)"
                }
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3
                }}
              >
                <Avatar
                  src={testimonial.photo}
                  alt={testimonial.name}
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 2,
                    border: "2px solid #d4af37"
                  }}
                />
                
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary"
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#d4af37",
                      fontSize: "0.8rem"
                    }}
                  >
                    {testimonial.role}
                  </Typography>
                </Box>
              </Box>
              
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontStyle: "italic",
                  position: "relative",
                  pl: 3,
                  "&:before": {
                    content: '"“"',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    color: "#d4af37",
                    fontSize: "2rem",
                    lineHeight: 1
                  }
                }}
              >
                {testimonial.text}
              </Typography>
              
              <Box sx={{ mt: 3, display: "flex" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    sx={{
                      color: "#d4af37",
                      fontSize: "1.2rem"
                    }}
                  />
                ))}
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  </Container>
</Box>



<Box id="contact" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
  <Container>
    <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
      <Typography
        variant="overline"
        sx={{
          color: "#d4af37",
          letterSpacing: "2px",
          fontSize: "0.8rem",
          mb: 1,
          display: "block"
        }}
      >
        GET IN TOUCH
      </Typography>
      
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "2.5rem" },
          mb: 2
        }}
      >
        Let's Connect
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          maxWidth: "600px",
          mx: "auto",
          color: "text.secondary",
          fontSize: { xs: "1rem", md: "1.1rem" }
        }}
      >
        Have questions or ready to book? Reach out to us through any of these channels.
      </Typography>
    </Box>
    
    <Grid container spacing={6} sx={{ mt: 4 }}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            bgcolor: "background.default",
            borderRadius: "16px",
            p: { xs: 3, md: 4 },
            height: "100%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 3,
              display: "flex",
              alignItems: "center",
              "&:before": {
                content: '""',
                display: "block",
                width: "30px",
                height: "3px",
                bgcolor: "#d4af37",
                mr: 2
              }
            }}
          >
            Send Us a Message
          </Typography>
          
          <Box
            component="form"
            onSubmit={sendEmail}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Your Name"
              name="user_name"
              value={formData.user_name}
              onChange={handleFormChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px"
                }
              }}
            />
            
            <TextField
              label="Your Email"
              name="user_email"
              type="email"
              value={formData.user_email}
              onChange={handleFormChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px"
                }
              }}
            />
            
            <TextField
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              multiline
              rows={4}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px"
                }
              }}
            />
            
            {formError && (
              <Typography color="error">{formError}</Typography>
            )}
            
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#d4af37",
                color: "white",
                py: 1.5,
                borderRadius: "8px",
                "&:hover": {
                  bgcolor: "#c19b2e"
                }
              }}
            >
              Send Message
            </Button>
          </Box>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            bgcolor: "background.default",
            borderRadius: "16px",
            p: { xs: 3, md: 4 },
            height: "100%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 3,
              display: "flex",
              alignItems: "center",
              "&:before": {
                content: '""',
                display: "block",
                width: "30px",
                height: "3px",
                bgcolor: "#d4af37",
                mr: 2
              }
            }}
          >
            Contact Information
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            {contactInfo.map((contact, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  "&:hover": {
                    "& .contact-icon": {
                      transform: "scale(1.1)",
                      bgcolor: "#d4af37"
                    }
                  }
                }}
              >
                <Box
                  className="contact-icon"
                  sx={{
                    bgcolor: "rgba(212, 175, 55, 0.1)",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 3,
                    color: "#d4af37",
                    transition: "all 0.3s ease"
                  }}
                >
                  {contact.logo}
                </Box>
                
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {contact.text}
                </Typography>
              </Box>
            ))}
          </Box>
          
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 3,
              display: "flex",
              alignItems: "center",
              "&:before": {
                content: '""',
                display: "block",
                width: "30px",
                height: "3px",
                bgcolor: "#d4af37",
                mr: 2
              }
            }}
          >
            Business Hours
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            {[
              { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
              { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
              { day: "Sunday", hours: "Closed" }
            ].map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                  pb: 1.5,
                  borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.05)" : "none"
                }}
              >
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {item.day}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {item.hours}
                </Typography>
              </Box>
            ))}
          </Box>
          
          {/* Map placeholder */}
          <Box
            sx={{
              height: "200px",
              bgcolor: "rgba(0,0,0,0.05)",
              borderRadius: "8px",
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary"
            }}
          >
            <LocationOnIcon sx={{ fontSize: "3rem", mr: 1, color: "#d4af37" }} />
            <Typography>Salon Location Map</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Container>
</Box>


        {/* Footer */}
      <Box
  sx={{
    bgcolor: "grey.900",
    py: 6,
    color: "white"
  }}
>
  <Container>
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(90deg, #d4af37 0%, #d4af37 50%, #fff 50%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2
          }}
        >
          Éclat
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
          Where beauty meets artistry. Our salon is dedicated to enhancing your natural radiance with personalized services.
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          {["Instagram", "Facebook", "Twitter"].map((social) => (
            <IconButton
              key={social}
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": {
                  bgcolor: "#d4af37"
                },
                transition: "all 0.3s ease"
              }}
            >
              {social === "Instagram" ? <InstagramIcon /> :
               social === "Facebook" ? <FacebookIcon /> : <TwitterIcon />}
            </IconButton>
          ))}
        </Box>
      </Grid>
      
      <Grid item xs={6} md={2}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Quick Links
        </Typography>
        <List sx={{ p: 0 }}>
          {menuLinks.map((menu, i) => (
            <ListItem key={i} sx={{ p: 0, mb: 1 }}>
              <Button
                href={menu.link}
                sx={{
                  color: "white",
                  opacity: 0.8,
                  p: 0,
                  textTransform: "none",
                  "&:hover": {
                    opacity: 1,
                    color: "#d4af37"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                {menu.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Grid>
      
      <Grid item xs={6} md={3}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Services
        </Typography>
        <List sx={{ p: 0 }}>
          {services.map((service, i) => (
            <ListItem key={i} sx={{ p: 0, mb: 1 }}>
              <Button
                sx={{
                  color: "white",
                  opacity: 0.8,
                  p: 0,
                  textTransform: "none",
                  "&:hover": {
                    opacity: 1,
                    color: "#d4af37"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                {service.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Newsletter
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
          Subscribe to receive updates and beauty tips.
        </Typography>
        
        <Box component="form" sx={{ display: "flex" }}>
          <TextField
            placeholder="Your email"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: "8px 0 0 8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent"
                },
                "&:hover fieldset": {
                  borderColor: "transparent"
                }
              },
              "& .MuiInputBase-input": {
                color: "white"
              }
            }}
          />
          
          <Button
            variant="contained"
            sx={{
              bgcolor: "#d4af37",
              color: "white",
              borderRadius: "0 8px 8px 0",
              px: 2,
              "&:hover": {
                bgcolor: "#c19b2e"
              }
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Grid>
    </Grid>
    
    <Divider sx={{ my: 4, bgcolor: "rgba(255,255,255,0.1)" }} />
    
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="body2" sx={{ opacity: 0.6 }}>
        © 2025 Éclat Salon. All rights reserved.
      </Typography>
      
      <Box sx={{ display: "flex", gap: 3 }}>
        <Typography variant="body2" sx={{ opacity: 0.6 }}>
          Privacy Policy
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.6 }}>
          Terms of Service
        </Typography>
      </Box>
    </Box>
  </Container>
</Box>
      </Box>
    </ThemeProvider>
  );
};

export default BeautySalon;