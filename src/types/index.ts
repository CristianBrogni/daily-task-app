export interface SubTask {
    horario: string;      // "08:00"
    quantidade: number;   // 500 (ml, ou unidade equivalente)
    concluido: boolean;   // foi feita?
  }
  
  export interface Task {
    id: string;
    nome: string;
    total: number;
    divisao: number;
    horarios: string[];        // mesmo tamanho que "divisao"
    criadoEm: string;
    subtarefas: SubTask[];
  }