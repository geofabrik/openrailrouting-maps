import { textToCoordinate, hitToItem, milliSecondsToText } from '@/Converters'

describe('Converters', function () {
    describe('milliSecondsToText', function () {
        it('should convert ms to text', function () {
            expect(milliSecondsToText(59 * 1000)).toEqual('1 min')

            expect(milliSecondsToText(63 * 60 * 1000)).toEqual('1 h 3 min')

            expect(milliSecondsToText(7198000)).toEqual('2 h')
        })
    })

    describe('textToCoordinate', function () {
        it('should convert 2 digits separated by ","', function () {
            expect(textToCoordinate('1.2345, 2.6534')).toEqual({ lat: 1.2345, lng: 2.6534 })
        })
        it('should convert 2 digits separated by " "', function () {
            expect(textToCoordinate('1.2345   2.6534')).toEqual({ lat: 1.2345, lng: 2.6534 })
        })
        it('should return null if not 2 elements are found', function () {
            expect(textToCoordinate('first second third')).toBeNull()
            expect(textToCoordinate('1.2345')).toBeNull()
        })
        it('should return null if any of the elements is NaN', function () {
            expect(textToCoordinate('2.6534 second')).toBeNull()
        })
    })

    describe('hitToItem', function () {
        it('default city', function () {
            expect(
                hitToItem({
                    name: 'Hoyerswerda - Wojerecy',
                    country: 'Germany',
                    state: 'Saxony',
                    postcode: '02977',
                } as any),
            ).toEqual({ mainText: 'Hoyerswerda - Wojerecy', secondText: '02977, Saxony, Germany' })
        })

        it('default address', function () {
            expect(
                hitToItem({
                    name: 'somestreet',
                    country: 'Germany',
                    state: 'Berlin',
                    city: 'Berlin',
                    street: 'somestreet',
                    housenumber: '6',
                    postcode: '10117',
                } as any),
            ).toEqual({ mainText: 'somestreet 6', secondText: '10117 Berlin, Germany' })
        })

        it('default poi', function () {
            expect(
                hitToItem({
                    name: 'Wasserturm Hoyerswerda Bahnhof',
                    country: 'Germany',
                    city: 'Hoyerswerda - Wojerecy',
                    state: 'Saxony',
                    street: 'Am Bahnhofsvorplatz',
                    postcode: '02977',
                } as any),
            ).toEqual({
                mainText: 'Wasserturm Hoyerswerda Bahnhof',
                secondText: 'Am Bahnhofsvorplatz, 02977 Hoyerswerda - Wojerecy, Saxony, Germany',
            })
        })

        it('default poi 2', function () {
            expect(
                hitToItem({
                    name: 'An der Schule',
                    country: 'Germany',
                    city: 'Hoyerswerda - Wojerecy',
                    state: 'Saxony',
                    county: 'Bautzen',
                    postcode: '02977',
                } as any),
            ).toEqual({ mainText: 'An der Schule', secondText: '02977 Hoyerswerda - Wojerecy, Saxony, Germany' })
        })

        it('default poi 3', function () {
            expect(
                hitToItem({
                    name: 'Am Wasserturm',
                    country: 'Germany',
                    city: 'Hoyerswerda - Wojerecy',
                    state: 'Saxony',
                    postcode: '02977',
                } as any),
            ).toEqual({ mainText: 'Am Wasserturm', secondText: '02977 Hoyerswerda - Wojerecy, Saxony, Germany' })
        })
    })
})
