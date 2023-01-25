import React from "react";
import rootReducer from "../reducer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import Game from '../pages/Game'

describe("Testa tela do Game", () => {
    test('Verifica informações do jogador', () => {
        // acessar os elementos da tela
        const history = createMemoryHistory();
        const store = createStore(rootReducer);s
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Game />
                </Router>
            </Provider>,
        );
        const playerImage = screen.getByTestId('header-profile-picture')
        const playerName = screen.getByTestId('header-player-name')
        const score = screen.getByTestId('header-score')
        // interagir com os elementos (se for necessário)
        // fazer os testes
        expect(playerName).toBeInTheDocument();
        expect(playerImage).toBeInTheDocument();
        expect(score).toBeInTheDocument();
    });

    test('Testa se aparece informações do game', async () => {{
        // acessar os elementos da tela
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Game />
                </Router>
            </Provider>,
        );
        const category = await screen.findByTestId('question-category')
        const question = await screen.findByTestId('question-text')
        const options = await screen.findByTestId('answer-options')
        // interagir com os elementos (se for necessário)

        // fazer os testes
        expect(category).toBeInTheDocument()
        expect(question).toBeInTheDocument()
        expect(options).toBeInTheDocument()
    }});

    test('Testa se aparece informações do game', async () => {{
        // acessar os elementos da tela
        const history = createMemoryHistory();
        const store = createStore(rootReducer);
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Game />
                </Router>
            </Provider>,
        );
        const nextButton = await screen.findByTestId('btn-next')
        userEvent.click(nextButton)
        userEvent.click(nextButton)
        userEvent.click(nextButton)
        userEvent.click(nextButton)
        userEvent.click(nextButton)
        const playAgainButton = screen.findByTestId('btn-play-again')
        expect(playAgainButton).toBeInTheDocument()
    }});

    describe("Aprendendo sobre mocks", () => {
        it("testa se a função foi chamada", () => {
            triviaApiRequest() = jest.fn();
            triviaApiRequest();
          
          expect(triviaApiRequest).toHaveBeenCalled();
        });
    });
});

