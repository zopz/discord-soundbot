import { add, remove, exists } from '../ApprovedChannelList';

jest.mock('../connection');
describe('ApprovedChannelList', () => {
  const channel = '123';
  it('adds channel', () => {
    add(channel);
    expect(exists(channel)).toEqual(true);
  });
  it('removes channel', () => {
    remove(channel);
    expect(exists(channel)).toEqual(false);
  });
});
