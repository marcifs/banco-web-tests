describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.screenshot("apos-visitar-pagina");
  });

  it("Login com dados válidos deve permitir entrada no sistema", () => {
    cy.fazerLoginComCredenciaisValidas();
    cy.screenshot("apos-clicar-no-botao-entrar");

    cy.contains("h4", "Realizar Transferência").should("be.visible");
  });

  it("Login com dados inválidos deve apresentar mensagem de erro", () => {
    cy.fazerLoginComCredenciaisInvalidas();

    cy.verificarMensagemNoToast("Erro no login. Tente novamente.");
  });
});
