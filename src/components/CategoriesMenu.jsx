import { NavLink } from "react-router-dom";

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

function CategoriesMenu() {

    let activeStyle = {
        textDecoration: "underline"
      };

    let inactiveStyle = {
        textDecoration: "none",
        color: "black"
    }

    return(
        <header>
            <nav>
                <ul>
                    {genres.map(genre => 
                        <li key={genre.genre}>
                            <NavLink 
                                style={({ isActive }) => isActive ? activeStyle  : inactiveStyle}
                                to={`/mexico/${genre.genre}`}>{genre.label}</NavLink>
                        </li>)}
                </ul>
            </nav>
        </header>
    )
}

export default CategoriesMenu;