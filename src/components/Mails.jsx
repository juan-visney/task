import React, { useState, useEffect } from "react";
import Mail from "../components/Mail";
import { loginRequest } from "../authConfig";
import { useMsal } from "@azure/msal-react";
import { callMsGraphMail } from "../graph";

function Mails() {
    const [mails, setMails] = useState([]);

    const { instance, accounts } = useMsal();
    function RequestProfileData() {
        const request = {
            ...loginRequest,
            account: accounts[0],
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            callMsGraphMail(response.accessToken).then((res) => {
                setMails(res.value);
            });
        });
    }

    useEffect(() => {
        RequestProfileData();
    }, []);

    return (
        <div>
            <div>
                <h3>Sent Messages</h3>
            </div>
            {mails !== null ? (
                mails.map((mail) => <Mail key={mail.id} mail={mail} />)
            ) : (
                <></>
            )}
        </div>
    );
}

export default Mails;
