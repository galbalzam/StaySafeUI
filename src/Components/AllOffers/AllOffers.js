import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { getAllOffers } from "../../Services/offers.service";
import "./AllOffers.css";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(hostName, hostingPlace, hostingAmount) {
  return {
    hostName,
    hostingPlace,
    hostingAmount,
    history: [
      {
        id: 0,
        phoneNumber: "054-123123123",
        email: "asdasd@gmail.com",
        hostName,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{" "}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row" align="right">
          {row.hostingAmount}{" "}
        </TableCell>

        <TableCell align="right">{row.hostingPlace}</TableCell>

        <TableCell align="right">{row.hostName}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                align="right"
                variant="h6"
                gutterBottom
                component="div"
              >
                יצירת קשר
              </Typography>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">שם</TableCell>
                    <TableCell align="right">טלפון</TableCell>
                    <TableCell align="right">אימייל</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {" "}
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row" align="right">
                        {historyRow.hostName}{" "}
                      </TableCell>

                      <TableCell align="right">
                        {historyRow.phoneNumber}
                      </TableCell>

                      <TableCell align="right">{historyRow.email}</TableCell>
                    </TableRow>
                  ))}{" "}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("Gal", "Tel Aviv", 5),
  createData("Ben", "Bat yam", 3),
  createData("Shalon", "Naharia", 2),
];

export default function AllOffers() {
  useEffect(() => {
    const getAllOffersFromServer = async () => {
      const result = await getAllOffers();
      alert(result.data);
    };

    getAllOffersFromServer();
  }, []);

  return (
    <div className="all-offers-section">
      <h1 className="allOffersHeader">רשימת מארחים</h1>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">כמות לאירוח</TableCell>
              <TableCell align="right">מקום אירוח</TableCell>
              <TableCell align="right">שם מארח</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {" "}
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}{" "}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
