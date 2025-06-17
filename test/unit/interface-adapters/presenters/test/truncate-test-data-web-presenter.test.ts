import { TruncateTestDataWebPresenter } from "@interface-adapters/presenters/test/truncate-test-data-web-presenter";
import type { TruncateTestDataOutputData } from "@usecases/test/truncate-test-data/output-data";
import { describe, expect, it } from "vitest";

describe("TruncateTestDataWebPresenter", () => {
  it("should generate correct view model from output data when process failed", () => {
    const presenter = new TruncateTestDataWebPresenter();

    const outputData: TruncateTestDataOutputData = {
      success: true,
    };

    presenter.present(outputData);
    const response = presenter.getResponse();

    expect(response).toEqual({
      success: true,
      message: "Test data truncated successfully"
    });
  });

  it("should generate correct view model from output data when process failed", () => {
    const presenter = new TruncateTestDataWebPresenter();

    const outputData: TruncateTestDataOutputData = {
      success: false,
      errorMessage: "Server Error"
    };

    presenter.present(outputData);
    const response = presenter.getResponse();

    expect(response).toEqual({
      success: false,
      message: "Failed to truncate test data"
    });

  });
});
