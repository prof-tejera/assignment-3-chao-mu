import styles from "./Button.module.css";

import { useNavigate } from "react-router-dom";

/**
 * Button component that handles navigation and click events.
 * @param {Object} props - The props for the Button component.
 * @param {React.ReactNode} props.children - The content within the button.
 * @param {boolean} [props.submit] - Whether the button should submit the form.
 * @param {string} [props.to] - The URL to navigate when the button is clicked.
 * @param {string} [props.tooltip] - Information about the button.
 * @param {function(Event): void} [props.onClick] - Function to handle click events.
 *
 * @returns {JSX.Element} JSX element representing the button.
 */
const Button = ({ to, tooltip, submit = false, onClick, children }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    if (to) {
      navigate(to);
    }
  };

  return (
    <button
      title={tooltip}
      onClick={handleClick}
      className={styles.button}
      type={submit ? "submit" : "button"}
    >
      {children}
    </button>
  );
};

export default Button;
