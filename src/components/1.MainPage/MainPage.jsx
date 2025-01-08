import "./MainPage.css"
import Region from "./Region";
import InfoCountry from "./InfoCountry"; 
import {useState, useEffect} from "react"
import countriesData from "./../../countriesData.json"

export default function MainPage() {
    
    const regions = ["Americas", "Antarctic", "Africa", "Asia", "Europe", "Oceania"];
    
    
    const infoCountries = countriesData;


    const [filteredInfoCountries, setFilteredInfoCountries] = useState([]);
    const [filter, setFilter] = useState({
        word: "",
        sortby: "population",
        region: {
            Americas: true,
            Antarctic: true,
            Africa: true,
            Asia: true,
            Europe: true,
            Oceania: true,
        },
        status: {
            unMember: false,
            independent: false,
        }
    });

    /*Filtrador de las countries*/
    useEffect(() => {
        
        var countriesFilterVar = [...infoCountries]; // Copia del arreglo original

        /*Filtro por sortby */
        if (filter.sortby == "population") {
            countriesFilterVar.sort((a, b) => a.population - b.population);
        } else if (filter.sortby === "name") {
            countriesFilterVar.sort((a, b) => a.name.common.localeCompare(b.name.common));
        } else if (filter.sortby === "area") { 
            countriesFilterVar.sort((a, b) => a.area - b.area);
        }

        /*Filtro por region */
        countriesFilterVar = countriesFilterVar.filter((item) => 
            filter.region[item.region]
        );
        

        /*Filtro por status*/
        if (filter.status.unMember) {
            countriesFilterVar = countriesFilterVar.filter((item) => 
                item.unMember === true);
        }
        if (filter.status.independent) {
            countriesFilterVar = countriesFilterVar.filter((item) => 
                item.independent === true);
        }   
        
        if (filter.word !== "") {
            countriesFilterVar = countriesFilterVar.filter((item) =>
                item.name.common.toLowerCase().includes(filter.word.toLowerCase())
            );
        }
        


        setFilteredInfoCountries(countriesFilterVar);

        
    

    }, [filter, infoCountries,]);
    

    return (
        <div className="mpContainer">
            <div className="headerMp font2 color3">
                <span>Found {filteredInfoCountries.length} countries</span>
                <input 
                type="text" 
                placeholder="Search by Name, Region, Subregion"
                className="font2"
                onChange={(e) => 
                    setFilter((prev) => ({
                        ...prev,
                        word: e.target.value
                    }))}
                />
            </div>
            <div className="filters">
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
                    checked={filter.status.unMember} 
                    name="member" 
                    id="inputMember" 
                    onChange={() => 
                        setFilter((prev) => ({
                            ...prev,
                            status: {
                                ...prev.status,
                                unMember: !prev.status.unMember,
                            }
                        }))}
                    />
                    <label htmlFor="member" className="font2 color3">Member of the United Nations</label>
                </div>
                <div className="statusContainer">
                    <input 
                    type="checkbox" 
                    checked={filter.status.independent} 
                    name="member" 
                    id="inputMember"
                    onChange={() => 
                        setFilter((prev) => ({
                            ...prev,
                            status: {
                                ...prev.status,
                                independent: !prev.status.independent,
                            }
                        }))}
                    
                    />
                    <label htmlFor="member" className="font2 color3">independent</label>
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