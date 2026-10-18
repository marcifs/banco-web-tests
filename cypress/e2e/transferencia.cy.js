describe("Transferencias", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fazerLoginComCredenciaisValidas();
  });

  it("Deve transferir quando informo dados e valor validos", () => {
    cy.realizarTransferencia("João da Silva", "Maria Oliveira", "11");

    cy.verificarMensagemNoToast("Transferência realizada!");
  });

  it("Deve apresentar erro quando tentar transferir mais que 5 mil sem o token", () => {
    cy.realizarTransferencia("João da Silva", "Maria Oliveira", "6000.00");

    cy.verificarMensagemNoToast(
      "Autenticação necessária para transferências acima de R$ 5.000,00",
    );
  });
});
