import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ranking from "../pages/Ranking";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";


const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 10,
  gravatarEmail: '',
  nextQuestion: false,
  disableOptions: false,
};


// fonte: https://thewebdev.info/2022/02/24/how-to-mock-local-storage-in-jest-tests/
const localStorageMockPlayers = (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
      removeItem(key) {
        delete store[key];
      }
    };
  })();
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMockPlayers
  });



describe(
  'Testa o componente Login', () => {
    beforeEach(() => {
        localStorage.setItem('ranking', JSON.stringify([{name: "Gabriel", score: 2, picture: "2f277e7519f73f9c9c63ce2beedf2d1c"}, {name: "Vitória Meinerz ", score: 2, picture: "4675ee57486c6ab9507d64d763ffd4f3"}]));
      });
    test(
      'Ao carregar a página, o título contendo a palavra Ranking deverá estar na tela', () => {
        renderWithRouterAndRedux(<Ranking />, INITIAL_STATE , '/ranking');
        const headerEl = screen.getByRole("heading", { name: /Ranking/i});
        expect(headerEl).toBeInTheDocument();
      }
    );


    test(
        'Ao carregar a página, o botão "Go to home page" deverá estar na tela', () => {
          renderWithRouterAndRedux(<Ranking />, INITIAL_STATE , '/ranking');
          const btnGoToHome = getByRole('button', { name: /go to home page/i })
          expect(btnGoToHome).toBeInTheDocument();
        }
    );


    test(
        'Ao clicar no botão "Go to home page" o usuário é redirecionado à rota "/"', () => {
            const { history } = renderWithRouterAndRedux(<Ranking />, INITIAL_STATE, '/ranking');
            const btnGoToHome = screen.getByRole('button', { name: /go to home page/i });
            userEvent.click(btnGoToHome);
            expect(history.location.pathname).toBe('/game');
        }
    );


    test(
        'Ao carregar a página o nome dos jogadores deverá aparecer na tela', () => {
            renderWithRouterAndRedux(<Ranking />, INITIAL_STATE , '/ranking');
            const player = screen.getById('player-list-0');
            expect(player).NotToBeInTheDocument();
        }
    );


    test(
        'Ao carregar a página o nome dos jogadores deverá aparecer na tela', () => {
            renderWithRouterAndRedux(<Ranking />, INITIAL_STATE , '/ranking');
            const player1 = screen.getByText(/Gabriel/i);
            expect(player1).NotToBeInTheDocument();
            const player2 = screen.getByText(/Vitória Meinerz/i);
            expect(player2).NotToBeInTheDocument();
        }
    );


      test(
        'Ao clicar no botão "go to home page" a chave Score do estado é zerada', () => {
            renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
            const btnGoToHome = screen.getByRole('button', { name: /go to home page/i });
            userEvent.click(btnGoToHome);
            const globalState = store.getState();
            expect(globalState.score).toBe(0);
        }
    );
  }
)