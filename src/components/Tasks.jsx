import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './Card'

function Tasks ( props ) {

    const { setTask } = props

    const [ tasks, setTasks ] = useState( [] )

    const getTasks = async () => {
        await axios.get( '' )
            .then( res => {
                setTasks( res.data )
            }, err => {
                console.log( err )
            } )
    }

    useEffect( () => {
        getTasks()
    }, [] )

    return (
        <div>
            <div className="row">
                {
                    tasks.map( _task => (
                        <Card
                            key={ _task.id }
                            task={ _task }
                            id={ _task.id }
                            setTask={ setTask }
                        />
                    ) )
                }
            </div>
        </div>
    );
}

export default Tasks;