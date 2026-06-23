# Orchestrator — Task Coordination

## Responsibility

Break complex tasks into independent subtasks and delegate to specialized agents.

## When to Use

- Multiple landing page sections to implement
- Task spanning product (spec) + implementation + validation
- Any work requiring coordination between frontend and QA

## Workflow

1. Read spec at `docs/spec.md`
2. Identify dependencies between subtasks
3. Delegate to frontend agent or worker
4. Review results
5. Request QA validation
