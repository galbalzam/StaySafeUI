import React from "react";
import Typography from "@mui/material/Typography";
import "./phones.css";

const Phones = () => {
  return (
    <div className="phonesPageContainer">
      <div className="phonesHeader">
        <img src="https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="phone" />
        <Typography variant="h6">
          טלפונים חשובים
        </Typography>
      </div>
      <div className="phonesContent">
        <ul style={{ direction: "rtl" }}>
          <li>משרד הרווחה - מוקד מידע וסיוע - 118</li>
          <li>משטרה - 100</li>
          <li>אמבולנס - 101</li>
          <li>מכבי אש - 102</li>
          <li>אל-בטוף	עאהד רחאל	ת"ד 1054 נצרת עלית 17903	6518855 -04	04-6519988	glalhdr@walla.co.il</li>
          <li>גזר	רותם ידלין	בית חשמונאי, ד"נ שמשון 99789	מרכזיה: 08-9274040 ישיר: 08-9274020	08-9247115
            ilanitb@gezer-region.muni.il</li>
          <li>גוש עציון	שלמה נאמן	אלון שבות, ד"נ צפון יהודה 90433	מרכזיה: 02-9939933 ישיר: 02-9939910	02-9934666	lishka@gush-etzion.org.il</li>
          <li>שדות דן	דוד יפרח	ת.ד. 15, כפר חב"ד 60840	מרכזיה: 073-2230600 ישיר: 03-9604439/626	03-9608890	 chani@sdan.org.il</li>
          <li>עמק יזרעאל	אייל בצר	ת.ד. 90000 עפולה, 18120	מרכזיה: 04-6520111 ישיר: 04-6520001	04-6520011	lilach@eyz.org.il</li>
          <li>האגודה למען החייל - 072-270-2260</li>
        </ul>
      </div>
    </div>
  );
}

export default Phones;
