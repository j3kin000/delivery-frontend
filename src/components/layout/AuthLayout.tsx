import { Box } from "@mui/material";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { checkAuth } from "../../api/endpoint";

export type AuthLayoutProps = {
  children?: ReactNode;
};
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      setLoading(true);
      try {
        const response = await checkAuth();
        console.log("response.success", response);
        if (response.data.isAdmin) {
          setLoading(false);
          navigate("/dashboard");
          return;
        }
      } catch (error) {
        localStorage.removeItem("access_token");
        console.log("ERRORRRRR", error);
      }
      setLoading(false);
    };

    fetchAuth();
  }, []);
  if (loading) {
    return <></>;
  }
  return (
    <Box
      sx={{
        backgroundColor: " #f0f0fa",
        flex: 1,
        height: "100vh",
        pl: { xs: 2, sm: 5, md: 2 },
        pt: 1,
        pr: { xs: 2, sm: 5, md: 2 },
      }}
    >
      {children} <Outlet />
    </Box>
  );
};

export default AuthLayout;
