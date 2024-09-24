import { useCallback, useState } from "react";
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
      background: "#C13584",
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
    data: { label: "Image Processing Service" },
    style: {
      background: "#34D399",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "6",
    data: { label: "Cache Service" },
    style: {
      background: "#F59E0B",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
    position: { x: 300, y: 200 }, // Adjust this if needed
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
    data: { label: "NoSQL DB" },
    style: {
      background: "#34D399",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "9",
    data: { label: "Feed Generation Service" },
    style: {
      background: "#60A5FA",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "10",
    data: { label: "Notification Service" },
    style: {
      background: "#60A5FA",
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
    },
  },
  {
    id: "11",
    data: { label: "Messaging Service" },
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
  { id: "e4-6", source: "4", target: "6", animated: true, type: "smoothstep" },
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
  {
    id: "e7-11",
    source: "7",
    target: "11",
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

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
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

function InstagramFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [cacheExpanded, setCacheExpanded] = useState(false);

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

  const handleCacheClick = useCallback(() => {
    setCacheExpanded(!cacheExpanded);

    if (!cacheExpanded) {
      const newNodes = [
        {
          id: "12",
          data: { label: "Redis Cache" },
          position: { x: 300, y: 400 },
          style: {
            background: "#F59E0B",
            color: "#fff",
            padding: "10px",
            borderRadius: "8px",
          },
        },
        {
          id: "13",
          data: { label: "Memcached" },
          position: { x: 500, y: 400 },
          style: {
            background: "#F59E0B",
            color: "#fff",
            padding: "10px",
            borderRadius: "8px",
          },
        },
      ];

      const newEdges = [
        {
          id: "e6-12",
          source: "6",
          target: "12",
          animated: true,
          type: "smoothstep",
        },
        {
          id: "e6-13",
          source: "6",
          target: "13",
          animated: true,
          type: "smoothstep",
        },
      ];

      setNodes((nds) => [...nds, ...newNodes]);
      setEdges((eds) => [...eds, ...newEdges]);
    } else {
      setNodes((nds) => nds.filter((n) => n.id !== "12" && n.id !== "13"));
      setEdges((eds) =>
        eds.filter((e) => e.id !== "e6-12" && e.id !== "e6-13")
      );
    }
  }, [cacheExpanded, setNodes, setEdges]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onNodeClick={(_event, node) => {
          if (node.id === "6") handleCacheClick();
        }}
      >
        <Panel position="top-left">
          <h1 className="text-3xl font-bold mb-4">
            Instagram Architecture Diagram
          </h1>
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default InstagramFlow;
