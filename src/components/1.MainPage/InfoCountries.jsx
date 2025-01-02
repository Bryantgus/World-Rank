import "./InfoCountries.css"
import PropTypes from 'prop-types'

export default function InfoCountries(props) {

    return (
        <div className="infoComponent">
            <div className="img" style={{ backgroundImage: `url("${props.flag}")`}}></div>
            <span>{props.name}</span>
            <span>{props.population}</span>
            <span>{props.area}</span>
            <span>{props.region}</span>
            
        </div>
        
    )
}

InfoCountries.propTypes = {
    name: PropTypes.string,
    population: PropTypes.string,
    area: PropTypes.string,
    region: PropTypes.string,
    img: PropTypes.string,
    flag: PropTypes.string
}