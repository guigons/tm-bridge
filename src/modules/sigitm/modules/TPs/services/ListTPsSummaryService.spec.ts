import FakeTPsRepository from '../repositories/fakes/FakeTPsRepository';
import ListTPsSummaryService from './ListTPsSummaryService';

let fakeTPsRepository: FakeTPsRepository;
let listTPsSummary: ListTPsSummaryService;

describe('ListTPsSummary', () => {
  beforeEach(() => {
    fakeTPsRepository = new FakeTPsRepository();
    listTPsSummary = new ListTPsSummaryService(fakeTPsRepository);
  });
  it('shoul be able load TPs Summary', async () => {
    const response = await listTPsSummary.execute({ ids: [123] });
    expect(response.tps[0]?.id).toBe(123);
  });
});
