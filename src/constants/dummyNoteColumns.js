import React from 'react';

import Heart from '../media/heart_10.png'
import Trash from '../media/delete_orig_10.png'

export const dummyNoteData = [
  {
      key: '1',
      note: 'You are cool',
      name: 'Andre Peng',
      react: true,
      score: 100,
      delete: true,
  },
  {
      key: '2',
      note: 'You are the cutest!',
      name: 'Hyerin Yoon',
      react: true,
      score: 50,
      delete: true,
  },
  {
      key: '3',
      note: 'You have a big heart!',
      name: 'FooBar',
      react: true,
      score: 200,
      delete: true,
  },
];

export const dummyNoteColumns = [
  {
    title: 'Sender',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    filters: [
      {
        text: 'Andre Peng',
        value: 'Andre Peng',
      },
    ],
    // specify the condition of filtering result
  // here is that finding the name started with `value`
    onFilter: (value, record) => record.sender.indexOf(value) === 0,
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note',
    width: 500,
  },
  {
    title: 'React',
    dataIndex: 'react',
    key: 'react',
    width: 5,
    render: (text, record) => {
      return (
       <div>
        <img src={Heart} alt="heart-icon"/>
       </div>
     );
    },
  },
  {
    title: 'Upvote Count',
    dataIndex: 'score',
    key: 'score',
    width: 50,
  },
  {
    title: 'Delete',
    dataIndex: 'delete',
    key: 'delete',
    width: 5,
    render: (text, record) => {
      return (
       <div>
        <img src={Trash} alt="delete-icon"/>
       </div>
     );
    },
  },
];