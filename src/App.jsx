import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tasks from "./components/Tasks";
import NewTask from "./components/NewTask";
import {
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
    useMsal,
} from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { PageLayout } from "./components/PageLayout";
import { callMsGraph, callMsGraphMail } from "./graph";
import "./App.css";
import { ProfileData } from "./components/ProfileData";
import Button from "react-bootstrap/Button";
import Mails from "./components/Mails";

function ProfileContent(props) {
    const { mails, setMails } = props;
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    const name = accounts[0] && accounts[0].name;

    function RequestProfileData() {
        const request = {
            ...loginRequest,
            account: accounts[0],
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance
            .acquireTokenSilent(request)
            .then((response) => {
                callMsGraph(response.accessToken).then((response) =>
                    setGraphData(response)
                );
                callMsGraphMail(response.accessToken).then((res) => {
                    setMails(res.value);
                });
            })
            .catch((e) => {
                instance.acquireTokenPopup(request).then((response) => {
                    callMsGraph(response.accessToken).then((response) =>
                        setGraphData(response)
                    );
                });
            });
    }

    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                    Request Profile Information
                </Button>
            )}
        </>
    );
}

const MainContent = (props) => {
    const { mails, setMails } = props;
    const [task, setTask] = useState(null);

    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent setMails={setMails} mails={mails} />
                <div className="App">
                    <div className="container p-4">
                        <div className="card-header">
                            <h2 className="card-tittle">List of Tasks</h2>
                            <a href="/create" className="btn btn-success">
                                Create Task
                            </a>
                        </div>
                    </div>
                    <Router>
                        <div className="container p-4">
                            <Routes>
                                <Route
                                    path="/"
                                    exact
                                    element={<Tasks setTask={setTask} />}
                                />
                                <Route
                                    path="/create"
                                    exact
                                    element={<NewTask />}
                                />
                                <Route
                                    path="/mails"
                                    exact
                                    element={<Mails mails={mails} />}
                                />
                            </Routes>
                        </div>
                    </Router>
                </div>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

function App() {
    const [mails, setMails] = useState(null);
    return (
        <PageLayout>
            <MainContent setMails={setMails} mails={mails} />
        </PageLayout>
    );
}

export default App;
