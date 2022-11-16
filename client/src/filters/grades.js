const gradesCheckboxes = [
  {
    name: 'grade',
    value: 'kinder_garden',
    label: 'Aktivity MŠ',
  },
  {
    name: 'grade',
    value: 'first_grade',
    label: 'Aktivity 1. stupeň ZŠ',
  },
  {
    name: 'grade',
    value: 'second_grade',
    label: 'Aktivity 2. stupeň ZŠ',
  },
  {
    name: 'grade',
    value: 'medium_grade',
    label: 'Aktivity SŠ',
  },
  {
    name: 'grade',
    value: 'kinder_garden_material',
    label: 'Publikace MŠ',
  },
  {
    name: 'grade',
    value: 'basic_school_material',
    label: 'Publikace ZŠ a SŠ',
  },
];

export default {
  title: {
    label: 'Materiály/Aktivity',
    name: 'grade',
  },
  checkboxes: gradesCheckboxes,
};
