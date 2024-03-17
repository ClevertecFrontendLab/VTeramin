import { API } from "@constants/api";
import { ROUTE } from "@constants/enums";
import { AppDispatch, GetState } from "@redux/configure-store";
import { toggleLoader } from "@redux/loaderSlice";
import axios from "axios";

axios.defaults.withCredentials = true;
const params = {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
};

export const changePassword = () => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { password, password2 } = getState().login;

    return axios.post(`${API}/auth/change-password`, { password, confirmPassword: password2 }, params)
        .then(() => ROUTE.SUCCESS_CHANGE_PASSWORD)
        .catch(() => ROUTE.ERROR_CHANGE_PASSWORD)
        .finally(() => dispatch(toggleLoader(false)));
};
