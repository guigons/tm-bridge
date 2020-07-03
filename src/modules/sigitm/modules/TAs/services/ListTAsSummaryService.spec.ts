import FakeTAsRepository from '../repositories/fakes/FakeTAsRepository';
import ListTAsSummaryService from './ListTAsSummaryService';

let fakeTAsRepository: FakeTAsRepository;
let listTAsSummary: ListTAsSummaryService;

describe('ListTAsSummary', () => {
  beforeEach(() => {
    fakeTAsRepository = new FakeTAsRepository();
    listTAsSummary = new ListTAsSummaryService(fakeTAsRepository);
  });
  it('shoul be able load TAs Summary', async () => {
    const response = await listTAsSummary.execute({ ids: [123] });
    expect(response.tas[0]?.id).toBe(123);
  });
});
