import { useCallback } from "react";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  Edge,
} from "reactflow";
import dagre from "dagre";

import "reactflow/dist/style.css";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const initialNodes = [
  {
    id: "1",
    data: { label: "Users" },
    style: {
      background: "#60A5FA",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "2",
    data: { label: "Route 53" },
    style: {
      background: "#F472B6",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "3",
    data: { label: "CloudFront" },
    style: {
      background: "#F472B6",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "4",
    data: { label: "S3 Bucket" },
    style: {
      background: "#34D399",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "5",
    data: { label: "API Gateway" },
    style: {
      background: "#F472B6",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "6",
    data: { label: "Lambda" },
    style: {
      background: "#34D399",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "7",
    data: { label: "DynamoDB" },
    style: {
      background: "#F59E0B",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true, type: "smoothstep" },
  { id: "e2-3", source: "2", target: "3", animated: true, type: "smoothstep" },
  { id: "e3-4", source: "3", target: "4", animated: true, type: "smoothstep" },
  { id: "e2-5", source: "2", target: "5", animated: true, type: "smoothstep" },
  { id: "e5-6", source: "5", target: "6", animated: true, type: "smoothstep" },
  { id: "e6-7", source: "6", target: "7", animated: true, type: "smoothstep" },
];

const getLayoutedElements = (
  nodes: { id: string }[],
  edges:
    | {
        id: string;
        source: string;
        target: string;
        animated: boolean;
        type: string;
      }[]
    | Edge[]
    | {
        source: dagre.Edge;
        target: string | { [key: string]: unknown } | undefined;
      }[],
  direction = "TB"
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node: { id: string }) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  edges.forEach((edge) => {
    if (typeof edge.source === "string" && typeof edge.target === "string") {
      dagreGraph.setEdge(edge.source, edge.target);
    }
  });
  dagre.layout(dagreGraph);
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(layoutedEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Panel position="top-left">
          <h1 className="text-3xl font-bold mb-4 font">
            Amazon Architecture Diagram
          </h1>
        </Panel>

        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
