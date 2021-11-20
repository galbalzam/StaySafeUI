import { Card, CardContent } from '@mui/material'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetAllOffers } from '../../Services/offers.service'
import { useQuery } from 'react-query';
import ModalDetails from './ModalDetails';

function createDataFrom(offerNote, name, amount) {
  return { offerNote, name, amount };
}


const EditAllOffers = () => {
  const [offers, setOffers] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const queryOffer = useQuery('offers', GetAllOffers, {
    onSuccess: (data) => {
      setOffers(data);
      setRows(data.map(offer => createDataFrom(offer.offerNote, offer.FullName, offer.hospitalityAmount)))
    }
  });
  if (queryOffer.isLoading) return <div>Loading...</div>
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ minWidth: 900 }}>
        <CardContent>
          <h1>Edit Offers</h1>
          <TableContainer component={Paper} sx={{ direction: 'rtl' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">הצעה שניתה ע"י הלקוח</TableCell>
                  <TableCell align="right">שם מארח</TableCell>
                  <TableCell align="right">כמות מתארחים</TableCell>
                  <TableCell align="right">עריכת הצעה ומחיקה</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.name}

                  >
                    <TableCell align="right" component="th" scope="row">
                      {row.offerNote}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right"><ModalDetails offer={offers[index]} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditAllOffers
