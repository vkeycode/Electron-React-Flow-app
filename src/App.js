import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
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

const initialOptions = {
  x: "",
  y: "",
  width: "",
  height: "",
  label: "",
  background: "",
  color: "",
  radius: "",
  opacity: "",
}


function Flow() {

  const [options, setOptions] = useState(initialOptions)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  console.log(options)
  console.log(nodes)

  const createNode = (e) => {
    e.preventDefault()
      setNodes(
        [...nodes,
        {
          id: nodes.length + 1 + "",
          position: {
            x: options.x,
            y: options.y
          },
          data: {
            label: options.label
          },
          style: {
            width: Number(options.width),
            height: Number(options.height),
            background: options.background,
            color: options.color,
            borderRadius: options.radius,
            opacity: options.opacity
          }
        }
        ]
      )
      // setOptions(initialOptions)
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
          <div className='axis'>
            <input
              className='axisInput'
              placeholder='X axis'
              name="x"
              onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
              value={options.x}
            />
            <input
              className='axisInput'
              placeholder='Y axis'
              name="y"
              onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
              value={options.y}
            />
          </div>
          <div className='dimension'>
            <input
              className='dimensionInput'
              placeholder='Width'
              name="width"
              onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
              value={options.width}
            />
            <input
              className='dimensionInput'
              placeholder='Height'
              name="height"
              onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
              value={options.height}
            />
          </div>
          <input
            className='label'
            placeholder='Node Label'
            name="label"
            onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
            value={options.label}
          />
          <div className='color'>
            <div className='fc'>
              <label>Text Color</label>
              <input
                className='colorInput'
                name='color'
                type="color"
                onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
              />
            </div>
            <div className='bg'>
              <label>Background</label>
              <input
                className='colorInput'
                name='background'
                type="color"
                onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
              />
            </div>
          </div>
          <div className='rd'>
            <label>Radius<span>{options.radius}</span></label>
            <input
              type="range"
              name='radius'
              min="0"
              max="50"
              onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value + "%" })}
            />
            <label>Opacity<span>{options.opacity}</span></label>
            <input
              type="range"
              name='opacity'
              min="0"
              max="1"
              step="0.1"
              onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
            />
          </div>
          <button
            onClick={createNode}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default Flow;
