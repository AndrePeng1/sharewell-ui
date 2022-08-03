import React from 'react';

import Heart from '../media/heart_10.png'
import Trash from '../media/delete_orig_10.png'

export const dummyNoteData = [
  {
      key: '1',
      message: 'You are cool',
      sender: 'Andre Peng',
      react: true,
      score: 100,
      delete: true,
  },
  {
      key: '2',
      message: 'You are the cutest!',
      sender: 'Hyerin Yoon',
      react: true,
      score: 50,
      delete: true,
  },
  {
      key: '3',
      message: 'You have a big heart!',
      sender: 'FooBar',
      react: true,
      score: 200,
      delete: true,
  },
];

export const dummyNoteColumns = [
  {
    title: 'Sender',
    dataIndex: 'sender',
    key: 'sender',
    width: 100,
  },
  {
    title: 'Note',
    dataIndex: 'message',
    key: 'message',
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
    title: 'Your Score',
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