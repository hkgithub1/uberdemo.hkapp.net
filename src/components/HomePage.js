import React, { useState, useEffect } from "react";
import { Box, Grid, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import burger from "../images/burger.jpg";
import ride from "../images/ride.jpg";

export default function HomePage() {
  return (
    <>
      <Stack direction="row">
        <Box
          display="flex"
          height={800}
          width="50%"
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundImage: `url(${burger})`, backgroundSize: "cover" }}
        >
          <Button
            size="large"
            variant="outlined"
            color="black"
            component={Link}
            to="/eats"
            sx={{
              px: 1,
              fontSize: 30,
              fontWeight: "bold",
              borderRadius: 3,
              color: "text.black",
            }}
          >
            Place Order
          </Button>
        </Box>
        <Box
          display="flex"
          height={800}
          width="50%"
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundImage: `url(${ride})`, backgroundSize: "cover" }}
        >
          <Button
            size="large"
            variant="outlined"
            color="white"
            component={Link}
            to="/rides"
            sx={{
              px: 1,
              fontSize: 30,
              fontWeight: "bold",
              borderRadius: 3,
              color: "text.white",
            }}
          >
            Schedule Ride
          </Button>
        </Box>
      </Stack>
    </>
  );
}
