import { createAppSlice } from "@/lib/createAppSlice";

export interface AuthSliceState {
    user: { name: string, email: string, password: string } | null;
    status: "idle" | "loading" | "failed";
}

const initialState: AuthSliceState = {
    user: null,
    status: "idle",
};

export const authSlice = createAppSlice({
    name: "auth",
    initialState,
    reducers: (create) => ({
        registerUser: create.asyncThunk(
            async (user: { name: string, email: string, password: string }) => {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user),
                })
                return response.json()
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.user = action.payload;
                },
                rejected: (state) => {
                    state.status = "failed";
                },
            },
        ),
        loginUser: create.asyncThunk(
            async (user: { email: string, password: string }) => {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user),
                })
                return response.json()
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.user = action.payload;
                },
                rejected: (state) => {
                    state.status = "failed";
                },
            },
        ),
    }),
    selectors: {
        selectUser: (auth) => auth.user,
        selectStatus: (auth) => auth.status,
    },
});

export const { registerUser, loginUser } = authSlice.actions;

export const { selectUser, selectStatus } = authSlice.selectors;
