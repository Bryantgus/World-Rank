import "./MainPage.css"
import Region from "./Region";

export default function MainPage() {
    const countriesFound = 250;
    const regions = ["Americas", "Antartic", "Africa", "Asia", "Europe", "Oceania"];

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
                <label htmlFor="sortBy" className="font4 color3">Sort by</label>
                <select name="sort" id="inputSelect" className="color3 font3">
                    <option value="population">Population</option>
                    <option value="name">Name</option>
                    <option value="area">Area</option>
                </select>

                <span className="font4 color3 ab">Region</span>
            
            </div>

            <div className="info">

            </div>

            
            
            
        </div>
    )
}