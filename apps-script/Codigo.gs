/**
 * Backend do teste Perfil DISC.
 * Recebe as respostas do site e grava numa planilha do Google.
 *
 * Como usar: veja o README.md do repositório.
 */

// Troque por uma chave só sua. É ela que libera a leitura dos resultados no painel.
var CHAVE_ADMIN = 'troque-esta-chave';

var NOME_ABA = 'Respostas';
var CABECALHO = ['Data', 'Nome', 'Primário', 'Secundário', 'D', 'I', 'S', 'C'];

function doPost(e) {
  try {
    var dados = JSON.parse(e.postData.contents);
    var resultado = dados.resultado || {};
    aba().appendRow([
      new Date(),
      String(dados.nome || '').slice(0, 80),
      String(dados.primario || ''),
      String(dados.secundario || ''),
      Number(resultado.d) || 0,
      Number(resultado.i) || 0,
      Number(resultado.s) || 0,
      Number(resultado.c) || 0
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, erro: String(err) });
  }
}

function doGet(e) {
  var chave = e && e.parameter ? e.parameter.key : '';
  if (chave !== CHAVE_ADMIN) {
    return json({ ok: false, erro: 'nao autorizado' });
  }
  var linhas = aba().getDataRange().getValues();
  linhas.shift();
  var respostas = linhas
    .filter(function (linha) { return linha[1]; })
    .map(function (linha) {
      return {
        criadoEm: linha[0],
        nome: linha[1],
        primario: String(linha[2]).toLowerCase(),
        secundario: String(linha[3]).toLowerCase(),
        resultado: { d: linha[4], i: linha[5], s: linha[6], c: linha[7] }
      };
    })
    .reverse();
  return json({ ok: true, respostas: respostas });
}

function aba() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var destino = planilha.getSheetByName(NOME_ABA);
  if (!destino) {
    destino = planilha.insertSheet(NOME_ABA);
    destino.appendRow(CABECALHO);
    destino.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold');
    destino.setFrozenRows(1);
  }
  return destino;
}

function json(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
