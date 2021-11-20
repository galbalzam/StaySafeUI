import React from 'react'
import { Card, CardContent, Checkbox } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetAllUsers, UpdateUser } from '../../Services/auth.service'
import { useQuery } from 'react-query';
import { LoadingButton } from '@mui/lab';

export const EditUsers = () => {

    const [loading, setLoading] = React.useState(false)
    const { data, isLoading } = useQuery('users', GetAllUsers, {
        onSuccess: (data) => { setUsers(data) }
    });
    const [users, setUsers] = React.useState(data);

    const handleChange = (event, userToUpdate) => {
        const newUserObject = { ...data[userToUpdate], isAdmin: event.target.checked }
        console.log(newUserObject)
        setUsers(prev => prev.map(user => user.email === newUserObject.email ? newUserObject : user))
    };
    if (isLoading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ minWidth: 900 }}>
                <CardContent>
                    <p>loading...</p>
                </CardContent>
            </Card>
        </div>
    )
    const submitUsers = () => {
        setLoading(true);
        users.forEach(user => {
            UpdateUser(user)
        });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ minWidth: 900 }}>
                <CardContent>
                    <h1>Users List</h1>
                    <TableContainer component={Paper} sx={{ direction: 'rtl' }}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">שם משתמש</TableCell>
                                    <TableCell align="right">שם מלא</TableCell>
                                    <TableCell align="right">האם אדמין</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row, index) => (
                                    <TableRow
                                        key={row.email}>
                                        <TableCell align="right" component="th" scope="row">
                                            {row.email}
                                        </TableCell>
                                        <TableCell align="right">{row.firstName} {row.lastName}</TableCell>
                                        <TableCell align="right">
                                            <Checkbox
                                                checked={row.isAdmin}
                                                onChange={(event) => handleChange(event, index)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <LoadingButton style={{ marginTop: '1rem' }} variant="contained" color="success" loading={loading} onClick={() => submitUsers()} >שמור שינויים</LoadingButton>
                </CardContent>
            </Card>
        </div>
    )
}
