import React from "react";
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
import CircularProgress from '@mui/material/CircularProgress';
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { GetAllOffers } from "../../Services/offers.service";
import "./AllOffers.css";
import { useQuery } from "react-query";
import { notifyError } from "../../tostify/toastifyAletrts";
import TextField from '@mui/material/TextField';


const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(hostName, hostingPlace, hostingAmount, email, phone, offerNote) {
  return {
    hostName,
    hostingPlace,
    hostingAmount,
    history: [
      {
        id: 0,
        phoneNumber: phone,
        email: email,
        offerNote: offerNote,
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
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row" align="right">
          {row.hostingAmount}
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
                Contact details
              </Typography>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Notes</TableCell>
                    <TableCell align="right">Phone number</TableCell>
                    <TableCell align="right">Email</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>

                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row" align="right">
                        {historyRow.offerNote}
                      </TableCell>

                      <TableCell align="right">
                        {historyRow.phoneNumber}
                      </TableCell>

                      <TableCell align="right">{historyRow.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const AllOffers = () => {
  const [rows, setRows] = React.useState([])
  const [unfilteredRows, setUnfilteredRows] = React.useState([])
  const OnFilter = (event) => {
    const text = event.target.value;
    if (text.length > 1) {
      setRows(prevState => {
        return prevState.filter(rowData => rowData.hostingPlace.toLowerCase().includes(text.toLowerCase()))
      })
    } else {
      setRows(unfilteredRows)
    }
  }
  const query = useQuery('AllOffers', GetAllOffers, {
    onSuccess: (data) => {
      setRows([])
      setUnfilteredRows([])
      data.forEach(doc => {
        setUnfilteredRows(prev => [...prev, createData(doc.FullName, doc.city, doc.hospitalityAmount, doc.email, doc.phone, doc.offerNote)])
        setRows(prev => [...prev, createData(doc.FullName, doc.city, doc.hospitalityAmount, doc.email, doc.phone, doc.offerNote)])
      })

    }
  })

  if (query.isLoading || query.isFetching) {
    return (
      <div className="all-offers-section">
        <h1 className="allOffersHeader">רשימת מארחים</h1>
        <CircularProgress />
      </div>
    )
  }
  if (query.isError) {
    notifyError("There has been an error while getting the offers from the server")
    return (
      <label>Error</label>
    )
  }

  return (
    <div className="all-offers-section">
      <h1 className="allOffersHeader">רשימת מארחים</h1>
      <div className="Filters-Section">
        <TextField id="standard-basic" label="City" variant="standard" onChange={(e) => OnFilter(e)} />
      </div>

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
            {rows.map((row) => (
              <Row key={row.FullName} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AllOffers;