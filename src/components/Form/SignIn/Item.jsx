import React from 'react'

let Item = ({ item, addTodo }) => {

    return <React.Fragment>
        {item.map((e, key) => 
            <p key={key}>{e}</p>
        )}
        <button onClick={addTodo}> add Todo</button>
    </React.Fragment>
}

Item = React.memo(Item)

export default Item