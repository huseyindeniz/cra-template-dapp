import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Wallet } from ".";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { initialState } from "./slices";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

afterEach(cleanup);

describe("UserModal", () => {
  it("renders without crashing", () => {
    const mockStore = configureStore();
    const store = mockStore({ wallet: initialState });
    const { container } = render(
      <Provider store={store}>
        <Wallet />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});
