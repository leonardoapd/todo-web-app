import apiService from "./api.service";


export default function signupService() {
    const signup = (payload) => {
        return apiService.post("/signup", payload);
    }

    return {
        signup
    }
}
