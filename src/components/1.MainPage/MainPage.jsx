import "./MainPage.css"
import Region from "./Region";
import InfoCountry from "./infoCountry";
import {useState, useEffect} from "react"

export default function MainPage() {
    
    const regions = ["Americas", "Antartic", "Africa", "Asia", "Europe", "Oceania"];
    
    
    const [infoCountries, setInfoCountries] = useState([]);
    const [filteredInfoCountries, setFilteredInfoCountries] = useState([]);
    const [filter, setFilter] = useState({
        sortby: "area",
        region: {
            Americas: false,
            Antarctic: false,
            Africa: false,
            Asia: false,
            Europe: false,
            Oceania: false,
        },
        status: {
            member: false,
            independient: false,
        }
    })
    /*Solicitud Api*/
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                setInfoCountries(() => data);
            })
            .catch(error => {
                console.log(error);  
            })
    }, []);
    /*Filtrador de las countries*/
    useEffect(() => {
        
        var sortedCountries = [...infoCountries]; // Copia del arreglo original

        /*Filtro por sortby */
        

        /*Filtro por region */
        const allRegionsFalse = Object.values(filter.region).every(value => !value);
        if (allRegionsFalse)
        sortedCountries = sortedCountries.filter((item) => 
            filter.region[item.region]
        );

        if (filter.sortby == "population") {
            sortedCountries.sort((a, b) => a.population - b.population);
        } else if (filter.sortby === "name") {
            sortedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        } else if (filter.sortby === "area") { 
            sortedCountries.sort((a, b) => a.area - b.area);
        }
        setFilteredInfoCountries(sortedCountries);

        
    

    }, [filter, infoCountries,]);
    
    const countriesFound = infoCountries.length;

    return (
        <div className="mpContainer">
            <div className="headerMp font2 color3">
                <span>Found {countriesFound} countries</span>
                <input 
                type="text" 
                placeholder="Search by Name, Region, Subregion"
                className="font2"
                />
            </div>
            <div className="filters">
                <button onClick={() => console.log(filter)
                }>click</button>
                <label htmlFor="sortBy" className="font4 color3">Sort by</label>
                <select 
                name="sort" 
                id="inputSelect" 
                className="color3 font3" 
                value={filter.sortby}
                onChange={(e) =>
                    setFilter((prev) => ({
                        ...prev,
                        sortby: e.target.value, 
                    }))
                }
                >
                    <option value="population">Population</option>
                    <option value="name">Name</option>
                    <option value="area">Area</option>
                </select>

                <span className="font4 color3 ab">Region</span>
                
                <div className="regionContainer">
                    {regions.map((item, index) => {
                    return (
                        <Region 
                        key={index}
                        region={item}
                        classNameRegion={item}
                        onRegionClick={(region) => 
                            setFilter((prev) => ({
                                ...prev,
                                region: {
                                    ...prev.region,
                                    [region]: !prev.region[region],
                                }
                            }))
                        }
                        />
                    )
                    })}

                </div>            
                <span className="font4 color3">Status</span>
                <div className="statusContainer">
                    <input type="checkbox" 
                    checked={filter.status.member} 
                    name="member" 
                    id="inputMember" 
                    onChange={() => 
                        setFilter((prev) => ({
                            ...prev,
                            status: {
                                ...prev.status,
                                member: !prev.status.member,
                            }
                        }))}
                    />
                    <label htmlFor="member" className="font2 color4">Member of the United Nations</label>
                </div>
                <div className="statusContainer">
                    <input 
                    type="checkbox" 
                    checked={filter.status.independient} 
                    name="member" 
                    id="inputMember"
                    onChange={() => 
                        setFilter((prev) => ({
                            ...prev,
                            status: {
                                ...prev.status,
                                independient: !prev.status.independient,
                            }
                        }))}
                    
                    />
                    <label htmlFor="member" className="font2 color4">Member of the United Nations</label>
                </div>
            </div>

            <div className="info">      
                <span className="font4 color3">Flag</span>
                <span className="font4 color3">Name</span>
                <span className="font4 color3">Population</span>
                <span className="font4 color3">Area (km²)</span>
                <span className="font4 color3">Region</span>
                <div className="line"></div>
                <div className="infoCountriesContainer">
                    {filteredInfoCountries.map((item, index) => {
                        return (
                            <InfoCountry
                            key={index}
                            img={item.flags?.svg||"N/A"}
                            name={item.name?.common||"N/A"}
                            population={item.population?.toLocaleString()||"N/A"}
                            area={item.area?.toLocaleString()||"N/A"}
                            regionInfo={item.region || "N/A"}
                            />
                        );
                    })}
                </div>

            </div>

            
            
            
        </div>
    )
}