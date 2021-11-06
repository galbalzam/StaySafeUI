import { Button, Link, Typography } from '@mui/material';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { GetOfferByEmail } from '../../Services/offers.service';
import './offerHelp.css'
const OfferHelp = () => {
    const [acceptOffer, setAcceptOffer] = React.useState(false);
    let { userEmail } = useParams();
    const query = useQuery('getOfferHelp', () => GetOfferByEmail(userEmail), {
        onSuccess: (data) => {
            console.log(data);
        }
    });
    if (query.isLoading) {
        return <div>Loading...</div>
    }
    if (query.isError) {
        return <div>Error</div>
    }
    return (
        <div className="offerHelpContainer">
            <div className="offerHelp">
                <Typography variant="h4" > הצעת תרומות </Typography>
                <Typography variant="h6" > מספר הצעות שנקבעו עבורך: {Object.keys(query.data[0].offerHelpNote).length}</Typography>
                <div className="center-offers">
                    {
                        Object.values(query.data[0].offerHelpNote).map((item, index) => {
                            return (
                                <div key={index} className="offerHelpNote">
                                    <Typography variant="h6" >הצעה {index + 1} :</Typography>
                                    <Typography variant="h6" >{item}</Typography>
                                </div>
                            )
                        }
                        )
                    }
                    <Button variant="contained" onClick={() => setAcceptOffer(prev => !prev)} >
                        קבל הצעה
                    </Button>
                    {
                        acceptOffer ? (
                            <div className="acceptOffer">
                                <Typography variant="h6" >צור קשר ופנה לקבלת ההצעה</Typography>
                                <Typography variant="h6" >כתובת הדואר האלקטרוני שלי:</Typography>
                                <Link href={`mailto:${userEmail}`} variant="h6" >{userEmail}</Link>
                                <Typography variant="h6" >כתובת מגוריי: {query.data[0]?.city} , {query.data[0]?.street}</Typography>
                                <Typography variant="h6" >הטלפון שלי : {query.data[0]?.phone}</Typography>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default OfferHelp
