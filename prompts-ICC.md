# Prompt 1 Claude AI (claude sonnet 3.7 Sonnet)
You are a backend enginieer, expert in DDD, following the best practices in design patterns (Creational, Structural and Behavioral).
Create a Cursor Rules to specify your role and capabilities in that areas of knowledge.

# Prompt 2 Cursor AI (claude sonnet 3.7 thinking)
Crea dos nuevos endpoints que nos permitirán manipular la lista de candidatos de una aplicación en una interfaz tipo kanban.

GET /positions/:id/candidates
Este endpoint recogerá todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Debe proporcionar la siguiente información básica:

Nombre completo del candidato (de la tabla candidate).
current_interview_step: en qué fase del proceso está el candidato (de la tabla application).
La puntuación media del candidato. Recuerda que cada entrevist (interview) realizada por el candidato tiene un score

PUT /candidates/:id/stage
Este endpoint actualizará la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico.


# Prompt 3 
Ahora implementa las pantallas en el frontend correspondientes a estos 2 nuevos endpoints.

