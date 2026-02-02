import { useServicesEntries } from "@/services/services_endpoints";
import { LoginCredentials, SignupData, User } from "@/types/User";
// Remainder: use secure storage utils in productions 
import { deleteRefreshToken, deleteToken, getRefreshToken, getToken, setRefreshToken, setToken } from "@/utils/test-token-storage";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    user: User | null;
    login: (data: { user: LoginCredentials; }) => Promise<void>;
    signup: (data: { user: SignupData; }) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { loginEntry, signupEntry, refreshTokenEntry, getCurrentUserProfile } = useServicesEntries()
    const { getItem, setItem, removeItem } = useAsyncStorage("user");
    useEffect(() => {
        const restoreAuth = async () => {
            try {
                const storedUser = await getItem();
                if (!storedUser) return;
                setUser(JSON.parse(storedUser));
                const accessToken = await getToken();
                if (!accessToken) throw new Error("No access token");

                const response = await fetch(getCurrentUserProfile, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status === 403) {
                    await refreshToken(); 
                    const retryAccess = await getToken();
                    const retryResponse = await fetch(getCurrentUserProfile, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${retryAccess}`,
                        },
                    });

                    if (!retryResponse.ok) {
                        throw new Error("Session expired");
                    }

                    const freshUser = await retryResponse.json();
                    setUser(freshUser);
                    return;
                }

                if (response.ok) {
                    const freshUser = await response.json();
                    setUser(freshUser);
                } else {
                    throw new Error("Auth restore failed");
                }
            } catch (e) {
                console.warn("Auth restore failed, logging out");
                await logout(); // clean exit
            } finally {
                setLoading(false);
            }
        };

        restoreAuth();
    }, []);


    const login = async (data: { user: LoginCredentials }) => {
        try {
            const response = await fetch(loginEntry, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': data.user.email,
                    'password': data.user.password
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.non_field_errors?.[0] || 'Login Failed');
            } else {
                const resData = await response.json();
                const token = resData.tokens.access;
                const user = resData.user;
                const refreshToken = resData.tokens.refresh;
                await setItem(JSON.stringify(user));
                setUser(user);
                await setToken(token);
                await setRefreshToken(refreshToken);
            }
        } catch (error) {
            let message = 'Server Error, Login failed!';
            console.log(error);
            if (error instanceof Error) {
                throw new Error(error.message ?? message);
            }
        }
    };

    const signup = async (data: { user: SignupData; }) => {
        try {
            const response = await fetch(signupEntry, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': data.user.username,
                    'full_name': data.user.fullName,
                    'phone': data.user.phone,
                    'role': data.user.role,
                    'email': data.user.email,
                    'date_of_birth': data.user.dateOfBirth,
                    'password': data.user.password
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.non_field_errors?.[0] || 'Signup failed');
            }

            const resData = await response.json();
            const token = resData.access;
            const user = resData.user;
            const refreshToken = resData.refresh;
            setUser(user);
            await setToken(token);
            await setRefreshToken(refreshToken);
        } catch (error) {
            throw new Error('Server Error, Signup failed!');
        }
    };

    const refreshToken = async () => {
        const refresh = await getRefreshToken();
        try {
            const response = await fetch(refreshTokenEntry, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${refresh}`
                },
                body: JSON.stringify({
                    'refresh': refresh
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.non_field_errors?.[0] || 'Signup failed');
            }

            const resData = await response.json();
            const token = resData.tokens.access;
            const user = resData.user;
            const refreshToken = resData.tokens.refresh;
            setUser(user);
            await setToken(token);
            await setRefreshToken(refreshToken);
        } catch (error) {
            throw new Error('Server Error, Signup failed!');
        }
    }

    const logout = async () => {
        setUser(null);
        deleteToken();
        deleteRefreshToken();
        await removeItem();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
                refreshToken,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
