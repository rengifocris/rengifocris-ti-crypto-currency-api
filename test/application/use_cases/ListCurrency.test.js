const CurrencyRepository = require('../../../src/domain/CurrencyRepository');
const mockCurrencyRepository = new CurrencyRepository();
const ListCurrency = require('../../../src/application/use_cases/ListCurrency');

test('should resolve with all the currencies persisted in repository', async () => {
  // given
  mockCurrencyRepository.find = () => ['BTCUSDT', 'ETHUSDT'];

  // when
  const currencies = await ListCurrency({ currencyRepository: mockCurrencyRepository });

  // then
  expect(currencies).toEqual(['BTCUSDT', 'ETHUSDT']);
});
