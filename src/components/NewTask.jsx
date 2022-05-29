import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function NewTask ( props ) {

    const [ task, setTask ] = useState( { tittle: '', description: '' } )

    const handleChange = ( e ) => {
        const { name, value } = e.target
        setTask( { ...task, [ name ]: value } )
    }

    async function createTask () {
        await axios.post( '', task )
            .then( res => {
                window.location.replace( '/' )
            }, err => {
                console.log( err )
            } )
    }

    return (
        <div className="row">
            <div className='col-md-4'>
                <form>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                name="tittle"
                                onChange={ handleChange }
                                placeholder="Tittle" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                onChange={ handleChange }
                                placeholder="Description" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-10">
                            <Link
                                to="/"
                                className="btn btn-primary"
                                onClick={ createTask }
                            >Create</Link>
                        </div>
                    </div>
                </form>
            </div >
        </div>
    );
}

export default NewTask;