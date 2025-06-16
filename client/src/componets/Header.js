import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authActions, setDarkmode } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [value, setValue] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    const savedTheme = localStorage.getItem("isDarkMode");
    if (savedTab !== null) {
      setValue(parseInt(savedTab, 10));
    }
    if (savedTheme !== null) {
      dispatch(setDarkmode(JSON.parse(savedTheme)));
    }
  }, [dispatch]); // ✅ Fixed: added dispatch to dependency array

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/blogs/add")) {
      setValue(2);
    } else if (path.startsWith("/myBlogs")) {
      setValue(1);
    } else if (path.startsWith("/blogs")) {
      setValue(0);
    } else {
      setValue(0);
    }
  }, [location.pathname]);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTab", newValue);
  };

  const handleDarkModeToggle = () => {
    const newTheme = !isDark;
    localStorage.setItem("isDarkMode", newTheme);
    dispatch(setDarkmode(newTheme));
  };

  const handleLoginClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: false } });
  };

  const handleSignupClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: true } });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(to right, #0f2027, #2c5364)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          paddingX: 3,
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#fff",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: 1.5,
            }}
          >
            Blogeey
          </Typography>

          {isLoggedIn && (
            <Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={handleTabChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#00e5ff",
                    height: 3,
                    borderRadius: 2,
                  },
                }}
                sx={{
                  ".MuiTab-root": {
                    color: "#ddd",
                    fontWeight: 600,
                    fontSize: "14px",
                    textTransform: "uppercase",
                    transition: "0.3s",
                    "&:hover": {
                      color: "#00e5ff",
                      transform: "scale(1.1)",
                    },
                  },
                  ".Mui-selected": {
                    color: "#00e5ff !important",
                  },
                }}
              >
                <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
              </Tabs>
            </Box>
          )}

          <Box display="flex" alignItems="center" marginLeft="auto">
            {!isLoggedIn && (
              <>
                <Button
                  onClick={handleLoginClick}
                  sx={{
                    marginX: 1,
                    color: "#fff",
                    backgroundColor: "#00bfa5",
                    borderRadius: "25px",
                    paddingX: 3,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#009e86",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={handleSignupClick}
                  sx={{
                    marginX: 1,
                    color: "#fff",
                    backgroundColor: "#7e57c2",
                    borderRadius: "25px",
                    paddingX: 3,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#673ab7",
                    },
                  }}
                >
                  SignUp
                </Button>
              </>
            )}

            {isLoggedIn && (
              <Button
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/login"
                sx={{
                  marginX: 2,
                  color: "#fff",
                  background: "linear-gradient(to right, #ff6e7f, #bfe9ff)",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  paddingX: 3,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                  "&:hover": {
                    background: "linear-gradient(to right, #f857a6, #ff5858)",
                  },
                }}
              >
                Logout
              </Button>
            )}

            <Box
              onClick={handleDarkModeToggle}
              sx={{
                padding: "8px",
                cursor: "pointer",
                color: "#fff",
                "&:hover": {
                  color: "#00e5ff",
                },
              }}
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
