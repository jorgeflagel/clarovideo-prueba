import styles from './CustomButton.module.css';

function CustomButton({children, onClick}) {
    return(
        <button className={styles.button} onClick={onClick}>{children}</button>
    )
}

export default CustomButton;