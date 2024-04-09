'use client'
import {Container, Stack} from "@mui/material";
import {ReactFlow, Controls, Background} from "reactflow";
import 'reactflow/dist/style.css'
import React from "react";

export default function Tournament() {
    return (
        <div style={{height:"100%"}}>

            <ReactFlow>
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    )
}