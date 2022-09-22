import { useMemo } from 'react';

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'background',
  'color',
  'width',
];

const toolbarOptions = [
  [{ header: '1' }, { header: '2' }, { font: [] }],
  [{ size: [] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  ['blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['clean'],
];

const modules = {
  toolbar: {
    container: toolbarOptions,
  },
};

export { formats, modules };
