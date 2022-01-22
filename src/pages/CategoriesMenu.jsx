import { Outlet } from "react-router-dom";

function CategoriesMenu() {
    return(
        <div>
            <nav>CATEGORIES MENU</nav>
            <Outlet />
        </div>
    )
}

export default CategoriesMenu;