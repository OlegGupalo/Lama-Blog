import { Box, Button } from "@mui/material";
import ImageTool from "components/Form/Image";
import React, { Component } from "react";

import { createReactEditorJS } from "react-editor-js";

import { EDITOR_JS_TOOLS } from "./constants";

const ReactEditorJS = createReactEditorJS();

const ReactEditor = ({
    onGetText = () => {}
}) => {

    const editorCore = React.useRef(null)

    const handleInitialize = React.useCallback((instance) => {
        editorCore.current = instance
    }, [])
    
    const [image, setImage] = React.useState(null)
    const handleSave = React.useCallback(async () => {
        const savedData = await editorCore.current.save();
        onGetText(savedData)
    }, [])

    return (<React.Fragment>
            <Box>
                <ReactEditorJS
                    onInitialize={handleInitialize}
                    tools={EDITOR_JS_TOOLS}
                />
            </Box>

            <Button onClick={handleSave}>Save</Button>
    </React.Fragment>)
}

export default ReactEditor