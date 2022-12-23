import { render, screen } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";

import * as stories from "./Modal.stories";

describe.skip("Feature: Wallet", () => {
  describe("Component: ConnectionModal/Modal", () => {
    const { Step0Loading } = composeStories(stories);
    describe("when active step is 0", () => {
      it("renders correctly when step state is loading", () => {
        // Act
        render(
          <Step0Loading
            activeStep={0}
            checkNetworkContent={"test"}
            checkSignContent={"test"}
            checkUnlockContent={"test"}
            checkWalletContent={"test"}
            isOpen={true}
            onDisconnect={() => null}
            stepState={"loading"}
          />
        );
        expect(screen).toMatchSnapshot();
      });
    });
  });
});
