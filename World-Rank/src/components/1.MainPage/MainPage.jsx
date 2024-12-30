import "./MainPage.css"
import Region from "./Region"

export default function MainPage() {
    const CountryFound = 234
    const regions = ["Americas", "Antartic", "Africa", "Asia", "Europe", "Oceania"];
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
                            regionClass={item}
                            />
                        );
                    })}
                </div>
            </div>
            
        </div>
    )
}