import { NavLink } from "react-router-dom";
import styles from './CategoriesMenu.module.css';
import { MdNavigateBefore, MdNavigateNext, MdMenu, MdClose } from 'react-icons/md';
import { useState, useRef } from "react";

const genres = [
    {genre: 'gen_accion', label: 'Acción y Aventura'},
    {genre: 'gen_biograficas', label: 'Biográficas'},
    {genre: 'gen_anime', label: 'Anime y Videojuegos'},
    {genre: 'gen_scifi', label: 'Ciencia Ficción'},
    {genre: 'gen_cineoro', label: 'Cine de Oro'},
    {genre: 'gen_clasicas', label: 'Clásicas'},
    {genre: 'gen_comedia', label: 'Comedia'},
    {genre: 'gen_deportes', label: 'Deportes'},
    {genre: 'gen_docu', label: 'Documentales'},
    {genre: 'gen_drama', label: 'Drama'},
    {genre: 'gen_familiares', label: 'Familiares'},
    {genre: 'gen_historicas', label: 'Históricas'},
    {genre: 'gen_infantiles', label: 'Infantiles'},
    {genre: 'gen_latino', label: 'Latinoamericanas'},
    {genre: 'gen_musica', label: 'Música'},
    {genre: 'gen_romanticas', label: 'Románticas'},
    {genre: 'gen_terror', label: 'Terror y Suspenso'},
]

function CategoriesMenu({ search, setSearch }) {
    const [open, setOpen] = useState(false);
    const [translate, setTranslate] = useState(0);
    const navigation = useRef(null);

    const handleClickMenu = () => {
        setOpen(previous => !previous)
    }

    const handleClickBefore = () => {
        if(translate < 0){
            setTranslate(previousValue => previousValue + 120)
        }
    }

    const handleClickNext = () => {
        if(navigation.current.scrollWidth - document.body.getBoundingClientRect().width > -translate )
            setTranslate(previousValue => previousValue - 120)
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    return(
        <header className={styles.header}>
            <MdNavigateBefore size='2em' className={styles.iconNavigationBack} onClick={handleClickBefore}/>
            <nav className={styles.container}>
                <div className={styles.logoContainer}>
                    <img className={styles.clarovideo} 
                        width='100px'
                        src="/clarovideo.svg" 
                        alt="claro video"
                    />
                    <input className={styles.search} placeholder='Filter movies...' type='text' value={search} onChange={handleChangeSearch}/>
                    {open 
                        ? <MdClose onClick={handleClickMenu} className={styles.burgerIcon }/>
                        : <MdMenu onClick={handleClickMenu} className={styles.burgerIcon }/>}
                </div>
                <input className={styles.search2} placeholder='Filter movies...' type='text' value={search} onChange={handleChangeSearch}/>
                <ul className={`${styles.menu} ${!open ? styles.closed : undefined}`} style={{transform: `translateX(${translate}px)`}} ref={navigation}>
                    {genres.map(genre => 
                            <NavLink 
                                key={genre.genre}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) => isActive ? styles.activeStyle  : styles.inactiveStyle}
                                to={`/mexico/${genre.genre}`}
                                style={{flexShrink: 0}}>
                                <li className={styles.menuItem}>
                                    {genre.label}
                                </li>
                            </NavLink>  
                       )}
                </ul>
            </nav>
            <MdNavigateNext size='2em' className={styles.iconNavigationAfter} onClick={handleClickNext}/>
        </header>
    )
}

export default CategoriesMenu;