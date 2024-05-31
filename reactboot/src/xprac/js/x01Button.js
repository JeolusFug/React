import PropTypes from "prop-types";
import styles from "prac/css/x01Button.module.css";

function Button({text}) {
    return <button className={styles.btn}>{text}</button>;
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
}
export default Button;
