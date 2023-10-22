import React, { useEffect } from "react";
import axios from "axios";
import { FireBaseDB } from "../api/fireBase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const UserInfo = () => {
  //const [userData, setUserData] = useState([])
  const VisitCount = 1;

  

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const screenResolution = window.screen.width + " x " + window.screen.height;  
      const options = {
        method: 'GET',
        url: 'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
        params: {
          apikey: process.env.REACT_APP_RapidAPI_IPAdress_KEY,
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_KEY,
          'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com'
        }
      };
      
      try {
        axios.request(options).then(async (response) => {
          //setUserData(response.data)          
          const ip = response.data.ip;
       // console.log("user data",response.data)
        const ClientUserData = {
          CurrentUrl: window.location.href,
          UserIPAddress: ip,
          UserAgent: userAgent,
          UserScreenResolution: screenResolution,
          UserContinent: response.data.continent,
          UserCountry: response.data.country,
          UserCountryCode: response.data.countryISO3,
          UserCurrencyName: response.data.currencyName,
          AutonomousSystem: response.data.asNo,
          UserState: response.data.state,
          UserCity: response.data.city,
          UserISP: response.data.org,
          UserLocation: {
            Latitude: response.data.latitude,
            Longitude: response.data.longitude,
          },
          UserTimeZone: response.data.timezone,
          UserGMT: response.data.gmt,
          UserTimeStamp: serverTimestamp(),
          UserVisitCount: VisitCount,
        };
        
        // Check if a record for the same IP address and today's date already exists
        const userInfoRef = query(
          collection(FireBaseDB, "UserInfoTable"),
          where("UserIPAddress", "==", ip),
          where("CurrentUrl", "==", window.location.href)
        );
        const querySnapshot = await getDocs(userInfoRef);

        if (querySnapshot.empty) {
          // If no record exists, add a new one
          await addDoc(collection(FireBaseDB, "UserInfoTable"), ClientUserData);
        } else {
          // If a record exists, update it to increment the VisitCount
          querySnapshot.forEach(async (document) => {
            const docRef = doc(FireBaseDB, "UserInfoTable", document.id);
            await updateDoc(docRef, {
              UserVisitCount: document.data().UserVisitCount + VisitCount,
            });
          });
        }
        }) .catch((error) => {
          console.error("RapidAPI IP4 Adress Error:", error);
        })
      
      } catch (error) {
        console.error("try catch  Error:", error);
      }

  }, []);

  return <div></div>;
};

export default UserInfo