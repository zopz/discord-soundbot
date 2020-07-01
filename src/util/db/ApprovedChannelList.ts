import connection from './connection';
export const exists = (id: string) =>
  !!connection
    .get('validChannelList')
    .find(v => v === id)
    .value();
export const count = () => {
  !!connection.get('validChannelList').value();
};
export const add = (id: string) => {
  if (exists(id)) return;
  connection.get('validChannelList').push(id).write();
};
export const remove = (id: string) => {
  connection
    .get('validChannelList')
    .remove(v => v === id)
    .write();
};
