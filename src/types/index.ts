export interface SubTask {
    time: string;      // "08:00"
    amount: number;   // 500 (ml, or equivalent unit)
    completed: boolean;   // was it done?
}

export interface Task {
    id: string;
    name: string;
    total: number;
    division: number;
    times: string[];        // same length as "division"
    createdAt: string;
    subtasks: SubTask[];
}