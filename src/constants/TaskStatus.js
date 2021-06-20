export const TASK_STATUS = [
    {
        id: 0,
        name: 'All',
        color: '#CCC'
    },
    {
        id: 1,
        name: 'New',
        color: '#00AEFF'
    },
    {
        id: 2,
        name: 'In progress',
        color: '#FBAC0E'
    },
    {
        id: 3,
        name: 'Due date',
        color: '#F24236'
    },
    {
        id: 4,
        name: 'Closed',
        color: '#00C972'
    },
];

export const getStatusById = (id) => (
    TASK_STATUS.find(el => el.id === id)
)

export const getAllStatus = () => {
    const allStatus = TASK_STATUS.map(el => ({value: el.id, label: el.name}));
    return allStatus.filter(el => el.value !== 0)
}