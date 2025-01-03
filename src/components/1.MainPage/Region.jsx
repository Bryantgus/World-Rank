import "./Region.css"
import PropTypes from "prop-types"

export default function Region(props) {
    
    return (
        <button className="region font3 color3">{props.region}</button>
        
    )
}

Region.propTypes = {
    region: PropTypes.string,

}