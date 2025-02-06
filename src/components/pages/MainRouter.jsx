import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSession } from "../../hooks/useSession";
import { useIntro } from "../../hooks/useIntro";
import Home from "./Home/Home";
import Projects from "./Projects/Projects";
import Contact from "./Contact/Contact";
import Navbar from "../layout/common/Navbar";
import Sign from "../pages/Auth/Sign";
import ResetPass from "./Auth/ResetPass";
import Dashboard from "./Dashboard/Dashboard";
import NoPage from "../../components/pages/NoPage/NoPage";
import PrivateRoute from "./Auth/PrivateRoute";
import AuthenticatedRoute from "./Auth/AuthenticatedRoute";
import AboutMe from "./About/AboutMe";
import Footer from "../../components/layout/common/Footer";
import ScrollToTop from "../helpers/ScrollToTop";
import useAOS from "../../hooks/useAOS";
import Intro from "../layout/common/Intro";
import AddProject from "./Dashboard/AddProject";
import AllProjects from "./Dashboard/Projects";

export default function MainRouter() {

    useAOS();
    const { session } = useSession();
    const { showIntro } = useIntro()
    const location = useLocation();
    const isDashboard = location.pathname.includes('/dashboard')

    return showIntro ? <Intro />
        : (
            <>
                <Toaster />
                {!isDashboard && <Navbar session={session} />}
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/about"
                        element={
                            <AboutMe />
                        }
                    />
                    <Route
                        path="/projects"
                        element={
                            <Projects />
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <Contact />
                        }
                    />
                    <Route element={<AuthenticatedRoute session={session} />}>
                        <Route
                            path="/signin"
                            element={<Sign />}
                        />
                    </Route>
                    <Route element={<PrivateRoute session={session} />}>
                        <Route
                            path="/resetpassword"
                            element={<ResetPass />}
                        />
                    </Route>
                    <Route element={<PrivateRoute session={session} />}>
                        <Route
                            path="/dashboard"
                            exact
                            element={<Dashboard />
                            }
                        >
                            <Route
                                index
                                element={<AllProjects />}
                            />
                            <Route
                                path="createproject"
                                element={<AddProject />}
                            />
                            <Route
                                path="project/:id/update"
                                element={<AddProject />}
                            />
                        </Route>
                    </Route>
                    <Route path="*" element={<NoPage />} />
                </Routes>
                <ScrollToTop />
                {!isDashboard && <Footer />}
            </>
        );
}