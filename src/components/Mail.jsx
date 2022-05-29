import React from "react";

function Mail(props) {
    const { mail } = props;
    return (
        <div>
            <form>
                <fieldset disabled>
                    <div className="form-group row">
                        <div className="row">
                            <div className="col-md-2">To</div>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    value={
                                        mail.toRecipients[0].emailAddress
                                            .address
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="row">
                            <div className="col-sm-2">Content</div>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={mail.body.content}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="dropdown-divider"></div>
                </fieldset>
            </form>
        </div>
    );
}

export default Mail;
