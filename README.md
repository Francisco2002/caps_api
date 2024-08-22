# API Sistema CAPS
A ideia desse sistema surgiu ao observar um profissional do CAPS da minha cidade. Observei que as anotações e observações eram feitas em papel.  
Pensei em uma solução de software que permitisse ao profissional criar suas fichas de atendimento.  
Como atualmente estou estudando esse assunto, resolvi criar esse sistema usando a arquitetura de microsserviços.  
Dividirei a aplicação nos seguintes microsserviços:
1. **sessions:** responsável pela autenticação e recuperação de senha
2. **profiles:** responsável pelo gerenciamento de usuários do sistema
3. **events:** responsável pelo gerenciamento de eventos
4. **chats:** responsável pelo gerenciamento de mensagens
5. **cards:** responsável pelo gerenciamento de fichas de atendimentos

Mudanças nessa estrutura podem ocorrer durante o desenvolvimento  

*Última atualização: 22/08/2024 10:28*