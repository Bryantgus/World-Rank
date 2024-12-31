import InfoCountries from "./InfoCountries";
import "./MainPage.css"
import Region from "./Region"
import { useState, useEffect } from "react";

export default function MainPage() {
    const CountryFound = 234
    const regions = ["Americas", "Antartic", "Africa", "Asia", "Europe", "Oceania"];
    let allCountries = [];
    const [data, setData] = useState([]);

    useEffect(() => {
        // Llamada a la API
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                allCountries = data;
                setData(allCountries);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="mpContainer">

            <div className="header">
                <span className="color3 font3">Found {CountryFound} countries</span>
                <input className="font3 color3"type="text" placeholder="Search by Name, Region, Subregion"/>
            </div>

            <div className="filters">
                <span className="font4 color3">Sort by</span>
                <select className="color4 font3">
                        <option value="1">Population</option>
                        <option value="2">Area (km²)</option>
                        <option value="3">Name</option>
                </select>

                <span className="font4 color3">Region</span>

                <div className="containerRegions">
                    {regions.map((item, index) => {
                        return (
                            <Region 
                            key={index}     
                            region={item}
                            classRegion={item}
                            />
                        );
                    })}
                </div>
                
                
                <div className="statusContainer">
                    <span className="font4 color3">Status</span>
                    
                    <div className="inputsFilter">
                        <input type="checkbox" name="Member" id="member" />
                        <label htmlFor="Member" className="font3 color4">Member of United Nations</label>                
                    </div>
                    <div className="inputsFilter">
                        <input type="checkbox" name="Independient" id="independient" />
                        <label htmlFor="Independient" className="font3 color4">Independient</label>
                    </div>
                    
                </div>
            </div>

            <div className="infoCountries">
                <div className="headerInfo">
                    <span>Flag</span>
                    <span>Name</span>
                    <span>Population</span>
                    <span>Area (km²)</span>
                    <span>Region</span>
                </div>
                <div className="line"></div>

                <div className="info">
                    {data.map((item, index) => (
                    <InfoCountries
                        key={index}
                        flag={item.flags?.svg || "No Flag"}
                        name={item.name?.common || "No Name"}
                        population={item.population?.toLocaleString() || "N/A"}
                        area={item.area?.toLocaleString() || "N/A"}
                        region={item.region || "No Region"}
                    />
                ))}
                </div>
            </div>
            
        </div>
    )
}