const Currency = require('../../../src/domain/Currency');
const CurrencyRepository = require('../../../src/domain/CurrencyRepository');
const mockCurrencyRepository = new CurrencyRepository();
const GetLecturesBySymbol = require('../../../src/application/use_cases/GetLecturesBySymbol');

test('should resolve with the corresponding persisted currency entity', async () => {
  // given
  const average = { averagePrice: '62501.79445502', registeredDate: Date.now() };
  const correspondingCurrency = new Currency("1", "BTCUSDT", [average] );
  mockCurrencyRepository.get = jest.fn((symbol) => correspondingCurrency);

  // when
  const currency = await GetLecturesBySymbol("BTCUSDT", "2",{ currencyRepository: mockCurrencyRepository });

  // then
  expect(mockCurrencyRepository.get).toHaveBeenCalledWith("BTCUSDT");

  expect(correspondingCurrency.version[0].averagePrice).toEqual('62501.79445502');
});
