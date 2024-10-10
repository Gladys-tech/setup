// projectsData.ts

export interface Project {
    id: number;
    name: string;
    client: string;
    location: string;
    amount: string;
    payDueDate: string;
    status: string;
}

const projects: Project[] = [
    { id: 1, name: 'Mulago Bangalo', amount: 'Ugx 430,000', client: 'Mr. Jackson', location: 'Mulago', payDueDate: '11/12/22', status: 'Foundation' },
    { id: 2, name: 'Buziga 2 bed room', amount: 'Ugx 257,000', client: 'Bob Mercy', location: 'Buziga', payDueDate: '2/12/22', status: 'Spring beam' },
    { id: 3, name: 'Mulago Bangalo', amount: 'Ugx 430,000', client: 'Mr. Jackson', location: 'Mulago', payDueDate: '11/12/22', status: 'Roofing' },
    { id: 4, name: 'Buziga 2 bed room', amount: 'Ugx 257,000', client: 'Bob Mercy', location: 'Buziga', payDueDate: '2/12/22', status: 'Complete' },
    { id: 5, name: 'Mulago Bangalo', amount: 'Ugx 430,000', client: 'Mr. Jackson', location: 'Mulago', payDueDate: '11/12/22', status: 'In Progress' },
    
];

export default projects;
