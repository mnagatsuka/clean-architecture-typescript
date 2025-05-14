import { describe, it, expect, vi } from "vitest";
import { CreateUserInteractor } from "../../../../../src/usecases/user/create-user/usecase-interactor";
import { CreateUserOutputBoundary } from "../../../../../src/usecases/user/create-user/output-boundary";
import { CreateUserInputData } from "../../../../../src/usecases/user/create-user/input-data";
import { UserDataAccessInterface } from "../../../../../src/usecases/user/create-user/data-access-interface";

describe("CreateUserInteractor", () => {
  const input: CreateUserInputData = {
    id: "1",
    email: "test@example.com",
    name: "Test User",
  };

  it("should create a user and call presenter with output", async () => {
    // モック定義
    const mockDataAccess: UserDataAccessInterface = {
      save: vi.fn(),
      existsByEmail: vi.fn().mockResolvedValue(false),
    };

    const mockPresenter: CreateUserOutputBoundary = {
      present: vi.fn(),
    };

    const interactor = new CreateUserInteractor(mockDataAccess, mockPresenter);

    await interactor.execute(input);

    expect(mockDataAccess.existsByEmail).toHaveBeenCalledWith("test@example.com");
    expect(mockDataAccess.save).toHaveBeenCalled();
    expect(mockPresenter.present).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "1",
        email: "test@example.com",
        name: "Test User",
        status: "INACTIVE",
      }),
    );
  });

  it("should throw if email already exists", async () => {
    const mockDataAccess: UserDataAccessInterface = {
      save: vi.fn(),
      existsByEmail: vi.fn().mockResolvedValue(true),
    };

    const mockPresenter: CreateUserOutputBoundary = {
      present: vi.fn(),
    };

    const interactor = new CreateUserInteractor(mockDataAccess, mockPresenter);

    await expect(() => interactor.execute(input)).rejects.toThrow("Email already exists");
    expect(mockDataAccess.save).not.toHaveBeenCalled();
    expect(mockPresenter.present).not.toHaveBeenCalled();
  });
});
