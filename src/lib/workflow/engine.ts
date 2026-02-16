import { Queue, Worker, Job } from "bullmq";
import { prisma } from "@/lib/db";

export interface WorkflowJobData {
  executionId: string;
  workflowId: string;
  input: Record<string, any>;
}

export const workflowQueue = new Queue<WorkflowJobData>("workflow-execution", {
  connection: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export function createWorkflowWorker() {
  return new Worker<WorkflowJobData>(
    "workflow-execution",
    async (job: Job<WorkflowJobData>) => {
      const { executionId, workflowId, input } = job.data;

      console.log(`Processing workflow execution: ${executionId}`);

      try {
        // Update execution status to running
        await prisma.execution.update({
          where: { id: executionId },
          data: {
            status: "RUNNING",
            startedAt: new Date(),
          },
        });

        // Get workflow definition
        const workflow = await prisma.workflow.findUnique({
          where: { id: workflowId },
        });

        if (!workflow) {
          throw new Error("Workflow not found");
        }

        const definition = workflow.definition as any;
        const nodes = definition.nodes || [];
        const edges = definition.edges || [];

        // Execute nodes in topological order
        const results: Record<string, any> = {};
        let currentInput = input;

        // Simple linear execution (can be enhanced for branching)
        for (const node of nodes) {
          const nodeResult = await executeNode(node, currentInput, results);
          
          // Log the node execution
          await prisma.executionLog.create({
            data: {
              executionId,
              nodeId: node.id,
              nodeName: node.data?.label || node.type,
              status: "COMPLETED",
              message: `Node executed successfully`,
              data: nodeResult,
            },
          });

          results[node.id] = nodeResult;
          currentInput = nodeResult;
        }

        // Update execution as completed
        await prisma.execution.update({
          where: { id: executionId },
          data: {
            status: "COMPLETED",
            completedAt: new Date(),
            output: results,
          },
        });

        console.log(`Workflow execution completed: ${executionId}`);
        return { success: true, results };
      } catch (error) {
        console.error(`Workflow execution failed: ${executionId}`, error);

        // Log the error
        await prisma.executionLog.create({
          data: {
            executionId,
            nodeId: "root",
            nodeName: "Workflow",
            status: "FAILED",
            message: error instanceof Error ? error.message : "Unknown error",
          },
        });

        // Update execution as failed
        await prisma.execution.update({
          where: { id: executionId },
          data: {
            status: "FAILED",
            completedAt: new Date(),
          },
        });

        throw error;
      }
    },
    {
      connection: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
      },
      concurrency: 5,
    }
  );
}

async function executeNode(node: any, input: any, previousResults: Record<string, any>): Promise<any> {
  const nodeType = node.type;
  
  switch (nodeType) {
    case "trigger":
      return executeTriggerNode(node, input);
    case "action":
      return executeActionNode(node, input);
    case "agent":
      return executeAgentNode(node, input);
    case "condition":
      return executeConditionNode(node, input, previousResults);
    case "delay":
      return executeDelayNode(node, input);
    case "loop":
      return executeLoopNode(node, input);
    default:
      console.warn(`Unknown node type: ${nodeType}`);
      return input;
  }
}

function executeTriggerNode(node: any, input: any): any {
  // Triggers pass through their input
  return {
    ...input,
    triggered: true,
    timestamp: new Date().toISOString(),
  };
}

async function executeActionNode(node: any, input: any): Promise<any> {
  // Execute action based on node configuration
  const actionConfig = node.data?.config || {};
  
  // In a real implementation, this would call actual services
  // (Slack, Gmail, HTTP requests, etc.)
  
  return {
    ...input,
    action: actionConfig.action || "default",
    result: "Action executed",
  };
}

async function executeAgentNode(node: any, input: any): Promise<any> {
  // In a real implementation, this would call the AI agent
  const agentId = node.data?.agentId;
  
  if (!agentId) {
    return {
      ...input,
      agentResponse: "No agent configured",
    };
  }

  // TODO: Implement actual agent execution with OpenAI/Anthropic
  
  return {
    ...input,
    agentId,
    agentResponse: "Agent execution placeholder",
  };
}

function executeConditionNode(node: any, input: any, previousResults: Record<string, any>): any {
  const condition = node.data?.condition || "";
  
  // Simple condition evaluation
  // In production, use a proper expression parser
  let result = false;
  
  try {
    // Simple string-based condition check
    if (condition.includes("=")) {
      const [key, value] = condition.split("=").map((s: string) => s.trim());
      result = input[key] === value || previousResults[key] === value;
    } else if (condition.includes(">")) {
      const [key, value] = condition.split(">").map((s: string) => s.trim());
      const num = parseFloat(value);
      result = (input[key] || previousResults[key]) > num;
    } else if (condition.includes("<")) {
      const [key, value] = condition.split("<").map((s: string) => s.trim());
      const num = parseFloat(value);
      result = (input[key] || previousResults[key]) < num;
    }
  } catch (e) {
    console.error("Condition evaluation error:", e);
  }

  return {
    ...input,
    conditionResult: result,
    branch: result ? "true" : "false",
  };
}

function executeDelayNode(node: any, input: any): any {
  const delayMs = node.data?.delay || 1000;
  
  return {
    ...input,
    delay: delayMs,
    delayed: true,
  };
}

function executeLoopNode(node: any, input: any): any {
  const iterations = node.data?.iterations || 1;
  
  return {
    ...input,
    loopCount: iterations,
    looped: true,
  };
}

export async function addWorkflowToQueue(executionId: string, workflowId: string, input: Record<string, any> = {}) {
  await workflowQueue.add("execute", {
    executionId,
    workflowId,
    input,
  });
}
