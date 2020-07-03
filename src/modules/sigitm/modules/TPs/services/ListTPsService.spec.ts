import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeTPsRepository from '../repositories/fakes/FakeTPsRepository';
import ListTPsService from './ListTPsService';

let fakeTPsRepository: FakeTPsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listTPs: ListTPsService;

describe('ListTPs', () => {
  beforeEach(() => {
    fakeTPsRepository = new FakeTPsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listTPs = new ListTPsService(fakeTPsRepository, fakeCacheProvider);
  });
  it('shoul be able load TPs Summary', async () => {
    const response = await listTPs.execute();
    expect(response.group[0].grupoResponsavel).toBe('Responsavel Grupo');
    expect(response.group[0].data[12].count).toBe(1);
    expect(response.group[0].data[12].ids[0]).toBe(123);
    expect(response.group[0].total).toBe(1);
  });
});
