# API Agendamento Médico 
- Os dados estão mockados (./src/mocks.mocks.ts)

## Instruções para execução do projeto (ambiente local):
 - npm run dev

## Instruções para execução dos testes unitários:
 - npm run test

## Rotas disponíveis:
  -  GET  | http://localhost:3000/agendas  
  -  POST | http://localhost:3000/agendamento    

## Exemplo de JSON válido para Post /agendamento:
 {
  "medico_id": 1,
  "paciente_nome": "Nome do Paciente",
  "data_horario": "2024-10-05 09:00"
}

## Deploy AWS
- Para deploy, executar o seguinte comando: npx serverless deploy --verbose
- Após a execução, serão exibidos os endpoints criados 
- Importante: para que o deploy seja possível, é necessário configurar suas credenciais da AWS a partir do seguinte comando:
   npx serverless config credentials --provider aws --key=CHAVE_GERADA_NA_AWS --secret SENHA_DA_CHAVE -o
   Onde: CHAVE_GERADA_NA_AWS e SENHA_DA_CHAVE devem cadastradas a partir do IAM Management do painel da AWS


