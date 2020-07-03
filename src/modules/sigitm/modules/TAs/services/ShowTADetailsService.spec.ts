import FakeTAsRepository from '../repositories/fakes/FakeTAsRepository';
import ShowTADetailsService from './ShowTADetailsService';

let fakeTAsRepository: FakeTAsRepository;
let showTADetails: ShowTADetailsService;

describe('showTADetails', () => {
  beforeEach(() => {
    fakeTAsRepository = new FakeTAsRepository();
    showTADetails = new ShowTADetailsService(fakeTAsRepository);
  });
  it('shoul be able load TA Detail', async () => {
    const response = await showTADetails.execute({ id: 123 });
    expect(response.ta?.id).toBe(123);
  });
});
