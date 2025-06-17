export interface OutputBoundary<TOutputData, TViewModel> {
  present(data: TOutputData): void
  getResponse(): TViewModel
}
