const Currency = require('../../../src/domain/Currency');
const CurrencyRepository = require('../../../src/domain/CurrencyRepository');
const mockCurrencyRepository = new CurrencyRepository();
const CreateCurrency = require('../../../src/application/use_cases/CreateCurrency');

test('should resolve with the newly persisted currency (augmented with an ID)', async () => {
  // given
  const persistedCurrency = new Currency(null, 'BTCUSDT');
  mockCurrencyRepository.persist = jest.fn(() => persistedCurrency);

  // when
  const currency = await CreateCurrency('BTCUSDT', undefined, { currencyRepository: mockCurrencyRepository });

  // then
  expect(mockCurrencyRepository.persist).toHaveBeenCalledWith(new Currency(null, 'BTCUSDT'));
  expect(currency).toEqual(persistedCurrency);
});
