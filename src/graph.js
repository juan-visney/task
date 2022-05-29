import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */
export async function callMsGraph ( accessToken ) {
    const headers = new Headers();
    const bearer = `Bearer ${ accessToken }`;

    headers.append( "Authorization", bearer );

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch( graphConfig.graphMeEndpoint, options )
        .then( response => response.json() )
        .catch( error => console.log( error ) );
}

export async function callMsGraphMail ( accessToken ) {
    const headers = new Headers();
    const bearer = `Bearer ${ accessToken }`;

    headers.append( "Authorization", bearer );

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch( graphConfig.graphMeEndpointMail, options )
        .then( response => response.json() )
        .catch( error => console.log( error ) );
}


export async function callMsGraphSendMail ( accessToken, mail, task ) {
    const headers = new Headers();
    const bearer = `Bearer ${ accessToken }`;

    headers.append( "Authorization", bearer );
    headers.append( 'Content-Type', 'application/json' )
    const address = mail.mail
    console.log( task )
    const body = {
        message: {
            subject: `New task: ${ task.tittle }`,
            body: {
                contentType: "Text",
                content: task.description,
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: address,
                    },
                },
            ],
        }
    }
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify( body )
    };

    return fetch( graphConfig.graphSendMail, options )
        .then( response => response.json() )
        .catch( error => console.log( error ) );
}
