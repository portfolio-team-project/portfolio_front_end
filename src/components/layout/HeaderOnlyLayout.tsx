import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function  HeaderOnlyLayout() {
    return (
        <Fragment>
            <Header />
            <main>
                <Outlet />
            </main>
        </Fragment>
    );
}

export default HeaderOnlyLayout;