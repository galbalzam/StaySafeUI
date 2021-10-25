import React from "react";
import Typography from "@mui/material/Typography";
import heart from "../../assets/heart.jpg";
import "./About.css";

const About = (props) => {
  return (
    <div className="aboutPageContainer">
      <div className="aboutHeader">
        <img src={heart} />
        <Typography variant="h6">
          נדיבות אמיתית היא כאשר אתה נותן את כולך ומרגיש שזה לא עלה לך בדבר
        </Typography>
      </div>

      <div className="aboutContent">
        <Typography align="right" paragraph>
          {" "}
          עזרה לתושבי הדרום בעת מלחמה תורמת רבות לחבר'ה
        </Typography>
        <Typography align="right" paragraph>
          מטרתו של אתר זה לסייע לתושבי עוטף עזה והסביבה בעת מלחמה שנמצאים באזור
          סיכון על חייהם
        </Typography>
        <Typography align="right" paragraph>
          תרומה לחבר'ה בעת מלחמה תורמת רבות ומאחדת את כל התושבים בלי הבדל דת,
          גזע, מין ואף מקרבת בין אנשים
        </Typography>
        <Typography align="right" paragraph>
          ולכן המטרה של האתר שלנו הוא להציע מגוון של מגורים של מקומות להיות בהם
          בדרך מאוד קלה וזמינה לתושבי עוטף עזה והסביבה בשעת מלחמה
        </Typography>
      </div>
    </div>
  );
};

export default About;
