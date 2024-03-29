import { API } from "@constants/api";
import { ROUTE, status } from "@constants/enums";
import { AppDispatch, GetState } from "@redux/configure-store";
import { toggleLoader } from "@redux/loaderSlice";
import axios from "axios";

axios.defaults.withCredentials = true;

export const confirmEmail = (code: string) => async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(toggleLoader(true));
    const { email } = getState().login;

    return axios.post(`${API}/auth/confirm-email`, { email, code })
        .then(() => ROUTE.CHANGE_PASSWORD)
        .catch(() => status.error)
        .finally(() => dispatch(toggleLoader(false)));
};
