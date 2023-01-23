import React from 'react'

let Item = () => {
    return <React.Fragment>
        Item
    </React.Fragment>
}

Item = React.memo(Item)
export default Item