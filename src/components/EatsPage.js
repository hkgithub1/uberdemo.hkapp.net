import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  Divider,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";

export default function EatsPage() {
  //Order variables
  const [numOfBurgers, setNumOfBurgers] = useState("");
  const [numOfFries, setNumOfFries] = useState("");
  const [numOfPizzas, setNumOfPizzas] = useState("");
  //Price calculators
  const burgerTotal = () => {
    if (numOfBurgers == null) return 0;
    else return numOfBurgers * 8.99;
  };
  const friesTotal = () => {
    if (numOfFries == null) return 0;
    else return numOfFries * 3.99;
  };
  const pizzaTotal = () => {
    if (numOfPizzas == null) return 0;
    else return numOfPizzas * 12.99;
  };
  const totalPrice = () => {
    return burgerTotal() + friesTotal() + pizzaTotal();
  };
  const toFixed = (n, fixed) =>
    `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];

  //Backend API variables
  const [data, setData] = useState([]);
  const [orderId, setOrderId] = useState("");
  //Backend API calls
  const placeOrderButtonPressed = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: `${process.env.EATS_APP_BACKEND_API_URL}/eats/addOrder`,
      body: JSON.stringify({
        numberOfBurgers: numOfBurgers,
        numberOfFries: numOfFries,
        numberOfPizzas: numOfPizzas,
      }),
    };
    fetch(`${process.env.EATS_APP_BACKEND_API_URL}/eats/addOrder`, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    alert("Order Created Successfully");
  };
  const getOrdersButtonPressed = () => {
    const url = `${process.env.EATS_APP_BACKEND_API_URL}/eats/allOrders`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };
  const getOrderByIdButtonPressed = () => {
    const url = `${process.env.EATS_APP_BACKEND_API_URL}/eats/order/${orderId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData((prev) => [...prev, data]);
        console.log(data);
      });
  };
  //Center screen on load.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={8}
          height={375}
          sx={{ backgroundColor: "background.main" }}
        >
          <Box sx={{ backgroundColor: "secondary.main", borderBottom: 1 }}>
            <Typography fontSize={36} align="center">
              Menu
            </Typography>
          </Box>
          <Stack spacing={3} sx={{ p: 2 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                size="small"
                color="secondary"
                variant="outlined"
                label="#"
                value={numOfBurgers}
                onChange={(e) => setNumOfBurgers(e.target.value)}
                sx={{ width: 50 }}
              />
              <Typography fontSize={30} flexGrow={1}>
                Hamburger
              </Typography>
              <Typography fontSize={30}>$8.99</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                size="small"
                color="secondary"
                variant="outlined"
                label="#"
                value={numOfFries}
                onChange={(e) => setNumOfFries(e.target.value)}
                sx={{ width: 50 }}
              />
              <Typography fontSize={30} flexGrow={1}>
                French Fries
              </Typography>
              <Typography fontSize={30}>$3.99</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                size="small"
                color="secondary"
                variant="outlined"
                label="#"
                value={numOfPizzas}
                onChange={(e) => setNumOfPizzas(e.target.value)}
                sx={{ width: 50 }}
              />
              <Typography fontSize={30} flexGrow={1}>
                Pizza
              </Typography>
              <Typography fontSize={30}>$12.99</Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid
          item
          xs={4}
          height={375}
          sx={{ backgroundColor: "background.seventy" }}
        >
          <Stack spacing={2} sx={{ p: 2 }}>
            <Typography variant="h6" align="center">
              Order Summary
            </Typography>
            <Divider sx={{ bgcolor: "background.ten" }} />
            {numOfBurgers && (
              <Typography fontSize={28} align="center">
                {numOfBurgers} x Hamburger = {toFixed(burgerTotal(), 2)}
              </Typography>
            )}
            {numOfFries && (
              <Typography fontSize={28} align="center">
                {numOfFries} x French Fries = {toFixed(friesTotal(), 2)}
              </Typography>
            )}
            {numOfPizzas && (
              <Typography fontSize={28} align="center">
                {numOfPizzas} x Pizza = {toFixed(pizzaTotal(), 2)}
              </Typography>
            )}
            <Divider sx={{ bgcolor: "background.ten" }} />
            <Typography variant="h6">
              Total Price: $
              {isNaN(totalPrice()) ? "" : toFixed(totalPrice(), 2)}
            </Typography>
            <Button
              size="large"
              variant="contained"
              color="darkgreen"
              onClick={placeOrderButtonPressed}
            >
              Place Order
            </Button>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ backgroundColor: "background.main", p: 1, borderTop: 1 }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              size="large"
              variant="contained"
              color="darkgreen"
              onClick={getOrdersButtonPressed}
            >
              Get All Orders
            </Button>
            <Button
              size="large"
              variant="contained"
              color="darkgreen"
              onClick={getOrderByIdButtonPressed}
            >
              Look Up By OrderID
            </Button>
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              label="#"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              sx={{ width: 50 }}
            />
          </Stack>
        </Grid>

        {data.length > 0 && (
          <Grid item xs={12}>
            <TableContainer>
              <Table sx={{ minWidth: 550 }} aria-label="Cart Items">
                <TableHead sx={{ bgcolor: "secondary.main" }}>
                  <TableRow>
                    <TableCell>Burgers</TableCell>
                    <TableCell>Fries</TableCell>
                    <TableCell>Pizzas</TableCell>
                    <TableCell></TableCell>
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
                      <TableCell>{row.numberOfBurgers}</TableCell>
                      <TableCell>{row.numberOfFries}</TableCell>
                      <TableCell>{row.numberOfPizzas}</TableCell>
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
