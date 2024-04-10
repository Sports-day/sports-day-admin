'use client'
import {
    ReactFlow,
    Controls,
    Background,
    applyEdgeChanges,
    applyNodeChanges,
    NodeChange,
    EdgeChange
} from "reactflow";
import React from "react";
import 'reactflow/dist/style.css';
import {useState, useCallback} from "react";

const initialNodes = [
    {
        id: '1',
        data: { label: 'SPORTSDAY' },
        position: { x: 0, y: 0 },
        type: 'input',
    },
    {
        id: '2',
        data: { label: 'Admin' },
        position: { x: 100, y: 100 },
    },
    {
        id: '3',
        data: { label: 'Admin' },
        position: { x: 100, y: 100 },
    },
];


const initialEdges = [
    {id: "1-2", source: "1", target: "2"}
]

export default function TournamentPage() {

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    return (
        <div style={{
            height:"50vh",
            border: "1px solid #4a5abb"
        }}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    )
}