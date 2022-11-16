const timingCheckboxes = [
  {
    name: 'timing',
    value: '10_min',
    label: '10 min',
  },
  {
    name: 'timing',
    value: '30_min',
    label: '30 min',
  },
  {
    name: 'timing',
    value: '45_min',
    label: '45 min',
  },
  {
    name: 'timing',
    value: '90_min',
    label: '90 min',
  },
  {
    name: 'timing',
    value: 'project',
    label: 'Projekt',
  },
];

export default {
  title: {
    label: 'Časová náročnost',
    name: 'timing',
  },
  checkboxes: timingCheckboxes,
};
