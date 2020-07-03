import FakeTPsRepository from '../repositories/fakes/FakeTPsRepository';
import ShowTPDetailsService from './ShowTPDetailsService';

let fakeTPsRepository: FakeTPsRepository;
let showTPDetails: ShowTPDetailsService;

describe('LoadTPDetails', () => {
  beforeEach(() => {
    fakeTPsRepository = new FakeTPsRepository();
    showTPDetails = new ShowTPDetailsService(fakeTPsRepository);
  });
  it('shoul be able load TP Detail', async () => {
    const response = await showTPDetails.execute({ id: 123 });
    expect(response.tp?.id).toBe(123);
  });
});
