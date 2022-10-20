import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';
import './App.css'

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const rfStyle = {
  backgroundColor: 'black',
};
function Flow() {

  // const [newNode, setNewNode] = useState({ id: "", position: { x: "", y: "" }, data: { label: "" }})
  const [x, setX] = useState()
  const [y, setY] = useState()
  const [label, setLabel] = useState()

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  console.log(nodes)

  const createNode = (e) => {
    e.preventDefault()
    if (x && y && label) {
      setNodes([...nodes, { id: nodes.length + 1 + "", position: { x: x, y: y }, data: { label: label }, width: 150, height: 38 }])
    } else {
      alert("need parameter")
    }
  }


  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className='container'>
      <div className="flow"  >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <MiniMap
            style={rfStyle}
          />
          <Controls />
          <Background />

        </ReactFlow>
      </div>
      <div className="options">
        <form className='form'>
          <h2>Create A New Node</h2>
          <input placeholder='X axis' name="x" onChange={(e) => setX(e.target.value)}></input>
          <input placeholder='Y axis' name="y" onChange={(e) => setY(e.target.value)} ></input>
          <input placeholder='Node Label' name="label" onChange={(e) => setLabel(e.target.value)} ></input>
          <button onClick={createNode} > Create </button>
        </form>
      </div>
    </div>
  );
}

export default Flow;
