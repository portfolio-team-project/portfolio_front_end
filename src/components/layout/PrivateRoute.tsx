import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import toast from "react-hot-toast";

function PrivateRoute() {
    const { user, initialized } = useSelector((state: RootState) => state.member);

    if (!initialized) return null;

    if (!user) {
        toast.error("로그인이 필요한 페이지입니다.");
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default PrivateRoute;