import { useCallback } from "react";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
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
      background: "#3b5998", // Facebook Blue
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "2",
    data: { label: "Load Balancer" },
    style: {
      background: "#F472B6",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "3",
    data: { label: "Web Servers" },
    style: {
      background: "#60A5FA",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "4",
    data: { label: "API Gateway" },
    style: {
      background: "#F472B6",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "5",
    data: { label: "GraphQL" },
    style: {
      background: "#34D399",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "6",
    data: { label: "Memcached" },
    style: {
      background: "#F59E0B",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "7",
    data: { label: "MySQL DB" },
    style: {
      background: "#34D399",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "8",
    data: { label: "Cassandra DB" },
    style: {
      background: "#34D399",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "9",
    data: { label: "News Feed Service" },
    style: {
      background: "#60A5FA",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "10",
    data: { label: "Messenger Service" },
    style: {
      background: "#60A5FA",
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
  { id: "e4-5", source: "4", target: "5", animated: true, type: "smoothstep" },
  { id: "e5-6", source: "5", target: "6", animated: true, type: "smoothstep" },
  { id: "e5-7", source: "5", target: "7", animated: true, type: "smoothstep" },
  { id: "e5-8", source: "5", target: "8", animated: true, type: "smoothstep" },
  { id: "e7-9", source: "7", target: "9", animated: true, type: "smoothstep" },
  {
    id: "e7-10",
    source: "7",
    target: "10",
    animated: true,
    type: "smoothstep",
  },
];

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node: { id: string }) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge: { source: string; target: string }) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node: { id: string | dagre.Label }) => {
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

function FaceBookFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

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
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default FaceBookFlow;
