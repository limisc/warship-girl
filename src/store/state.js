import { loadState } from '../actions';

const state = loadState('warship-girl') || {
  values: [1, 1, 1, 1],
  checked: { str: true, tor: false, def: false, air: true },
  list: [
    '11cbf574-4dde-41e1-ae97-ce718ba58589',
    '9f6d01bc-1e08-4664-aef6-f5da3e109ba6',
    '9f5dcdcd-58a6-432f-8397-43ebb03ca1d0',
    '471d9acd-bf12-408d-bc2e-0937734ac97f',
    'a26e2d92-70b6-46a9-8414-14af4a598b6f',
    'bf08d669-387c-4abb-bea6-6cceffc661ee',
  ],
  stats: {
    '9f5dcdcd-58a6-432f-8397-43ebb03ca1d0': {
      name: '反击',
      qty: '20',
      weight: ['63', '0', '56', '24'],
      value: ['40', '50', '40', ''],
    },
    '9f6d01bc-1e08-4664-aef6-f5da3e109ba6': {
      name: '声望',
      qty: '20',
      weight: ['63', '0', '56', '42'],
      value: ['40', '50', '40', ''],
    },
    '11cbf574-4dde-41e1-ae97-ce718ba58589': {
      name: '科罗拉多',
      qty: '20',
      weight: ['80', '0', '71', '23'],
      value: ['50', '60', '60', ''],
    },
    '471d9acd-bf12-408d-bc2e-0937734ac97f': {
      name: '布鲁克林',
      qty: '20',
      weight: ['16', '0', '14', '43'],
      value: ['10', '16', '10', ''],
    },
    'a26e2d92-70b6-46a9-8414-14af4a598b6f': {
      name: '林仙',
      qty: '20',
      weight: ['12', '10', '7', '14'],
      value: ['5', '8', '5', ''],
    },
    'bf08d669-387c-4abb-bea6-6cceffc661ee': {
      name: '奥马哈',
      qty: '20',
      weight: ['10', '18', '8', '20'],
      value: ['5', '8', '5', '0'],
    },
  },
};

export default state;
