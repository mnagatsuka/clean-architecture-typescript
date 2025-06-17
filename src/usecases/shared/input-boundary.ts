export interface InputBoundary<TInputData> {
  execute(input: TInputData): Promise<void>
}
