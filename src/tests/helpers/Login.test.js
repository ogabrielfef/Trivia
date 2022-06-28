// import Login from "../../pages/Login";
import App from "../../App";
import React from "react";
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
describe(
    'Testa o componente Login', () => {
        
        test(
            'Ao renderizar a tela os Botões são renderizados', () => {
                render(
                    <MemoryRouter >
                      <App />
                    </MemoryRouter>,
                );
                const play = screen.getByRole('button', {
                    name: /play/i
                  })
                const settings = screen.getByRole('button', {
                    name: /settings/i
                  })

                expect(play).toBeInTheDocument();
                expect(settings).toBeInTheDocument();
            }
        );
    }
)