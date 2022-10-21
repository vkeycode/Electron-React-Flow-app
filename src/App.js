
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

const defaultParameters = {
  x: 0,
  y: 100,
  width: 150,
  height: 38,
}

const initialOptions = {
  id: "",
  x: "",
  y: "",
  width: "",
  height: "",
  label: "",
  background: "#FFFFFF",
  color: "#000000",
  radius: "0",
  opacity: "1",
}


function Flow() {

  const [options, setOptions] = useState(initialOptions)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const createNode = (e) => {
    e.preventDefault()
    setNodes(
      [...nodes,
      {
        id: nodes.length + 1 + "",
        position: {
          x: options.x ? options.x : defaultParameters.x,
          y: options.y ? options.y : defaultParameters.y
        },
        data: {
          label: options.label ? options.label : nodes.length + 1 + ""
        },
        style: {
          width: Number(options.width) ? Number(options.width) : defaultParameters.width ,
          height: Number(options.height) ? Number(options.height) : defaultParameters.height,
          background: options.background,
          color: options.color,
          borderRadius: options.radius + "px",
          opacity: options.opacity
        }
      }
      ]
    )
    setOptions(initialOptions)
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
            <div className='contentAx'>
              <label>X:</label>
              <input
                className='axisInput'
                placeholder='0'
                name="x"
                onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
                value={options.x}
              />
            </div>
            <div className='contentAx'>
              <label>Y:</label>
              <input
                className='axisInput'
                placeholder='100'
                name="y"
                onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
                value={options.y}
              />
            </div>
          </div>
          <div className='dimension'>
            <label>Width:</label>
            <input
              className='dimensionInput'
              placeholder='150'
              name="width"
              onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
              value={options.width}
            />
            <label>Height:</label>
            <input
              className='dimensionInput'
              placeholder='38'
              name="height"
              onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
              value={options.height}
            />
          </div>
          <div className='lab'>
            <label>Label:</label>
            <input
              className='label'
              placeholder={nodes.length + 1 + ""}
              name="label"
              onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
              value={options.label}
            />
          </div>
          <div className='color'>
            <div className='fc'>
              <label>Text Color:</label>
              <input
                className='colorInput'
                name='color'
                type="color"
                value={options.color}
                onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
              />
            </div>
            <div className='bg'>
              <label>Background:</label>
              <input
                className='colorInput'
                name='background'
                type="color"
                value={options.background}
                onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
              />
            </div>
          </div>
          <div className='rd'>
            <label>Radius:<span>{options.radius}px</span></label>
            <input
              type="range"
              name='radius'
              min="0"
              max="50"
              value={options.radius}
              onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
            />
            <label>Opacity:<span>{options.opacity}</span></label>
            <input
              type="range"
              name='opacity'
              min="0"
              max="1"
              step="0.1"
              value={options.opacity}
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
