import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { registerUserApi } from "../api/authApi";
import { loginUserAction, registerUserAction } from "../state/authActions";
import toast, { Toaster } from 'react-hot-toast';


export const useAuth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {register, reset, handleSubmit, formState: {errors}} = useForm({
        mode: "onTouched"
    });

    const registerFormHook = async (data) => {
        dispatch(registerUserAction(data));
        reset()
        navigate("/")
    };
    const loginFormHook = async (credential) => {
        dispatch(loginUserAction(credential));
        reset()
        navigate("/")
    }
    return {
        navigate,
        dispatch,
        registerFormHook,
        loginFormHook,
        register,
        reset,
        handleSubmit,
        errors,
    }
}