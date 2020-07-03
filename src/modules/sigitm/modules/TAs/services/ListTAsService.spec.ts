import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeTAsRepository from '../repositories/fakes/FakeTAsRepository';
import ListTAsService from './ListTAsService';

let fakeTAsRepository: FakeTAsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listTAs: ListTAsService;

describe('ListTAs', () => {
  beforeEach(() => {
    fakeTAsRepository = new FakeTAsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listTAs = new ListTAsService(fakeTAsRepository, fakeCacheProvider);
  });
  it('shoul be able load TAs Summary', async () => {
    const response = await listTAs.execute();
    expect(response.group[0].grupoResponsavel).toBe('Fila');
    expect(response.group[0].data[9].count).toBe(1);
    expect(response.group[0].data[9].ids[0]).toBe(123);
    expect(response.group[0].total).toBe(1);
  });
});
