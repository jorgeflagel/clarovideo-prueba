import styles from './Loading.module.css'

function Loading() {

    return(
        <div className={styles.container}>
            <div className={styles.loader}></div> 
            <img className={styles.image} src='/claro.png' alt='loading...' />
        </div>
    )
}

export default Loading;