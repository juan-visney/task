import React, { useState } from "react";
import axios from "axios";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { callMsGraphSendMail } from "../graph";
import { loginRequest } from "../authConfig";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

function Mail(props) {
    const { task } = props;
    const { instance, accounts } = useMsal();
    const [mail, setMail] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMail({ ...mail, [name]: value });
    };

    function sendMail() {
        const request = {
            ...loginRequest,
            account: accounts[0],
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            callMsGraphSendMail(response.accessToken, mail, task).then(
                (res) => {
                    console.log(res);
                    window.location.replace("/");
                }
            );
        });
    }

    return (
        <>
            <div className="row">
                <input
                    type="mail"
                    placeholder="mail"
                    name="mail"
                    onChange={handleChange}
                />
                <Button variant="secondary" onClick={sendMail}>
                    Send
                </Button>
            </div>
        </>
    );
}

function Card(props) {
    const { task, id } = props;

    async function deleteTask() {
        await axios.delete(`${id}`).then(
            (res) => {
                window.location.replace("/");
            },
            (err) => {
                console.log(err);
            }
        );
    }

    async function changeStatus() {
        task.status = 1;
        await axios.put(`${id}`, task).then(
            (res) => {
                window.location.replace("/");
            },
            (err) => {
                console.log(err);
            }
        );
    }

    return (
        <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                    <div className="row card-header">
                        <div className="col-md-8 ">
                            <h2 className="card-title">{task.tittle}</h2>
                        </div>
                        <div className="col-md-2">
                            <button
                                className="btn btn-danger"
                                onClick={deleteTask}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                        {task.status === 0 ? (
                            <div className="col-md-2">
                                <button
                                    className="btn btn-success"
                                    onClick={changeStatus}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                            </div>
                        ) : (
                            <div className="col-md-2">
                                <button className="btn btn-primary" disabled>
                                    <FontAwesomeIcon icon={faCheckDouble} />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <p>{task.description}</p>
                            {task.status === 0 ? <Mail task={task} /> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
