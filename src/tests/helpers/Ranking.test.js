import React from "react";
import { Router } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import rootReducer from "../../reducer";
import { legacy_createStore as createStore } from 'redux';
import userEvent from "@testing-library/user-event";
import Ranking from "../../pages/Ranking";


describe(
  'Testa o componente Login', () => {
    beforeEach(() => {
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
          <Provider store={store}>
            <Router history={history}>
              <Ranking />
            </Router>
          </Provider>,
        );
      });
    test(
      'Ao carregar a página, o título contendo a palavra Ranking deverá estar na tela', () => {
        const headerEl = screen.getByRole("heading", { name: /Ranking/i});
        expect(headerEl).toBeInTheDocument();
      }
    );

    test(
        'Ao carregar a página, o botão "Go to home page" deverá estar na tela', () => {
          const btnGoToHome = getByRole('button', { name: /go to home page/i })
          expect(btnGoToHome).toBeInTheDocument();
        }
    );

    test(
        'Ao clicar no botão "Go to home page" o usuário é redirecionado à rota "/"', () => {
            const btnGoToHome = screen.getByRole('button', { name: /play/i });
            userEvent.click(btnGoToHome);
            expect(history.location.pathname).toBe('/game');
        }
    );

  }
)