import InfoCountries from "./InfoCountries";
import "./MainPage.css"
import Region from "./Region"
import { useState, useEffect } from "react";

export default function MainPage() {

    const regions = ["Americas", "Antartic", "Africa", "Asia", "Europe", "Oceania"];
    const [allCountries, setAllCountries] = useState([]);
    // const [filteredCountries, setFilteredCountries] = useState([]);
    const [filter, setFilter] = useState({
        sortby: "1",
        region: {
            americas: false,
            antartic: false,
            africa: false,
            asia: false,
            europe: false,
            oceania: false,
        },
        status: {
            member: false,
            independient: true
        }
    })

    useEffect(() => {
        // Llamada a la API
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                setAllCountries(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    function sortByChange(e) {
        const value = e.target.value;
        setFilter((prev) =>{
            return {
                ...prev,
                sortby: value,
            }
        }
        );    
        console.log(value);
        
        
                
    }

    function statusChange(e) {
        const [name, checked] = e.target.name;
        setFilter((prev) => {
            return {
                ...prev,
                status: {
                    ...prev.status,
                    [name]: !checked

                }
            }
        })

    }



    return (
        <div className="mpContainer">

            <div className="header">
                <span className="color3 font3">Found {allCountries.length} countries</span>
                <input className="font3 color3"type="text" placeholder="Search by Name, Region, Subregion"/>
            </div>

            <div className="filters">
                <span className="font4 color3">Sort by</span>
                <select 
                className="color4 font3"
                value={filter.sortby}
                onChange={sortByChange} >
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
                        <input
                            type="checkbox"
                            name="member" 
                            id="member"
                            checked={filter.status.member}
                            onChange={(e) => {statusChange(e)}} 
                        />
                        <label htmlFor="member" className="font3 color4">Member of United Nations</label>
                    </div>

                    <div className="inputsFilter">
                        <input
                            type="checkbox"
                            name="independient" 
                            id="independient"
                            checked={filter.status.independient}
                            onChange={(e) => {statusChange(e)}} 
                        />
                        <label htmlFor="independient" className="font3 color4">Independient</label>
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
                    {allCountries.map((item, index) => (
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