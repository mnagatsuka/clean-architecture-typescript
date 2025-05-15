import { CreateUserWebPresenter } from "@/interface-adapters/presenters/user/create-user-web-presenter";
import type { CreateUserOutputData } from "@/usecases/user/create-user/output-data";
import { describe, expect, it } from "vitest";

describe("CreateUserWebPresenter", () => {
  it("should generate correct view model from output data", () => {
    const presenter = new CreateUserWebPresenter();

    const outputData: CreateUserOutputData = {
      id: "user-001",
      email: "user@example.com",
      name: "User",
      status: "INACTIVE",
    };

    presenter.present(outputData);
    const response = presenter.getResponse();

    expect(response).toEqual({
      id: "user-001",
      message: "User created successfully",
    });
  });

  it("should throw if getResponse is called before present", () => {
    const presenter = new CreateUserWebPresenter();

    expect(() => presenter.getResponse()).toThrowError("getResponse() called before present().");
  });
});
