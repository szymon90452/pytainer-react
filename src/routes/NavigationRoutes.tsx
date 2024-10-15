import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "@/components/pages/LoginPage/LoginPage";
import GuestTemplate from "@/components/templates/GuestTemplate/GuestTemplate";
import PrivateTemplate from "@/components/templates/PrivateTemplate/PrivateTemplate";
import MainPage from "@/components/pages/MainPage/MainPage";
import ScriptsPage from "@/components/pages/ScriptsPage/ScriptsPage";
import ScriptPage from "@/components/pages/ScriptPage/ScriptPage";
import AddScriptPage from "@/components/pages/AddScriptPage/AddScriptPage";
import UsersPage from "@/components/pages/UsersPage/UsersPage";

const NavigationRoutes = () => {
    return (
        <Routes>
            {/* Route */}
            <Route>
                {/* Template */}
                <Route element={<GuestTemplate />}>
                    <Route
                        path="/login"
                        element={
                            <Suspense fallback={null}>
                                <LoginPage />
                            </Suspense>
                        }
                    />
                </Route>
            </Route>
            <Route>
                <Route element={<PrivateTemplate />}>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={null}>
                                <MainPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/scripts"
                        element={
                            <Suspense fallback={null}>
                                <ScriptsPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/scripts/add"
                        element={
                            <Suspense fallback={null}>
                                <AddScriptPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/script"
                        element={
                            <Suspense fallback={null}>
                                <ScriptPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <Suspense fallback={null}>
                                <UsersPage />
                            </Suspense>
                        }
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default NavigationRoutes;