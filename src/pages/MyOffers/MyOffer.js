import React from 'react'
import { Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import './MyOffer.css'
import { useQuery } from 'react-query';
import { GetMyOffer } from '../../Services/offers.service'
import { useSelector } from 'react-redux';
import AlertDialog from '../../Components/AlertDialog/AlertDialog';

const MyOffer = () => {
    const userData = useSelector(state => state.userData)
    const [userOffer, setUserOffer] = React.useState('')
    const myOfferQuery = useQuery('myOffer', () => GetMyOffer(userData.email), {
        onSuccess: (data) => setUserOffer(data[0])
    })
    const [open, setOpen] = React.useState(false);


    if (myOfferQuery.isLoading) {
        return (
            <div className="myoffers-container">
                <Card sx={{ minWidth: 475 }}>
                    <CardContent>
                        <CircularProgress />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (myOfferQuery.isError) {
        return <label>Error</label>
    }

    return (
        <div className="myoffers-container">
            <Card sx={{ minWidth: 475 }}>
                <CardContent>
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        My Offer
                    </Typography>
                    <div className="display-offer-data">
                        <label>
                            city
                        </label>
                        <label>
                            {userOffer.city} {userOffer.street}
                        </label>
                    </div>
                    <div className="display-offer-data">
                        <label>
                            contact email
                        </label>
                        <label>
                            {userOffer.email}
                        </label>
                    </div>
                    <div className="display-offer-data">
                        <label>
                            hospitality amount
                        </label>
                        <label>
                            {userOffer.hospitalityAmount}
                        </label>
                    </div>
                    <div className="display-offer-data">
                        <label>
                            Note
                        </label>
                        <label>
                            {userOffer.offerNote}
                        </label>
                    </div>
                    <Button variant="contained" color="error" onClick={() => setOpen(true)}>Delete Offer</Button>
                    <AlertDialog open={open} setOpen={setOpen} content={'Are you sure you want to delete your offer? this cannot be undone.'} />
                </CardContent>
            </Card>
        </div>
    )
}

export default MyOffer
