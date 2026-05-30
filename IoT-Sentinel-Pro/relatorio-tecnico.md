# Relatorio tecnico - IoT Sentinel Pro

## Logica da classe Sensor

O projeto usa a classe `Sensor` para representar cada equipamento cadastrado.
Ela recebe `nome`, `tipo` e `valor` pelo construtor e centraliza as regras de
status no metodo `status()`. Assim, a tela nao precisa repetir regras de negocio
em varios pontos.

As regras usadas foram:

- Temperatura fica critica quando passa de 50 graus Celsius.
- Pressao fica critica quando passa de 100 Bar.
- Umidade fica critica quando fica abaixo de 30% ou acima de 80%.

## Persistencia local

Os sensores cadastrados sao guardados no `localStorage` logo depois da inclusao.
Quando a pagina abre novamente, o sistema le os dados salvos, recria os objetos
com a classe `Sensor` e renderiza o painel. Com isso, um F5 nao apaga a leitura
da planta.

## Uso do reduce nas medias

Para calcular as medias, o array primeiro passa por `filter()`, separando apenas
os sensores da categoria desejada. Depois o `reduce()` percorre essa lista e
concentra a soma em uma unica variavel de acumulacao. Esse fluxo deixa o calculo
mais direto: nao foi necessario criar varios contadores manuais para temperatura,
pressao e umidade. A media final e obtida dividindo a soma pela quantidade de
sensores filtrados e o resultado alimenta o grafico do Chart.js.

## Observacao

Os dados de teste usam nomes comuns de sensores industriais e valores simulados
para demonstrar estados normais e criticos no dashboard.
