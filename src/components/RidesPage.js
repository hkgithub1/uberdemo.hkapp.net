import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";

export default function RidesPage() {
  //Ride variables
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  //Backend API variables
  const [data, setData] = useState([]);
  const [rideId, setRideId] = useState("");
  //Backend API calls
  const scheduleRideButtonPressed = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: `${process.env.RIDES_APP_BACKEND_API_URL}/rides/addRide`,
      body: JSON.stringify({
        location: location,
        destination: destination,
      }),
    };
    fetch(`${process.env.RIDES_APP_BACKEND_API_URL}/rides/addRide`, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    alert("Ride Scheduled Successfully");
  };
  const getRidesButtonPressed = () => {
    const url = `${process.env.RIDES_APP_BACKEND_API_URL}/rides/allRides`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };
  const getRideByIdButtonPressed = () => {
    const url = `${process.env.RIDES_APP_BACKEND_API_URL}/rides/ride/${rideId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData((prev) => [...prev, data]);
        console.log(data);
      });
  };
  //Center screen on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          height={250}
          display="flex"
          alignItems="center"
          sx={{ backgroundColor: "background.ten", px: 1 }}
        >
          <Stack spacing={4} display="flex" alignItems="center" width="100%">
            <TextField
              size="small"
              color="white"
              variant="outlined"
              label="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{
                width: 800,
                input: {
                  color: "white.main",
                },
              }}
            />
            <TextField
              size="small"
              color="white"
              variant="outlined"
              label="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              sx={{ width: 800 }}
            />
            <Button
              size="large"
              variant="contained"
              color="white"
              onClick={scheduleRideButtonPressed}
              sx={{
                color: "text.black",
              }}
            >
              Schedule Ride
            </Button>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ backgroundColor: "background.twenty", p: 1, borderTop: 1 }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              size="large"
              variant="contained"
              color="white"
              onClick={getRidesButtonPressed}
              sx={{
                color: "text.black",
              }}
            >
              Get All Rides
            </Button>
            <Button
              size="large"
              variant="contained"
              color="white"
              onClick={getRideByIdButtonPressed}
              sx={{
                color: "text.black",
              }}
            >
              Look Up By RideID
            </Button>
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              label="#"
              value={rideId}
              onChange={(e) => setRideId(e.target.value)}
              sx={{ width: 50 }}
            />
          </Stack>
        </Grid>

        {data.length > 0 && (
          <Grid item xs={12}>
            <TableContainer>
              <Table sx={{ minWidth: 550 }} aria-label="Cart Items">
                <TableHead sx={{ bgcolor: "background.ten" }}>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>Destination</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        bgcolor: "background.main",
                      }}
                    >
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.destination}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
    </>
  );
}
