import PropTypes from "prop-types"
import "./InfoCountry.css"

export default function InfoCountry(props) {
    return (
        <div className="infoCountry">
            <div className="flag">
                <img src={props.img} alt="flag-img" />
            </div>
            <span>{props.name}</span>
            <span>{props.population}</span>
            <span>{props.area}</span>
            <span>{props.regionInfo}</span>
            
        </div>
    )
}

InfoCountry.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    population: PropTypes.string,
    area: PropTypes.string,
    regionInfo: PropTypes.string,
};
