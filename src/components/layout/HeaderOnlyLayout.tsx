import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function  HeaderOnlyLayout() {
    return (
        <Fragment>
            <Header />
            <main style={{ background: "#0f172a", minHeight: "100dvh" }}>
                <Outlet />
            </main>
        </Fragment>
    );
}

export default HeaderOnlyLayout;