import { render, cleanup } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";

import * as stories from "./Button.stories";

describe("Feature:Wallet", () => {
  describe("Connect Button", () => {
    afterEach(() => {
      cleanup();
    });
    const { Default, Loading } = composeStories(stories);
    const onClickSpy = jest.fn();
    describe("when LoadingState is IDLE", () => {
      it("should be visible and clickable", () => {
        // Act
        const { queryByText, getByRole } = render(
          <Default onClick={onClickSpy} />
        );
        getByRole("button").click();
        // Assert
        const actualButton = queryByText("Connect");
        expect(actualButton).toBeVisible();
        expect(onClickSpy).toHaveBeenCalled();
      });
    });
    describe("when LoadingState is PENDING", () => {
      it("should be visible and disabled", () => {
        // Arrange
        const { queryByText, getByRole } = render(
          <Loading {...Loading.args} onClick={onClickSpy} />
        );
        // Act
        getByRole("button").click();
        // Assert
        const actualButton = queryByText("Connect");
        expect(actualButton).not.toBeVisible();
        expect(onClickSpy).not.toHaveBeenCalled();
      });
    });
  });
});
